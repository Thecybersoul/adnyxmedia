"use client";

import { useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import { UploadButton } from "@/components/admin/upload-button";
import { deleteMediaAction } from "@/app/admin/(dashboard)/media/actions";
import type { MediaItem } from "@/types/media";

function formatBytes(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibraryGrid({ initialItems }: { initialItems: MediaItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this file? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await deleteMediaAction(id);
      setItems((cur) => cur.filter((i) => i.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  function handleCopy(item: MediaItem) {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div>
      <UploadButton
        label="Upload image or video"
        onUploaded={(media) => setItems((cur) => [media, ...cur])}
      />

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-mist-faint">Nothing uploaded yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-surface/60">
              <div className="aspect-square bg-ink">
                {item.kind === "video" ? (
                  <video src={item.url} muted className="size-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.label} className="size-full object-cover" />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-xs text-mist-dim" title={item.label}>
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-mist-faint">{formatBytes(item.sizeBytes)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-mist-dim hover:text-mist"
                  >
                    {copiedId === item.id ? <Check className="size-3" /> : <Copy className="size-3" />}
                    {copiedId === item.id ? "Copied" : "Copy URL"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-mist-dim hover:border-amber/40 hover:text-amber"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
