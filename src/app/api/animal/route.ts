import { db } from "@/lib/db";
export async function GET() {
  const user = await db.animal.findMany({});
  return new Response(JSON.stringify(user), { status: 200 });
}
