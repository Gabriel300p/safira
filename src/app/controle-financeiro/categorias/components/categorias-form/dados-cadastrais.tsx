import { MaskedPhoneInput } from "@/components/form/inputs/MaskedPhoneInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Control } from "react-hook-form";
import { PiCat, PiDog } from "react-icons/pi";
import Datepicker from "react-tailwindcss-datepicker";
import { Categoria } from "../../utils/schema";

interface DadosCadastraisProps {
  formControl: Control<Categoria>;
}

export function DadosCadastrais({ formControl }: DadosCadastraisProps) {
  return (
    <div className="space-y-4 ml-1 mb-2">
      <FormField
        control={formControl}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome da categoria" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name="tipo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="RECEITA">Receita</SelectItem>
                <SelectItem value="DESPESA">Despesa</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name="observacao"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Observações{" "}
              <span className="text-neutral-400 font-normal">(Opcional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Digite algum dado adicional sobre o animal..."
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
