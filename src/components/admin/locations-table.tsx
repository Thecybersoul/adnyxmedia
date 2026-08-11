"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteLocationAction } from "@/app/admin/(dashboard)/locations/actions";
import type { InventoryLocation } from "@/types/location";

const availabilityTone = {
  Available: "success",
  Booked: "muted",
  "Coming Soon": "warning",
} as const;

export function LocationsTable({ locations }: { locations: InventoryLocation[] }) {
  const [items, setItems] = useState(locations);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteLocationAction(id);
      setItems((cur) => cur.filter((loc) => loc.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-mist-faint">No locations yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-surface/60 text-xs uppercase tracking-wide text-mist-faint">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Zone</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {items.map((loc) => (
            <tr key={loc.id} className="bg-ink-soft/40">
              <td className="px-4 py-3">
                <p className="font-medium text-mist">{loc.name}</p>
                <p className="text-xs text-mist-faint">{loc.area}</p>
              </td>
              <td className="px-4 py-3 text-mist-dim">{loc.zone}</td>
              <td className="px-4 py-3 text-mist-dim">{loc.type}</td>
              <td className="px-4 py-3">
                <Badge tone={availabilityTone[loc.availability]}>{loc.availability}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/locations/${loc.id}`}
                    className="rounded-md p-2 text-mist-faint hover:bg-white/5 hover:text-mist"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(loc.id, loc.name)}
                    disabled={deletingId === loc.id}
                    className="rounded-md p-2 text-mist-faint hover:bg-white/5 hover:text-amber"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
