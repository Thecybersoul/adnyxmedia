"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";

export function StringListEditor({
  sectionKey,
  initial,
  placeholder,
}: {
  sectionKey: "clients";
  initial: string[];
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(index: number, value: string) {
    setItems((cur) => cur.map((v, i) => (i === index ? value : v)));
    setSaved(false);
  }

  function addItem() {
    setItems((cur) => [...cur, ""]);
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
        sectionKey,
        items.filter((v) => v.trim().length > 0)
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
      <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => update(index, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-ink px-4 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:border-brand/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="shrink-0 rounded-md p-2 text-mist-faint hover:text-amber"
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-mist-dim hover:text-mist"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
