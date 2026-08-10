# ADNYX — Website + Admin Dashboard

A modern, animated marketing site for **ADNYX**, a digital billboard media owner in Bangalore, with a built-in `/admin` dashboard for editing every piece of site content, inventory, and media — no code changes needed after setup.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — theme tokens (brand red palette) in `src/app/globals.css`
- **Framer Motion** — scroll reveals, counters, page transitions
- **Neon Postgres** (`@neondatabase/serverless`) — stores editable content, so the site's public pages render dynamically
- **Vercel Blob** (`@vercel/blob`) — image/video storage for the media library
- **Resend + Zod** — the `/contact` form posts to `src/app/api/contact/route.ts`, which validates input and emails the enquiry (rate-limited); without `RESEND_API_KEY` set it still accepts submissions, just without sending mail
- **lucide-react** — icon set

The public site has a **built-in fallback**: with no database connected, every page renders the same content it always did (from `src/lib/data/`), so the site works immediately with zero setup. Connecting a database unlocks the `/admin` dashboard for live editing.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Without any environment variables set, the public site works fully (fallback content) but `/admin` will show a "no database connected" notice and can't save changes.

## Enabling the admin dashboard

1. **Create a Postgres database.** In your Vercel project, go to Storage → Create Database → choose the Neon/Postgres integration. This sets a `DATABASE_URL` env var automatically once attached (or grab it from any Postgres provider).
2. **Create a Blob store.** Storage → Create Database → Blob. This gives you a `BLOB_READ_WRITE_TOKEN`.
3. **Set an admin password and session secret.** Add `ADMIN_PASSWORD` (whatever you want to sign in with) and `ADMIN_SESSION_SECRET` (a random string — `openssl rand -base64 32`) as env vars.
4. **Copy `.env.example` to `.env.local`** and fill in the four values above for local dev (`vercel env pull .env.local` will do this automatically once the env vars are set in your Vercel project).
5. **Run the migration and seed scripts** once your `DATABASE_URL` is set:
   ```bash
   npm run db:migrate   # creates tables
   npm run db:seed      # loads the current placeholder content as a starting point
   ```
6. Visit `/admin` and sign in with `ADMIN_PASSWORD`.

From `/admin` you can edit: company info, the homepage hero (including swapping in a photo/video), the stats bar, services, the "how it works" steps, testimonials, the client marquee, About page values/timeline, and the full locations inventory (add/edit/delete sites, including per-site photos/videos). All uploads go through the Media Library, backed by Vercel Blob.

## Project structure

```
src/
  app/
    (site)/                 public routes — home, /about, /services, /locations, /locations/[slug], /contact
    admin/                  /admin dashboard (login + protected dashboard route group)
    api/admin/              Blob upload handshake + media list API, used by the admin UI
  components/
    layout/, ui/            Navbar, Footer, buttons, cards, reveal/animation wrappers
    home/, about/, services/, locations/, contact/   page-specific sections (now async, DB-backed w/ fallback)
    admin/                  admin shell, content/location editors, media picker & library
  lib/
    data/                    fallback content (site.ts, locations.ts) — also used to seed the DB
    db/                      Postgres client + content/locations/media data-access (all with fallback reads)
    auth/                    admin password check + signed session cookie
    admin/content-sections.ts   config describing each editable content section
  types/                     content.ts, location.ts, media.ts — shared shapes
scripts/
  db-migrate.ts              creates tables from src/lib/db/schema.sql
  db-seed.ts                 loads src/lib/data/* into the database
```

**Architecture note:** because content can change at runtime via `/admin`, the public `(site)` pages are rendered dynamically (server-rendered per request) rather than fully static — see `export const dynamic = "force-dynamic"` in `src/app/(site)/layout.tsx`. This is what makes edits show up immediately without a redeploy. It's a small trade from the original fully-static build, but well within Vercel's free Hobby tier for a normal-traffic marketing site.

## ⚠️ Content still needs a final pass

The logo and core company details (address, phone, WhatsApp, real client names) are now the real thing. What's still placeholder:

1. **`src/lib/data/locations.ts`** — the 14 sample billboard sites (names, dimensions, resolution, daily impressions, map position) are illustrative. Replace with ADNYX's real inventory — either edit the file directly, or (once a database is connected) manage the whole inventory from `/admin/locations`.
2. **Billboard photos** — two ways to add them: drop files into `public/images/locations/<slug>.jpg` (see **[IMAGES.md](./IMAGES.md)** for naming/sizing), or upload per-site photos/videos from `/admin` (stored in Vercel Blob) — the admin upload takes priority when both are present.
3. Testimonials, timeline, and services copy are still illustrative — edit from `/admin/content/*` once a database is connected, or directly in `src/lib/data/site.ts`.
4. Consider adding a real Google Business/Maps embed on the Contact page.

## Deploying to Vercel (free tier)

1. Push this repo to GitHub (already the case if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo — Next.js is auto-detected.
3. In the Vercel dashboard, attach a Postgres (Neon) database and a Blob store (Storage tab), and set `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` under Environment Variables.
4. Deploy, then run `npm run db:migrate && npm run db:seed` locally with the deployed `DATABASE_URL` (via `vercel env pull`) to initialize the database.
5. Optionally set `RESEND_API_KEY` (from [resend.com](https://resend.com)), `RESEND_FROM_EMAIL`, and `CONTACT_EMAIL` to have the contact form send real emails.
6. Point your domain (`adnyx.in`) at the deployment via the Domains tab.
