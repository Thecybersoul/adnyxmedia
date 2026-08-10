import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { stats } from "@/lib/data/site";

export function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-ink-soft py-16">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="text-center lg:text-left">
              <div className="font-display text-4xl font-semibold text-mist sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <p className="mt-2 text-sm text-mist-dim">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
