"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Field, TextAreaField } from "@/components/admin/field";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import type { ServiceItem } from "@/types/content";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ServicesEditor({ initial }: { initial: ServiceItem[] }) {
  const [items, setItems] = useState<ServiceItem[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(index: number, patch: Partial<ServiceItem>) {
    setItems((cur) => cur.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    setSaved(false);
  }

  function addItem() {
    setItems((cur) => [
      ...cur,
      { id: `service-${cur.length + 1}`, title: "New service", short: "", description: "", points: [] },
    ]);
    setSaved(false);
  }

  function removeItem(index: number) {
    setItems((cur) => cur.filter((_, i) => i !== index));
    setSaved(false);
  }

  function updatePoint(index: number, pointIndex: number, value: string) {
    setItems((cur) =>
      cur.map((item, i) =>
        i === index ? { ...item, points: item.points.map((p, j) => (j === pointIndex ? value : p)) } : item
      )
    );
    setSaved(false);
  }

  function addPoint(index: number) {
    setItems((cur) => cur.map((item, i) => (i === index ? { ...item, points: [...item.points, ""] } : item)));
    setSaved(false);
  }

  function removePoint(index: number, pointIndex: number) {
    setItems((cur) =>
      cur.map((item, i) =>
        i === index ? { ...item, points: item.points.filter((_, j) => j !== pointIndex) } : item
      )
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await saveContentSection("services", items);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-surface/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-mist-dim">Service {index + 1}</p>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-md p-1.5 text-mist-faint hover:text-amber"
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label="Title"
                value={item.title}
                onChange={(v) => update(index, { title: v, id: item.id || slugify(v) })}
              />
              <Field
                label="Short description (used on Home)"
                value={item.short}
                onChange={(v) => update(index, { short: v })}
              />
              <TextAreaField
                label="Full description (used on Services page)"
                value={item.description}
                onChange={(v) => update(index, { description: v })}
                rows={3}
              />

              <div>
                <span className="mb-2 block text-sm font-medium text-mist-dim">Feature points</span>
                <div className="space-y-2">
                  {item.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updatePoint(index, pointIndex, e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-2 text-sm text-mist focus:border-brand/40 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removePoint(index, pointIndex)}
                        className="shrink-0 rounded-md p-2 text-mist-faint hover:text-amber"
                        aria-label="Remove point"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addPoint(index)}
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium text-mist-dim hover:text-mist"
                >
                  <Plus className="size-3.5" />
                  Add point
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm font-medium text-mist-dim transition-colors hover:border-white/30 hover:text-mist"
        >
          <Plus className="size-4" />
          Add service
        </button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
