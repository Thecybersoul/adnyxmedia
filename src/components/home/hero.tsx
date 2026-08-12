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
      {/* Mobile: video sits flush under the nav — no gap — at its exact
          native aspect ratio (4:5, no crop/stretch). Whatever screen
          height is left over is a solid continuation of the same tone
          the video's own fade already ends in, so the headline and CTAs
          read as part of the same dark surface, pinned to the bottom of
          the screen rather than floating in the middle.

          min-h-[100svh]: dvh animated (recalculates live as the address
          bar collapses on scroll); 100vh is static but pinned to the
          "large" viewport baseline, so it doesn't account for other
          dynamic OS chrome (e.g. an active-call banner) and can get
          content pushed below the fold on load. svh is fixed to the
          guaranteed-smallest possible visible area, so content is never
          cut off regardless of what chrome is showing, and it doesn't
          recalculate mid-scroll either. */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-16 lg:hidden">
        <div
          aria-hidden
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: "min(125vw, calc(100svh - 64px - 280px))" }}
        >
          <video
            className="h-full w-full object-cover"
            src={DEFAULT_MOBILE_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
          />
          <Noise />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-4 top-4"
          >
            <Badge label={hero.badge} />
          </motion.div>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-end px-6 pb-6 pt-3">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-display text-[1.75rem] font-medium leading-[1.1] tracking-tight text-mist"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 max-w-xs text-center text-sm leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>

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
      </section>

      {/* Desktop: video is a fixed 65% of the screen height (not sized
          off its native aspect ratio) — on wide monitors, aspect-video at
          full width was taller than the whole viewport, so it got capped
          hard by the leftover-space calc and cropped the billboard clean
          out of frame. A fixed vh split is predictable regardless of how
          wide the screen is. Content fills the remaining ~35%. */}
      <section className="relative hidden overflow-hidden bg-ink lg:flex lg:min-h-[100svh] lg:flex-col lg:pt-[72px]">
        <div
          aria-hidden
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: "65svh" }}
        >
          <video
            className="h-full w-full object-cover object-[50%_25%]"
            src={DEFAULT_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
          />
          <Noise />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-10 top-6"
          >
            <Badge label={hero.badge} />
          </motion.div>
        </div>

        <Container className="relative flex flex-1 flex-col items-center justify-end pb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-mist"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-center justify-center gap-3"
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
      </section>
    </>
  );
}
