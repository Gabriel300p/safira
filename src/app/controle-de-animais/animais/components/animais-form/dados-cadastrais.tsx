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
import { UseFormReturn } from "react-hook-form";
import { Animal } from "../../utils/schema";

interface DadosCadastraisProps {
  form: UseFormReturn<Animal>;
}

export function DadosCadastrais({ form }: DadosCadastraisProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl">AA</span>
            )}
          </div>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome do animal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="racaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Raça</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(parseInt(value, 10))}
              value={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Raça 1</SelectItem>
                <SelectItem value="2">Raça 2</SelectItem>
                <SelectItem value="3">Raça 3</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sexo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sexo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="MACHO">Macho</SelectItem>
                <SelectItem value="FÊMEA">Fêmea</SelectItem>
                <SelectItem value="INDEFINIDO">Indefinido</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="porte"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Porte</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="PEQUENO">Pequeno</SelectItem>
                <SelectItem value="MÉDIO">Médio</SelectItem>
                <SelectItem value="GRANDE">Grande</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dataNascimento"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de nascimento</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : ""
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="observacao"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações (Opcional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Digite algum dado adicional sobre o animal..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
