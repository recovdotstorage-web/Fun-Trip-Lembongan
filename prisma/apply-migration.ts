// Script to apply migrations to Turso
import { createClient } from "@libsql/client";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const sql = fs.readFileSync("prisma/migrations/0001_init/migration.sql", "utf-8");

  // Split by semicolons, keeping the structure intact
  const statements = sql
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => {
      // Filter out empty lines and pure comment lines
      const lines = s.split("\n").filter(l => !l.startsWith("--") && l.trim().length > 0);
      return lines.length > 0;
    });

  console.log(`Applying ${statements.length} statements to Turso...`);

  for (const stmt of statements) {
    try {
      await client.execute(stmt + ";");
      const preview = stmt.split("\n").find(l => !l.startsWith("--") && l.trim())?.trim() || stmt.substring(0, 60);
      console.log(`✓ ${preview}`);
    } catch (err: any) {
      if (err.message?.includes("already exists")) {
        console.log(`⊘ Skipped (already exists): ${stmt.substring(0, 60)}`);
      } else {
        console.error(`✗ Error: ${err.message}`);
        console.error(`  Statement: ${stmt.substring(0, 120)}`);
      }
    }
  }

  console.log("\n✅ Migration complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
