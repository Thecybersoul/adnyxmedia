import type { Metadata } from "next";
import { listMedia } from "@/lib/db/media";
import { MediaLibraryGrid } from "@/components/admin/media-library-grid";

export const metadata: Metadata = { title: "Media Library" };

export default async function MediaLibraryPage() {
  const media = await listMedia();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-mist">Media Library</h1>
          <p className="mt-1 text-sm text-mist-dim">
            Upload images and videos here, then use them across content sections and locations.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <MediaLibraryGrid initialItems={media} />
      </div>
    </div>
  );
}
