import { useTutorContext } from "@/app/controle-de-animais/tutores/utils/tutor-context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

interface DadosComplementaresProps {
  formControl: any;
}

export function DadosComplementares({ formControl }: DadosComplementaresProps) {
  const { tutors } = useTutorContext();

  return (
    <div className="space-y-5 mt-3 ml-1">
      <FormField
        control={formControl}
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
        control={formControl}
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
        control={formControl}
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
        control={formControl}
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

            {field.value && (
              <FormField
                control={formControl}
                name="tutorId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tutor" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        )}
      />
      <Separator className="bg-neutral-200 h-[1px]" />
      <FormField
        control={formControl}
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
