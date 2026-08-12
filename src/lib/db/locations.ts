import { sql, toWriteError, isDbAvailable, markDbFailure } from "@/lib/db/client";
import { locations as staticLocations } from "@/lib/data/locations";
import type { InventoryLocation } from "@/types/location";

interface LocationRow {
  id: string;
  slug: string;
  name: string;
  area: string;
  zone: string;
  type: string;
  format: string;
  width_ft: string | number;
  height_ft: string | number;
  resolution: string | null;
  illuminated: boolean;
  daily_impressions: number;
  landmark: string;
  availability: string;
  highlights: string[];
  hue: [string, string];
  position: { x: number; y: number };
  image_url: string | null;
  video_url: string | null;
}

const DEFAULT_HUE: [string, string] = ["#E65050", "#7A2020"];
const DEFAULT_POSITION = { x: 50, y: 50 };

// jsonb columns come back pre-parsed by the driver when they're well-formed,
// but a row written from outside the normal write path (a manual edit, a
// partially-failed save, a migration) can leave one of these as the wrong
// shape — a string instead of an array, a null, etc. The public location
// pages call array/index methods on these directly, so a bad shape here
// crashes the whole page render rather than just looking wrong. Coerce to a
// safe shape instead of trusting the row.
function coerceHighlights(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  return [];
}

function coerceHue(value: unknown): [string, string] {
  if (Array.isArray(value) && typeof value[0] === "string" && typeof value[1] === "string") {
    return [value[0], value[1]];
  }
  return DEFAULT_HUE;
}

function coercePosition(value: unknown): { x: number; y: number } {
  if (
    value &&
    typeof value === "object" &&
    typeof (value as { x?: unknown }).x === "number" &&
    typeof (value as { y?: unknown }).y === "number"
  ) {
    return value as { x: number; y: number };
  }
  return DEFAULT_POSITION;
}

function rowToLocation(row: LocationRow): InventoryLocation {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    area: row.area,
    zone: row.zone as InventoryLocation["zone"],
    type: row.type as InventoryLocation["type"],
    format: row.format,
    widthFt: Number(row.width_ft),
    heightFt: Number(row.height_ft),
    resolution: row.resolution ?? undefined,
    illuminated: row.illuminated,
    dailyImpressions: row.daily_impressions,
    landmark: row.landmark,
    availability: row.availability as InventoryLocation["availability"],
    highlights: coerceHighlights(row.highlights),
    hue: coerceHue(row.hue),
    position: coercePosition(row.position),
    imageUrl: row.image_url ?? undefined,
    videoUrl: row.video_url ?? undefined,
  };
}

export async function getLocations(): Promise<InventoryLocation[]> {
  if (!(await isDbAvailable())) return staticLocations;

  try {
    const rows = (await sql!`
      SELECT * FROM locations ORDER BY sort_order ASC, created_at ASC
    `) as unknown as LocationRow[];
    const dbLocations = rows.map(rowToLocation);
    // A fallback entry only "materializes" into the database once someone
    // edits and saves it (updateLocation upserts by id). Returning DB rows
    // alone here would make every not-yet-edited fallback location vanish
    // from view the moment even one row exists — merge instead.
    const dbIds = new Set(dbLocations.map((loc) => loc.id));
    const unmaterialized = staticLocations.filter((loc) => !dbIds.has(loc.id));
    return [...dbLocations, ...unmaterialized];
  } catch (err) {
    console.error("Failed to load locations, using fallback.", err);
    markDbFailure();
    return staticLocations;
  }
}

export async function getLocationBySlug(slug: string): Promise<InventoryLocation | undefined> {
  const fallback = staticLocations.find((loc) => loc.slug === slug);
  if (!(await isDbAvailable())) return fallback;

  try {
    const rows = (await sql!`
      SELECT * FROM locations WHERE slug = ${slug} LIMIT 1
    `) as unknown as LocationRow[];
    if (rows.length === 0) return fallback;
    return rowToLocation(rows[0]);
  } catch (err) {
    console.error(`Failed to load location "${slug}", using fallback.`, err);
    markDbFailure();
    return fallback;
  }
}

export async function getLocationById(id: string): Promise<InventoryLocation | undefined> {
  const fallback = staticLocations.find((loc) => loc.id === id);
  if (!(await isDbAvailable())) return fallback;

  try {
    const rows = (await sql!`
      SELECT * FROM locations WHERE id = ${id} LIMIT 1
    `) as unknown as LocationRow[];
    if (rows.length === 0) return fallback;
    return rowToLocation(rows[0]);
  } catch (err) {
    console.error(`Failed to load location "${id}", using fallback.`, err);
    markDbFailure();
    return fallback;
  }
}

export type LocationInput = Omit<InventoryLocation, "id"> & { id?: string };

export async function createLocation(input: LocationInput): Promise<InventoryLocation> {
  if (!(await isDbAvailable())) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  const id = input.id || `loc-${crypto.randomUUID().slice(0, 8)}`;
  try {
    const rows = (await sql!`
      INSERT INTO locations (
        id, slug, name, area, zone, type, format, width_ft, height_ft,
        resolution, illuminated, daily_impressions, landmark, availability,
        highlights, hue, position, image_url, video_url
      ) VALUES (
        ${id}, ${input.slug}, ${input.name}, ${input.area}, ${input.zone}, ${input.type}, ${input.format},
        ${input.widthFt}, ${input.heightFt}, ${input.resolution ?? null}, ${input.illuminated},
        ${input.dailyImpressions ?? 0}, ${input.landmark}, ${input.availability},
        ${JSON.stringify(input.highlights)}::jsonb, ${JSON.stringify(input.hue)}::jsonb,
        ${JSON.stringify(input.position)}::jsonb, ${input.imageUrl ?? null}, ${input.videoUrl ?? null}
      )
      RETURNING *
    `) as unknown as LocationRow[];

    return rowToLocation(rows[0]);
  } catch (err) {
    markDbFailure();
    throw toWriteError(err, `Failed to create location "${input.name}"`);
  }
}

export async function updateLocation(id: string, input: LocationInput): Promise<InventoryLocation> {
  if (!(await isDbAvailable())) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  // Upsert rather than a plain UPDATE: the row being "edited" here may only
  // ever have existed in the static fallback data (e.g. the database was
  // never seeded, or this id predates the row actually being written) — in
  // that case a plain UPDATE matches nothing and silently fails. Editing
  // fallback content should just create the row with the edited values.
  try {
    const rows = (await sql!`
      INSERT INTO locations (
        id, slug, name, area, zone, type, format, width_ft, height_ft,
        resolution, illuminated, daily_impressions, landmark, availability,
        highlights, hue, position, image_url, video_url
      ) VALUES (
        ${id}, ${input.slug}, ${input.name}, ${input.area}, ${input.zone}, ${input.type}, ${input.format},
        ${input.widthFt}, ${input.heightFt}, ${input.resolution ?? null}, ${input.illuminated},
        ${input.dailyImpressions ?? 0}, ${input.landmark}, ${input.availability},
        ${JSON.stringify(input.highlights)}::jsonb, ${JSON.stringify(input.hue)}::jsonb,
        ${JSON.stringify(input.position)}::jsonb, ${input.imageUrl ?? null}, ${input.videoUrl ?? null}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        area = EXCLUDED.area,
        zone = EXCLUDED.zone,
        type = EXCLUDED.type,
        format = EXCLUDED.format,
        width_ft = EXCLUDED.width_ft,
        height_ft = EXCLUDED.height_ft,
        resolution = EXCLUDED.resolution,
        illuminated = EXCLUDED.illuminated,
        daily_impressions = EXCLUDED.daily_impressions,
        landmark = EXCLUDED.landmark,
        availability = EXCLUDED.availability,
        highlights = EXCLUDED.highlights,
        hue = EXCLUDED.hue,
        position = EXCLUDED.position,
        image_url = EXCLUDED.image_url,
        video_url = EXCLUDED.video_url,
        updated_at = now()
      RETURNING *
    `) as unknown as LocationRow[];

    return rowToLocation(rows[0]);
  } catch (err) {
    markDbFailure();
    throw toWriteError(err, `Failed to update location "${id}"`);
  }
}

export async function deleteLocation(id: string): Promise<void> {
  if (!(await isDbAvailable())) throw new Error("Database not configured — set DATABASE_URL to enable editing.");
  try {
    await sql!`DELETE FROM locations WHERE id = ${id}`;
  } catch (err) {
    markDbFailure();
    throw toWriteError(err, `Failed to delete location "${id}"`);
  }
}

// Wipes the table and re-inserts exactly the canonical 5-site inventory from
// the LOM (src/lib/data/locations.ts) — the one supported way to guarantee
// no stray/duplicate rows survive from earlier edits, since a prior
// materialized DB row always wins over a corrected static default. BTM
// (loc-04) keeps whatever image/video is already live for it rather than
// being reset to the static fallback, since that's a deliberately-chosen
// asset, not LOM data.
export async function resetToCanonicalLocations(): Promise<void> {
  if (!(await isDbAvailable())) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  try {
    const preserved = (await sql!`
      SELECT image_url, video_url FROM locations WHERE id = 'loc-04'
    `) as unknown as { image_url: string | null; video_url: string | null }[];
    const btmImageUrl = preserved[0]?.image_url ?? null;
    const btmVideoUrl = preserved[0]?.video_url ?? null;

    await sql!`DELETE FROM locations`;

    for (let i = 0; i < staticLocations.length; i++) {
      const loc = staticLocations[i];
      const imageUrl = loc.id === "loc-04" ? btmImageUrl : (loc.imageUrl ?? null);
      const videoUrl = loc.id === "loc-04" ? btmVideoUrl : (loc.videoUrl ?? null);
      await sql!`
        INSERT INTO locations (
          id, slug, name, area, zone, type, format, width_ft, height_ft,
          resolution, illuminated, daily_impressions, landmark, availability,
          highlights, hue, position, image_url, video_url, sort_order
        ) VALUES (
          ${loc.id}, ${loc.slug}, ${loc.name}, ${loc.area}, ${loc.zone}, ${loc.type}, ${loc.format},
          ${loc.widthFt}, ${loc.heightFt}, ${loc.resolution ?? null}, ${loc.illuminated},
          ${loc.dailyImpressions ?? 0}, ${loc.landmark}, ${loc.availability},
          ${JSON.stringify(loc.highlights)}::jsonb, ${JSON.stringify(loc.hue)}::jsonb,
          ${JSON.stringify(loc.position)}::jsonb, ${imageUrl}, ${videoUrl}, ${i}
        )
      `;
    }
  } catch (err) {
    markDbFailure();
    throw toWriteError(err, "Failed to reset locations to LOM defaults");
  }
}
