import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma_v_final: PrismaClient | undefined;
};

function createPrismaClient() {
  console.log("Creating new PrismaClient instance...");
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const client = new PrismaClient({ adapter });
  return client;
}

export const prisma = globalForPrisma.prisma_v_final ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v_final = prisma;
