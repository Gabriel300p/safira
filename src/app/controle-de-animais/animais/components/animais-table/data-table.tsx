"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import {
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
  PiCaretLeft,
  PiCaretRight,
  PiGear,
} from "react-icons/pi";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center ">
        <Input
          placeholder="Pesquisar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto px-2.5 py-1.5">
              <PiGear className="h-5 w-5 text-neutral-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-3">
            <DropdownMenuLabel>Configuração da tabela</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-2 px-2">
        {/* Exibição de quantidade de itens e seletor de linhas por página */}
        <div className="flex items-center gap-3 w-full">
          <div className="text-sm text-neutral-400 font-normal">
            <span className="font-bold text-neutral-600">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            itens
          </div>
          <Separator orientation="vertical" className="bg-neutral-200 h-6" />
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-neutral-500">
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
          <div className="flex items-center space-x-1 text-sm text-neutral-500">
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
                        : "text-neutral-600"
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
                        : "text-neutral-600"
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

              {/* Botão para pular para a próxima página */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <PiCaretDoubleRight
                    className={`${
                      table.getState().pagination.pageIndex === 0
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    } w-3.5 h-5`}
                  />
                </Button>
              </PaginationItem>

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
                  <PiCaretRight
                    className={`${
                      table.getState().pagination.pageIndex === 0
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    } w-3.5 h-5`}
                  />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
