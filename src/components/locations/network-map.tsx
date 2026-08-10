"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { InventoryLocation } from "@/types/location";

const dotColor = {
  Available: "bg-cyan",
  Booked: "bg-mist-faint",
  "Coming Soon": "bg-amber",
} as const;

export function NetworkMap({ locations }: { locations: InventoryLocation[] }) {
  const [active, setActive] = useState<InventoryLocation | null>(null);

  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/10 bg-surface/60 sm:aspect-[16/9]">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.14),transparent_65%)]"
      />

      {locations.map((loc) => (
        <Link
          key={loc.id}
          href={`/locations/${loc.slug}`}
          onMouseEnter={() => setActive(loc)}
          onMouseLeave={() => setActive((cur) => (cur?.id === loc.id ? null : cur))}
          onFocus={() => setActive(loc)}
          className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
          style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
          aria-label={loc.name}
        >
          <span className="relative flex size-3">
            {loc.availability === "Available" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            )}
            <span
              className={`relative inline-flex size-3 rounded-full ring-2 ring-ink transition-transform ${dotColor[loc.availability]} ${
                active?.id === loc.id ? "scale-150" : "scale-100"
              }`}
            />
          </span>
        </Link>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-ink/95 p-4 shadow-xl backdrop-blur"
            style={{
              left: `${active.position.x}%`,
              top: `${Math.max(active.position.y - 4, 4)}%`,
              transform: `translate(-50%, ${active.position.y > 55 ? "-110%" : "18px"})`,
            }}
          >
            <p className="flex items-center gap-1.5 text-xs font-medium text-mist-dim">
              <MapPin className="size-3.5 text-violet-soft" />
              {active.area}
            </p>
            <p className="mt-1 font-display text-sm font-medium text-mist">{active.name}</p>
            <p className="mt-1 text-xs text-mist-faint">{active.type} · {active.availability}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-4 rounded-full border border-white/10 bg-ink/70 px-4 py-2 backdrop-blur">
        <Legend color="bg-cyan" label="Available" />
        <Legend color="bg-mist-faint" label="Booked" />
        <Legend color="bg-amber" label="Coming soon" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-mist-dim">
      <span className={`size-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
