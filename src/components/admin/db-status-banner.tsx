import { AlertTriangle } from "lucide-react";
import { isDbConfigured } from "@/lib/db/client";

export function DbStatusBanner() {
  const dbReady = isDbConfigured();
  const blobReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (dbReady && blobReady) return null;

  return (
    <div className="flex items-start gap-3 border-b border-amber/25 bg-amber/10 px-8 py-3 text-sm text-amber">
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
        {dbReady && !blobReady && (
          <p>
            No media storage connected — image/video uploads are disabled. Set{" "}
            <code className="rounded bg-black/20 px-1 py-0.5">BLOB_READ_WRITE_TOKEN</code> (from a Vercel Blob store)
            to enable the media library.
          </p>
        )}
      </div>
    </div>
  );
}
