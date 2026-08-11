import { sql, toWriteError, isDbAvailable, markDbFailure } from "@/lib/db/client";
import type { SiteContent } from "@/types/content";
import {
  company as companyDefault,
  heroDefault,
  stats as statsDefault,
  services as servicesDefault,
  process as processDefault,
  testimonials as testimonialsDefault,
  trustedBrands as trustedBrandsDefault,
  values as valuesDefault,
  timeline as timelineDefault,
} from "@/lib/data/site";

export const contentDefaults: SiteContent = {
  company: companyDefault,
  hero: heroDefault,
  stats: statsDefault,
  services: servicesDefault,
  process: processDefault,
  testimonials: testimonialsDefault,
  trustedBrands: trustedBrandsDefault,
  values: valuesDefault,
  timeline: timelineDefault,
};

// A handful of rows in the content table were written double-JSON-encoded
// at some point (the jsonb column holds a JSON *string* like
// `"{\"badge\":...}"` instead of the object itself) — some past write path
// stringified the value before handing it to setContentSection, which
// stringifies again. postgres.js then decodes that jsonb value into a
// plain JS string rather than the object/array every page component
// expects, and e.g. `stats.map(...)` on a string throws and takes the
// whole page down. Rather than trust every row was written correctly,
// unwrap however many layers of string-encoding we actually find.
function normalizeContentValue<T>(value: unknown, fallback: T): T {
  let current = value;
  for (let attempts = 0; attempts < 3 && typeof current === "string"; attempts++) {
    try {
      current = JSON.parse(current);
    } catch (err) {
      console.error("Content value looked double-encoded but failed to parse — using fallback.", err);
      return fallback;
    }
  }
  return current as T;
}

export async function getContentSection<K extends keyof SiteContent>(
  key: K
): Promise<SiteContent[K]> {
  const fallback = contentDefaults[key];
  if (!(await isDbAvailable())) return fallback;

  try {
    const rows = await sql!`SELECT value FROM content WHERE key = ${key} LIMIT 1`;
    if (rows.length === 0) return fallback;
    return normalizeContentValue(rows[0].value, fallback);
  } catch (err) {
    console.error(`Failed to load content section "${key}", using fallback.`, err);
    markDbFailure();
    return fallback;
  }
}

export async function setContentSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K]
): Promise<void> {
  if (!(await isDbAvailable())) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  try {
    await sql!`
      INSERT INTO content (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
  } catch (err) {
    markDbFailure();
    throw toWriteError(err, `Failed to save content section "${key}"`);
  }
}
