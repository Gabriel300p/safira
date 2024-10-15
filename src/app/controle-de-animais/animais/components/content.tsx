"use client";

import { useAnimalContext } from "@/app/controle-de-animais/animais/utils/animal-context";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC, useState } from "react";
import { PiPlusCircleFill, PiQuestion } from "react-icons/pi";
import AnimaisForm from "./animais-form/animais-form";
import AnimaisLoading from "./animais-loading";
import { columns } from "./animais-table/columns";
import { DataTable } from "./animais-table/data-table";

const Content: FC = ({}) => {
  const { animals, isLoading, error, dataUpdatedAt } = useAnimalContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isLoading) return <AnimaisLoading />;
  if (error) return <div>Erro: {error.message}</div>;

  const adoptedAnimals = animals?.filter((animal) => animal.adotado) || [];
  const notAdoptedAnimals = animals?.filter((animal) => !animal.adotado) || [];

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Não disponível";

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="justify-between items-center flex flex-col md:flex-row w-full">
        <div className="sm:items-center gap-4 lg:gap-8 flex flex-col sm:flex-row w-full">
          <div className="flex-col sm:justify-center items-start gap-1 flex">
            <div className="items-center gap-2 flex">
              <h1 className="text-neutral-700 text-2xl font-semibold leading-tight">
                Animais
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
                {animals?.length}
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
          <Separator
            orientation="vertical"
            className="bg-neutral-200 h-12 hidden sm:block"
          />
          <div className="flex items-center justify-around sm:justify-normal gap-0 md:gap-4 lg:gap-8 mb-8 sm:mb-0">
            <div className="flex-col justify-center items-center gap-2 inline-flex">
              <strong className="text-neutral-700 text-2xl font-semibold">
                {adoptedAnimals.length}
              </strong>
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="w-[8px] h-[8px] bg-emerald-600 rounded-full" />
                <div className="text-neutral-500 text-sm font-medium text-center">
                  Adotados
                </div>
              </div>
            </div>
            <Separator orientation="vertical" className="bg-neutral-200 h-12" />
            <div className="flex-col justify-center items-center gap-2 inline-flex">
              <strong className="text-neutral-700 text-2xl font-semibold">
                {notAdoptedAnimals.length}
              </strong>
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="w-[8px] h-[8px] bg-red-600 rounded-full" />
                <div className="text-neutral-500 text-sm font-medium text-center">
                  Não adotados
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className={`${buttonVariants()} w-full sm:w-fit`}>
            <PiPlusCircleFill className="w-5 h-5" />
            <span className="block md:hidden lg:block">Adicionar novo</span>
          </DialogTrigger>
          <DialogContent>
            <AnimaisForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="bg-neutral-200 h-[1px]" />
      <DataTable columns={columns} data={animals || []} />
    </div>
  );
};

export default Content;
