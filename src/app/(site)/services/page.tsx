import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesIndex } from "@/components/services/services-index";
import { ServiceDetails } from "@/components/services/service-detail";
import { Process } from "@/components/home/process";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital billboards, static hoardings, transit and gantry media, creative production and full campaign management — from Bangalore's ADNYX network.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every format. One accountable partner."
        description="We plan, produce and operate the full outdoor media mix — from LED walls to landmark hoardings."
      />
      <ServicesIndex />
      <ServiceDetails />
      <Process />
      <CtaSection />
    </>
  );
}
