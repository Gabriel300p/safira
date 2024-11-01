import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          console.log("Credenciais ausentes");
          return null;
        }

        const usuario = await db.usuario.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!usuario) {
          console.log("Usuário não encontrado");
          return null;
        }

        console.log("Senha fornecida:", credentials.senha);
        console.log("Senha armazenada (hash):", usuario.senha);

        const isSenhaValid = await compare(credentials.senha, usuario.senha);

        console.log("Senha válida?", isSenhaValid);

        if (!isSenhaValid) {
          console.log("Senha inválida");
          return null;
        }

        console.log("Autenticação bem-sucedida");
        return {
          id: usuario.id.toString(),
          email: usuario.email,
          name: `${usuario.nome} ${usuario.sobrenome}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}
