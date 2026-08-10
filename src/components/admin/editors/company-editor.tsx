"use client";

import { useState } from "react";
import { Field, TextAreaField } from "@/components/admin/field";
import { SaveBar } from "@/components/admin/save-bar";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import type { CompanyContent } from "@/types/content";

export function CompanyEditor({ initial }: { initial: CompanyContent }) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CompanyContent>(key: K, val: CompanyContent[K]) {
    setValue((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  function setSocial(key: keyof CompanyContent["social"], val: string) {
    setValue((v) => ({ ...v, social: { ...v.social, [key]: val } }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await saveContentSection("company", value);
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Display name" value={value.name} onChange={(v) => set("name", v)} />
          <Field label="Legal name" value={value.legalName} onChange={(v) => set("legalName", v)} />
        </div>
        <Field label="Tagline" value={value.tagline} onChange={(v) => set("tagline", v)} />
        <TextAreaField
          label="Description"
          value={value.description}
          onChange={(v) => set("description", v)}
          rows={3}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="City" value={value.city} onChange={(v) => set("city", v)} />
          <Field label="Email" value={value.email} onChange={(v) => set("email", v)} type="email" />
          <Field label="Phone" value={value.phone} onChange={(v) => set("phone", v)} />
          <Field label="Address" value={value.address} onChange={(v) => set("address", v)} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field
            label="Instagram URL"
            value={value.social.instagram}
            onChange={(v) => setSocial("instagram", v)}
          />
          <Field
            label="LinkedIn URL"
            value={value.social.linkedin}
            onChange={(v) => setSocial("linkedin", v)}
          />
          <Field
            label="X / Twitter URL"
            value={value.social.twitter}
            onChange={(v) => setSocial("twitter", v)}
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} error={error} />
    </div>
  );
}
