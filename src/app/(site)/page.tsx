import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ServicesOverview } from "@/components/home/services-overview";
import { FeaturedLocations } from "@/components/home/featured-locations";
import { Process } from "@/components/home/process";
import { TrustedBrands } from "@/components/home/trusted-brands";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";
import { getContentSection } from "@/lib/db/content";

export default async function Home() {
  const hero = await getContentSection("hero");

  return (
    <>
      <Hero hero={hero} />
      <Stats />
      <FeaturedLocations />
      <ServicesOverview />
      <TrustedBrands />
      <Process />
      <Testimonials />
      <CtaSection />
    </>
  );
}
