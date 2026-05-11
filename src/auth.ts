import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Ensure we trust the host (required for some environments)
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const rawEmail = (credentials?.email as string | undefined)?.trim();
        const rawPassword = credentials?.password as string | undefined;

        // Basic sanitization — reject missing or oversized inputs
        if (!rawEmail || !rawPassword) return null;
        if (rawEmail.length > 254 || rawPassword.length > 128) return null;
        // Simple email format guard (no regex injection surface)
        if (!rawEmail.includes("@") || rawEmail.includes(" ")) return null;

        const user = await prisma.user.findUnique({
          where: { email: rawEmail },
        });

        if (!user || !user.password) return null;

        const isValid = await bcryptjs.compare(rawPassword, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  }
});

