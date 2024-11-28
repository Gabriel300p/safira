import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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
  PiPencilSimpleLine,
  PiTrash,
  PiTrashFill,
} from "react-icons/pi";
import {
  deleteFinanceiro,
  updateFinanceiro,
} from "../../utils/financeiro-functions";
import { Financeiro } from "../../utils/schema";
import FinanceiroForm from "../financeiro-form/financeiros-form";

interface FinanceiroTableActionsProps {
  financeiro: Financeiro;
}

export default function FinanceiroTableActions({
  financeiro,
}: FinanceiroTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: updateAnimalMutate } = updateFinanceiro();
  const { mutateAsync: deleteAnimalMutate } = deleteFinanceiro();

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteAnimal = async () => {
    try {
      await deleteAnimalMutate(financeiro.id || 0);
      toast({
        title: `${financeiro.tipo} excluído com sucesso!`,
        description: `${financeiro.nome} foi excluído.`,
        variant: "success",
      });
    } catch (error) {
      console.error(`Erro ao excluir ${financeiro.tipo}:`, error);
      toast({
        title: `Não foi possível excluir este ${financeiro.tipo}`,
        description: "Por favor, tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div>
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
            Editar dados de {financeiro.nome}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            <PiTrash className="mr-2 h-5 w-5 text-red-600" />
            <p className="text-red-600 font-medium text-sm">
              Excluir {financeiro.nome}
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <FinanceiroForm
            financeiroId={financeiro.id}
            onClose={() => setIsEditDialogOpen(false)}
            financeiroDataClick={financeiro}
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
                  Essa ação não pode ser desfeita. O {financeiro.nome} será
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
              Excluir {financeiro.nome}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
