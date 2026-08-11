import { AlertTriangle } from "lucide-react";
import { isDbConfigured } from "@/lib/db/client";
import { isStorageConfigured } from "@/lib/storage/supabase";

export function DbStatusBanner() {
  const dbReady = isDbConfigured();
  const storageReady = isStorageConfigured();

  if (dbReady && storageReady) return null;

  return (
    <div className="flex items-start gap-3 border-b border-amber/25 bg-amber/10 px-4 py-3 text-sm text-amber sm:px-8">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div>
        {!dbReady && (
          <p>
            No database connected — you&apos;re viewing the site&apos;s built-in default content, and edits can&apos;t be
            saved yet. Set <code className="rounded bg-black/20 px-1 py-0.5">DATABASE_URL</code> (a Vercel/Neon
            Postgres connection string), then run <code className="rounded bg-black/20 px-1 py-0.5">npm run db:migrate</code>{" "}
            and <code className="rounded bg-black/20 px-1 py-0.5">npm run db:seed</code>.
          </p>
        )}
        {dbReady && !storageReady && (
          <p>
            No media storage connected — image/video uploads are disabled. Set{" "}
            <code className="rounded bg-black/20 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="rounded bg-black/20 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
            <code className="rounded bg-black/20 px-1 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> (from your Supabase
            project&apos;s Settings → API page) to enable the media library — the storage bucket is created
            automatically.
          </p>
        )}
      </div>
    </div>
  );
}
