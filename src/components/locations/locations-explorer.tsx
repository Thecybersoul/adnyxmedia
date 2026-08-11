"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { InventoryLocation } from "@/types/location";
import { LocationCard } from "@/components/locations/location-card";

export function LocationsExplorer({ locations }: { locations: InventoryLocation[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((loc) =>
      [loc.name, loc.area, loc.landmark].some((f) => f.toLowerCase().includes(q))
    );
  }, [locations, query]);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/60 px-4 py-3">
        <Search className="size-4 shrink-0 text-mist-faint" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by site, area, or landmark…"
          className="w-full bg-transparent text-sm text-mist placeholder:text-mist-faint focus:outline-none"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-mist">No sites match that search.</p>
          <p className="mt-1 text-sm text-mist-dim">Try a different site, area, or landmark.</p>
        </div>
      )}
    </div>
  );
}
