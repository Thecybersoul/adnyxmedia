"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Field, TextAreaField, NumberField } from "@/components/admin/field";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import type { SiteContent } from "@/types/content";

export interface ListFieldConfig<T> {
  name: keyof T;
  label: string;
  type?: "text" | "textarea" | "number";
}

export function ListEditor<T extends Record<string, unknown>>({
  sectionKey,
  initial,
  fields,
  emptyItem,
  titleField,
  newItemLabel,
}: {
  sectionKey: keyof SiteContent;
  initial: T[];
  fields: ListFieldConfig<T>[];
  emptyItem: T;
  titleField: keyof T;
  newItemLabel: string;
}) {
  const [items, setItems] = useState<T[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(index: number, name: keyof T, value: unknown) {
    setItems((cur) => cur.map((item, i) => (i === index ? { ...item, [name]: value } : item)));
    setSaved(false);
  }

  function addItem() {
    setItems((cur) => [...cur, { ...emptyItem }]);
    setSaved(false);
  }

  function removeItem(index: number) {
    setItems((cur) => cur.filter((_, i) => i !== index));
    setSaved(false);
  }

  function moveItem(index: number, dir: -1 | 1) {
    setItems((cur) => {
      const next = [...cur];
      const target = index + dir;
      if (target < 0 || target >= next.length) return cur;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await saveContentSection(sectionKey, items as unknown as SiteContent[typeof sectionKey]);
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
              <p className="text-sm font-medium text-mist-dim">
                {String(item[titleField] ?? "").trim() || newItemLabel}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1.5 text-mist-faint hover:text-mist disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="rounded-md p-1.5 text-mist-faint hover:text-mist disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded-md p-1.5 text-mist-faint hover:text-amber"
                  aria-label="Remove"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const raw = item[field.name];
                if (field.type === "textarea") {
                  return (
                    <div key={String(field.name)} className="sm:col-span-2">
                      <TextAreaField
                        label={field.label}
                        value={String(raw ?? "")}
                        onChange={(v) => updateField(index, field.name, v)}
                        rows={3}
                      />
                    </div>
                  );
                }
                if (field.type === "number") {
                  return (
                    <NumberField
                      key={String(field.name)}
                      label={field.label}
                      value={Number(raw ?? 0)}
                      onChange={(v) => updateField(index, field.name, v)}
                    />
                  );
                }
                return (
                  <Field
                    key={String(field.name)}
                    label={field.label}
                    value={String(raw ?? "")}
                    onChange={(v) => updateField(index, field.name, v)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm font-medium text-mist-dim transition-colors hover:border-white/30 hover:text-mist"
        >
          <Plus className="size-4" />
          Add item
        </button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
