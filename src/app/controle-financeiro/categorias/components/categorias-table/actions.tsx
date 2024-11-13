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
import { deleteCategoria } from "../../utils/categoria-functions";
import { Categoria } from "../../utils/schema";
import CategoriasForm from "../categorias-form/categorias-form";
// import { deleteTutor } from "../../utils/tutor-functions";
// import TutoresForm from "../tutores-form/tutores-form";

interface CategoriaTableActionsProps {
  categoria: Categoria;
}

export default function CategoriaTableActions({
  categoria,
}: CategoriaTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: deleteCategoriaMutate } = deleteCategoria();

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteTutor = async () => {
    try {
      await deleteCategoriaMutate(categoria.id || 0);
      toast({
        title: "Categoria excluída com sucesso!",
        description: `${categoria.nome} foi excluída.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast({
        title: "Não foi possível excluir esta categoria",
        description: "Por favor, revise os dados e tente novamente mais tarde",
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
            Editar dados de {categoria.nome}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            <PiTrash className="mr-2 h-5 w-5 text-red-600" />
            <p className="text-red-600 font-medium text-sm">
              Excluir {categoria.nome}
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <CategoriasForm
            categoriaId={categoria.id}
            onClose={() => setIsEditDialogOpen(false)}
            categoriaDataClick={categoria}
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
                  Essa ação não pode ser desfeita. A categoria {categoria.nome}{" "}
                  será removido do sistema.
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
              Excluir {categoria.nome}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
