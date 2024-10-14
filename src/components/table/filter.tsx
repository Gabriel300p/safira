import { Column } from "@tanstack/react-table";
import * as React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string | boolean;
    icon?: React.ReactNode;
    isBooleanFilter?: boolean; // Para indicar se a opção é um filtro booleano
  }[];
  icon?: React.ReactNode;
}

export function Filter<TData, TValue>({
  column,
  title,
  options,
  icon,
}: DataTableFacetedFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(
    column?.getFilterValue() as (string | boolean)[]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={`w-fit gap-1.5 text-sm`}>
          {icon}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value.toString()}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Sem resultados encontrados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value.toString()}
                    className="flex items-center gap-2"
                    onSelect={() => {
                      if (option.isBooleanFilter) {
                        // Para filtros booleanos
                        if (isSelected) {
                          // Se o valor já está selecionado, remova-o
                          selectedValues.delete(option.value);
                        } else {
                          // Se não estiver selecionado, adicione o valor
                          selectedValues.clear(); // Limpa outras seleções
                          selectedValues.add(option.value);
                        }
                      } else {
                        // Para filtros de string
                        if (isSelected) {
                          selectedValues.delete(option.value);
                        } else {
                          selectedValues.add(option.value);
                        }
                      }
                      // Atualizar os valores do filtro na coluna
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <Checkbox checked={isSelected} />
                    <div className="flex items-center gap-1.5">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Limpar filtro
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
