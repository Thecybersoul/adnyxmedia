import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { getContentSection } from "@/lib/db/content";

export async function TrustedBrands() {
  const brands = await getContentSection("trustedBrands");
  if (brands.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-mist-faint px-4">
          Trusted by brands running campaigns across our network
        </p>
      </Container>
      <div className="mt-8 sm:mt-10">
        <Marquee>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-12 items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
            >
              {brand.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logoUrl} alt={brand.name} className="h-full w-auto object-contain" />
              ) : (
                <span className="font-display text-xl font-medium tracking-tight text-mist-faint sm:text-2xl lg:text-3xl">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
