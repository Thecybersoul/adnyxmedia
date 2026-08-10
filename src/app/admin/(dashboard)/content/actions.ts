"use server";

import { revalidatePath } from "next/cache";
import { setContentSection } from "@/lib/db/content";
import type { SiteContent } from "@/types/content";

export async function saveContentSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K]
): Promise<void> {
  await setContentSection(key, value);
  revalidatePath("/", "layout");
  revalidatePath(`/admin/content/${key}`);
}
