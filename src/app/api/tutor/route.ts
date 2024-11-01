import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  const tutor = await db.tutor.findMany({
    where: {
      id: {
        not: 2,
      },
    },
  });

  return new Response(JSON.stringify(tutor), { status: 200 });
}
