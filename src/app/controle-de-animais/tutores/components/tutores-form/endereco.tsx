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
import { ufOptions } from "@/content/forms";
import { fetchAddressByCep } from "@/lib/fetchs";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Tutor } from "../../utils/schema";

export function Endereco() {
  const { control, setValue, watch } = useFormContext<Tutor>();
  const [addressData, setAddressData] = useState({
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const cep = watch("cep");

  useEffect(() => {
    if (cep && cep.length === 8) {
      fetchAddressByCep(cep)
        .then((data) => {
          const newAddressData = {
            cep,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          };
          setAddressData(newAddressData);

          // Update form fields with fetched data
          Object.entries(newAddressData).forEach(([key, value]) => {
            setValue(key as keyof Tutor, value, { shouldValidate: true });
          });
        })
        .catch((error) => console.error("Erro ao buscar endereço:", error));
    }
  }, [cep, setValue]);

  return (
    <div className="space-y-5 ml-1 mb-2">
      <FormField
        control={control}
        name="cep"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input {...field} placeholder="XX.XXX-XXX" maxLength={8} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-3 w-full">
        <FormField
          control={control}
          name="bairro"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nome do bairro"
                  value={addressData.bairro || field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setAddressData((prev) => ({
                      ...prev,
                      bairro: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="numero"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Número da casa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="complemento"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              Complemento{" "}
              <span className="text-neutral-400 font-normal">(Opcional)</span>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Apto, Bloco, Andar, etc." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-3">
        <FormField
          control={control}
          name="estado"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select
                  value={addressData.estado || field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setAddressData((prev) => ({ ...prev, estado: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {ufOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cidade"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cidade"
                  value={addressData.cidade || field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setAddressData((prev) => ({
                      ...prev,
                      cidade: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
