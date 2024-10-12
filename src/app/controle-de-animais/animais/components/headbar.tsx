"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAnimalContext } from "@/context/animal-context";
import { FC } from "react";
import { PiPlusCircleFill, PiQuestion } from "react-icons/pi";

const Headbar: FC = ({}) => {
  const { animals, isLoading, error, dataUpdatedAt } = useAnimalContext();

  if (isLoading)
    return (
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="items-center gap-8 hidden sm:flex">
          <Skeleton className="h-12 w-48" />
          <Separator orientation="vertical" className="bg-neutral-100 h-12" />
          <Skeleton className="h-12 w-24" />
          <Separator orientation="vertical" className="bg-neutral-100 h-12" />
          <Skeleton className="h-12 w-24" />
        </div>
        <Skeleton className="h-12 w-44" />
      </div>
    );
  if (error) return <div>Erro: {error.message}</div>;

  const adoptedAnimals = animals?.filter((animal) => animal.adotado) || [];
  const notAdoptedAnimals = animals?.filter((animal) => !animal.adotado) || [];

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Não disponível";

  return (
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
                <TooltipContent>
                  <p>Adicionar explicação da tela</p>
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
      <Dialog>
        <DialogTrigger className={`${buttonVariants()} w-full sm:w-fit`}>
          <PiPlusCircleFill className="w-5 h-5" />
          <span className="block md:hidden lg:block">Adicionar novo</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Headbar;
