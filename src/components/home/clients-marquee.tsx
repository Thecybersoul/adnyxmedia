import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { clients } from "@/lib/data/site";

export function ClientsMarquee() {
  return (
    <section className="relative py-12 sm:py-16">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-mist-faint px-4">
          Trusted by brands running campaigns across our network
        </p>
      </Container>
      <div className="mt-6 sm:mt-8">
        <Marquee>
          {clients.map((client) => (
            <span
              key={client}
              className="font-display text-xl font-medium tracking-tight text-mist-faint transition-colors hover:text-mist-dim sm:text-2xl lg:text-3xl"
            >
              {client}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
