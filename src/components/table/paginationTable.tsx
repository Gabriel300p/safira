import { FC } from "react";
import {
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
  PiCaretLeft,
  PiCaretRight,
} from "react-icons/pi";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Separator } from "../ui/separator";

interface PaginationTableProps {
  table: any;
}

const PaginationTable: FC<PaginationTableProps> = ({ table }) => {
  return (
    <div className="flex items-center justify-between gap-2 px-2">
      <div className="flex items-center gap-3 w-full">
        <div className="text-sm text-neutral-400 font-normal">
          <span className="font-bold text-neutral-600">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          itens
        </div>
        <Separator orientation="vertical" className="bg-neutral-200 h-6" />
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-neutral-500 hidden sm:block">
            Linhas por página:
          </span>
          <div className="border border-neutral-200 rounded py-1 px-1">
            <select
              className="text-sm font-medium text-neutral-500"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-4">
        {/* Texto da página atual de total de páginas */}
        <div className="hidden sm:flex items-center space-x-1 text-sm text-neutral-500">
          <span>Página</span>
          <span className="font-bold text-neutral-600">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span>de</span>
          <span className="font-bold text-neutral-600">
            {table.getPageCount()}
          </span>
        </div>

        <Pagination>
          <PaginationContent className="flex items-center space-x-0.5">
            {/* Botão para pular para a primeira página */}
            <PaginationItem>
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.setPageIndex(0)}
                disabled={table.getState().pagination.pageIndex === 0}
              >
                <PiCaretDoubleLeft
                  className={`${
                    table.getState().pagination.pageIndex === 0
                      ? "text-neutral-400"
                      : "text-neutral-700"
                  } w-3.5 h-5`}
                />
              </Button>
            </PaginationItem>

            {/* Botão para página anterior */}
            <PaginationItem>
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <PiCaretLeft
                  className={`${
                    table.getState().pagination.pageIndex === 0
                      ? "text-neutral-400"
                      : "text-neutral-700"
                  } w-3.5 h-5`}
                />
              </Button>
            </PaginationItem>

            {/* Números de páginas dinâmicos */}
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  size="xs"
                  onClick={() => table.setPageIndex(index)}
                  className={
                    table.getState().pagination.pageIndex === index
                      ? "active"
                      : ""
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Botão para pular para a última página */}
            <PaginationItem>
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex ===
                  table.getPageCount() - 1
                }
              >
                <PiCaretRight className={`text-neutral-700 w-3.5 h-5`} />
              </Button>
            </PaginationItem>
            {/* Botão para pular para a próxima página */}
            <PaginationItem>
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <PiCaretDoubleRight className={`text-neutral-700 w-3.5 h-5`} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationTable;
