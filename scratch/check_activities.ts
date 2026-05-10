import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const activities = await prisma.activity.findMany({
    select: { name: true, slug: true, status: true }
  });
  console.log(JSON.stringify(activities, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
