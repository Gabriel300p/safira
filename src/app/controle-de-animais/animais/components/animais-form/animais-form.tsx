"use client";

import { DialogForm, DialogFormContent } from "@/components/form/dialogForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(0);

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

  const tabs = [
    { label: "Dados cadastrais", icon: "📋" },
    { label: "Dados complementares", icon: "🔍" },
    { label: "Vacinas", icon: "💉" },
  ];

  const calculateProgress = () => {
    const formValues = form.getValues();
    const totalFields = Object.keys(animalSchema.shape).length;
    const filledFields = Object.keys(formValues).filter((key) => {
      const value = formValues[key as keyof Animal];
      return value !== undefined && value !== "" && value !== false;
    }).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      setProgress(calculateProgress());
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <DialogForm open={true}>
      <DialogFormContent
        title={animalId ? "Editar animal" : "Adicionar novo animal"}
        subtitle="Aqui você pode criar um novo animal para acompanhar as características dele."
        tabs={tabs}
        currentStep={step}
        onStepChange={setStep}
        onClose={onClose}
        progress={progress}
        footer={
          <div className="flex justify-end space-x-4">
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
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6 ml-1">
            {renderStep()}
          </form>
        </Form>
      </DialogFormContent>
    </DialogForm>
  );
}
