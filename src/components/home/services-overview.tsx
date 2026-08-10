import Link from "next/link";
import {
  Monitor,
  Landmark,
  Signpost,
  Radar,
  Palette,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { services } from "@/lib/data/site";

const icons = {
  "digital-billboards": Monitor,
  "static-hoardings": Landmark,
  "transit-gantry": Signpost,
  "programmatic-dooh": Radar,
  "creative-production": Palette,
  "campaign-management": ClipboardList,
} as const;

export function ServicesOverview() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="One partner, the full outdoor stack."
            description="From site planning to creative production to live proof-of-play — we run the entire campaign, not just the screen."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-mist-dim transition-colors hover:text-mist"
          >
            All services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.id as keyof typeof icons];
            return (
              <RevealItem key={service.id}>
                <Link
                  href="/services"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-surface-2"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-violet/0 blur-2xl transition-colors duration-500 group-hover:bg-violet/25"
                  />
                  <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-soft">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-mist">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                    {service.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-mist-dim transition-colors group-hover:text-violet-soft">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
