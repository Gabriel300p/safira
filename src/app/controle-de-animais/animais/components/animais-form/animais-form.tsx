"use client";

import { DialogForm, DialogFormContent } from "@/components/form/DialogForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PiArrowRightFill,
  PiCircleNotch,
  PiCirclesThreePlus,
  PiFloppyDiskFill,
  PiSyringe,
  PiTable,
} from "react-icons/pi";
import { z } from "zod";
import {
  createAnimal,
  updateAnimal,
  useUpdateAnimal,
} from "../../utils/animal-functions";
import { Animal, animalSchema } from "../../utils/schema";
import { AnimaisFormProps } from "../../utils/types";
import { DadosCadastrais } from "./dados-cadastrais";
import { DadosComplementares } from "./dados-complementares";
import { Vacinas } from "./vacinas";

export default function AnimaisForm({
  animalId,
  onClose,
  animalDataClick,
  vacinas,
}: AnimaisFormProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<Animal>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      id: animalDataClick?.id,
      nome: animalDataClick?.nome || "",
      tipo: animalDataClick?.tipo || undefined,
      sexo: animalDataClick?.sexo || undefined,
      porte: animalDataClick?.porte || undefined,
      castrado: animalDataClick?.castrado || false,
      vacinado: animalDataClick?.vacinado || false,
      adestrado: animalDataClick?.adestrado || false,
      obito: animalDataClick?.obito || false,
      microchip: animalDataClick?.microchip || false,
      adotado: animalDataClick?.adotado || false,
      dataNascimento: animalDataClick?.dataNascimento || undefined,
      racaId: animalDataClick?.raca?.id || undefined,
      tutorId: animalDataClick?.tutor?.id || undefined,
      observacao: animalDataClick?.observacao || "",
      // vacinaAnimal: animalDataClick?.vacinaAnimal || [],
    },
  });

  const createMutation = useMutation(createAnimal, {
    onSuccess: () => {
      toast({
        title: "Animal criado com sucesso",
        description: "O animal foi adicionado à lista.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating animal:", error);
      toast({
        title: "Erro ao criar animal",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation(useUpdateAnimal, {
    onSuccess: () => {
      queryClient.invalidateQueries(["animals"]);
      onClose();
      toast({
        title: "Animal atualizado com sucesso",
      });
    },
    onError: (error) => {
      console.error("Error updating animal:", error);
      toast({
        title: "Erro ao atualizar animal",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof animalSchema>) => {
    try {
      if (animalId) {
        await updateMutation.mutateAsync(values);
        console.log(values);
      } else {
        await createMutation.mutateAsync(values);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = useCallback(() => {
    switch (step) {
      case 1:
        return <DadosCadastrais formControl={form.control} />;
      case 2:
        return <DadosComplementares form={form} />;
      case 3:
        return <Vacinas form={form} vacinas={vacinas} />;
      default:
        return null;
    }
  }, [step, form, vacinas]);

  const isStepValid = async () => {
    switch (step) {
      case 1:
        return await form.trigger(["nome", "tipo", "sexo", "porte", "racaId"]);
      case 2:
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    const valid = await isStepValid();

    if (valid) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const tabs = [
    { label: "Dados cadastrais", icon: <PiTable className="w-6 h-6" /> },
    {
      label: "Dados complementares",
      icon: <PiCirclesThreePlus className="w-6 h-6" />,
    },
    { label: "Vacinas", icon: <PiSyringe className="w-6 h-6" /> },
  ];

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  const buttonText = animalId ? (
    <div className="flex items-center gap-1.5">
      <PiFloppyDiskFill className="h-5 w-5 text-white" /> Alterar
    </div>
  ) : step < 3 ? (
    <div className="flex items-center gap-1.5">
      <PiArrowRightFill className="h-5 w-5 text-white" /> Continuar
    </div>
  ) : (
    <div className="flex items-center gap-1.5">
      {isLoading ? (
        <PiCircleNotch className="h-5 w-5 animate-spin" />
      ) : (
        <PiFloppyDiskFill className="h-5 w-5 text-white" />
      )}
      Salvar
    </div>
  );

  return (
    <DialogForm open={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <DialogFormContent
            title={animalId ? "Editar animal" : "Adicionar novo animal"}
            subtitle="Aqui você pode criar um novo animal para acompanhar as características dele."
            tabs={tabs}
            currentStep={step}
            onStepChange={setStep}
            onClose={onClose}
            footer={
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={
                    animalId ? form.handleSubmit(onSubmit) : handleNextStep
                  }
                  disabled={isLoading}
                >
                  {buttonText}
                </Button>
              </div>
            }
          >
            {renderStep()}
          </DialogFormContent>
        </form>
      </Form>
    </DialogForm>
  );
}
