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

  const hashedSenha = await hash(senha, 10);

  const newUser = await db.usuario.create({
    data: {
      nome,
      sobrenome,
      email,
      senha: hashedSenha,
    },
  });

  console.log("Novo usuário criado:", newUser);

  return { success: true };
}
