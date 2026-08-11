import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// prepare: false — required for connection poolers running in transaction
// mode (Supabase's pgbouncer pooler, Neon's pooled endpoint, etc.), and
// harmless against a direct connection.
export const sql = connectionString ? postgres(connectionString, { prepare: false }) : null;

export function isDbConfigured(): boolean {
  return sql !== null;
}
