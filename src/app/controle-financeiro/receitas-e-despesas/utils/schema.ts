import { z } from "zod";

export const financeiroSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  valor: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  recorrencia: z.enum([
    "UNICA",
    "DIARIA",
    "SEMANAL",
    "MENSAL",
    "BIMESTRAL",
    "TRIMESTRAL",
    "SEMESTRAL",
    "ANUAL",
  ]),
  tipo: z.enum(["RECEITA", "DESPESA"]),
  categoriaId: z.number().min(1, "Categoria é obrigatória"),
  categoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .optional(),
  observacao: z.string().optional(),
  data: z.date(),
  atualizadoEm: z.date().optional(),
});

export type Financeiro = z.infer<typeof financeiroSchema>;
