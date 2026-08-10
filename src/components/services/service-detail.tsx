import {
  Monitor,
  Landmark,
  Signpost,
  Radar,
  Palette,
  ClipboardList,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/site";

const icons = {
  "digital-billboards": Monitor,
  "static-hoardings": Landmark,
  "transit-gantry": Signpost,
  "programmatic-dooh": Radar,
  "creative-production": Palette,
  "campaign-management": ClipboardList,
} as const;

export function ServiceDetails() {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {services.map((service, i) => {
        const Icon = icons[service.id as keyof typeof icons];
        return (
          <section key={service.id} id={service.id} className="relative py-20 scroll-mt-24 lg:py-24">
            <Container>
              <div
                className={cn(
                  "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <Reveal>
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-soft">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-mist sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-mist-dim">
                    {service.description}
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <ul className="space-y-4 rounded-2xl border border-white/10 bg-surface/60 p-8">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet/20 text-violet-soft">
                          <Check className="size-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-mist-dim">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
