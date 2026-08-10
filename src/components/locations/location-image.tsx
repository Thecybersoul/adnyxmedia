"use client";

import { useState } from "react";
import Image from "next/image";
import { Radio } from "lucide-react";

interface LocationImageProps {
  slug: string;
  name: string;
  area: string;
  hue: [string, string];
  priority?: boolean;
  className?: string;
}

export function LocationImage({ slug, name, area, hue, priority = false, className = "" }: LocationImageProps) {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/images/locations/${slug}.jpg`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageError ? (
        <Image
          src={imagePath}
          alt={`${name} - ${area}`}
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
    </div>
  );
}
