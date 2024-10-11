import { db } from "@/lib/db";
export async function GET() {
  const user = await db.usuario.findFirst({
    where: {
      id: 2,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      sobrenome: true,
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
