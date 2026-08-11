"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types/content";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 20;
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            data-card
            className="flex h-full w-[85vw] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-surface/60 p-7 sm:w-[380px]"
          >
            <Quote className="size-6 text-brand-bright" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-mist-dim">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="text-sm font-medium text-mist">{t.name}</p>
              <p className="text-xs text-mist-faint">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-mist-dim transition-colors hover:border-white/25 hover:text-mist"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-mist-dim transition-colors hover:border-white/25 hover:text-mist"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
