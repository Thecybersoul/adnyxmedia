"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Loader2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";
import { resetLocationsAction } from "@/app/admin/(dashboard)/locations/actions";

export function ResetLocationsButton() {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    if (
      !confirm(
        "Reset inventory to the 5 canonical LOM sites? This deletes every location row and re-creates exactly these 5 — any other locations, and any edits to these 5 beyond their photo, will be lost. BTM's current photo/video is kept."
      )
    ) {
      return;
    }
    setResetting(true);
    try {
      await resetLocationsAction();
      router.refresh();
    } finally {
      setResetting(false);
    }
  }

  return (
    <ButtonEl type="button" variant="secondary" onClick={handleReset} disabled={resetting}>
      {resetting ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
      Reset to LOM defaults
    </ButtonEl>
  );
}
