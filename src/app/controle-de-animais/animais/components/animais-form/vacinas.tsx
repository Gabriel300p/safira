import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Animal } from "../../utils/schema";

interface VacinasProps {
  form: UseFormReturn<Animal>;
}

export function Vacinas({ form }: VacinasProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Vacinas</h2>
      <FormField
        control={form.control}
        name="vacinado"
        render={({ field }) => (
          <FormItem className="flex  flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Vacinado</FormLabel>
              <p className="text-sm text-muted-foreground">
                O animal está com as vacinas em dia?
              </p>
            </div>
          </FormItem>
        )}
      />
      {/* Add more specific vaccine fields here if needed */}
    </div>
  );
}
