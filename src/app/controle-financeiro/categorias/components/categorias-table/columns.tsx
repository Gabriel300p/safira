import TableHeader from "@/components/table/columnSort";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Categoria } from "../../utils/schema";
import CategoriaTableActions from "./actions";

export const columns: ColumnDef<Categoria>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <TableHeader column={column} title="Nome" align="start" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 mx-4">
          <div className="font-semibold text-neutral-700 text-base">
            {row.original.nome}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => <TableHeader column={column} title="Tipo" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Badge variant={row.original.tipo === "RECEITA" ? "green" : "red"}>
            {row.original.tipo === "RECEITA" ? "Receita" : "Despesa"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Financeiro",
    header: ({ column }) => (
      <TableHeader column={column} title="Valor acumulado" align="center" />
    ),
    cell: ({ row }) => {
      // Verifica se 'Financeiro' está definido e calcula o valor acumulado, tratando valores undefined
      const totalFinanceiro = row.original.Financeiro
        ? row.original.Financeiro.reduce(
            (acc, item) => acc + (item.valor || 0),
            0
          )
        : 0;

      // Formata o valor acumulado para o formato de moeda brasileiro
      const formattedFinanceiro = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalFinanceiro);

      return (
        <div className="text-base font-medium text-center text-neutral-600">
          {totalFinanceiro === 0 ? (
            <span className="text-neutral-400 font-normal text-sm">
              R$ 0,00
            </span>
          ) : (
            formattedFinanceiro
          )}
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
          {format(atualizadoEm, "dd/MM/yyyy - HH:mm", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const categoria = row.original;
      return <CategoriaTableActions categoria={categoria} />;
    },
  },
];
