import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { timeline } from "@/lib/data/site";

export function Timeline() {
  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Our journey" title="From one hoarding to a citywide network." />

        <RevealGroup className="relative mt-16 space-y-10">
          <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-white/10 sm:block" />
          {timeline.map((item) => (
            <RevealItem key={item.year} className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-ink font-display text-xs font-semibold text-violet-soft">
                {item.year}
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-surface/60 p-6">
                <h3 className="font-display text-lg font-medium text-mist">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-dim">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
