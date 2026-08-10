import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { Faq } from "@/components/contact/faq";
import { getContentSection } from "@/lib/db/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ADNYX to plan your next outdoor campaign across Bangalore's premium digital billboard network.",
};

export default async function ContactPage() {
  const company = await getContentSection("company");

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's plan your next campaign."
        description="Tell us your goals and timeline — we'll come back with site recommendations and a proposal, usually within one business day."
      />

      <section className="relative pb-24 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
            <ContactForm email={company.email} />
            <ContactInfo />
          </div>
        </Container>
      </section>

      <Faq />
    </>
  );
}
