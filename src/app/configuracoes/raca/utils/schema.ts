import { z } from "zod";

const racaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.enum(["CACHORRO", "GATO"]),
  usuarioId: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

type Raca = z.infer<typeof racaSchema>;

export { racaSchema };
export type { Raca };
