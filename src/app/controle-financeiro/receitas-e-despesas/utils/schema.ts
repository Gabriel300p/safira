import { z } from "zod";

const financeiroSchema = z
  .object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "Nome é obrigatório." }),
    valor: z.number().positive({ message: "Valor deve ser positivo." }),
    recorrencia: z.enum(["DIARIA", "SEMANAL", "MENSAL", "ANUAL"], {
      message: "Recorrência é obrigatória.",
    }),
    tipo: z.enum(["RECEITA", "DESPESA"], { message: "Tipo é obrigatório." }),
    observacao: z.string().optional(),
    data: z.date().optional().default(new Date()),
    usuarioId: z.number({ message: "ID do usuário é obrigatório." }),
    categoriaId: z.number({ message: "ID da categoria é obrigatório." }),
    criadoEm: z.date().optional().default(new Date()),
    atualizadoEm: z.date().optional(),
  })
  .refine((data) => data.valor > 0, {
    message: "O valor deve ser maior que zero.",
    path: ["valor"],
  });

type Financeiro = z.infer<typeof financeiroSchema>;

export { financeiroSchema };
export type { Financeiro };
