"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";

export function SaveBar({
  onSave,
  saving,
  saved,
  error,
  extra,
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  error: string | null;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-0 mt-8 flex items-center justify-between gap-4 border-t border-white/10 bg-ink/95 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        {extra}
        {saved && !saving && (
          <span className="flex items-center gap-1.5 text-sm text-signal">
            <CheckCircle2 className="size-4" />
            Saved
          </span>
        )}
        {error && <span className="text-sm text-amber">{error}</span>}
      </div>
      <ButtonEl type="button" onClick={onSave} disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving…
          </>
        ) : (
          "Save changes"
        )}
      </ButtonEl>
    </div>
  );
}
