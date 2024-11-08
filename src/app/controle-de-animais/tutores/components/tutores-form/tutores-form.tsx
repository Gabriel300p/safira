"use client";

import { DialogForm, DialogFormContent } from "@/components/form/ModalForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  PiArrowRightFill,
  PiCircleNotch,
  PiFloppyDiskFill,
  PiGlobeHemisphereEast,
  PiTable,
} from "react-icons/pi";
import { z } from "zod";
import { Tutor, tutorSchema } from "../../utils/schema";
import { useCreateTutor, useUpdateTutor } from "../../utils/tutor-functions";
import { TutoresFormProps } from "../../utils/types";
import { DadosCadastrais } from "./dados-cadastrais";
import { Endereco } from "./endereco";

export default function TutoresForm({
  tutorId,
  onClose,
  tutorDataClick,
}: TutoresFormProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const methods = useForm<Tutor>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      id: tutorDataClick?.id,
      nome: tutorDataClick?.nome || "",
      email: tutorDataClick?.email || "",
      telefone: tutorDataClick?.telefone || "",
      cep: tutorDataClick?.cep || "",
      cidade: tutorDataClick?.cidade || "",
      estado: tutorDataClick?.estado || "",
      bairro: tutorDataClick?.bairro || "",
      complemento: tutorDataClick?.complemento || "",
      numero: tutorDataClick?.numero || "",
      observacao: tutorDataClick?.observacao || "",
      Animal: tutorDataClick?.Animal || [],
    },
  });

  const createMutation = useMutation(useCreateTutor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
      onClose();
      toast({
        title: "Tutor criado com sucesso",
        description: "O tutor foi adicionado à lista.",
        variant: "success",
      });
      router.push("/controle-de-animais/tutores");
    },
    onError: (error) => {
      console.error("Error creating tutor:", error);
      toast({
        title: "Erro ao criar tutor",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation(useUpdateTutor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
      onClose();
      toast({
        title: "Tutor atualizado com sucesso",
        description: "As alterações foram salvas.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating tutor:", error);
      toast({
        title: "Erro ao atualizar tutor",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof tutorSchema>) => {
    try {
      if (tutorId) {
        await updateMutation.mutateAsync(values);
      } else {
        await createMutation.mutateAsync(values);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = useCallback(() => {
    switch (step) {
      case 1:
        return <DadosCadastrais formControl={methods.control} />;
      case 2:
        return <Endereco />;
      default:
        return null;
    }
  }, [step]);

  const isStepValid = async () => {
    switch (step) {
      case 1:
        return await methods.trigger(["nome"]);
      case 2:
        return await methods.trigger(["cep", "cidade", "estado", "bairro"]);
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    const valid = await isStepValid();
    if (valid) {
      if (step < 2) {
        setStep(step + 1);
      } else {
        await methods.handleSubmit(onSubmit)();
      }
    }
  };

  const tabs = [
    { label: "Dados pessoais", icon: <PiTable className="w-6 h-6" /> },
    { label: "Endereço", icon: <PiGlobeHemisphereEast className="w-6 h-6" /> },
  ];

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  const buttonText = tutorId ? (
    <div className="flex items-center gap-1.5">
      <PiFloppyDiskFill className="h-5 w-5 text-white" /> Alterar
    </div>
  ) : step < 2 ? (
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <DialogFormContent
            title={tutorId ? "Editar tutor" : "Adicionar novo tutor"}
            subtitle="Aqui você pode cadastrar ou editar as informações de um tutor."
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
                  onClick={handleNextStep}
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
      </FormProvider>
    </DialogForm>
  );
}
