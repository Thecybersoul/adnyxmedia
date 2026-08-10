import { getContentSection } from "@/lib/db/content";

export async function OrganizationJsonLd() {
  const company = await getContentSection("company");
  const data = {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    name: company.legalName,
    alternateName: company.name,
    url: "https://www.adnyx.in",
    description: company.description,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: "Bangalore, India",
    sameAs: [company.social.instagram, company.social.linkedin, company.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
