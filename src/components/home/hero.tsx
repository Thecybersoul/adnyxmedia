"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Noise } from "@/components/ui/backdrop";
import type { HeroContent } from "@/types/content";

const DEFAULT_VIDEO_SRC = "/videos/hero-billboard.mp4";
const DEFAULT_MOBILE_VIDEO_SRC = "/videos/hero-billboard-mobile.mp4";

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-md">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
      </span>
      {label}
    </span>
  );
}

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <>
      {/* Mobile: the existing 4:5 crop, with the bottom faded so the
          headline sits directly on the footage. Unlike the desktop shot,
          this one wasn't framed with a guaranteed-clear band — signage
          drifts across both sides of frame through the loop — so the
          fade/content zone is sized generously (~40%, not a tight 20%)
          and kept to headline + CTAs only, no subheadline, to stay clear
          of it at every point in the loop. */}
      <section className="relative overflow-hidden bg-ink lg:hidden">
        <div aria-hidden className="relative aspect-[4/5] w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            src={DEFAULT_MOBILE_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
          />
          <Noise />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-ink from-25% via-ink/90 via-65% to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-4 top-20"
          >
            <Badge label={hero.badge} />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-6 pt-3">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[16rem] text-center font-display text-xl font-medium leading-[1.15] tracking-tight text-mist"
            >
              {hero.headline} <span className="text-gradient">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex w-full flex-col items-center gap-2.5"
            >
              <Button href={hero.primaryCtaHref} size="md" className="w-full justify-center">
                {hero.primaryCtaLabel}
              </Button>
              <Button
                href={hero.secondaryCtaHref}
                size="md"
                variant="secondary"
                showArrow={false}
                className="w-full justify-center border-white/25 bg-white/5 backdrop-blur-md"
              >
                {hero.secondaryCtaLabel}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Desktop: shot and framed specifically so the bottom ~40% is clear
          flyover road through the whole loop — the headline sits directly
          in that band, seamlessly on the footage. */}
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <div aria-hidden className="relative aspect-video w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            src={DEFAULT_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
          />
          <Noise />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-ink from-20% via-ink/90 via-65% to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-10 top-24"
          >
            <Badge label={hero.badge} />
          </motion.div>

          <Container className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-3xl text-center font-display text-4xl font-medium leading-[1.1] tracking-tight text-mist xl:text-5xl"
            >
              {hero.headline} <span className="text-gradient">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-mist-dim xl:text-base"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex items-center justify-center gap-3"
            >
              <Button href={hero.primaryCtaHref} size="md">
                {hero.primaryCtaLabel}
              </Button>
              <Button
                href={hero.secondaryCtaHref}
                size="md"
                variant="secondary"
                showArrow={false}
                className="border-white/25 bg-white/5 backdrop-blur-md"
              >
                {hero.secondaryCtaLabel}
              </Button>
            </motion.div>
          </Container>
        </div>
      </section>
    </>
  );
}
