import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

export async function ContactInfo() {
  const company = await getContentSection("company");
  const items = [
    { icon: MapPin, label: "Office", value: company.address },
    { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: Clock, label: "Hours", value: "Mon – Sat, 9:30 AM – 7:00 PM IST" },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <Reveal key={item.label} delay={i * 0.06}>
          <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-surface/60 p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-bright">
              <item.icon className="size-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-mist-faint">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="mt-1 block text-sm text-mist transition-colors hover:text-brand-bright">
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm text-mist">{item.value}</p>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
