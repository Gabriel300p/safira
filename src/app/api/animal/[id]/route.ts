import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const idNumber = Number(id);
  console.log(id);

  const animal = await db.animal.findFirst({
    where: {
      id: idNumber,
    },
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
  });

  if (!animal) {
    return NextResponse.json(
      { error: "Animal não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(animal);
}
