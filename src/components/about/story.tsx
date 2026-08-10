import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

export async function Story() {
  const company = await getContentSection("company");
  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-bright">
              Our story
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-mist sm:text-4xl">
              Named for the night — built for the city.
            </h2>
          </Reveal>
          <div className="space-y-5 text-base leading-relaxed text-mist-dim">
            <Reveal delay={0.06}>
              <p>
                <span className="text-mist">ADNYX</span> takes its name from
                Nyx — in Greek myth, the primordial goddess of night. It&apos;s
                a fitting namesake: our screens do their best work after dark,
                when Bangalore&apos;s skyline becomes a canvas of light.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>{company.description}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                We&apos;re a media owner first — every hoarding and LED
                screen in our network is planned, built, permitted and
                maintained by our own team, so brands get a single point of
                accountability from site to screen.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
