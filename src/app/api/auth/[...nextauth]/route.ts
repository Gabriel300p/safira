import { db } from "@/lib/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
          where: { email: credentials.email },
        });

        if (!usuario) {
          console.log("Usuário não encontrado");
          return null;
        }

        // Se a senha no banco não estiver hashada, use uma comparação direta
        const isSenhaValid = usuario.senha.startsWith("$2")
          ? await compare(credentials.senha, usuario.senha)
          : credentials.senha === usuario.senha;

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
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
