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
    <section className="relative flex min-h-[600px] flex-col overflow-hidden pt-28 pb-16 sm:min-h-[680px] lg:min-h-[780px] lg:pt-36 lg:pb-20">
      <div aria-hidden className="absolute inset-0">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.mediaUrl}
            alt=""
            className="h-full w-full object-cover object-[50%_38%] lg:object-[42%_center]"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-[50%_38%] lg:object-[42%_center]"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {/* Layered darkening tuned so headline text stays crisp no matter
            what's directly behind it: a uniform base tint, a top-to-bottom
            fade into the next section, and a vignette centered on the text
            column so the footage reads clearly at the edges/corners without
            fighting the copy for attention in the middle. */}
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 46%, rgba(4,4,6,0.92) 0%, rgba(4,4,6,0.7) 40%, rgba(4,4,6,0.25) 72%, rgba(4,4,6,0) 100%)",
          }}
        />
      </div>
      <Noise />

      <Container className="relative flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-md">
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
          className="mx-auto mt-8 max-w-4xl text-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-mist drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl"
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
            className="w-full border-white/25 bg-white/5 backdrop-blur-md sm:w-auto"
          >
            {hero.secondaryCtaLabel}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
