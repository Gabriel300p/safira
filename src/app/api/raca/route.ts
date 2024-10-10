import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.raca.create({
      data: {
        nome: body.nome,
        usuarioId: 2,
      },
    });
    return new Response("Raça criada", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Não foi possível criar a raça", { status: 500 });
  }
}
