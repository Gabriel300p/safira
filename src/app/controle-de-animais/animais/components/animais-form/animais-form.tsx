"use client";

import { updateAnimal } from "@/app/controle-de-animais/animais/utils/animal-functions";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Animal, animalSchema } from "../../utils/schema";
import { AnimaisFormProps } from "../../utils/types";
import { DadosCadastrais } from "./dados-cadastrais";
import { DadosComplementares } from "./dados-complementares";
import { Vacinas } from "./vacinas";

export default function AnimaisForm({
  animalId,
  onClose,
  animalDataClick,
}: AnimaisFormProps) {
  const [step, setStep] = useState(1);

  const form = useForm<Animal>({
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
      adotado: animalDataClick?.adotado,
      dataNascimento: animalDataClick?.dataNascimento || new Date(),
      racaId: animalDataClick?.raca?.id || 0,
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DadosCadastrais form={form} />;
      case 2:
        return <DadosComplementares form={form} />;
      case 3:
        return <Vacinas form={form} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
        <DialogTitle className="text-lg font-semibold mb-4">
          {animalId ? "Editar" : "Adicionar novo animal"}
        </DialogTitle>
        <div className="flex flex-grow overflow-y-hidden">
          <div className="w-1/3 ">
            <div className="font-medium mb-2">Adicionar novo animal</div>
            <div className="text-sm text-gray-500 mb-4">
              Aqui você pode criar um novo animal para acompanhar as
              características dele.
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center w-full text-left p-2 rounded ${
                  step === 1
                    ? "bg-orange-100 text-orange-500 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">📋</span>
                Dados cadastrais
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex items-center w-full text-left p-2 rounded ${
                  step === 2
                    ? "bg-orange-100 text-orange-500 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">🔍</span>
                Dados complementares
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`flex items-center w-full text-left p-2 rounded ${
                  step === 3
                    ? "bg-orange-100 text-orange-500 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">💉</span>
                Vacinas
              </button>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-4" />
          <div className="flex-1 overflow-y-auto pl-1 pr-4">{renderStep()}</div>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-between items-center mt-auto">
          <div className="text-sm text-gray-500">Passo {step} de 3</div>
          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
            >
              {step < 3 ? "Continuar" : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
