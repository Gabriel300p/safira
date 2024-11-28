import { useCategoriaContext } from "@/app/controle-financeiro/categorias/utils/categoria-context";
import { Filter } from "@/components/table/filter";
import { Input } from "@/components/ui/input";
import { FC, useEffect, useState } from "react";
import { PiChartLine, PiList, PiRepeat } from "react-icons/pi";
import Datepicker from "react-tailwindcss-datepicker";

interface Categoria {
  id: number;
  nome: string;
}

interface ToolbarProps {
  table: any;
}

const Toolbar: FC<ToolbarProps> = ({ table }) => {
  const { categorias, isLoading, error } = useCategoriaContext();
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const handleDateChange = (
    value: { startDate: Date | null; endDate: Date | null } | null
  ) => {
    if (!value) return;

    setDateRange(value);

    table.getColumn("data")?.setFilterValue({
      startDate: value.startDate?.toISOString() || null,
      endDate: value.endDate?.toISOString() || null,
    });
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      table.getColumn("data")?.setFilterValue({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      });
    }
  }, [dateRange, table]);

  const isDateFilled = dateRange.startDate && dateRange.endDate;

  // Lógica para atualizar o filtro de categoria
  const handleCategoriaFilterChange = (value: string) => {
    table.getColumn("categoria")?.setFilterValue(value);
  };

  return (
    <div className="flex items-center gap-2.5 w-full">
      <Input
        placeholder="Pesquisar por nome..."
        value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("nome")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />

      <div>
        <Datepicker
          value={dateRange}
          useRange={true}
          showShortcuts={true}
          placeholder="dd/mm/aa - dd/mm/aa"
          primaryColor="orange"
          displayFormat="DD/MM/YYYY"
          popoverDirection="down"
          toggleClassName={`absolute rounded-r-lg text-neutral-600 left-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed `}
          inputClassName={`py-2 -pr-10 pl-10 w-56 rounded-md border border-neutral-200 font-medium px-3 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            isDateFilled
              ? "border-orange-500 text-orange-500 bg-orange-50"
              : "bg-white"
          }`}
          onChange={handleDateChange}
        />
      </div>

      {table.getColumn("tipo") && (
        <Filter
          column={table.getColumn("tipo")}
          title="Tipo"
          options={[
            { label: "Despesa", value: "DESPESA" },
            { label: "Receita", value: "RECEITA" },
          ]}
          icon={<PiChartLine className="w-[18px] h-[18px] text-neutral-600" />}
        />
      )}

      {table.getColumn("recorrencia") && (
        <Filter
          column={table.getColumn("recorrencia")}
          title="Recorrência"
          options={[
            { label: "Única", value: "UNICA" },
            { label: "Diária", value: "DIARIA" },
            { label: "Semanal", value: "SEMANAL" },
            { label: "Mensal", value: "MENSAL" },
            { label: "Bimestral", value: "BIMESTRAL" },
            { label: "Trimestral", value: "TRIMESTRAL" },
            { label: "Semestral", value: "SEMESTRAL" },
            { label: "Anual", value: "ANUAL" },
          ]}
          icon={<PiRepeat className="w-[18px] h-[18px] text-neutral-600" />}
        />
      )}
    </div>
  );
};

export default Toolbar;
