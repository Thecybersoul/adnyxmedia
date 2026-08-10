"use client";

import { motion } from "framer-motion";
import { MapPin, Radio } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GlowOrbs, GridBackdrop, Noise } from "@/components/ui/backdrop";
import type { HeroContent } from "@/types/content";
import type { InventoryLocation } from "@/types/location";

export function Hero({
  hero,
  locations,
}: {
  hero: HeroContent;
  locations: InventoryLocation[];
}) {
  const liveSites = locations.slice(0, 6);

  return (
    <section className="relative overflow-hidden pt-40 pb-24 lg:pt-52 lg:pb-32">
      <GridBackdrop />
      <GlowOrbs />
      <Noise />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist-dim">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
            </span>
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-4xl text-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-mist sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {hero.headline}
          <br />
          <span className="text-gradient">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-mist-dim sm:text-lg px-4"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4"
        >
          <Button href={hero.primaryCtaHref} size="lg" className="w-full sm:w-auto">
            {hero.primaryCtaLabel}
          </Button>
          <Button
            href={hero.secondaryCtaHref}
            size="lg"
            variant="secondary"
            showArrow={false}
            className="w-full sm:w-auto"
          >
            {hero.secondaryCtaLabel}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20"
        >
          <BillboardShowcase sites={liveSites} hero={hero} />
        </motion.div>
      </Container>
    </section>
  );
}

function BillboardShowcase({
  sites,
  hero,
}: {
  sites: InventoryLocation[];
  hero: HeroContent;
}) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-1.5 shadow-[0_0_120px_-20px_rgba(193,60,60,0.35)] backdrop-blur">
        <div className="relative overflow-hidden rounded-[1.3rem] bg-ink">
          <div className="relative aspect-[16/8] overflow-hidden">
            {hero.mediaUrl && hero.mediaType === "video" ? (
              <video
                src={hero.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            ) : hero.mediaUrl && hero.mediaType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.mediaUrl}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(115deg,#E65050_0%,#C13C3C_45%,#7A2020_100%)] opacity-90" />
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:100%_4px] mix-blend-overlay" />
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent"
                  animate={{ y: ["-40%", "340%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                  <Radio className="size-6 text-ink/70" />
                  <p className="font-display text-2xl font-semibold text-ink sm:text-4xl">
                    YOUR BRAND, EVERY SIGNAL.
                  </p>
                  <p className="text-sm text-ink/70">{hero.mediaCaption}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {sites.map((site, i) => (
          <motion.span
            key={site.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist-dim"
          >
            <MapPin className="size-3 text-brand-bright" />
            {site.area}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
