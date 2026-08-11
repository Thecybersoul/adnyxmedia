import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The anon key is safe to ship to the browser by design (Supabase's own
// convention) — it can only do what the createSignedUploadUrl token from
// our server already authorized, nothing more.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseBrowser: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;
