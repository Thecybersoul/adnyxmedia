import { NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/db/client";
import { getContentSection, contentDefaults } from "@/lib/db/content";
import { getLocations } from "@/lib/db/locations";
import type { SiteContent } from "@/types/content";

// Exercises the exact DB-backed calls the public pages make, reporting
// timing and outcome (and the raw shape) as JSON instead of letting a
// failure take down a full page render. Diagnostic only.
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  const result: Record<string, unknown> = {
    dbConfigured: isDbConfigured(),
    content: {} as Record<string, unknown>,
  };

  for (const key of Object.keys(contentDefaults) as (keyof SiteContent)[]) {
    try {
      const t0 = Date.now();
      const value = await getContentSection(key);
      (result.content as Record<string, unknown>)[key] = { ms: Date.now() - t0, value };
    } catch (err) {
      (result.content as Record<string, unknown>)[key] = {
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  try {
    const t0 = Date.now();
    const locations = await getLocations();
    result.locations = { ms: Date.now() - t0, count: locations.length, sample: locations[0] };
  } catch (err) {
    result.locationsError = err instanceof Error ? err.message : String(err);
  }

  result.totalMs = Date.now() - startedAt;
  return NextResponse.json(result);
}
