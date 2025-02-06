import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if(user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if(session.user) {
        session.user.id = token.id ?? "";
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/",
    error: "/auth/sign-in",
  },
})