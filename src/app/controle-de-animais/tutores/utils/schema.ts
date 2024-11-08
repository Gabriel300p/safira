import { z } from "zod";
import { animalSchema } from "../../animais/utils/schema";

const tutorSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional(),
  telefone: z.string().optional(),
  cep: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  bairro: z.string().optional(),
  complemento: z.string().optional(),
  numero: z.string().optional(),
  observacao: z.string().optional(),
  Animal: z.array(animalSchema).optional(),
  updated_at: z.date().optional(),
});
type Tutor = z.infer<typeof tutorSchema>;

export { tutorSchema };
export type { Tutor };
