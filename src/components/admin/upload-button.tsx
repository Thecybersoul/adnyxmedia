"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Loader2, Upload } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";
import { createMediaRecordAction } from "@/app/admin/(dashboard)/media/actions";
import type { MediaItem } from "@/types/media";

export function UploadButton({
  onUploaded,
  label = "Upload file",
}: {
  onUploaded: (media: MediaItem) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob/upload",
      });

      const kind = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : "other";

      const media = await createMediaRecordAction({
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType ?? file.type,
        kind,
        label: file.name,
        sizeBytes: file.size,
      });

      onUploaded(media);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleChange}
      />
      <ButtonEl
        type="button"
        variant="secondary"
        showArrow={false}
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {busy ? "Uploading…" : label}
      </ButtonEl>
      {error && <p className="mt-2 text-xs text-amber">{error}</p>}
    </div>
  );
}
