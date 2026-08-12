"use client";

import { useState } from "react";
import { Field, TextAreaField } from "@/components/admin/field";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import type { HeroContent } from "@/types/content";

export function HeroEditor({ initial }: { initial: HeroContent }) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof HeroContent>(key: K, val: HeroContent[K]) {
    setValue((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await saveContentSection("hero", value);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="space-y-5 rounded-2xl border border-white/10 bg-surface/60 p-6">
        <Field label="Badge text" value={value.badge} onChange={(v) => set("badge", v)} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Headline (plain)" value={value.headline} onChange={(v) => set("headline", v)} />
          <Field
            label="Headline (highlighted)"
            value={value.headlineAccent}
            onChange={(v) => set("headlineAccent", v)}
          />
        </div>
        <TextAreaField
          label="Subheadline"
          value={value.subheadline}
          onChange={(v) => set("subheadline", v)}
          rows={3}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Primary button label"
            value={value.primaryCtaLabel}
            onChange={(v) => set("primaryCtaLabel", v)}
          />
          <Field
            label="Primary button link"
            value={value.primaryCtaHref}
            onChange={(v) => set("primaryCtaHref", v)}
          />
          <Field
            label="Secondary button label"
            value={value.secondaryCtaLabel}
            onChange={(v) => set("secondaryCtaLabel", v)}
          />
          <Field
            label="Secondary button link"
            value={value.secondaryCtaHref}
            onChange={(v) => set("secondaryCtaHref", v)}
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
