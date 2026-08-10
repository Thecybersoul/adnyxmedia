import type { MetadataRoute } from "next";
import { locations } from "@/lib/data/locations";

const base = "https://www.adnyx.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/locations", "/services", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const locationRoutes = locations.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes];
}
