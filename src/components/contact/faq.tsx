import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const faqs = [
  {
    q: "How quickly can a campaign go live?",
    a: "For available sites, creative can be live within 48–72 hours of approval. For static hoardings, production and mounting typically adds 3–5 days.",
  },
  {
    q: "Can I book a single site or a bundle?",
    a: "Both — book one junction or a multi-site corridor package. We'll recommend a mix based on your audience and budget.",
  },
  {
    q: "Do you handle creative production?",
    a: "Yes. Our in-house studio designs billboard-native creative, or adapts assets you already have for each format and screen size.",
  },
  {
    q: "How is performance reported?",
    a: "Digital sites get daily proof-of-play logs; all campaigns get a post-run report with photographic evidence and traffic estimates.",
  },
];

export function Faq() {
  return (
    <section className="relative border-t border-white/10 bg-ink-soft py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Common questions" align="center" className="mx-auto" />
        <RevealGroup className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface/60">
          {faqs.map((item) => (
            <RevealItem key={item.q} className="p-6">
              <h3 className="font-display text-base font-medium text-mist">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">{item.a}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
