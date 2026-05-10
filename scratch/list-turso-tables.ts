import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config();

async function listTables() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("Missing DATABASE_URL");
    return;
  }

  const client = createClient({ url, authToken });
  const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
  
  console.log("Current tables in Turso:");
  result.rows.forEach(row => console.log(`- ${row.name}`));
}

listTables();
