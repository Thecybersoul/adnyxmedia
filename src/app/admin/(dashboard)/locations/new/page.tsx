import type { Metadata } from "next";
import { LocationForm } from "@/components/admin/editors/location-form";

export const metadata: Metadata = { title: "Add Location" };

export default function NewLocationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-mist">Add location</h1>
      <p className="mt-1 text-sm text-mist-dim">Add a new site to the inventory.</p>
      <div className="mt-6">
        <LocationForm />
      </div>
    </div>
  );
}
