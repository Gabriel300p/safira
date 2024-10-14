import { db } from "@/lib/db";

export async function GET() {
  const tutor = await db.tutor.findMany({
    where: {
      id: {
        not: 2,
      },
    },
  });

  return new Response(JSON.stringify(tutor), { status: 200 });
}
