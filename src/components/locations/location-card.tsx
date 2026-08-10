"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Eye, Ratio } from "lucide-react";
import { InventoryLocation } from "@/types/location";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

function formatImpressions(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

const availabilityTone = {
  Available: "success",
  Booked: "muted",
  "Coming Soon": "warning",
} as const;

export function LocationCard({ location }: { location: InventoryLocation }) {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/images/locations/${location.slug}.jpg`;

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`${location.name} - ${location.area}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          // Fallback to gradient if image not found
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${location.hue[0]}, ${location.hue[1]})`,
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:100%_3px] mix-blend-overlay" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent transition-opacity duration-300 group-hover:from-ink/85" />
        <div className="absolute left-3 top-3">
          <Badge tone={availabilityTone[location.availability]}>{location.availability}</Badge>
        </div>
        <div className="absolute right-3 top-3">
          <Badge tone="muted">{location.type}</Badge>
        </div>
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-xs text-white/90">
          <span className="inline-flex items-center gap-1">
            <Ratio className="size-3.5" />
            {location.widthFt}×{location.heightFt} ft
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" />
            {formatImpressions(location.dailyImpressions)}/day
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-medium text-mist transition-colors group-hover:text-violet-soft">
          {location.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-mist-dim">
          <MapPin className="size-3.5 shrink-0" />
          {location.area} · {location.zone} Bangalore
        </p>
      </div>
    </Link>
  );
}
