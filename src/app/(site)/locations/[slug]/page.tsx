import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Ratio,
  Eye,
  Radio,
  Signpost,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationCard } from "@/components/locations/location-card";
import { getLocationBySlug, getLocations } from "@/lib/db/locations";
import { LocationImage } from "@/components/locations/location-image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `${location.name} — ${location.area}`,
    description: `${location.type} at ${location.name}, ${location.area}. ${location.widthFt}×${location.heightFt} ft.`,
  };
}

const availabilityTone = {
  Available: "success",
  Booked: "muted",
  "Coming Soon": "warning",
} as const;

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const allLocations = await getLocations();
  const related = allLocations
    .filter((loc) => loc.id !== location.id && (loc.zone === location.zone || loc.type === location.type))
    .slice(0, 3);

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40">
        <Container>
          <Reveal>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mist-dim transition-colors hover:text-mist"
            >
              <ArrowLeft className="size-4" />
              Back to inventory
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={availabilityTone[location.availability]}>{location.availability}</Badge>
                  <Badge tone="muted">{location.type}</Badge>
                  <Badge tone="muted">{location.zone} Bangalore</Badge>
                </div>
                <h1 className="mt-5 font-display text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
                  {location.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-mist-dim">
                  <MapPin className="size-4 shrink-0 text-brand-bright" />
                  {location.area} · {location.landmark}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <LocationImage
                  slug={location.slug}
                  name={location.name}
                  area={location.area}
                  hue={location.hue}
                  imageUrl={location.imageUrl}
                  videoUrl={location.videoUrl}
                  hasNightImage={location.hasNightImage}
                  priority={true}
                  className="mt-8 aspect-[16/9] rounded-2xl border border-white/10"
                />
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8">
                  <h2 className="font-display text-lg font-medium text-mist">Site highlights</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {location.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-xl border border-white/10 bg-surface/60 px-4 py-3 text-sm text-mist-dim"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <div className="sticky top-28 rounded-2xl border border-white/10 bg-surface/60 p-7">
                <h2 className="font-display text-lg font-medium text-mist">Site specifications</h2>
                <dl className="mt-6 space-y-5">
                  <Spec icon={Ratio} label="Dimensions" value={`${location.widthFt} × ${location.heightFt} ft`} />
                  {location.resolution && (
                    <Spec icon={Radio} label="Resolution" value={location.resolution} />
                  )}
                  <Spec icon={Signpost} label="Format" value={location.format} />
                  {location.dailyImpressions && (
                    <Spec icon={Eye} label="Daily impressions" value={`~${formatImpressions(location.dailyImpressions)}`} />
                  )}
                  {location.gps && <Spec icon={MapPin} label="GPS" value={location.gps} />}
                </dl>

                <div className="mt-8 space-y-3">
                  <Button href="/contact" className="w-full justify-center">
                    Enquire about this site
                  </Button>
                  <Button href="/locations" variant="secondary" showArrow={false} className="w-full justify-center">
                    View all inventory
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="relative border-t border-white/10 bg-ink-soft py-20">
          <Container>
            <h2 className="font-display text-2xl font-medium tracking-tight text-mist">
              Similar sites nearby
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2 text-sm text-mist-dim">
        <Icon className="size-4 text-brand-bright" />
        {label}
      </dt>
      <dd className="text-sm font-medium text-mist">{value}</dd>
    </div>
  );
}

function formatImpressions(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M/day`;
  return `${Math.round(n / 1000)}K/day`;
}
