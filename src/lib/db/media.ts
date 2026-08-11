import { sql } from "@/lib/db/client";
import type { AssetKind, MediaItem } from "@/types/media";

interface MediaRow {
  id: string;
  url: string;
  pathname: string;
  content_type: string | null;
  kind: string;
  label: string;
  size_bytes: number | null;
  created_at: string;
}

function rowToMedia(row: MediaRow): MediaItem {
  return {
    id: row.id,
    url: row.url,
    pathname: row.pathname,
    contentType: row.content_type,
    kind: row.kind as AssetKind,
    label: row.label,
    sizeBytes: row.size_bytes,
    createdAt: row.created_at,
  };
}

export async function listMedia(): Promise<MediaItem[]> {
  if (!sql) return [];
  try {
    const rows = (await sql`
      SELECT * FROM media ORDER BY created_at DESC
    `) as unknown as MediaRow[];
    return rows.map(rowToMedia);
  } catch (err) {
    console.error("Failed to load media library.", err);
    return [];
  }
}

export async function createMediaRecord(input: {
  url: string;
  pathname: string;
  contentType: string | null;
  kind: AssetKind;
  label: string;
  sizeBytes: number | null;
}): Promise<MediaItem> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");

  const id = crypto.randomUUID();
  const rows = (await sql`
    INSERT INTO media (id, url, pathname, content_type, kind, label, size_bytes)
    VALUES (${id}, ${input.url}, ${input.pathname}, ${input.contentType}, ${input.kind}, ${input.label}, ${input.sizeBytes})
    RETURNING *
  `) as unknown as MediaRow[];

  return rowToMedia(rows[0]);
}

export async function getMediaById(id: string): Promise<MediaItem | undefined> {
  if (!sql) return undefined;
  try {
    const rows = (await sql`SELECT * FROM media WHERE id = ${id} LIMIT 1`) as unknown as MediaRow[];
    if (rows.length === 0) return undefined;
    return rowToMedia(rows[0]);
  } catch (err) {
    console.error(`Failed to load media "${id}".`, err);
    return undefined;
  }
}

export async function deleteMediaRecord(id: string): Promise<void> {
  if (!sql) throw new Error("Database not configured — set DATABASE_URL to enable editing.");
  await sql`DELETE FROM media WHERE id = ${id}`;
}
