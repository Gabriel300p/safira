import { Filter } from "@/components/table/filter";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { PiHandHeart, PiMapPin } from "react-icons/pi";
import { adocao } from "../../utils/options";
import { Tutor } from "../../utils/schema";

interface ToolbarProps {
  table: Table<Tutor>;
}

const Toolbar: FC<ToolbarProps> = ({ table }) => {
  const uniqueCities = Array.from(
    new Set(
      table
        .getCoreRowModel()
        .rows.map((row) => row.getValue("cidade") as string)
    )
  )
    .filter(Boolean)
    .map((city) => ({ label: city, value: city }));

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
        {/* {table.getColumn("Animal") && (
          <Filter
            column={table.getColumn("Animal")}
            title="Adoção"
            options={adocao}
            icon={
              <PiHandHeart className="w-[18px] h-[18px] text-neutral-600" />
            }
          />
        )} */}
        {table.getColumn("cidade") && (
          <Filter
            column={table.getColumn("cidade")}
            title="Cidade"
            options={uniqueCities}
            icon={<PiMapPin className="w-[18px] h-[18px] text-neutral-600" />}
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
