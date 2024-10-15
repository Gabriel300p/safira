import { useTutorContext } from "@/app/controle-de-animais/tutores/utils/tutor-context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SwitchWithLabels } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { Animal } from "../../utils/schema";

interface DadosComplementaresProps {
  form: UseFormReturn<Animal>;
}

export function DadosComplementares({ form }: DadosComplementaresProps) {
  const { tutors } = useTutorContext();
  return (
    <div className="space-y-5">
      {/* <h2 className="text-lg font-semibold">Dados complementares</h2> */}
      <FormField
        control={form.control}
        name="castrado"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center space-x-3 space-y-0">
            <FormLabel className="text-neutral-600 text-base font-medium ">
              Castrado?
            </FormLabel>
            <FormControl>
              <SwitchWithLabels
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Separator className="bg-neutral-200 h-[1px]" />
      <FormField
        control={form.control}
        name="adestrado"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center space-x-3 space-y-0">
            <FormLabel className="text-neutral-600 text-base font-medium ">
              Adestrado?
            </FormLabel>
            <FormControl>
              <SwitchWithLabels
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Separator className="bg-neutral-200 h-[1px]" />
      <FormField
        control={form.control}
        name="microchip"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center space-x-3 space-y-0">
            <FormLabel className="text-neutral-600 text-base font-medium ">
              Microchipado?
            </FormLabel>
            <FormControl>
              <SwitchWithLabels
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Separator className="bg-neutral-200 h-[1px]" />
      <FormField
        control={form.control}
        name="adotado"
        render={({ field }) => (
          <div className="flex flex-col gap-4">
            <FormItem className="flex justify-between items-center space-x-3 space-y-0">
              <FormLabel className="text-neutral-600 text-base font-medium ">
                Adotado?
              </FormLabel>
              <FormControl>
                <SwitchWithLabels
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
            </FormItem>
            {field.value === false && (
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tutor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tutors?.map((tutor) => (
                    <SelectItem key={tutor.id} value={String(tutor.id)}>
                      {tutor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      />
      <Separator className="bg-neutral-200 h-[1px]" />
      <FormField
        control={form.control}
        name="obito"
        render={({ field }) => (
          <FormItem className="flex justify-between items-center space-x-3 space-y-0">
            <FormLabel className="text-neutral-600 text-base font-medium ">
              Em óbito?
            </FormLabel>
            <FormControl>
              <SwitchWithLabels
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
