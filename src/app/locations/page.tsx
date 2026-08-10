import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { LocationsExplorer } from "@/components/locations/locations-explorer";
import { CtaSection } from "@/components/home/cta-section";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Locations & Inventory",
  description:
    "Browse ADNYX's full digital billboard and hoarding inventory across Bangalore — filter by zone and format, and view specs, traffic and availability for every site.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live inventory"
        title="Every site. Mapped, measured, ready to book."
        description="Our full network of digital billboards, hoardings and gantry sites across Bangalore — with real specs, traffic estimates and live availability."
      />

      <section className="relative py-16 lg:py-20">
        <Container>
          <LocationsExplorer locations={locations} />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
