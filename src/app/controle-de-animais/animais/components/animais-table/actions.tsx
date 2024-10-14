import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import { useTutorContext } from "@/app/controle-de-animais/tutores/utils/tutor-context";
import { useState } from "react";
import {
  PiDotsThreeBold,
  PiHandHeart,
  PiHeartBreak,
  PiPencilSimpleLine,
  PiTrash,
} from "react-icons/pi";
import { deleteAnimal, updateAnimal } from "../../utils/animal-functions";
import { Animal } from "../../utils/schema";
import AnimaisForm from "../animais-form";

interface AnimalTableActionsProps {
  animal: Animal;
  onUpdateAnimal: (updatedAnimal: Animal) => Promise<void>;
}

export default function AnimalTableActions({
  animal,
  onUpdateAnimal,
}: AnimalTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdoptDialogOpen, setIsAdoptDialogOpen] = useState(false);
  const [isObitoDialogOpen, setIsObitoDialogOpen] = useState(false);
  const { tutors } = useTutorContext();
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null);
  const { toast } = useToast();

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteAnimal = async () => {
    try {
      await deleteAnimal(animal.id || 0);
      toast({
        title: "Animal excluído com sucesso!",
        description: `${animal.nome} foi excluído.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
      toast({
        title: "Não foi possível excluir este animal",
        description: "Por favor, tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleAdoptAnimal = async () => {
    if (!selectedTutor) {
      toast({
        title: "Selecione um tutor antes de adotar.",
        variant: "error",
      });
      return;
    }

    try {
      await updateAnimal(animal.id || 0, {
        adotado: true,
        tutorId: selectedTutor,
      });
      setIsAdoptDialogOpen(false);
      toast({
        title: `Alterado status de ${animal.nome}`,
        description: "Seu novo status é: Adotado.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Ocorreu um erro ao alterar o status de ${animal.nome}.`,
        description: (error as Error).message,
        variant: "error",
      });
      console.error("Erro ao alterar status de adoção:", error);
    }
  };

  const handleObitoAnimal = async () => {
    try {
      await updateAnimal(animal.id || 0, { obito: true });
      setIsObitoDialogOpen(false);
      toast({
        title: "Status de óbito alterado com sucesso.",
        description: `${animal.nome} foi marcado como óbito.`,
        variant: "success",
      });
      onUpdateAnimal({ ...animal, obito: true });
    } catch (error) {
      console.error("Erro ao alterar status de óbito:", error);
      toast({
        title: "Erro ao alterar status de óbito.",
        description: "Por favor, tente novamente mais tarde.",
        variant: "error",
      });
    }
  };

  return (
    <div className="w-fit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-2 py-1">
            <span className="sr-only">Abrir menu</span>
            <PiDotsThreeBold className="h-6 w-6 text-neutral-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-1">
          <DropdownMenuLabel className="mb-1">Ações</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleEditClick}>
            <PiPencilSimpleLine className="mr-2 h-5 w-5 text-neutral-600" />
            Editar dados de {animal.nome}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            <PiTrash className="mr-2 h-5 w-5 text-red-600" />
            <p className="text-red-600 font-medium text-sm">
              Excluir {animal.nome}
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!animal.adotado && (
            <DropdownMenuItem onSelect={() => setIsAdoptDialogOpen(true)}>
              <PiHandHeart className="mr-2 h-5 w-5 text-emerald-600" />
              <p className="text-emerald-600 font-medium text-sm">
                Alterar status para <span className="underline">adotado</span>
              </p>
            </DropdownMenuItem>
          )}
          {!animal.obito && (
            <DropdownMenuItem onSelect={() => setIsObitoDialogOpen(true)}>
              <PiHeartBreak className="mr-2 h-5 w-5 text-neutral-600" />
              <p className="text-neutral-600 font-medium text-sm">
                Alterar status para <span className="underline">óbito</span>
              </p>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <AnimaisForm
            animalId={animal.id}
            onClose={() => setIsEditDialogOpen(false)}
            animalDataClick={animal}
          />
        </DialogContent>
      </Dialog>

      {/* Diálogo de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <p>Tem certeza que deseja excluir o animal {animal.nome}?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteAnimal}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de adoção */}
      <Dialog open={isAdoptDialogOpen} onOpenChange={setIsAdoptDialogOpen}>
        <DialogContent>
          <p>Tem certeza que deseja alterar o status para adotado?</p>
          <label htmlFor="tutor-select" className="block mt-4">
            Selecione um tutor:
          </label>
          <select
            id="tutor-select"
            className="w-full mt-1 p-2 border rounded"
            value={selectedTutor || ""}
            onChange={(e) => setSelectedTutor(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecione um tutor
            </option>
            {tutors?.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.nome}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsAdoptDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleAdoptAnimal}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de óbito */}
      <Dialog open={isObitoDialogOpen} onOpenChange={setIsObitoDialogOpen}>
        <DialogContent>
          <p>Tem certeza que deseja alterar o status para óbito?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsObitoDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleObitoAnimal}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
