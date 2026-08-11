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

// A page render touches many independent data-access calls (content
// sections, locations, media). React renders sibling Server Components'
// data fetches concurrently rather than strictly one-at-a-time, so when the
// database is configured and unreachable (wrong host, paused instance,
// network block), several of those calls can race into their own
// connection attempt before any of them has failed — and since the pool
// above is capped at one connection, each attempt serializes behind the
// last, so N racing calls still cost N * connect_timeout. A handful of
// sections easily adds up to tens of seconds, well past the platform's
// function execution limit, turning a "DB is down" situation into "the
// whole site is down" instead of a graceful fallback.
//
// Fix both the raciness and the repeat cost: every caller shares a single
// in-flight probe (so concurrent calls collapse into one real connection
// attempt, not N), and a failed probe is remembered for a cooldown so
// later calls — in this request and the next few — skip straight to the
// fallback instead of trying again.
const FAILURE_COOLDOWN_MS = 30_000;
let lastFailureAt = 0;
let inFlightProbe: Promise<boolean> | null = null;

export function isDbAvailable(): Promise<boolean> {
  if (!sql) return Promise.resolve(false);
  if (Date.now() - lastFailureAt < FAILURE_COOLDOWN_MS) return Promise.resolve(false);
  if (inFlightProbe) return inFlightProbe;

  inFlightProbe = sql`SELECT 1`
    .then(() => true)
    .catch((err) => {
      console.error("Database connection probe failed — falling back to static content.", err);
      lastFailureAt = Date.now();
      return false;
    })
    .finally(() => {
      inFlightProbe = null;
    });

  return inFlightProbe;
}

export function markDbFailure(): void {
  lastFailureAt = Date.now();
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
