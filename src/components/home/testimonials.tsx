import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { testimonials } from "@/lib/data/site";

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="What advertisers say about running with us."
          align="center"
          className="mx-auto"
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/60 p-7">
                <Quote className="size-6 text-violet-soft" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-mist-dim">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-mist">{t.name}</p>
                  <p className="text-xs text-mist-faint">{t.role}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
