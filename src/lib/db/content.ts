import { sql, toWriteError } from "@/lib/db/client";
import type { SiteContent } from "@/types/content";
import {
  company as companyDefault,
  heroDefault,
  stats as statsDefault,
  services as servicesDefault,
  process as processDefault,
  testimonials as testimonialsDefault,
  clients as clientsDefault,
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
  clients: clientsDefault,
  values: valuesDefault,
  timeline: timelineDefault,
};

export async function getContentSection<K extends keyof SiteContent>(
  key: K
): Promise<SiteContent[K]> {
  const fallback = contentDefaults[key];
  if (!sql) return fallback;

  try {
    const rows = await sql`SELECT value FROM content WHERE key = ${key} LIMIT 1`;
    if (rows.length === 0) return fallback;
    return rows[0].value as SiteContent[K];
  } catch (err) {
    console.error(`Failed to load content section "${key}", using fallback.`, err);
    return fallback;
  }
}

export async function setContentSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K]
): Promise<void> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  try {
    await sql`
      INSERT INTO content (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
  } catch (err) {
    throw toWriteError(err, `Failed to save content section "${key}"`);
  }
}
