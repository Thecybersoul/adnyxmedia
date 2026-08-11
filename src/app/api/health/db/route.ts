import { NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/db/client";
import { getContentSection } from "@/lib/db/content";
import { getLocations } from "@/lib/db/locations";

// Exercises the exact DB-backed calls the public pages make, reporting
// timing and outcome as JSON instead of letting a failure take down a
// full page render. Diagnostic only.
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  const result: Record<string, unknown> = {
    dbConfigured: isDbConfigured(),
  };

  try {
    const t0 = Date.now();
    const company = await getContentSection("company");
    result.company = { ms: Date.now() - t0, name: company.name };
  } catch (err) {
    result.companyError = err instanceof Error ? err.message : String(err);
  }

  try {
    const t0 = Date.now();
    const locations = await getLocations();
    result.locations = { ms: Date.now() - t0, count: locations.length };
  } catch (err) {
    result.locationsError = err instanceof Error ? err.message : String(err);
  }

  result.totalMs = Date.now() - startedAt;
  return NextResponse.json(result);
}
