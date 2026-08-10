import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationById } from "@/lib/db/locations";
import { LocationForm } from "@/components/admin/editors/location-form";

export const metadata: Metadata = { title: "Edit Location" };

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocationById(id);
  if (!location) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-mist">{location.name}</h1>
      <p className="mt-1 text-sm text-mist-dim">{location.area}</p>
      <div className="mt-6">
        <LocationForm existing={location} />
      </div>
    </div>
  );
}
