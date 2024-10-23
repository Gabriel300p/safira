import { useRacaContext } from "@/app/configuracoes/raca/utils/raca-context";
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
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { PiCat, PiDog } from "react-icons/pi";
import Datepicker from "react-tailwindcss-datepicker";
import { set } from "zod";
import { Animal } from "../../utils/schema";

interface DadosCadastraisProps {
  formControl: Control<Animal>;
}

export function DadosCadastrais({ formControl }: DadosCadastraisProps) {
  const { racas, isLoading, error } = useRacaContext();
  const [animalTypes, setAnimalTypes] = useState("");
  const [racasFiltered, setRacasFiltered] = useState(racas);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (animalTypes === "CACHORRO") {
      setRacasFiltered(racas?.filter((raca) => raca.tipo === "CACHORRO"));
    } else if (animalTypes === "GATO") {
      setRacasFiltered(racas?.filter((raca) => raca.tipo === "GATO"));
    } else {
      setRacasFiltered(racas);
    }
  }, [animalTypes, racas]);

  const handleAnimalTypeChange = (value: string) => {
    setAnimalTypes(value);
  };

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
    <div className="space-y-4 pb-3">
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
        control={formControl}
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
        control={formControl}
        name="tipo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Espécie</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleAnimalTypeChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="CACHORRO">
                  <div className="flex items-center gap-2">
                    <PiDog className="h-4 w-4 text-neutral-600" />
                    Cachorro
                  </div>
                </SelectItem>
                <SelectItem value="GATO">
                  <div className="flex items-center gap-2">
                    <PiCat className="h-4 w-4 text-neutral-600" />
                    Gato
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name="racaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Raça</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value ? String(field.value) : ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {racasFiltered?.map((raca) => (
                  <SelectItem key={raca.id} value={String(raca.id)}>
                    {raca.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
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
                <SelectItem value="FEMEA">Fêmea</SelectItem>
                <SelectItem value="INDEFINIDO">Indefinido</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
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
                <SelectItem value="MEDIO">Médio</SelectItem>
                <SelectItem value="GRANDE">Grande</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name="dataNascimento"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Data de nascimento{" "}
              <span className="text-neutral-400 font-normal">(Opcional)</span>
            </FormLabel>
            <FormControl>
              <Datepicker
                value={value}
                useRange={false}
                asSingle={true}
                placeholder="dd/mm/aaaa"
                primaryColor={"orange"}
                displayFormat="DD/MM/YYYY"
                popoverDirection="up"
                inputClassName="py-2 w-full rounded-md border border-neutral-200 bg-white font-medium px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950  placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-neutral-400 placeholder:font-normal"
                onChange={(newValue: any) => {
                  setValue(newValue);
                  field.onChange(newValue?.startDate);
                }}
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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
