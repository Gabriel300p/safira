"use server";

import { db } from "@/lib/db";
import { hash } from "bcrypt";

export async function register(
  nome: string,
  sobrenome: string,
  email: string,
  senha: string
) {
  const existingUser = await db.usuario.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email já está em uso");
  }

  return { success: true };
}
