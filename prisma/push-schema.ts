import { createClient } from "@libsql/client";
import { execSync } from "child_process";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  console.log("Generating schema SQL...");
  try {
    let sql = execSync(
      "npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script",
      { encoding: "utf-8" }
    );

    // Tambahkan IF NOT EXISTS agar tidak error jika tabel/index sudah ada
    sql = sql.replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ");
    sql = sql.replace(/CREATE INDEX /g, "CREATE INDEX IF NOT EXISTS ");
    sql = sql.replace(/CREATE UNIQUE INDEX /g, "CREATE UNIQUE INDEX IF NOT EXISTS ");

    const client = createClient({
      url,
      authToken,
    });

    console.log("Applying schema to Turso...");
    await client.executeMultiple(sql);
    console.log("Schema applied successfully!");
  } catch (error) {
    console.error("Error applying schema:", error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
