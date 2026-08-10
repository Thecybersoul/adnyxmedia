"use client";

import { motion } from "framer-motion";
import { MapPin, Radio } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GlowOrbs, GridBackdrop, Noise } from "@/components/ui/backdrop";
import { locations } from "@/lib/data/locations";

export function Hero() {
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
            </span>
            60+ live sites across Bangalore
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-4xl text-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-mist sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The city is your
          <br />
          <span className="text-gradient">canvas after dark.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-mist-dim sm:text-lg px-4"
        >
          ADNYX owns and operates Bangalore&apos;s premium digital billboard
          network — turning the city&apos;s busiest junctions into stages for
          the brands who show up on them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4"
        >
          <Button href="/locations" size="lg" className="w-full sm:w-auto">
            Explore live inventory
          </Button>
          <Button href="/contact" size="lg" variant="secondary" showArrow={false} className="w-full sm:w-auto">
            Talk to our team
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20"
        >
          <BillboardShowcase sites={liveSites} />
        </motion.div>
      </Container>
    </section>
  );
}

function BillboardShowcase({ sites }: { sites: typeof locations }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {sites.map((site, i) => (
          <motion.span
            key={site.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist-dim"
          >
            <MapPin className="size-3 text-violet-soft" />
            {site.area}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
