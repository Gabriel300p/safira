import { Filter } from "@/components/table/filter";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { PiHandHeart, PiPawPrint } from "react-icons/pi";
import { adocao, tipo } from "../../utils/options";

interface ToolbarProps {
  table: any;
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
            icon={<PiPawPrint className="w-[18px] h-[18px] text-neutral-600" />}
          />
        )}
        {table.getColumn("adotado") && (
          <Filter
            column={table.getColumn("adotado")}
            title="Adoção"
            options={adocao}
            icon={
              <PiHandHeart className="w-[18px] h-[18px] text-neutral-600" />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
