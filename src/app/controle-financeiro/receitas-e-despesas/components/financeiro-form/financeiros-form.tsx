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
  PiCirclesThreePlus,
  PiFloppyDiskFill,
  PiTable,
} from "react-icons/pi";
import { z } from "zod";
import {
  useCreateFinanceiro,
  useUpdateFinanceiro,
} from "../../utils/financeiro-functions";
import { Financeiro, financeiroSchema } from "../../utils/schema";
import { FinanceirosFormProps } from "../../utils/types";
import { DadosCadastrais } from "./dados-cadastrais";
import { DadosComplementares } from "./dados-complementares";

export default function FinanceiroForm({
  financeiroId,
  onClose,
  financeiroDataClick,
}: FinanceirosFormProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<Financeiro>({
    resolver: zodResolver(financeiroSchema),
    defaultValues: {
      id: financeiroDataClick?.id,
      nome: financeiroDataClick?.nome || "",
      valor: financeiroDataClick?.valor || undefined,
      tipo: financeiroDataClick?.tipo || "DESPESA",
      categoriaId: financeiroDataClick?.categoria?.id || undefined,
      data: financeiroDataClick?.data
        ? new Date(financeiroDataClick.data)
        : new Date(),
      observacao: financeiroDataClick?.observacao || "",
    },
  });

  const createMutation = useMutation(useCreateFinanceiro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["financeiros"]);
      onClose();
      toast({
        title: "Financeiro criado com sucesso",
        description: "O item financeiro foi adicionado à lista.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating financeiro:", error);
      toast({
        title: "Erro ao criar item financeiro",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation(useUpdateFinanceiro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["financeiros"]);
      onClose();
      toast({
        title: "Financeiro atualizado com sucesso",
        description: "As alterações foram salvas.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating financeiro:", error);
      toast({
        title: "Erro ao atualizar item financeiro",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof financeiroSchema>) => {
    try {
      console.log("Form values:", values);
      if (financeiroId) {
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
        return <DadosCadastrais />;
      case 2:
        return <DadosComplementares formControl={form.control} />;
      default:
        return null;
    }
  }, [step]);

  const tabs = [
    { label: "Dados cadastrais", icon: <PiTable className="w-6 h-6" /> },
    {
      label: "Dados complementares",
      icon: <PiCirclesThreePlus className="w-6 h-6" />,
    },
  ];

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  const buttonText = financeiroId ? (
    <div className="flex items-center gap-1.5">
      <PiFloppyDiskFill className="h-5 w-5 text-white" /> Alterar
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <DialogFormContent
            title={
              financeiroId
                ? "Editar item financeiro"
                : "Adicionar novo item financeiro"
            }
            subtitle="Aqui você pode criar ou editar um item financeiro para acompanhar suas finanças."
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
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
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
