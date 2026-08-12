import { NextResponse } from "next/server";
import { isDbConfigured, isDbAvailable, sql } from "@/lib/db/client";
import { getContentSection, contentDefaults } from "@/lib/db/content";
import { getLocations, getLocationById, getLocationBySlug } from "@/lib/db/locations";
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

  // Raw row dump — bypasses rowToLocation() mapping entirely, so we can see
  // exactly what's stored for the jsonb columns (highlights/hue/position)
  // rather than whatever shape our code assumed they'd already be in.
  try {
    if (await isDbAvailable()) {
      const rows = await sql!`SELECT id, slug, highlights, hue, position, image_url, video_url FROM locations ORDER BY sort_order ASC`;
      result.rawLocationRows = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        highlights: { type: typeof r.highlights, isArray: Array.isArray(r.highlights), value: r.highlights },
        hue: { type: typeof r.hue, isArray: Array.isArray(r.hue), value: r.hue },
        position: { type: typeof r.position, value: r.position },
        image_url: r.image_url,
        video_url: r.video_url,
      }));
    } else {
      result.rawLocationRows = "db not available";
    }
  } catch (err) {
    result.rawLocationRowsError = err instanceof Error ? err.message : String(err);
  }

  // Exercise the exact call the admin edit page makes, for every location.
  try {
    const locations = await getLocations();
    const edits: Record<string, unknown> = {};
    for (const loc of locations) {
      try {
        const full = await getLocationById(loc.id);
        edits[loc.id] = { ok: true, hue: full?.hue, position: full?.position, highlights: full?.highlights };
      } catch (err) {
        edits[loc.id] = { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
    result.editPageCheck = edits;
  } catch (err) {
    result.editPageCheckError = err instanceof Error ? err.message : String(err);
  }

  // Exercise the exact call + field access the PUBLIC /locations/[slug] page
  // makes for every location — this is the one the admin-focused checks
  // above don't cover, since that page fetches by slug, not id.
  try {
    const locations = await getLocations();
    const slugChecks: Record<string, unknown> = {};
    for (const loc of locations) {
      try {
        const full = await getLocationBySlug(loc.slug);
        if (!full) {
          slugChecks[loc.slug] = { ok: false, error: "getLocationBySlug returned undefined — page would 404" };
          continue;
        }
        // Touch every field the detail page actually renders/calls methods on.
        const highlightsRendered = full.highlights.map((h) => h).length;
        const hueRendered = `${full.hue[0]},${full.hue[1]}`;
        const dims = `${full.widthFt}x${full.heightFt}`;
        slugChecks[loc.slug] = { ok: true, id: full.id, highlightsRendered, hueRendered, dims };
      } catch (err) {
        slugChecks[loc.slug] = { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
    result.slugPageCheck = slugChecks;
  } catch (err) {
    result.slugPageCheckError = err instanceof Error ? err.message : String(err);
  }

  result.totalMs = Date.now() - startedAt;
  return NextResponse.json(result);
}
