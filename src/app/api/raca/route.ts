import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

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

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  const racas = await db.raca.findMany({ orderBy: { nome: "asc" } });
  return new Response(JSON.stringify(racas), { status: 200 });
}
