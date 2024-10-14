import { PiCaretDown, PiCaretUp, PiCaretUpDown } from "react-icons/pi";
import { Button } from "../ui/button";

type TableHeaderProps = {
  column: any;
  title: string;
  align?: "center" | "start" | "end";
};

const TableHeader = ({ column, title, align }: TableHeaderProps) => {
  const isSorted = column.getIsSorted();

  return (
    <div className={`flex items-center justify-${align || "center"}`}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(isSorted === "asc")}
        className={isSorted ? "pulse-table" : ""}
      >
        {title}
        <div
          className={`${
            isSorted
              ? " border border-primary/50 "
              : " border border-neutral-200 "
          } p-0.5 rounded-sm bg-white justify-center items-center gap-2.5 inline-flex`}
        >
          {isSorted === "asc" ? (
            <PiCaretUp
              className={`${
                isSorted ? "text-primary" : "text-neutral-600"
              }h-4 w-4 `}
            />
          ) : isSorted === "desc" ? (
            <PiCaretDown
              className={`${
                isSorted ? "text-primary" : "text-neutral-600"
              }h-4 w-4 `}
            />
          ) : (
            <PiCaretUpDown
              className={`${
                isSorted ? "text-primary" : "text-neutral-600"
              }h-4 w-4 `}
            />
          )}
        </div>
      </Button>
    </div>
  );
};

export default TableHeader;
