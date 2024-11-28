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
import { useTutorContext } from "../utils/tutor-context";
import TutoresForm from "./tutores-form/tutores-form";
import { columns } from "./tutors-table/columns";
import { DataTable } from "./tutors-table/data-table";

const Content: FC = ({}) => {
  const { tutors, isLoading, error, dataUpdatedAt } = useTutorContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isLoading) return <PageLoading />;
  if (error) return <div>Erro: {error.message}</div>;

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Não disponível";

  return (
    <>
      <div className="justify-between items-center flex gap-4 flex-col md:flex-row ">
        <div className="flex-col md:justify-center items-start gap-1 flex w-full">
          <div className="items-center gap-2 flex">
            <h1 className="text-neutral-700 text-2xl font-semibold leading-tight">
              Tutores
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PiQuestion className="w-5 h-5 text-neutral-700" />
                </TooltipTrigger>
                <TooltipContent className="w-96 text-center">
                  <p>
                    Aqui você vê uma lista de animais com informações como nome,
                    raça, tipo, tutor, se foi adotado ou não, e idade. Você pode
                    clicar nos títulos para organizar a lista, e também fazer
                    ações como editar ou ver mais detalhes de cada animal.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <span className="text-neutral-700 text-sm font-bold leading-tight">
              <NumberFlow
                value={tutors?.length || 0}
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className={`${buttonVariants()} w-full sm:w-fit`}>
            <PiPlusCircleFill className="w-5 h-5" />
            <span className="block md:hidden lg:block">Adicionar novo</span>
          </DialogTrigger>
          <DialogContent>
            <TutoresForm onClose={() => setIsDialogOpen(false)} />
            Teste
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="bg-neutral-200 h-[1px]" />

      {/* Adicionando overflow-x-auto para permitir scroll horizontal */}
      <div>
        <DataTable columns={columns} data={tutors || []} />
      </div>
    </>
  );
};

export default Content;
