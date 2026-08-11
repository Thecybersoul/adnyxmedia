import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { STORAGE_BUCKET } from "@/lib/storage/constants";

// Server-only: the service role key bypasses row-level security, which is
// what lets an authenticated admin request (already gated by src/proxy.ts)
// create signed upload URLs and delete objects without needing storage
// policies configured by hand.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createAdminClient(): SupabaseClient | null {
  if (!url || !serviceRoleKey) return null;
  try {
    return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  } catch (err) {
    console.error("Supabase Storage env vars are set but invalid.", err);
    return null;
  }
}

export const supabaseAdmin = createAdminClient();

export function isStorageConfigured(): boolean {
  return supabaseAdmin !== null;
}

// Setup is meant to be just the three env vars — no separate "go create a
// bucket" step in the Supabase dashboard. The bucket is created on first
// use (and the check result cached for the life of this server instance).
let bucketEnsured: Promise<boolean> | null = null;

export function ensureBucket(): Promise<boolean> {
  if (!supabaseAdmin) return Promise.resolve(false);
  if (bucketEnsured) return bucketEnsured;

  bucketEnsured = (async () => {
    const { data } = await supabaseAdmin!.storage.getBucket(STORAGE_BUCKET);
    if (data) return true;

    const { error: createError } = await supabaseAdmin!.storage.createBucket(STORAGE_BUCKET, {
      public: true,
    });
    if (createError && !createError.message.toLowerCase().includes("already exists")) {
      console.error("Failed to create the Supabase Storage bucket.", createError);
      bucketEnsured = null;
      return false;
    }
    return true;
  })();

  return bucketEnsured;
}
