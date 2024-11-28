import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface DadosComplementaresProps {
  formControl: any;
}

export function DadosComplementares({ formControl }: DadosComplementaresProps) {
  return (
    <div className="space-y-5 mt-3 ml-1">
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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
