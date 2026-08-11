import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { getContentSection } from "@/lib/db/content";

export async function Testimonials() {
  const testimonials = await getContentSection("testimonials");
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="What advertisers say about running with us."
          align="center"
          className="mx-auto"
        />
      </Container>

      <Reveal delay={0.1}>
        <Container className="mt-14">
          <TestimonialsCarousel testimonials={testimonials} />
        </Container>
      </Reveal>
    </section>
  );
}
