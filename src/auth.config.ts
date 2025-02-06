import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authenticateUser } from "./actions/user/authenticate";

export default {
    providers: [Google, Credentials({
        credentials: {
          email: { label: "Email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          try {
            const email = credentials.email as string | undefined;
            const password = credentials.password as string | undefined;
    
            if (!email || !password) {
              return null;
            }
          
            const user = await authenticateUser({ email, password });
          
            if (!user) {
              return null;
            }
    
            console.log("user from auth", user)

            return user;
          } catch (error) {
            throw error;
          }
        },
      })],
} satisfies NextAuthConfig;