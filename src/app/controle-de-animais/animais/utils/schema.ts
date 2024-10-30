import { z } from "zod";

const animalSchema = z
  .object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "Nome é obrigatório." }),
    tipo: z.enum(["CACHORRO", "GATO"], { message: "Tipo é obrigatório." }),
    sexo: z.enum(["MACHO", "FEMEA", "INDEFINIDO"], {
      message: "Sexo é obrigatório.",
    }),
    porte: z.enum(["PEQUENO", "MEDIO", "GRANDE"], {
      message: "Porte é obrigatório.",
    }),
    castrado: z.boolean().optional(),
    // vacinado: z.boolean().optional(),
    adestrado: z.boolean().optional(),
    obito: z.boolean().optional(),
    microchip: z.boolean().optional(),
    adotado: z.boolean().optional(),
    dataNascimento: z.date().optional().nullable(),
    vacinasProvisorio: z.string().optional(),
    racaId: z.number().min(1, { message: "Raça é obrigatória." }),
    raca: z.object({ nome: z.string(), id: z.number() }).nullable().optional(),
    userId: z.number().optional(),
    tutorId: z.number().optional(),
    tutor: z.object({ nome: z.string(), id: z.number() }).nullable().optional(),
    observacao: z.string().optional(),
    imagem: z.string().optional(),
    updated_at: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.adotado && !data.tutorId) {
        return false;
      }
      return true;
    },
    {
      message: "Tutor é obrigatório se o animal for adotado.",
      path: ["tutorId"],
    }
  );

type Animal = z.infer<typeof animalSchema>;

export { animalSchema };
export type { Animal };
