"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Noise } from "@/components/ui/backdrop";
import type { HeroContent } from "@/types/content";

const DEFAULT_VIDEO_SRC = "/videos/hero-billboard.mp4";

export function Hero({ hero }: { hero: HeroContent }) {
  const hasImage = hero.mediaType === "image" && !!hero.mediaUrl;
  const videoSrc = hero.mediaType === "video" && hero.mediaUrl ? hero.mediaUrl : DEFAULT_VIDEO_SRC;

  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div aria-hidden className="absolute inset-0">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.mediaUrl}
            alt=""
            className="h-full w-full object-cover object-[50%_38%] sm:object-[50%_30%] lg:object-center"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-[54%_40%] sm:object-[52%_32%] lg:object-center"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>
      <Noise />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist-dim backdrop-blur-sm">
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
      </Container>
    </section>
  );
}
