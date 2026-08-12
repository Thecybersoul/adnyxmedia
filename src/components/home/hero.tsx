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
    <section className="relative overflow-hidden bg-ink pt-16 lg:pt-[72px]">
      {/* The footage is the point, so it plays full-bleed and completely
          unobstructed in its own band — no text ever sits on top of it.
          aspect-video matches the source's native 16:9, so nothing is
          cropped and the billboard is visible exactly as shot. */}
      <div aria-hidden className="relative aspect-video w-full overflow-hidden">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.mediaUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <Noise />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-4 top-4 sm:left-6 sm:top-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
            </span>
            {hero.badge}
          </span>
        </motion.div>
      </div>

      <Container className="relative flex flex-col items-center py-10 sm:py-12 lg:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center font-display text-3xl font-medium leading-[1.08] tracking-tight text-mist sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {hero.headline}
          <br />
          <span className="text-gradient">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-mist-dim sm:text-base px-4"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4"
        >
          <Button href={hero.primaryCtaHref} size="lg" className="w-full sm:w-auto">
            {hero.primaryCtaLabel}
          </Button>
          <Button
            href={hero.secondaryCtaHref}
            size="lg"
            variant="secondary"
            showArrow={false}
            className="w-full border-white/25 bg-white/5 backdrop-blur-md sm:w-auto"
          >
            {hero.secondaryCtaLabel}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
