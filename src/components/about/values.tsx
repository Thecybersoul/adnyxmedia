import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

export async function Values() {
  const values = await getContentSection("values");
  return (
    <section className="relative border-y border-white/10 bg-ink-soft py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="What we believe" title="How we operate the network." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((value, i) => (
            <RevealItem key={value.title}>
              <div className="flex h-full gap-5 rounded-2xl border border-white/10 bg-surface/60 p-7">
                <span className="font-display text-2xl font-semibold text-mist-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-mist">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-dim">{value.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
