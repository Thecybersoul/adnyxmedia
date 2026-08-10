import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { process } from "@/lib/data/site";

export function Process() {
  return (
    <section className="relative border-y border-white/10 bg-ink-soft py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From plan to live screen in days, not weeks."
          align="center"
          className="mx-auto"
        />

        <RevealGroup className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          {process.map((item) => (
            <RevealItem key={item.step} className="relative">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-white/15 bg-ink font-display text-sm font-semibold text-violet-soft">
                {item.step}
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-mist">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
