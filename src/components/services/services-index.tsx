import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

export async function ServicesIndex() {
  const services = await getContentSection("services");
  return (
    <section className="relative pb-16">
      <Container>
        <Reveal>
          <nav className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-mist-dim transition-colors hover:border-white/20 hover:text-mist"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
