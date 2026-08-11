import type { SiteContent } from "@/types/content";

export interface ContentSectionMeta {
  key: keyof SiteContent;
  label: string;
  description: string;
}

export const contentSections: ContentSectionMeta[] = [
  { key: "company", label: "Company Info", description: "Name, description, contact details, social links." },
  { key: "hero", label: "Homepage Hero", description: "Headline, subheadline, CTAs, hero media." },
  { key: "stats", label: "Stats Bar", description: "The four numbers shown under the hero." },
  { key: "services", label: "Services", description: "Service cards shown on Home and the Services page." },
  { key: "process", label: "Process Steps", description: "The 4-step \"how it works\" section." },
  { key: "testimonials", label: "Testimonials", description: "Client quotes shown on Home." },
  { key: "trustedBrands", label: "Trusted Brands", description: "Client logos shown in the trusted-brands section on Home." },
  { key: "values", label: "Our Values", description: "The 4 value cards on the About page." },
  { key: "timeline", label: "Company Timeline", description: "Milestones shown on the About page." },
];

export function getSectionMeta(key: string): ContentSectionMeta | undefined {
  return contentSections.find((s) => s.key === key);
}
