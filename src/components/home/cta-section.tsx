import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GlowOrbs } from "@/components/ui/backdrop";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 px-8 py-16 text-center sm:px-16">
          <GlowOrbs />
          <div className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
                Ready to put your brand on Bangalore&apos;s skyline?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-lg text-base text-mist-dim sm:text-lg">
                Tell us your goals — we&apos;ll shortlist the sites, plan the
                media and have your creative live within days.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get a proposal
                </Button>
                <Button href="/locations" size="lg" variant="secondary" showArrow={false}>
                  Browse inventory
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
