"use server";

import { revalidatePath } from "next/cache";
import { createMediaRecord, deleteMediaRecord, getMediaById } from "@/lib/db/media";
import { supabaseAdmin } from "@/lib/storage/supabase";
import { STORAGE_BUCKET } from "@/lib/storage/constants";
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
  if (item && supabaseAdmin) {
    try {
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([item.pathname]);
    } catch (err) {
      console.error(`Failed to delete storage object for media "${id}"`, err);
    }
  }
  await deleteMediaRecord(id);
  revalidatePath("/admin/media");
}
