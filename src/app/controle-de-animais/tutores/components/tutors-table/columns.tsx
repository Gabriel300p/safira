import TableHeader from "@/components/table/columnSort";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeWithoutDot } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PiCat, PiDog } from "react-icons/pi";
import { Tutor } from "../../utils/schema";
import TutorTableActions from "./actions";

export const columns: ColumnDef<Tutor>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <TableHeader column={column} title="Nome / E-mail" align="start" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const tutor = row.original;
      const initials = tutor.nome
        .split(" ")
        .map((name) => name.charAt(0))
        .join("");

      return (
        <div className="flex items-center gap-3 px-2">
          <Avatar className="border-2 border-primary w-11 h-11">
            <AvatarImage src={""} className="bg-contain" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="font-semibold text-neutral-700 text-base">
              {tutor.nome}
            </div>
            <div className="text-sm font-normal text-neutral-600">
              {tutor.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => (
      <TableHeader column={column} title="Telefone" align="center" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const telefone = row.getValue("telefone") as string;
      return (
        <div className="text-center">
          {telefone || <span className="text-neutral-400">Não informado</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "Animal",

    header: ({ column }) => (
      <TableHeader column={column} title="Animais Adotados" align="center" />
    ),
    enableColumnFilter: true,
    filterFn: (row, id, filterValue) => {
      const animais = row.getValue(id) as {
        id: number;
        nome: string;
        tipo: string;
      }[];
      const hasAnimals = animais && animais.length > 0;
      return filterValue === "true" ? hasAnimals : !hasAnimals;
    },
    cell: ({ row }) => {
      const animais = row.getValue("Animal") as {
        id: number;
        nome: string;
        tipo: string;
      }[];
      if (!animais || animais.length === 0) {
        return (
          <div className="text-center text-neutral-400">
            Nenhum animal adotado
          </div>
        );
      }

      const firstAnimal = animais[0];
      const remainingCount = animais.length - 1;

      return (
        <div className="flex items-center justify-center gap-2">
          {firstAnimal.tipo === "CACHORRO" ? (
            <PiDog className="w-5 h-5 text-neutral-600" />
          ) : (
            <PiCat className="w-5 h-5 text-neutral-600" />
          )}
          <span className="text-center">{firstAnimal.nome}</span>
          {remainingCount > 0 && (
            <BadgeWithoutDot variant="gray">+{remainingCount}</BadgeWithoutDot>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "cidade",
    header: ({ column }) => (
      <TableHeader column={column} title="Cidade" align="center" />
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const cidade = row.getValue("cidade") as string;

      if (!cidade) {
        return (
          <div className="text-center text-neutral-400">Não informado</div>
        );
      }

      return (
        <div className="text-center">
          {cidade ? (
            cidade
          ) : (
            <span className="text-neutral-400">Cidade não informada</span>
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
      const tutor = row.original;
      return <TutorTableActions tutor={tutor} />;
    },
  },
];
