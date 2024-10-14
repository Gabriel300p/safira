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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import {
  PiDotsThreeBold,
  PiHandHeart,
  PiHandHeartFill,
  PiHeartBreak,
  PiHeartBreakFill,
  PiPencilSimpleLine,
  PiTrash,
  PiTrashFill,
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

  console.log(selectedTutor, "selectedTutor");

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
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center justify-center p-4 rounded-full bg-red-100 w-fit">
                <PiTrashFill className="h-7 w-7 text-red-600" />
              </div>
              <div className="flex flex-col gap-0.5">
                <AlertDialogTitle className="text-lg font-semibold text-neutral-600">
                  Tem certeza que deseja excluir?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-normal text-neutral-600 text-sm leading-normal">
                  Essa ação não pode ser desfeita. O animal {animal.nome} será
                  removido do sistema.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteAnimal}
            >
              Excluir {animal.nome}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de adoção */}
      <AlertDialog open={isAdoptDialogOpen} onOpenChange={setIsAdoptDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-start gap-4 mb-2">
              <div className="flex items-center justify-center p-4 rounded-full bg-emerald-100 w-fit">
                <PiHandHeartFill className="h-7 w-7 text-emerald-600" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5">
                  <AlertDialogTitle className="text-lg font-semibold text-neutral-600">
                    Você confirma a alteração?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-normal text-neutral-600 text-sm leading-normal">
                    Você pode alterar os dados novamente indo em editar dados do
                    animal {animal.nome}.
                  </AlertDialogDescription>
                </div>

                <select
                  id="tutor-select"
                  className="flex py-2.5 px-2 w-full items-center justify-between rounded-md border border-neutral-200 bg-white  text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleAdoptAnimal}
              disabled={!selectedTutor}
            >
              Alterar status para adotado
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de óbito */}
      <AlertDialog open={isObitoDialogOpen} onOpenChange={setIsObitoDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center justify-center p-4 rounded-full bg-neutral-100 w-fit">
                <PiHeartBreakFill className="h-7 w-7 text-neutral-600" />
              </div>
              <div className="flex flex-col gap-0.5">
                <AlertDialogTitle className="text-lg font-semibold text-neutral-600">
                  Você confirma a alteração?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-normal text-neutral-600 text-sm leading-normal">
                  Você pode alterar os dados novamente indo em editar dados do
                  animal {animal.nome}.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-neutral-700 hover:bg-neutral-800"
              onClick={handleObitoAnimal}
            >
              Alterar status para óbito
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
