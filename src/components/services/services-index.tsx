import { Monitor, Landmark, Signpost, Palette, ClipboardList, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getContentSection } from "@/lib/db/content";

const icons: Record<string, typeof Monitor> = {
  "digital-billboards": Monitor,
  "static-hoardings": Landmark,
  "transit-gantry": Signpost,
  "creative-production": Palette,
  "campaign-management": ClipboardList,
};

export async function ServicesIndex() {
  const services = await getContentSection("services");
  return (
    <section className="relative pb-16">
      <Container>
        <Reveal>
          <nav className="flex flex-wrap justify-center gap-3">
            {services.map((service) => {
              const Icon = icons[service.id] ?? Sparkles;
              return (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-mist-dim transition-colors hover:border-white/20 hover:text-mist"
                >
                  <Icon className="size-4 text-brand-bright" />
                  {service.title}
                </a>
              );
            })}
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
