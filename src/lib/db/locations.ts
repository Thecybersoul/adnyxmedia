import { sql, toWriteError } from "@/lib/db/client";
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
    highlights: row.highlights,
    hue: row.hue,
    position: row.position,
    imageUrl: row.image_url ?? undefined,
    videoUrl: row.video_url ?? undefined,
  };
}

export async function getLocations(): Promise<InventoryLocation[]> {
  if (!sql) return staticLocations;

  try {
    const rows = (await sql`
      SELECT * FROM locations ORDER BY sort_order ASC, created_at ASC
    `) as unknown as LocationRow[];
    if (rows.length === 0) return staticLocations;
    return rows.map(rowToLocation);
  } catch (err) {
    console.error("Failed to load locations, using fallback.", err);
    return staticLocations;
  }
}

export async function getLocationBySlug(slug: string): Promise<InventoryLocation | undefined> {
  if (!sql) return staticLocations.find((loc) => loc.slug === slug);

  try {
    const rows = (await sql`
      SELECT * FROM locations WHERE slug = ${slug} LIMIT 1
    `) as unknown as LocationRow[];
    if (rows.length === 0) return undefined;
    return rowToLocation(rows[0]);
  } catch (err) {
    console.error(`Failed to load location "${slug}", using fallback.`, err);
    return staticLocations.find((loc) => loc.slug === slug);
  }
}

export async function getLocationById(id: string): Promise<InventoryLocation | undefined> {
  const fallback = staticLocations.find((loc) => loc.id === id);
  if (!sql) return fallback;

  try {
    const rows = (await sql`
      SELECT * FROM locations WHERE id = ${id} LIMIT 1
    `) as unknown as LocationRow[];
    if (rows.length === 0) return fallback;
    return rowToLocation(rows[0]);
  } catch (err) {
    console.error(`Failed to load location "${id}", using fallback.`, err);
    return fallback;
  }
}

export type LocationInput = Omit<InventoryLocation, "id"> & { id?: string };

export async function createLocation(input: LocationInput): Promise<InventoryLocation> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  const id = input.id || `loc-${crypto.randomUUID().slice(0, 8)}`;
  try {
    const rows = (await sql`
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
    throw toWriteError(err, `Failed to create location "${input.name}"`);
  }
}

export async function updateLocation(id: string, input: LocationInput): Promise<InventoryLocation> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  try {
    const rows = (await sql`
      UPDATE locations SET
        slug = ${input.slug},
        name = ${input.name},
        area = ${input.area},
        zone = ${input.zone},
        type = ${input.type},
        format = ${input.format},
        width_ft = ${input.widthFt},
        height_ft = ${input.heightFt},
        resolution = ${input.resolution ?? null},
        illuminated = ${input.illuminated},
        daily_impressions = ${input.dailyImpressions ?? 0},
        landmark = ${input.landmark},
        availability = ${input.availability},
        highlights = ${JSON.stringify(input.highlights)}::jsonb,
        hue = ${JSON.stringify(input.hue)}::jsonb,
        position = ${JSON.stringify(input.position)}::jsonb,
        image_url = ${input.imageUrl ?? null},
        video_url = ${input.videoUrl ?? null},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as unknown as LocationRow[];

    if (rows.length === 0) throw new Error(`Location "${id}" not found`);
    return rowToLocation(rows[0]);
  } catch (err) {
    if (err instanceof Error && err.message === `Location "${id}" not found`) throw err;
    throw toWriteError(err, `Failed to update location "${id}"`);
  }
}

export async function deleteLocation(id: string): Promise<void> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");
  try {
    await sql`DELETE FROM locations WHERE id = ${id}`;
  } catch (err) {
    throw toWriteError(err, `Failed to delete location "${id}"`);
  }
}
