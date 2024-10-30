import TableHeader from "@/components/table/columnSort";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PiCat, PiDog } from "react-icons/pi";
import { Animal } from "../../utils/schema";
import AnimalTableActions from "./actions";

export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <TableHeader column={column} title="Nome / Raça" align="start" />
    ),
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
    header: ({ column }) => <TableHeader column={column} title="Tipo" />,
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
    header: ({ column }) => <TableHeader column={column} title="Tutor" />,
    cell: ({ row }) => {
      const animal = row.original;
      return (
        <div className="text-base font-medium text-center text-neutral-600">
          {animal.tutor?.id === 2 ? "-" : animal.tutor?.nome}
        </div>
      );
    },
  },
  {
    accessorKey: "adotado",
    header: ({ column }) => <TableHeader column={column} title="Adoção" />,
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
    header: ({ column }) => <TableHeader column={column} title="Idade" />,
    cell: ({ row }) => {
      const dataNascimento = new Date(row.getValue("dataNascimento"));
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const obito = row.original.obito;
      const dataNascimentoNull = row.original.dataNascimento === null;

      if (obito) {
        return (
          <div className="flex items-center justify-center">
            <Badge variant="gray">Óbito</Badge>
          </div>
        );
      }

      if (dataNascimentoNull) {
        return (
          <div className="flex items-center justify-center">
            <span className="text-base font-medium text-neutral-600 text-center">
              Não informado
            </span>
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
  {
    accessorKey: "atualizadoEm",
    header: ({ column }) => (
      <TableHeader column={column} title="Atualizado em" />
    ),
    cell: ({ row }) => {
      const atualizadoEm = new Date(row.getValue("atualizadoEm"));
      return (
        <div className="text-base font-medium text-center text-neutral-600">
          {atualizadoEm.toLocaleDateString("pt-BR")} -{" "}
          {atualizadoEm.toLocaleTimeString("pt-BR")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const animal = row.original;
      return <AnimalTableActions animal={animal} />;
    },
  },
];
