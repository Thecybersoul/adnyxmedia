import { NextResponse } from "next/server";

// Deliberately touches nothing else in the app — no DB, no env-dependent
// modules, no shared layout. If this route also fails to load, the
// problem is not in application code (DB, rendering, content) at all;
// it's at the platform/domain/deployment level.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, time: new Date().toISOString() });
}
