import { readFileSync } from "node:fs";
import { join } from "node:path";
import postgres from "postgres";

async function main() {
  // Prefer a direct (non-pooled) connection for DDL — poolers running in
  // transaction mode (Supabase's pgbouncer, Neon's pooled endpoint) can be
  // unreliable for schema changes.
  const connectionString =
    process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error(
      "Missing POSTGRES_URL_NON_POOLING (or DATABASE_URL / POSTGRES_URL) env var. Set it before running db:migrate."
    );
    process.exit(1);
  }

  const schemaPath = join(process.cwd(), "src/lib/db/schema.sql");
  const schema = readFileSync(schemaPath, "utf8");

  const sql = postgres(connectionString, { prepare: false, max: 1 });
  try {
    await sql.unsafe(schema);
    console.log("Migration complete — schema applied.");
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
