import type {
  CompanyContent,
  HeroContent,
  StatItem,
  ServiceItem,
  ProcessStep,
  Testimonial,
  TrustedBrand,
  ValueItem,
  TimelineItem,
} from "@/types/content";

export const company: CompanyContent = {
  name: "ADNYX",
  legalName: "ADNYX MEDIA LLP",
  tagline: "Your Ad-vantage",
  description:
    "ADNYX is a digital advertising agency focused on outdoor solutions. Our extensive network of premium digital billboards ensures outstanding outdoor advertising services across Bangalore.",
  city: "Bangalore, India",
  email: "sales@adnyx.in",
  phone: "+91 99199 19729",
  whatsapp: "+91 9919919728",
  address: "77/1, 4th Floor, CJR Complex, Outer Ring Road, Bellandur, Bengaluru - 560103",
  social: {
    instagram: "https://instagram.com/adnyx.in",
    linkedin: "https://linkedin.com/company/adnyx",
    facebook: "https://facebook.com/adnyx",
  },
};

export const heroDefault: HeroContent = {
  badge: "5 live sites across Bangalore",
  headline: "Your brand,",
  headlineAccent: "impossible to miss.",
  subheadline:
    "ADNYX owns and operates a premium billboard network at Bangalore's busiest junctions — turning the city's traffic into stages for the brands who show up on them.",
  primaryCtaLabel: "Explore live inventory",
  primaryCtaHref: "/locations",
  secondaryCtaLabel: "Talk to our team",
  secondaryCtaHref: "/contact",
  mediaCaption: "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const stats: StatItem[] = [
  { value: 5, suffix: "+", label: "Premium sites across Bangalore" },
  { value: 20, suffix: "+", label: "Brands run with ADNYX" },
  { value: 99.2, suffix: "%", label: "Campaign uptime, on average" },
];

export const services: ServiceItem[] = [
  {
    id: "digital-billboards",
    title: "Digital Billboards",
    short: "High-resolution DOOH screens at the city's highest-traffic junctions.",
    description:
      "Our LED video walls and unipole screens run brilliant, weatherproof, high-brightness creative around the clock — with day-parting, live content swaps, and rapid campaign turnaround.",
    points: [
      "Full-motion video & animated creative",
      "Day-parting and dynamic scheduling",
      "Remote content management, live updates",
      "P6 / P8 pixel-pitch, sunlight-readable brightness",
    ],
  },
  {
    id: "static-hoardings",
    title: "Static Hoardings",
    short: "Iconic large-format unipoles for sustained, unmissable brand presence.",
    description:
      "For brands that want a fixed, unmistakable presence, our backlit and frontlit hoardings deliver 24×7 visibility in landmark locations across the city.",
    points: [
      "Backlit & frontlit unipole formats",
      "Landmark, high-dwell locations",
      "Flexible 1/3/6/12-month bookings",
      "Full production & mounting handled in-house",
    ],
  },
  {
    id: "transit-gantry",
    title: "Transit & Gantry Media",
    short: "Overhead gantries and transit corridors that command commuter attention.",
    description:
      "Positioned on flyovers, arterial gantries and transit corridors, these formats capture sustained dwell-time from commuters stuck in Bangalore's iconic traffic.",
    points: [
      "Overhead gantry & flyover approach sites",
      "Multi-directional traffic exposure",
      "Ideal for mass-reach launch campaigns",
      "Bundled multi-site corridor packages",
    ],
  },
  {
    id: "creative-production",
    title: "Creative Production",
    short: "In-house design and motion team to build billboard-native creative.",
    description:
      "Our creative studio builds content designed for the medium — legible at speed, bold at scale — from static key art to full motion sequences.",
    points: [
      "Billboard-native design & motion graphics",
      "Rapid creative turnaround (24–48 hrs)",
      "Localization for Bangalore audiences",
      "A/B creative testing across sites",
    ],
  },
  {
    id: "campaign-management",
    title: "Campaign Management",
    short: "End-to-end planning, buying and reporting — handled for you.",
    description:
      "From site selection and audience planning to compliance, mounting and reporting, our team manages the full campaign lifecycle so you don't have to.",
    points: [
      "Site planning & audience mapping",
      "Municipal permits & compliance",
      "Real-time campaign dashboards",
      "Post-campaign performance reports",
    ],
  },
];

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Plan",
    description: "We map your audience against our network to shortlist the highest-impact sites for your goals.",
  },
  {
    step: "02",
    title: "Create",
    description: "Our studio builds billboard-native creative — or adapts your existing assets for the format.",
  },
  {
    step: "03",
    title: "Launch",
    description: "Content goes live across your chosen sites, with full production and compliance handled for you.",
  },
  {
    step: "04",
    title: "Measure",
    description: "Live proof-of-play and audience data land in your dashboard, so you always know what's working.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "ADNYX got our launch campaign live across six junctions in under 72 hours. The Silk Board screen alone drove a visible spike in app installs that week.",
    name: "Ananya Rao",
    role: "Brand Marketing Lead, consumer tech",
  },
  {
    quote:
      "Their planning team actually understands Bangalore traffic patterns — the site recommendations were sharper than anything our media agency proposed.",
    name: "Vikram Shetty",
    role: "Marketing Director, QSR chain",
  },
  {
    quote:
      "Proof-of-play reporting every morning, zero chasing required. It's the most operationally mature OOH partner we've worked with in the city.",
    name: "Priya Menon",
    role: "Media Buyer, growth agency",
  },
];

export const trustedBrands: TrustedBrand[] = [
  { name: "Prestige Group" },
  { name: "Courtyard by Marriott" },
  { name: "British Petroleum" },
  { name: "Hoppr" },
];

export const values: ValueItem[] = [
  {
    title: "Own the asset, own the outcome",
    description:
      "Every screen and structure in our network is owned and maintained by us — no middlemen, no guesswork on availability or condition.",
  },
  {
    title: "Built for Bangalore's traffic",
    description:
      "We plan sites around how this city actually moves — junction dwell time, flyover approaches, tech-corridor commute patterns.",
  },
  {
    title: "Speed without shortcuts",
    description:
      "Rapid creative turnaround and live campaign launches, backed by proper permitting and structural compliance on every site.",
  },
  {
    title: "Numbers you can trust",
    description:
      "Independent audience measurement and real proof-of-play reporting — not modelled estimates.",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "ADNYX founded",
    description: "Started in Bangalore with a simple premise: own the screens, control the quality, and give advertisers one accountable partner from site to screen.",
  },
  {
    year: "2026",
    title: "5 live sites and growing",
    description: "A young, fast-moving network across the city's busiest junctions — with new sites added as demand grows.",
  },
];
