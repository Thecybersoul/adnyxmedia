import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { LocationCard } from "@/components/locations/location-card";
import { locations } from "@/lib/data/locations";

export function FeaturedLocations() {
  const featured = locations.slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Live inventory"
            title="Bangalore's highest-impact junctions."
            description="A snapshot of our network. Every site is mapped, measured and ready to book — see specs, traffic and availability."
          />
          <Link
            href="/locations"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-mist-dim transition-colors hover:text-mist"
          >
            View full inventory
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((location) => (
            <RevealItem key={location.id}>
              <LocationCard location={location} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
