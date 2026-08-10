"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { Field, NumberField } from "@/components/admin/field";
import { MediaPicker } from "@/components/admin/media-picker";
import { ButtonEl } from "@/components/ui/button";
import { createLocationAction, updateLocationAction } from "@/app/admin/(dashboard)/locations/actions";
import type { InventoryLocation, Zone, MediaType, Availability } from "@/types/location";
import type { LocationInput } from "@/lib/db/locations";

const zoneOptions: Zone[] = ["Central", "North", "South", "East", "West"];
const typeOptions: MediaType[] = ["Digital Billboard", "Static Hoarding", "Transit Media", "Gantry"];
const availabilityOptions: Availability[] = ["Available", "Booked", "Coming Soon"];

const emptyLocation: LocationInput = {
  slug: "",
  name: "",
  area: "",
  zone: "Central",
  type: "Digital Billboard",
  format: "",
  widthFt: 20,
  heightFt: 10,
  resolution: "",
  illuminated: true,
  dailyImpressions: 0,
  landmark: "",
  availability: "Available",
  highlights: [],
  hue: ["#E65050", "#7A2020"],
  position: { x: 50, y: 50 },
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LocationForm({ existing }: { existing?: InventoryLocation }) {
  const router = useRouter();
  const [value, setValue] = useState<LocationInput>(existing ?? emptyLocation);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof LocationInput>(key: K, val: LocationInput[K]) {
    setValue((v) => ({ ...v, [key]: val }));
  }

  function updateHighlight(index: number, val: string) {
    setValue((v) => ({ ...v, highlights: v.highlights.map((h, i) => (i === index ? val : h)) }));
  }

  function addHighlight() {
    setValue((v) => ({ ...v, highlights: [...v.highlights, ""] }));
  }

  function removeHighlight(index: number) {
    setValue((v) => ({ ...v, highlights: v.highlights.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: LocationInput = {
        ...value,
        highlights: value.highlights.filter((h) => h.trim().length > 0),
      };
      if (existing) {
        await updateLocationAction(existing.id, payload);
      } else {
        await createLocationAction(payload);
      }
      router.push("/admin/locations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-surface/60 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Name"
            value={value.name}
            onChange={(v) => set("name", v)}
            placeholder="MG Road Junction Spectacular"
          />
          <Field
            label="Slug (URL)"
            value={value.slug}
            onChange={(v) => set("slug", v)}
            placeholder="mg-road-junction"
          />
          <Field label="Area" value={value.area} onChange={(v) => set("area", v)} placeholder="MG Road" />
          <Field
            label="Landmark"
            value={value.landmark}
            onChange={(v) => set("landmark", v)}
            placeholder="Opposite Trinity Metro Station"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <SelectField label="Zone" value={value.zone} onChange={(v) => set("zone", v as Zone)} options={zoneOptions} />
          <SelectField
            label="Format type"
            value={value.type}
            onChange={(v) => set("type", v as MediaType)}
            options={typeOptions}
          />
          <SelectField
            label="Availability"
            value={value.availability}
            onChange={(v) => set("availability", v as Availability)}
            options={availabilityOptions}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Format label" value={value.format} onChange={(v) => set("format", v)} placeholder="LED Video Wall" />
          <Field
            label="Resolution (optional)"
            value={value.resolution ?? ""}
            onChange={(v) => set("resolution", v)}
            placeholder="P6 · 3840×1920"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <NumberField label="Width (ft)" value={value.widthFt} onChange={(v) => set("widthFt", v)} />
          <NumberField label="Height (ft)" value={value.heightFt} onChange={(v) => set("heightFt", v)} />
          <NumberField
            label="Daily impressions (optional)"
            value={value.dailyImpressions ?? 0}
            onChange={(v) => set("dailyImpressions", v)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-mist-dim">
          <input
            type="checkbox"
            checked={value.illuminated}
            onChange={(e) => set("illuminated", e.target.checked)}
            className="size-4 rounded border-white/20 bg-ink accent-[#c13c3c]"
          />
          Illuminated (24×7 visible)
        </label>

        <div>
          <span className="mb-2 block text-sm font-medium text-mist-dim">Site highlights</span>
          <div className="space-y-2">
            {value.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => updateHighlight(i, e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink px-4 py-2 text-sm text-mist focus:border-brand/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="shrink-0 rounded-md p-2 text-mist-faint hover:text-amber"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-mist-dim hover:text-mist"
          >
            <Plus className="size-3.5" />
            Add highlight
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <NumberField
            label="Map position — X (0–100%)"
            value={value.position.x}
            onChange={(v) => set("position", { ...value.position, x: v })}
          />
          <NumberField
            label="Map position — Y (0–100%)"
            value={value.position.y}
            onChange={(v) => set("position", { ...value.position, y: v })}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-mist-dim">Card gradient — start color</span>
            <input
              type="color"
              value={value.hue[0]}
              onChange={(e) => set("hue", [e.target.value, value.hue[1]])}
              className="h-10 w-full rounded-xl border border-white/10 bg-ink"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-mist-dim">Card gradient — end color</span>
            <input
              type="color"
              value={value.hue[1]}
              onChange={(e) => set("hue", [value.hue[0], e.target.value])}
              className="h-10 w-full rounded-xl border border-white/10 bg-ink"
            />
          </label>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-mist-dim">
            Site photo or video (optional — replaces the gradient tile)
          </span>
          <MediaPicker
            url={value.imageUrl ?? value.videoUrl}
            kind={value.videoUrl ? "video" : value.imageUrl ? "image" : undefined}
            onChange={({ url, kind }) => {
              set("imageUrl", kind === "image" ? url : undefined);
              set("videoUrl", kind === "video" ? url : undefined);
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <ButtonEl
          type="button"
          variant="secondary"
          showArrow={false}
          onClick={() => set("slug", slugify(value.name))}
        >
          Generate slug from name
        </ButtonEl>
        <div className="flex items-center gap-3">
          {error && <span className="text-sm text-amber">{error}</span>}
          <ButtonEl type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : existing ? (
              "Save changes"
            ) : (
              "Create location"
            )}
          </ButtonEl>
        </div>
      </div>
    </form>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-mist-dim">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-2.5 text-sm text-mist focus:border-brand/40 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
