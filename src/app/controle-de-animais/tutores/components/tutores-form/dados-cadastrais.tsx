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
import { Tutor } from "../../utils/schema";

interface DadosCadastraisProps {
  formControl: Control<Tutor>;
}

export function DadosCadastrais({ formControl }: DadosCadastraisProps) {
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
    <div className="space-y-4 ml-1 mb-2">
      {/* <div className="flex items-center justify-center w-full">
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
      </div> */}
      <FormField
        control={formControl}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome do tutor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email{" "}
              <span className="text-neutral-400 font-normal">(Opcional)</span>
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="exemplo@email.com"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name="telefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Telefone{" "}
              <span className="text-neutral-400 font-normal">(Opcional)</span>
            </FormLabel>
            <FormControl>
              <MaskedPhoneInput
                value={field.value || ""}
                onChange={field.onChange}
              />
            </FormControl>
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
