import TableHeader from "@/components/table/columnSort";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PiCat, PiCheckSquare, PiCreditCard, PiDog } from "react-icons/pi";
import { Financeiro } from "../../utils/schema";
import FinanceiroTableActions from "./actions";

export const columns: ColumnDef<Financeiro>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <TableHeader column={column} title="Nome / Raça" align="start" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-neutral-700 text-sm">
          {row.original.nome}
        </span>
      );
    },
  },
  {
    accessorKey: "valor",
    header: ({ column }) => (
      <TableHeader column={column} title="Valor" align="center" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="flex flex-1 justify-center font-semibold text-neutral-700 text-sm text-center">
          {row.original.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => <TableHeader column={column} title="Tipo" />,
    cell: ({ row }) => {
      const receita = row.original.tipo === "RECEITA";
      return (
        <div className="flex items-center justify-center">
          <Badge variant={receita ? "green" : "red"}>
            {receita ? "Receita" : "Despesa"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "categoria",
    header: ({ column }) => (
      <TableHeader column={column} title="Valor" align="center" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="flex flex-1 justify-center font-semibold text-neutral-700 text-sm text-center">
          {row.original.categoria?.nome}
        </span>
      );
    },
  },
  {
    accessorKey: "recorrencia",
    header: ({ column }) => <TableHeader column={column} title="Recorrência" />,
    cell: ({ row }) => {
      const recorrencia = row.getValue("recorrencia") as string;
      const formatRecorrencia = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };

      const icon =
        recorrencia.toLowerCase() == "UNICA" ? (
          <PiCreditCard className="h-4 w-4 mr-2" />
        ) : (
          <PiCheckSquare className="h-4 w-4 mr-2" />
        );

      return (
        <div className="flex items-center justify-center">
          {icon}
          <span className="font-medium text-sm text-neutral-600">
            {formatRecorrencia(recorrencia)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "data",
    header: ({ column }) => <TableHeader column={column} title="Data" />,
    cell: ({ row }) => {
      const data = new Date(row.getValue("data"));
      return (
        <div className="text-sm font-medium text-center text-neutral-600">
          {data.toLocaleDateString("pt-BR")}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const rowDate = new Date(row.getValue(columnId));
      const { startDate, endDate } = filterValue;
      if (startDate && rowDate < new Date(startDate)) return false;
      if (endDate && rowDate > new Date(endDate)) return false;

      return true;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const financeiro = row.original;
      return <FinanceiroTableActions financeiro={financeiro} />;
    },
  },
];
