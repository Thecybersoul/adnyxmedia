import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

export async function Stats() {
  const stats = await getContentSection("stats");
  return (
    <section className="relative border-y border-white/10 bg-ink-soft py-16">
      <Container>
        <RevealGroup
          className="flex flex-nowrap items-start justify-between gap-2 sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-6"
          stagger={0.1}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="min-w-0 flex-1 text-center lg:text-left">
              <div className="font-display text-xl font-semibold text-mist sm:text-3xl lg:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <p className="mt-1.5 text-[11px] leading-tight text-mist-dim sm:mt-2 sm:text-sm">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
