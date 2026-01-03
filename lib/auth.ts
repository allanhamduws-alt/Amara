import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[Auth] authorize called with:", { 
          email: credentials?.email,
          hasPassword: !!credentials?.password 
        });
        
        if (!credentials?.email || !credentials?.password) {
          console.log("[Auth] Missing credentials");
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        console.log("[Auth] User found:", !!user);

        if (!user) {
          console.log("[Auth] User not found");
          return null;
        }

        const isValidPassword = await compare(
          credentials.password as string,
          user.passwordHash
        );

        console.log("[Auth] Password valid:", isValidPassword);

        if (!isValidPassword) {
          console.log("[Auth] Invalid password");
          return null;
        }

        console.log("[Auth] Login successful for:", user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

