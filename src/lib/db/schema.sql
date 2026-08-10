-- ADNYX admin dashboard schema.
-- Run via `npm run db:migrate` once DATABASE_URL is set.

CREATE TABLE IF NOT EXISTS content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  zone TEXT NOT NULL,
  type TEXT NOT NULL,
  format TEXT NOT NULL,
  width_ft NUMERIC NOT NULL,
  height_ft NUMERIC NOT NULL,
  resolution TEXT,
  illuminated BOOLEAN NOT NULL DEFAULT true,
  daily_impressions INTEGER NOT NULL DEFAULT 0,
  landmark TEXT NOT NULL DEFAULT '',
  availability TEXT NOT NULL DEFAULT 'Available',
  highlights JSONB NOT NULL DEFAULT '[]',
  hue JSONB NOT NULL DEFAULT '["#E65050", "#7A2020"]',
  position JSONB NOT NULL DEFAULT '{"x": 50, "y": 50}',
  image_url TEXT,
  video_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  pathname TEXT NOT NULL,
  content_type TEXT,
  kind TEXT NOT NULL DEFAULT 'other',
  label TEXT NOT NULL DEFAULT '',
  size_bytes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_locations_sort_order ON locations (sort_order);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media (created_at DESC);
