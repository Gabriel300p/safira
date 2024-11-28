"use client";

import { useCategoriaContext } from "@/app/controle-financeiro/categorias/utils/categoria-context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { Financeiro } from "../../utils/schema";

// Função para formatar o valor em R$
const formatarValor = (valor: string) => {
  // Remove todos os caracteres não numéricos
  const numero = valor.replace(/[^\d]/g, "");
  // Formata o número como moeda BRL
  const formatado = (Number(numero) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatado;
};

export function DadosCadastrais() {
  const { categorias, isLoading, error } = useCategoriaContext();
  const { control, watch, setValue } = useFormContext<Financeiro>();
  const tipoFinanceiro = watch("tipo");

  useEffect(() => {
    if (!tipoFinanceiro) {
      setValue("tipo", "DESPESA");
    }
  }, [tipoFinanceiro, setValue]);

  return (
    <div className="space-y-4 ml-1 mb-2">
      {/* Tipo (Despesa ou Receita) */}
      <FormField
        control={control}
        name="tipo"
        render={({ field }) => (
          <FormItem>
            <Tabs
              value={field.value}
              onValueChange={(value) =>
                field.onChange(value as "DESPESA" | "RECEITA")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="DESPESA"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Despesa
                </TabsTrigger>
                <TabsTrigger
                  value="RECEITA"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  Receita
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Nome */}
      <FormField
        control={control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input
                placeholder={`Digite o nome da ${tipoFinanceiro?.toLowerCase()}`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Valor */}
      <FormField
        control={control}
        name="valor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor</FormLabel>
            <FormControl>
              <Input
                placeholder="R$ 0,00"
                {...field}
                onChange={(e) => {
                  const valor = e.target.value.replace(/[^\d]/g, "");
                  field.onChange(Number(valor));
                }}
                onBlur={(e) => {
                  e.target.value = formatarValor(String(field.value));
                }}
                value={field.value ? formatarValor(String(field.value)) : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Categoria */}
      <FormField
        control={control}
        name="categoriaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value ? String(field.value) : ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categorias
                  ?.filter((categoria) => categoria.tipo === tipoFinanceiro)
                  .map((categoria) => (
                    <SelectItem key={categoria.id} value={String(categoria.id)}>
                      {categoria.nome}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Recorrência */}
      <FormField
        control={control}
        name="recorrencia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recorrência</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="UNICA">Única</SelectItem>
                <SelectItem value="DIARIA">Diária</SelectItem>
                <SelectItem value="SEMANAL">Semanal</SelectItem>
                <SelectItem value="MENSAL">Mensal</SelectItem>
                <SelectItem value="BIMESTRAL">Bimestral</SelectItem>
                <SelectItem value="TRIMESTRAL">Trimestral</SelectItem>
                <SelectItem value="SEMESTRAL">Semestral</SelectItem>
                <SelectItem value="ANUAL">Anual</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Data */}
      <FormField
        control={control}
        name="data"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data</FormLabel>
            <FormControl>
              <Datepicker
                value={{
                  startDate: field.value ? new Date(field.value) : null,
                  endDate: field.value ? new Date(field.value) : null,
                }}
                useRange={false}
                asSingle={true}
                placeholder="dd/mm/aaaa"
                primaryColor={"orange"}
                displayFormat="DD/MM/YYYY"
                popoverDirection="up"
                inputClassName="py-2 w-full rounded-md border border-neutral-200 bg-white font-medium px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950  placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-neutral-400 placeholder:font-normal"
                onChange={(newValue: any) => {
                  field.onChange(
                    newValue?.startDate
                      ? new Date(newValue.startDate)
                      : undefined
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
