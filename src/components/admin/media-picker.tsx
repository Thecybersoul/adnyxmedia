"use client";

import { useEffect, useState } from "react";
import { X, Images } from "lucide-react";
import { UploadButton } from "@/components/admin/upload-button";
import type { MediaItem } from "@/types/media";

export function MediaPicker({
  url,
  kind,
  onChange,
}: {
  url: string | undefined;
  kind: "image" | "video" | undefined;
  onChange: (value: { url: string | undefined; kind: "image" | "video" | undefined }) => void;
}) {
  const [browsing, setBrowsing] = useState(false);

  return (
    <div className="space-y-3">
      {url ? (
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink">
          {kind === "video" ? (
            <video src={url} muted loop autoPlay playsInline className="aspect-video w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="aspect-video w-full object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange({ url: undefined, kind: undefined })}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-ink/80 text-mist hover:bg-ink"
            aria-label="Remove media"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-mist-faint">
          No media selected
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <UploadButton
          label="Upload new"
          onUploaded={(media) => onChange({ url: media.url, kind: media.kind === "video" ? "video" : "image" })}
        />
        <button
          type="button"
          onClick={() => setBrowsing((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-mist-dim transition-colors hover:border-white/25 hover:text-mist"
        >
          <Images className="size-4" />
          Browse library
        </button>
      </div>

      {browsing && (
        <LibraryBrowser
          onSelect={(media) => {
            onChange({ url: media.url, kind: media.kind === "video" ? "video" : "image" });
            setBrowsing(false);
          }}
          onClose={() => setBrowsing(false)}
        />
      )}
    </div>
  );
}

function LibraryBrowser({
  onSelect,
  onClose,
}: {
  onSelect: (media: MediaItem) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data) => setItems(data.media))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-ink p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-mist">Media library</p>
        <button type="button" onClick={onClose} className="text-mist-faint hover:text-mist">
          <X className="size-4" />
        </button>
      </div>
      {items === null ? (
        <p className="mt-3 text-sm text-mist-faint">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-3 text-sm text-mist-faint">No media uploaded yet.</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-brand/50"
            >
              {item.kind === "video" ? (
                <video src={item.url} muted className="size-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt="" className="size-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
