"use client";

import { useState } from "react";
import Image from "next/image";
import { Radio, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationImageProps {
  slug: string;
  name: string;
  area: string;
  hue: [string, string];
  imageUrl?: string;
  videoUrl?: string;
  hasNightImage?: boolean;
  priority?: boolean;
  className?: string;
}

export function LocationImage({
  slug,
  name,
  area,
  hue,
  imageUrl,
  videoUrl,
  hasNightImage = false,
  priority = false,
  className = "",
}: LocationImageProps) {
  const [uploadedImageError, setUploadedImageError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showNight, setShowNight] = useState(false);
  const imagePath = `/images/locations/${slug}${showNight ? "-night" : ""}.jpg`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
      ) : imageUrl && !uploadedImageError ? (
        // Admin-uploaded override (Vercel Blob URL) — plain <img> since it's an
        // arbitrary remote host not covered by next/image's domain allowlist.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name} - ${area}`}
          className="absolute inset-0 size-full object-cover"
          onError={() => setUploadedImageError(true)}
        />
      ) : !imageError ? (
        <Image
          key={imagePath}
          src={imagePath}
          alt={`${name} - ${area}${showNight ? ", night view" : ", day view"}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
          className="object-cover"
          onError={() => setImageError(true)}
          priority={priority}
        />
      ) : (
        // Fallback to gradient if image not found
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, ${hue[0]}, ${hue[1]})`,
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:100%_3px] mix-blend-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Radio className="size-10 text-ink/60" />
          </div>
        </div>
      )}

      {hasNightImage && (!imageUrl || uploadedImageError) && !videoUrl && !imageError && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setShowNight(false)}
            aria-pressed={!showNight}
            aria-label="Day view"
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              !showNight ? "bg-brand text-white" : "text-mist-dim hover:text-mist"
            )}
          >
            <Sun className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowNight(true)}
            aria-pressed={showNight}
            aria-label="Night view"
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              showNight ? "bg-brand text-white" : "text-mist-dim hover:text-mist"
            )}
          >
            <Moon className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
