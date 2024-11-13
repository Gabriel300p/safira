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
import {
  useCreateCategoria,
  useUpdateCategoria,
} from "../../utils/categoria-functions";
import { Categoria, categoriaSchema } from "../../utils/schema";
import { CategoriasFormProps } from "../../utils/types";
import { DadosCadastrais } from "./dados-cadastrais";

export default function CategoriasForm({
  categoriaId,
  onClose,
  categoriaDataClick,
}: CategoriasFormProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<Categoria>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      id: categoriaDataClick?.id,
      nome: categoriaDataClick?.nome || "",
      tipo: categoriaDataClick?.tipo || undefined,
      observacao: categoriaDataClick?.observacao || "",
    },
  });

  const createMutation = useMutation(useCreateCategoria, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias"]);
      onClose();
      toast({
        title: "Categoria criada com sucesso",
        description: "A categoria foi adicionado à lista.",
        variant: "success",
      });
      router.push("/controle-financeiro/categorias");
    },
    onError: (error) => {
      console.error("Error creating categoria:", error);
      toast({
        title: "Erro ao criar categoria",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation(useUpdateCategoria, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias"]);
      onClose();
      toast({
        title: "Categoria atualizado com sucesso",
        description: "As alterações foram salvas.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating categoria:", error);
      toast({
        title: "Erro ao atualizar categoria",
        description: "Por favor, tente novamente.",
        variant: "error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof categoriaSchema>) => {
    console.log(values);
    try {
      if (categoriaId) {
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
        return <DadosCadastrais formControl={form.control} />;
      default:
        return null;
    }
  }, [step]);

  const tabs = [
    { label: "Dados cadastrais", icon: <PiTable className="w-6 h-6" /> },
  ];

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <DialogForm open={true}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <DialogFormContent
            title={
              categoriaId ? "Editar categoria" : "Adicionar nova categoria"
            }
            subtitle="Aqui você pode cadastrar ou editar as informações de uma categoria."
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
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-1.5">
                    {isLoading ? (
                      <PiCircleNotch className="h-5 w-5 animate-spin" />
                    ) : (
                      <PiFloppyDiskFill className="h-5 w-5 text-white" />
                    )}
                    Salvar
                  </div>
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
