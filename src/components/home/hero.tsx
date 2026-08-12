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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-md">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
      </span>
      {label}
    </span>
  );
}

export function Hero({ hero }: { hero: HeroContent }) {
  const hasImage = hero.mediaType === "image" && !!hero.mediaUrl;
  const videoSrc = hero.mediaType === "video" && hero.mediaUrl ? hero.mediaUrl : DEFAULT_VIDEO_SRC;
  const mobileVideoSrc = hero.mediaType === "video" && hero.mediaUrl ? hero.mediaUrl : DEFAULT_MOBILE_VIDEO_SRC;

  return (
    <>
      {/* Mobile: this footage was shot and cropped specifically for a phone
          screen, with a clear band of sky at the top — so the video plays
          truly full-bleed and the headline sits directly in that clear
          band, seamlessly on top of it, with the billboard fully visible
          below. CTAs anchor near the bottom, over the road, which stays
          just as clear through the whole loop. */}
      <section className="relative flex min-h-dvh flex-col overflow-hidden bg-ink lg:hidden">
        <div aria-hidden className="absolute inset-0">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.mediaUrl} alt="" className="h-full w-full object-cover object-[72%_center]" />
          ) : (
            <video
              className="h-full w-full object-cover object-[72%_center]"
              src={mobileVideoSrc}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <Noise />
          <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/85 to-transparent" />
        </div>

        <div className="relative flex flex-1 flex-col px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge label={hero.badge} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-xs font-display text-3xl font-medium leading-[1.08] tracking-tight text-mist"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 max-w-[15rem] text-sm leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col gap-3 px-6 pb-10"
        >
          <Button href={hero.primaryCtaHref} size="lg" className="w-full justify-center">
            {hero.primaryCtaLabel}
          </Button>
          <Button
            href={hero.secondaryCtaHref}
            size="lg"
            variant="secondary"
            showArrow={false}
            className="w-full justify-center border-white/25 bg-white/5 backdrop-blur-md"
          >
            {hero.secondaryCtaLabel}
          </Button>
        </motion.div>
      </section>

      {/* Desktop: the source footage orbits the billboard, so it stays
          roughly centered in frame throughout — text overlaid on top of it
          would collide with the sign at some point in the loop. It plays
          full-bleed and unobstructed in its own band instead, with the
          headline in a solid panel below. */}
      <section className="relative hidden overflow-hidden bg-ink lg:flex lg:min-h-dvh lg:flex-col lg:pt-[72px]">
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
            className="absolute left-6 top-6"
          >
            <Badge label={hero.badge} />
          </motion.div>
        </div>

        <Container className="relative flex flex-1 flex-col items-center justify-end pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl text-center font-display text-5xl font-medium leading-[1.08] tracking-tight text-mist lg:text-6xl"
          >
            {hero.headline}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-mist-dim"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex items-center justify-center gap-4"
          >
            <Button href={hero.primaryCtaHref} size="lg">
              {hero.primaryCtaLabel}
            </Button>
            <Button
              href={hero.secondaryCtaHref}
              size="lg"
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
