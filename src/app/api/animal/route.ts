import { db } from "@/lib/db";
export async function GET() {
  const user = await db.animal.findMany({
    select: {
      id: true,
      nome: true,
      porte: true,
      sexo: true,
      tipo: true,
      vacinado: true,
      castrado: true,
      obito: true,
      microchip: true,
      adotado: true,
      dataNascimento: true,
      raca: {
        select: {
          id: true,
          nome: true,
        },
      },
      tutor: {
        select: {
          id: true,
          nome: true,
        },
      },
      imagem: true,
      criadoEm: true,
      atualizadoEm: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
