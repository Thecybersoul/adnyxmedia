"use server";

import { revalidatePath } from "next/cache";
import {
  createLocation,
  updateLocation,
  deleteLocation,
  type LocationInput,
} from "@/lib/db/locations";
import type { InventoryLocation } from "@/types/location";

export async function createLocationAction(input: LocationInput): Promise<InventoryLocation> {
  const location = await createLocation(input);
  revalidatePath("/", "layout");
  revalidatePath("/admin/locations");
  return location;
}

export async function updateLocationAction(id: string, input: LocationInput): Promise<InventoryLocation> {
  const location = await updateLocation(id, input);
  revalidatePath("/", "layout");
  revalidatePath("/admin/locations");
  return location;
}

export async function deleteLocationAction(id: string): Promise<void> {
  await deleteLocation(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/locations");
}
