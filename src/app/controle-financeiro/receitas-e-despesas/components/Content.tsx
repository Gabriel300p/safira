"use client";

import PageLoading from "@/components/page-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FC, useMemo, useState } from "react";
import {
  PiArrowCircleDownFill,
  PiArrowCircleUpFill,
  PiCurrencyCircleDollarFill,
  PiPlusCircleFill,
  PiQuestion,
  PiTrendDown,
  PiTrendUp,
} from "react-icons/pi";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useFinanceiroContext } from "../utils/financeiro-context";
import { Financeiro } from "../utils/schema";
import FinanceiroForm from "./financeiro-form/financeiros-form";
import { columns } from "./financeiro-table/columns";
import { DataTable } from "./financeiro-table/data-table";

interface AggregatedData {
  [date: string]: {
    receitas: number;
    despesas: number;
  };
}

const Content: FC = () => {
  const { financeiros, isLoading, error, dataUpdatedAt } =
    useFinanceiroContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Não disponível";

  const {
    totalReceitas,
    totalDespesas,
    balancoTotal,
    chartData,
    comparacaoMesAnterior,
  } = useMemo(() => {
    if (!financeiros) {
      return {
        totalReceitas: 0,
        totalDespesas: 0,
        balancoTotal: 0,
        chartData: [],
        comparacaoMesAnterior: { balanco: 0, receitas: 0, despesas: 0 },
      };
    }

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    const dadosMesAtual = financeiros.filter((item: Financeiro) => {
      const dataItem = new Date(item.data);
      return (
        dataItem.getMonth() === mesAtual && dataItem.getFullYear() === anoAtual
      );
    });

    const dadosMesAnterior = financeiros.filter((item: Financeiro) => {
      const dataItem = new Date(item.data);
      return (
        dataItem.getMonth() === (mesAtual - 1 + 12) % 12 &&
        (mesAtual === 0
          ? dataItem.getFullYear() === anoAtual - 1
          : dataItem.getFullYear() === anoAtual)
      );
    });

    const calcularTotais = (dados: Financeiro[]) => {
      const receitas = dados
        .filter((item) => item.tipo === "RECEITA")
        .reduce((acc, item) => acc + item.valor, 0);
      const despesas = dados
        .filter((item) => item.tipo === "DESPESA")
        .reduce((acc, item) => acc + item.valor, 0);
      return { receitas, despesas, balanco: receitas - despesas };
    };

    const totaisMesAtual = calcularTotais(dadosMesAtual);
    const totaisMesAnterior = calcularTotais(dadosMesAnterior);

    const calcularComparacao = (atual: number, anterior: number) => {
      if (anterior === 0) return atual > 0 ? 100 : 0;
      return ((atual - anterior) / anterior) * 100;
    };

    const comparacaoMesAnterior = {
      balanco: calcularComparacao(
        totaisMesAtual.balanco,
        totaisMesAnterior.balanco
      ),
      receitas: calcularComparacao(
        totaisMesAtual.receitas,
        totaisMesAnterior.receitas
      ),
      despesas: calcularComparacao(
        totaisMesAtual.despesas,
        totaisMesAnterior.despesas
      ),
    };

    const chartData = dadosMesAtual
      .reduce((acc: any[], item: Financeiro) => {
        const date = format(new Date(item.data), "dd/MM", { locale: ptBR });
        const existingDate = acc.find((d) => d.date === date);
        if (existingDate) {
          existingDate[item.tipo.toLowerCase()] += item.valor;
        } else {
          acc.push({
            date,
            receitas: item.tipo === "RECEITA" ? item.valor : 0,
            despesas: item.tipo === "DESPESA" ? item.valor : 0,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalReceitas: totaisMesAtual.receitas,
      totalDespesas: totaisMesAtual.despesas,
      balancoTotal: totaisMesAtual.balanco,
      chartData,
      comparacaoMesAnterior,
    };
  }, [financeiros]);

  const formatPercentage = (value: number) => {
    const formattedValue = value.toFixed(1);
    return value > 0 ? `+${formattedValue}%` : `${formattedValue}%`;
  };

  const getPercentageColor = (value: number) => {
    return value < 0 ? "text-red-600" : "text-emerald-600";
  };

  const renderTrendIcon = (value: number) => {
    const IconComponent = value < 0 ? PiTrendDown : PiTrendUp;
    return <IconComponent className={`w-3 h-3 ${getPercentageColor(value)}`} />;
  };

  if (isLoading) return <PageLoading />;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div className="justify-between items-center flex gap-1 flex-col md:flex-row w-full">
        <div className="sm:items-center gap-4 lg:gap-8 flex flex-col sm:flex-row w-full">
          <div className="flex-col sm:justify-center items-start gap-1 flex">
            <div className="items-center gap-2 flex">
              <h1 className="text-neutral-700 text-2xl font-semibold leading-tight">
                Receitas e despesas
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PiQuestion className="w-5 h-5 text-neutral-700" />
                  </TooltipTrigger>
                  <TooltipContent className="w-96 text-center">
                    <p>
                      Aqui você vê uma lista de receitas e despesas com
                      informações detalhadas. O gráfico mostra a evolução das
                      receitas e despesas ao longo do tempo.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <span className="text-neutral-700 text-sm font-bold leading-tight">
                {financeiros?.length || 0}
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
          <DialogTrigger asChild>
            <Button>
              <PiPlusCircleFill className="w-5 h-5 mr-2" />
              Adicionar novo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FinanceiroForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {/* <Separator /> */}

      <Card className="flex items-center gap-4 w-full">
        <div className="w-[40%]">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <PiCurrencyCircleDollarFill className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-base font-normal">
                      Balanço total
                    </span>
                    <span className="text-neutral-700 text-2xl font-bold">
                      R${" "}
                      {balancoTotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="h-[1px] border border-dashed border-neutral-200" />
                <div className="justify-between items-start inline-flex">
                  <div className="text-neutral-500 text-sm font-medium leading-tight">
                    vs mês anterior:
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    {comparacaoMesAnterior.balanco !== null && (
                      <>
                        <div
                          className={`text-xs font-semibold leading-tight ${getPercentageColor(
                            comparacaoMesAnterior.balanco
                          )}`}
                        >
                          {formatPercentage(comparacaoMesAnterior.balanco)}
                        </div>
                        {renderTrendIcon(comparacaoMesAnterior.balanco)}
                      </>
                    )}
                    {comparacaoMesAnterior.balanco === null && (
                      <div className="text-xs font-semibold leading-tight text-neutral-500">
                        N/A
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
        <Separator orientation="vertical" className="bg-neutral-200 h-[70%]" />
        <div className="w-[30%]">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <PiCurrencyCircleDollarFill className="w-10 h-10 text-green-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-base font-normal">
                      Total de receitas
                    </span>
                    <span className="text-neutral-700 text-2xl font-bold">
                      R${" "}
                      {totalReceitas.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="h-[1px] border border-dashed border-neutral-200" />
                <div className="justify-between items-start inline-flex">
                  <div className="text-neutral-500 text-sm font-medium leading-tight">
                    vs mês anterior:
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <div
                      className={`text-xs font-semibold leading-tight ${getPercentageColor(
                        comparacaoMesAnterior.receitas
                      )}`}
                    >
                      {formatPercentage(comparacaoMesAnterior.receitas)}
                    </div>
                    {renderTrendIcon(comparacaoMesAnterior.receitas)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
        <Separator orientation="vertical" className="bg-neutral-200 h-12" />
        <div className="w-[30%]">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <PiArrowCircleDownFill className="w-10 h-10 text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-base font-normal">
                      Total de despesas
                    </span>
                    <span className="text-neutral-700 text-2xl font-bold">
                      R${" "}
                      {totalDespesas.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="h-[1px] border border-dashed border-neutral-200" />
                <div className="justify-between items-center gap-5 inline-flex">
                  <div className="text-neutral-500 text-sm font-medium leading-tight">
                    vs mês anterior:
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <div
                      className={`text-xs font-semibold leading-tight ${getPercentageColor(
                        comparacaoMesAnterior.despesas
                      )}`}
                    >
                      {formatPercentage(comparacaoMesAnterior.despesas)}
                    </div>
                    {renderTrendIcon(comparacaoMesAnterior.despesas)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="w-full">
        <DataTable columns={columns} data={financeiros || []} />
      </div>
    </>
  );
};

export default Content;
