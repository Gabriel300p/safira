import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X } from "lucide-react";
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Animal } from "../../utils/schema";

interface VacinasProps {
  form: UseFormReturn<Animal>;
  vacinas: { id: number; nome: string }[];
}

export function Vacinas({ form, vacinas }: VacinasProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vacinaAnimal",
  });

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-neutral-200">
      {fields.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-2">
          <h3 className="text-sm font-medium">Nome</h3>
          <h3 className="text-sm font-medium">Última</h3>
          <h3 className="text-sm font-medium">Próxima</h3>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
          <FormField
            control={form.control}
            name={`vacinaAnimal.${index}.vacinaId`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vacinas &&
                      vacinas.map((vacina) => (
                        <SelectItem
                          key={vacina.id}
                          value={vacina.id.toString()}
                        >
                          {vacina.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`vacinaAnimal.${index}.ultima`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={`vacinaAnimal.${index}.proxima`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        className="px-0 mt-2"
        onClick={() => append({ vacinaId: 0, ultima: null, proxima: null })}
      >
        <PlusCircle className="h-5 w-5 text-neutral-600" />
        Adicionar nova vacina
      </Button>
    </div>
  );
}
