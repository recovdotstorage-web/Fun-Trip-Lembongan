import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config();

async function listAllTables() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("Missing TURSO_DATABASE_URL");
    return;
  }

  const client = createClient({ url, authToken });
  const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
  
  console.log("All tables in Turso:");
  result.rows.forEach(row => console.log(`- ${row.name}`));
}

listAllTables();
