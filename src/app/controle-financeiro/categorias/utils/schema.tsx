import { z } from "zod";

const categoriaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, { message: "Nome é obrigatório." }),
  tipo: z.enum(["RECEITA", "DESPESA"], { message: "Tipo é obrigatório." }),
  observacao: z.string().optional(),
  criadoEm: z.date().optional().nullable(),
  atualizadoEm: z.date().optional().nullable(),
  Financeiro: z
    .array(
      z.object({
        id: z.number().optional(),
        valor: z.number().optional(),
      })
    )
    .optional(),
});

type Categoria = z.infer<typeof categoriaSchema>;

export { categoriaSchema };
export type { Categoria };
