import { z } from "zod";

const usuarioSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  sobrenome: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório"),
  created_at: z.string(),
  updated_at: z.string(),
});

type Usuario = z.infer<typeof usuarioSchema>;

export { usuarioSchema };
export type { Usuario };
