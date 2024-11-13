"use client";

import PageLoading from "@/components/page-loading";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NumberFlow from "@/components/ui/number-animation";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC, useState } from "react";
import { PiPlusCircleFill, PiQuestion } from "react-icons/pi";
import { useCategoriaContext } from "../utils/categoria-context";
import CategoriasForm from "./categorias-form/categorias-form";
import { columns } from "./categorias-table/columns";
import { DataTable } from "./categorias-table/data-table";

const Content: FC = ({}) => {
  const { categorias, isLoading, error, dataUpdatedAt } = useCategoriaContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isLoading) return <PageLoading />;
  if (error) return <div>Erro: {error.message}</div>;

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Não disponível";

  return (
    <>
      <div className="justify-between items-center flex gap-1 flex-col md:flex-row w-full">
        <div className="sm:items-center gap-4 lg:gap-8 flex flex-col sm:flex-row w-full">
          <div className="flex-col sm:justify-center items-start gap-1 flex">
            <div className="items-center gap-2 flex">
              <h1 className="text-neutral-700 text-2xl font-semibold leading-tight">
                Categorias
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PiQuestion className="w-5 h-5 text-neutral-700" />
                  </TooltipTrigger>
                  <TooltipContent className="w-96 text-center">
                    <p>
                      Aqui você vê uma lista de animais com informações como
                      nome, raça, tipo, tutor, se foi adotado ou não, e idade.
                      Você pode clicar nos títulos para organizar a lista, e
                      também fazer ações como editar ou ver mais detalhes de
                      cada animal.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <span className="text-neutral-700 text-sm font-bold leading-tight">
                <NumberFlow
                  value={categorias?.length || 0}
                  format={{ notation: "compact" }}
                  locales="pt-BR"
                />
              </span>
              <span className="text-neutral-500 text-sm font-normal leading-tight">
                {" "}
                total, atualizado às{" "}
              </span>
              <span className="text-neutral-700 text-sm font-bold leading-tight">
                {lastUpdated}
              </span>
            </div>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className={`${buttonVariants()} w-full sm:w-fit`}>
            <PiPlusCircleFill className="w-5 h-5" />
            <span className="block md:hidden lg:block">Adicionar novo</span>
          </DialogTrigger>
          <DialogContent>
            <CategoriasForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="bg-neutral-200 h-[1px]" />

      {/* Adicionando overflow-x-auto para permitir scroll horizontal */}
      <div className="w-[360px] sm:w-full">
        <DataTable columns={columns} data={categorias || []} />
      </div>
    </>
  );
};

export default Content;
