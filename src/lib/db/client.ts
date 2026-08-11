import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// prepare: false — required for connection poolers running in transaction
// mode (Supabase's pgbouncer pooler, Neon's pooled endpoint, etc.), and
// harmless against a direct connection.
// max: 1 / idle_timeout — each serverless invocation only ever needs one
// connection at a time; keeping the pool tiny and closing idle connections
// quickly avoids exhausting the database's (often low) connection limit
// under concurrent traffic.
// connect_timeout — fail fast instead of hanging the whole page/function
// if the database is unreachable or its connection limit is exhausted, so
// callers' try/catch fallback logic actually gets a chance to run within
// the platform's execution time budget.
export const sql = connectionString
  ? postgres(connectionString, { prepare: false, max: 1, idle_timeout: 20, connect_timeout: 5 })
  : null;

export function isDbConfigured(): boolean {
  return sql !== null;
}
