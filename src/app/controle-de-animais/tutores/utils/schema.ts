import { z } from "zod";

const tutorSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().nullable(),
  telefone: z.string().nullable(),
  cep: z.string().nullable(),
  cidade: z.string().nullable(),
  estado: z.string().nullable(),
  bairro: z.string().nullable(),
  complemento: z.string().nullable(),
  numero: z.string().nullable(),
  observacao: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

type Tutor = z.infer<typeof tutorSchema>;

export { tutorSchema };
export type { Tutor };
