"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { InventoryLocation } from "@/types/location";
import { LocationCard } from "@/components/locations/location-card";
import { zones, mediaTypes } from "@/lib/data/locations";
import { cn } from "@/lib/utils";

export function LocationsExplorer({ locations }: { locations: InventoryLocation[] }) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<(typeof zones)[number]>("All");
  const [type, setType] = useState<(typeof mediaTypes)[number]>("All");

  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      const matchesQuery =
        query.trim().length === 0 ||
        [loc.name, loc.area, loc.landmark].some((f) =>
          f.toLowerCase().includes(query.trim().toLowerCase())
        );
      const matchesZone = zone === "All" || loc.zone === zone;
      const matchesType = type === "All" || loc.type === type;
      return matchesQuery && matchesZone && matchesType;
    });
  }, [locations, query, zone, type]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface/60 p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink px-4 py-3">
          <Search className="size-4 shrink-0 text-mist-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by site, area, or landmark…"
            className="w-full bg-transparent text-sm text-mist placeholder:text-mist-faint focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterGroup label="Zone" options={zones} value={zone} onChange={setZone} />
          <FilterGroup label="Format" options={mediaTypes} value={type} onChange={setType} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-mist-dim">
          <SlidersHorizontal className="size-3.5" />
          {filtered.length} site{filtered.length !== 1 && "s"} found
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-mist">No sites match those filters.</p>
          <p className="mt-1 text-sm text-mist-dim">Try a different zone, format, or search term.</p>
        </div>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-wide text-mist-faint">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            value === option
              ? "border-violet/40 bg-violet/20 text-violet-soft"
              : "border-white/10 bg-transparent text-mist-dim hover:border-white/20 hover:text-mist"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
