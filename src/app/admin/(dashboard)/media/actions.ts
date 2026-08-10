"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { createMediaRecord, deleteMediaRecord, getMediaById } from "@/lib/db/media";
import type { AssetKind, MediaItem } from "@/types/media";

export async function createMediaRecordAction(input: {
  url: string;
  pathname: string;
  contentType: string | null;
  kind: AssetKind;
  label: string;
  sizeBytes: number | null;
}): Promise<MediaItem> {
  const media = await createMediaRecord(input);
  revalidatePath("/admin/media");
  return media;
}

export async function deleteMediaAction(id: string): Promise<void> {
  const item = await getMediaById(id);
  if (item) {
    try {
      await del(item.url);
    } catch (err) {
      console.error(`Failed to delete blob for media "${id}"`, err);
    }
  }
  await deleteMediaRecord(id);
  revalidatePath("/admin/media");
}
