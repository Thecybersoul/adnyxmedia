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

          min-h-screen (100vh, not dvh): dvh tracks the mobile browser's
          real-time viewport, which changes as the address bar
          collapses/expands during scroll — that made this section (and
          the flex-1 gap below the video) visibly stretch and snap while
          scrolling. 100vh is computed once and doesn't recalculate on
          scroll, so it stays stable. */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink pt-16 lg:hidden">
        <div aria-hidden className="relative w-full shrink-0 aspect-[4/5] overflow-hidden">
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

        <div className="relative flex flex-1 flex-col items-center justify-end px-6 pb-7 pt-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-display text-3xl font-medium leading-[1.1] tracking-tight text-mist"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2.5 max-w-xs text-center text-sm leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex w-full flex-col items-center gap-2.5"
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

      {/* Desktop: same pattern — video flush under the nav at its native
          16:9, leftover height becomes a solid dark panel with the
          headline/CTAs pinned to the bottom of the screen. */}
      <section className="relative hidden overflow-hidden bg-ink lg:flex lg:min-h-screen lg:flex-col lg:pt-[72px]">
        <div
          aria-hidden
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: "min(56.25vw, calc(100vh - 72px - 280px))" }}
        >
          <video
            className="h-full w-full object-cover"
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

        <Container className="relative flex flex-1 flex-col items-center justify-end pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center font-display text-5xl font-medium leading-[1.05] tracking-tight text-mist xl:text-6xl"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center justify-center gap-3"
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
