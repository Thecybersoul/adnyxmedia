import { NextResponse } from "next/server";
import { supabaseAdmin, ensureBucket, isStorageConfigured } from "@/lib/storage/supabase";
import { STORAGE_BUCKET } from "@/lib/storage/constants";

// Auth is already enforced for all /api/admin/* routes by src/proxy.ts.
export async function POST(request: Request) {
  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: "Media storage isn't configured — set the Supabase Storage env vars." },
      { status: 400 }
    );
  }

  const { filename } = (await request.json()) as { filename?: string };
  if (!filename) {
    return NextResponse.json({ error: "Missing filename" }, { status: 400 });
  }

  await ensureBucket();

  const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const path = `${crypto.randomUUID()}-${safeName}`;

  const { data, error } = await supabaseAdmin!.storage.from(STORAGE_BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to create upload URL" }, { status: 500 });
  }

  const { data: pub } = supabaseAdmin!.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  return NextResponse.json({ path, token: data.token, publicUrl: pub.publicUrl });
}
