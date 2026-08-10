import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ServicesOverview } from "@/components/home/services-overview";
import { FeaturedLocations } from "@/components/home/featured-locations";
import { Process } from "@/components/home/process";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ClientsMarquee />
      <ServicesOverview />
      <FeaturedLocations />
      <Process />
      <Testimonials />
      <CtaSection />
    </>
  );
}
