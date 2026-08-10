import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "@neondatabase/serverless";

async function main() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error("Missing DATABASE_URL (or POSTGRES_URL) env var. Set it before running db:migrate.");
    process.exit(1);
  }

  const schemaPath = join(process.cwd(), "src/lib/db/schema.sql");
  const schema = readFileSync(schemaPath, "utf8");
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  const client = new Client(connectionString);
  await client.connect();

  try {
    for (const statement of statements) {
      console.log(`Running: ${statement.slice(0, 60).replace(/\s+/g, " ")}...`);
      await client.query(statement);
    }
    console.log(`Migration complete — ${statements.length} statements applied.`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
