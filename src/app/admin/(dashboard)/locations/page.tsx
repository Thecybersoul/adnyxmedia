import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getLocations } from "@/lib/db/locations";
import { LocationsTable } from "@/components/admin/locations-table";
import { ResetLocationsButton } from "@/components/admin/reset-locations-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Locations" };

export default async function AdminLocationsPage() {
  const locations = await getLocations();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-mist">Locations</h1>
          <p className="mt-1 text-sm text-mist-dim">{locations.length} sites in the inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <ResetLocationsButton />
          <Button href="/admin/locations/new" showArrow={false}>
            <Plus className="size-4" />
            Add location
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <LocationsTable locations={locations} />
      </div>
    </div>
  );
}
