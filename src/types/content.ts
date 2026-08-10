export interface CompanyContent {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  city: string;
  email: string;
  phone: string;
  address: string;
  social: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  mediaCaption: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  short: string;
  description: string;
  points: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SiteContent {
  company: CompanyContent;
  hero: HeroContent;
  stats: StatItem[];
  services: ServiceItem[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  clients: string[];
  values: ValueItem[];
  timeline: TimelineItem[];
}
