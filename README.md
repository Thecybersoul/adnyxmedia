# ADNYX — Website Redesign

A modern, animated marketing site for **ADNYX**, a digital billboard media owner in Bangalore. Built with Next.js (App Router), Tailwind CSS v4, and Framer Motion — statically generated for a fast, free deploy on Vercel.

## Stack

- **Next.js 16** (App Router, static generation, Turbopack)
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css`
- **Framer Motion** — scroll reveals, counters, page transitions
- **lucide-react** — icon set
- No database, no server runtime required — every route is statically prerendered.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  app/                    routes (home, /about, /services, /locations, /locations/[slug], /contact)
  components/
    layout/                Navbar, Footer
    ui/                    Buttons, cards, reveal/animation wrappers, backgrounds
    home/, about/, services/, locations/, contact/   page-specific sections
  lib/data/
    site.ts                company info, nav, services, stats, testimonials, values, timeline
    locations.ts            billboard inventory dataset
  types/location.ts         inventory data shape
```

## ⚠️ Replace placeholder content before launch

This site was built without access to the live adnyx.in content (blocked in the build sandbox), so the following is **sample/placeholder data** structured to be a drop-in replacement:

1. **`src/lib/data/site.ts`** — company email/phone/address/social links, testimonials, client names, timeline/founding year. All currently illustrative.
2. **`src/lib/data/locations.ts`** — the 14 sample billboard sites (names, dimensions, resolution, daily impressions, map position). Replace with ADNYX's real inventory. Each entry's `position: {x, y}` is a percentage coordinate on the stylized map in `/locations` — adjust to roughly match real site locations relative to each other.
3. **Billboard photos** — The site uses gradient placeholders and will automatically display real photos when you add them to `public/images/locations/`. See **[IMAGES.md](./IMAGES.md)** for complete instructions on image requirements, naming conventions, and optimization tips.
4. Update social links, and consider adding real Google Business/Maps embed on the Contact page if desired.

## Deploying to Vercel (free tier)

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo — Vercel auto-detects Next.js, no config needed.
3. Deploy. All routes are statically generated, so it comfortably fits Vercel's free Hobby tier (no server functions required except the OG-image route, which is also prerendered at build time).
4. Point your domain (`adnyx.in`) at the Vercel deployment via the Domains tab.

No environment variables are required for the current feature set.
