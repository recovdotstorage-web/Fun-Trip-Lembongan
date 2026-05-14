import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Ensure we trust the host (required for some environments)
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
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

        console.log("Authorize attempt for:", rawEmail, "User found:", !!user);
        if (user) console.log("User role in DB:", user.role);

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
    async redirect({ url, baseUrl }) {
      // After sign-in, always go to dashboard
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/admin/dashboard`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
});

