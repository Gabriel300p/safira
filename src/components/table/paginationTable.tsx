import { FC, useState } from "react";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const previousPage = pageIndex > 0 ? pageIndex - 1 : null;
  const nextPage = pageIndex < pageCount - 1 ? pageIndex + 1 : null;
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
              className="text-sm font-medium text-neutral-500 focus:outline-none"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="text-sm font-medium text-neutral-500"
                >
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
            <PaginationItem className="hidden sm:block">
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.setPageIndex(0)}
                disabled={table.getState().pagination.pageIndex === 0}
              >
                <PiCaretDoubleLeftBold
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
                <PiCaretLeftBold
                  className={`${
                    table.getState().pagination.pageIndex === 0
                      ? "text-neutral-400"
                      : "text-neutral-700"
                  } w-3.5 h-5`}
                />
              </Button>
            </PaginationItem>

            {/* Botão para página anterior */}
            {previousPage !== null && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => table.setPageIndex(previousPage)}
                >
                  {previousPage + 1}
                </Button>
              </PaginationItem>
            )}

            {/* Página atual */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="xs"
                className="bg-neutral-600 text-neutral-50 border border-neutral-200"
              >
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>

            {/* Próxima página */}
            {nextPage !== null && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => table.setPageIndex(nextPage)}
                >
                  {nextPage + 1}
                </Button>
              </PaginationItem>
            )}
            {/* Dropdown para outras páginas */}
            {pageCount > 3 && (
              <PaginationItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex gap-2 py-1">
                    {Array.from({ length: pageCount }).map((_, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => table.setPageIndex(index)}
                        className="cursor-pointer py-1 px-1.5"
                      >
                        {index + 1}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </PaginationItem>
            )}
            {/* Botão para pular para a última página */}
            <PaginationItem>
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <PiCaretRightBold className={`text-neutral-700 w-3.5 h-5`} />
              </Button>
            </PaginationItem>
            {/* Botão para pular para a próxima página */}
            <PaginationItem className="hidden sm:block">
              <Button
                variant="outline"
                size="xs"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex ===
                  table.getPageCount() - 1
                }
              >
                <PiCaretDoubleRightBold
                  className={`text-neutral-600 w-3.5 h-5`}
                />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationTable;
