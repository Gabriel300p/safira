"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PiCaretUpDown, PiCat, PiDog } from "react-icons/pi";
import { Animal } from "../schema";
import AnimalTableActions from "./actions";

export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome / Raça
          <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
            <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
          </div>
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const animal = row.original;
      const firstLetter = animal ? animal.nome.charAt(0) : "?";
      return (
        <div className="flex items-center gap-3 px-2">
          <Avatar className="border-2 border-primary w-11 h-11">
            <AvatarImage src={animal?.imagem} className="bg-contain" />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="font-semibold text-neutral-700 text-base">
              {animal.nome}
            </div>
            <div className="text-sm font-normal text-neutral-600">
              {animal.raca?.nome}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo
            <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
              <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;

      const formatTipo = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };

      const icon =
        tipo.toLowerCase() === "cachorro" ? (
          <PiDog className="h-4 w-4 mr-2" />
        ) : (
          <PiCat className="h-4 w-4 mr-2" />
        );

      return (
        <div className="flex items-center justify-center">
          {icon}
          <span className="font-medium text-base text-neutral-600">
            {formatTipo(tipo)}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "tutor",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tutor
            <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
              <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const animal = row.original;
      return (
        <div className="text-base font-medium text-center text-neutral-600">
          {/* @ts-expect-error não sei ainda*/}
          {animal.tutor?.id === 2 ? "-" : animal.tutor?.nome}
          {}
        </div>
      );
    },
  },

  {
    accessorKey: "adotado",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Adoção
            <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
              <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const adotado = row.getValue("adotado") as boolean;
      return (
        <div className="flex items-center justify-center">
          <Badge variant={adotado ? "green" : "red"}>
            {adotado ? "Adotado" : "Não adotado"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "dataNascimento",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Idade
            <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
              <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const dataNascimento = new Date(row.getValue("dataNascimento"));
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const obito = row.original.obito;

      if (obito) {
        return (
          <div className="flex items-center justify-center">
            <Badge variant="gray">Óbito</Badge>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center">
          <span className="text-base font-medium text-neutral-600 text-center">
            {idade} anos
          </span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "dataNascimento",
  //   header: ({ column }) => {
  //     return (
  //       <div className="flex items-center justify-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Próxima vacina
  //           <div className="p-0.5 bg-white rounded-sm border border-neutral-200 justify-center items-center gap-2.5 inline-flex">
  //             <PiCaretUpDown className="h-4 w-4 text-neutral-600" />
  //           </div>
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const dataNascimento = new Date(row.getValue("dataNascimento"));

  //     if (dataNascimento === null) {
  //       return (
  //         <div className="flex items-center justify-center">
  //           <span className="text-base font-medium text-neutral-600 text-center">
  //             -
  //           </span>
  //         </div>
  //       );
  //     }

  //     return (
  //       <div className="flex items-center justify-center">
  //         <span className="text-base font-medium text-neutral-600 text-center">
  //           {dataNascimento.toLocaleDateString()}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const animal = row.original;
      // @ts-expect-error não preciso passar esse dado aqui
      return <AnimalTableActions animal={animal} />;
    },
  },
];
