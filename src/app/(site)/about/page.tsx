import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Story } from "@/components/about/story";
import { Values } from "@/components/about/values";
import { Timeline } from "@/components/about/timeline";
import { Stats } from "@/components/home/stats";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "ADNYX is a Bangalore-based digital billboard media owner — planning, building and operating the city's premium outdoor advertising network.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ADNYX"
        title="We own the city's most-watched screens."
        description="A Bangalore-born media owner, building and operating a premium network of digital billboards and hoardings across the city's busiest corridors."
      />
      <Story />
      <Stats />
      <Values />
      <Timeline />
      <CtaSection />
    </>
  );
}
