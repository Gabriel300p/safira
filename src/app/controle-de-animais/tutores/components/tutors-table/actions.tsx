import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
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
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import {
  PiDotsThreeBold,
  PiPencilSimpleLine,
  PiTrash,
  PiTrashFill,
} from "react-icons/pi";
import { Tutor } from "../../utils/schema";
import { deleteTutor } from "../../utils/tutor-functions";
import TutoresForm from "../tutores-form/tutores-form";

interface AnimalTableActionsProps {
  tutor: Tutor;
}

export default function AnimalTableActions({ tutor }: AnimalTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: deleteTutorMutate } = deleteTutor();

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteTutor = async () => {
    try {
      await deleteTutorMutate(tutor.id || 0);
      toast({
        title: "Tutor excluído com sucesso!",
        description: `${tutor.nome} foi excluído.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir tutor:", error);
      toast({
        title: "Não foi possível excluir este tutor",
        description: "Por favor, confirme se não tem nenhum animal associado.",
        variant: "error",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
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
            Editar dados de {tutor.nome}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            <PiTrash className="mr-2 h-5 w-5 text-red-600" />
            <p className="text-red-600 font-medium text-sm">
              Excluir {tutor.nome}
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <TutoresForm
            tutorId={tutor.id}
            onClose={() => setIsEditDialogOpen(false)}
            tutorDataClick={tutor}
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
                  Essa ação não pode ser desfeita. O tutor {tutor.nome} será
                  removido do sistema.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteTutor}
            >
              Excluir {tutor.nome}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
