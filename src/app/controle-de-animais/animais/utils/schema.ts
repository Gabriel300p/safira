import { z } from "zod";

const animalSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.enum(["CACHORRO", "GATO"]),
  sexo: z.enum(["MACHO", "FÊMEA", "INDEFINIDO"]),
  porte: z.enum(["PEQUENO", "MÉDIO", "GRANDE"]),
  castrado: z.boolean(),
  vacinado: z.boolean(),
  adestrado: z.boolean(),
  obito: z.boolean(),
  microchip: z.boolean(),
  adotado: z.boolean(),
  dataNascimento: z.date(),
  racaId: z.number(),
  raca: z
    .object({
      nome: z.string(),
      id: z.number(),
    })
    .nullable(),
  userId: z.number(),
  tutorId: z.number(),
  tutor: z
    .object({
      nome: z.string(),
      id: z.number(),
    })
    .nullable(),
  observacao: z.string().optional(),
  imagem: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

type Animal = z.infer<typeof animalSchema>;

export { animalSchema };
export type { Animal };
