import { Filter } from "@/components/table/filter";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { PiCurrencyCircleDollar } from "react-icons/pi";

import { Categoria } from "../../utils/schema";
import { tipo } from "./options";

interface ToolbarProps {
  table: Table<Categoria>;
}

const Toolbar: FC<ToolbarProps> = ({ table }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        placeholder="Pesquisar por nome..."
        value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("nome")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />
      <div className="flex items-center gap-2">
        {table.getColumn("tipo") && (
          <Filter
            column={table.getColumn("tipo")}
            title="Tipo"
            options={tipo}
            icon={
              <PiCurrencyCircleDollar className="w-[18px] h-[18px] text-neutral-600" />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
