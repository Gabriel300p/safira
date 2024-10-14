import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Animal, updateAnimal } from "@/functions/animal-functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const animalSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.enum(["CACHORRO", "GATO"]),
  sexo: z.enum(["MACHO", "FÊMEA", "INDEFINIDO"]),
  porte: z.enum(["PEQUENO", "MÉDIO", "GRANDE"]),
  castrado: z.boolean(),
  vacinado: z.boolean(),
  adestrado: z.boolean(),
  obito: z.boolean(),
  microchip: z.boolean(),
  adotado: z.boolean(),
  dataNascimento: z.date(),
  racaId: z.number().int().positive("ID da raça deve ser um número positivo"),
  observacao: z.string().optional(),
});

export type AnimalFormData = z.infer<typeof animalSchema>;

interface AnimaisFormProps {
  animalId?: number;
  onClose: () => void;
  animalDataClick?: Animal;
}

export default function AnimaisForm({
  animalId,
  onClose,
  animalDataClick,
}: AnimaisFormProps) {
  const form = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      id: animalDataClick?.id,
      nome: animalDataClick?.nome || "",
      tipo: animalDataClick?.tipo || "CACHORRO",
      sexo: animalDataClick?.sexo || "INDEFINIDO",
      porte: animalDataClick?.porte || "MÉDIO",
      castrado: animalDataClick?.castrado || false,
      vacinado: animalDataClick?.vacinado || false,
      adestrado: animalDataClick?.adestrado || false,
      obito: animalDataClick?.obito || false,
      microchip: animalDataClick?.microchip || false,
      adotado: animalDataClick?.adotado || false,
      dataNascimento: animalDataClick?.dataNascimento || new Date(),
      racaId: animalDataClick?.raca.id || 0,
      observacao: animalDataClick?.observacao || "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (animalId) {
        await updateAnimal(animalId, data);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <DialogTitle className="text-lg font-semibold mb-4">
          {animalId ? "Editar" : "Criar"} Animal
        </DialogTitle>

        {/* Campos do formulário com as mesmas lógicas */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CACHORRO">Cachorro</SelectItem>
                  <SelectItem value="GATO">Gato</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o porte" />
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
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <FormLabel>ID da Raça</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="castrado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Castrado</FormLabel>
                <FormDescription>O animal é castrado?</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vacinado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Vacinado</FormLabel>
                <FormDescription>
                  O animal está com as vacinas em dia?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adestrado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Adestrado</FormLabel>
                <FormDescription>O animal é adestrado?</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="microchip"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Microchip</FormLabel>
                <FormDescription>O animal possui microchip?</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adotado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Adotado</FormLabel>
                <FormDescription>O animal foi adotado?</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="obito"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Óbito</FormLabel>
                <FormDescription>O animal faleceu?</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
