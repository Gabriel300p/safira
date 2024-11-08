"use server";

import { signIn } from "next-auth/react";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string> {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      senha: formData.get("senha") as string,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erro de autenticação:", result.error);
      return "Credenciais inválidas.";
    }

    if (result?.ok) {
      return "success";
    }

    return "Algo deu errado.";
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    if (error instanceof Error) {
      return error.message;
    }
    return "Ocorreu um erro durante a autenticação.";
  }
}
