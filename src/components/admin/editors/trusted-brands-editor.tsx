"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Field } from "@/components/admin/field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import type { TrustedBrand } from "@/types/content";

export function TrustedBrandsEditor({ initial }: { initial: TrustedBrand[] }) {
  const [items, setItems] = useState<TrustedBrand[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(index: number, patch: Partial<TrustedBrand>) {
    setItems((cur) => cur.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    setSaved(false);
  }

  function addItem() {
    setItems((cur) => [...cur, { name: "" }]);
    setSaved(false);
  }

  function removeItem(index: number) {
    setItems((cur) => cur.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await saveContentSection(
        "trustedBrands",
        items.filter((item) => item.name.trim().length > 0)
      );
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-surface/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-mist-dim">{item.name.trim() || "New brand"}</p>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-md p-1.5 text-mist-faint hover:text-amber"
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <Field label="Brand name" value={item.name} onChange={(v) => update(index, { name: v })} />
            <div className="mt-4">
              <span className="mb-2 block text-sm font-medium text-mist-dim">Logo (optional)</span>
              <MediaPicker
                url={item.logoUrl}
                kind="image"
                onChange={({ url }) => update(index, { logoUrl: url })}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex min-h-32 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm font-medium text-mist-dim transition-colors hover:border-white/30 hover:text-mist"
        >
          <Plus className="size-4" />
          Add brand
        </button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
