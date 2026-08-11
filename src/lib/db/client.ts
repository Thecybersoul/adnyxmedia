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
// postgres() parses the connection string synchronously and throws on
// anything malformed — that happens at module import time, which (since
// this module is imported by nearly every page) would take down the
// entire site, not just DB-dependent parts of it, over something as small
// as a stray character in an env var. Never let that escape.
function createClient() {
  if (!connectionString) return null;
  try {
    return postgres(connectionString, { prepare: false, max: 1, idle_timeout: 20, connect_timeout: 5 });
  } catch (err) {
    console.error("DATABASE_URL / POSTGRES_URL is malformed — running without a database.", err);
    return null;
  }
}

export const sql = createClient();

export function isDbConfigured(): boolean {
  return sql !== null;
}

// Server Action return values (including thrown errors) get serialized by
// React across the server/client boundary. The `postgres` package's error
// objects don't always survive that cleanly, which surfaces to the browser
// as an opaque React internal error instead of the actual failure reason.
// Write paths should catch driver errors and re-throw through this so the
// client always gets a plain, readable, serializable Error.
export function toWriteError(err: unknown, context: string): Error {
  console.error(context, err);
  const message = err instanceof Error ? err.message : String(err);
  return new Error(`${context}: ${message}`);
}
