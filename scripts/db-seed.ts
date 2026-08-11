import { sql, isDbConfigured } from "@/lib/db/client";
import { locations } from "@/lib/data/locations";
import { contentDefaults } from "@/lib/db/content";

async function main() {
  if (!isDbConfigured() || !sql) {
    console.error("Missing DATABASE_URL (or POSTGRES_URL) env var. Set it before running db:seed.");
    process.exit(1);
  }

  console.log("Seeding content sections...");
  for (const [key, value] of Object.entries(contentDefaults)) {
    await sql`
      INSERT INTO content (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
      ON CONFLICT (key) DO NOTHING
    `;
    console.log(`  - ${key}`);
  }

  console.log("Seeding locations...");
  for (const [index, loc] of locations.entries()) {
    await sql`
      INSERT INTO locations (
        id, slug, name, area, zone, type, format, width_ft, height_ft,
        resolution, illuminated, daily_impressions, landmark, availability,
        highlights, hue, position, image_url, video_url, sort_order
      ) VALUES (
        ${loc.id}, ${loc.slug}, ${loc.name}, ${loc.area}, ${loc.zone}, ${loc.type}, ${loc.format},
        ${loc.widthFt}, ${loc.heightFt}, ${loc.resolution ?? null}, ${loc.illuminated},
        ${loc.dailyImpressions ?? 0}, ${loc.landmark}, ${loc.availability},
        ${JSON.stringify(loc.highlights)}::jsonb, ${JSON.stringify(loc.hue)}::jsonb,
        ${JSON.stringify(loc.position)}::jsonb, ${loc.imageUrl ?? null}, ${loc.videoUrl ?? null}, ${index}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    console.log(`  - ${loc.slug}`);
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
