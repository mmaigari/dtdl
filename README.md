# Dantata Town Developers Limited — Website

A production-ready, editorial-luxury real estate marketing site for **Dantata Town Developers Limited (DTDL)** — master-planned communities across Abuja and Kano, Nigeria.

> *The Trusting Development.*

---

## Stack

| Concern          | Choice                                         |
| ---------------- | ---------------------------------------------- |
| Framework        | **Next.js 16** (App Router, Turbopack, RSC)    |
| Language         | TypeScript (strict)                            |
| Styling          | **Tailwind CSS v4** (CSS-first `@theme`)       |
| Animation        | **Framer Motion** + custom Ken Burns / reveals |
| Smooth scroll    | **Lenis** (gated by `prefers-reduced-motion`)  |
| Carousel         | **Embla**                                      |
| Forms            | **React Hook Form + Zod** (`@hookform/resolvers`) |
| Email            | **Resend** (via Next Server Actions)           |
| Icons / fonts    | lucide-react · Fraunces + Manrope + JetBrains Mono |

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build
```

Node 20+ recommended.

---

## Environment

Set the following in `.env.local` (or your deploy host's env vars):

```bash
# Optional — without it, forms still work and payloads are console.logged in dev
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

All four forms (`/contact`, `/careers`, Express Interest, Schedule a Visit) gracefully fall back to a dev log when `RESEND_API_KEY` is absent — useful for local development.

To send real email, point Resend at your verified sender domain and update `from:` in:

- [app/actions/express-interest.ts](app/actions/express-interest.ts)
- [app/actions/schedule-visit.ts](app/actions/schedule-visit.ts)
- [app/contact/actions.ts](app/contact/actions.ts)
- [app/careers/actions.ts](app/careers/actions.ts)

---

## Project structure

```
app/
├ actions/             # server actions (Express Interest, Schedule a Visit)
├ about/               # leadership, vision, values, milestones
├ careers/             # open roles + RHF apply form w/ CV upload
├ contact/             # form + map + direct contact
├ infrastructure/      # capabilities + featured project
├ investors/
├ projects/            # filterable portfolio
│ └ [slug]/            # detail w/ Embla gallery
├ layout.tsx           # SmoothScroll, ExpressInterest provider, transitions
├ page.tsx             # home
├ sitemap.ts | robots.ts
└ globals.css          # all brand tokens + motion utilities

components/
├ motion/              # MagneticButton · AnimatedCounter · Marquee · RevealText
├ Navbar.tsx           # transparent → solid w/ animated underline
├ Footer.tsx           # newsletter capture, gold hairlines
├ Hero.tsx             # Ken Burns + word-stagger reveal
├ ExpressInterestDialog.tsx   # 4-step modal (Contact → Project → Prefs → Review)
├ ScheduleVisitDialog.tsx     # 4-step modal w/ date strip + time/party pills
├ ExpressInterestProvider.tsx # global trigger context for both dialogs
├ ProjectGallery.tsx          # Embla carousel
├ FloatingContact.tsx         # WhatsApp + Call FAB w/ pulse
├ PageTransition.tsx          # AnimatePresence route fade-up
└ SmoothScroll.tsx            # Lenis wrapper (RM-aware)

lib/
├ projects.ts          # project data + helpers
├ jobs.ts              # open positions
└ schemas.ts           # shared Zod schemas (client+server safe)
```

> Schemas live in `lib/schemas.ts` rather than inside `"use server"` files — this is intentional. Re-exporting a Zod schema through a server-action module produces a server-action stub on the client, which breaks `zodResolver`.

---

## Brand system

Tokens live in `app/globals.css` under `@theme`. The full palette:

| Token             | Hex       | Use                              |
| ----------------- | --------- | -------------------------------- |
| `--color-maroon`  | `#990000` | Primary — deep oxblood           |
| `--color-maroon-700` | `#7E0000` | Hover / dark variant           |
| `--color-maroon-300` | `#B54747` | Accents, gradients             |
| `--color-ink`     | `#0E0B0B` | Near-black text & backgrounds    |
| `--color-cream`   | `#FBF8F5` | Warm off-white base              |
| `--color-gold`    | `#C9A24B` | Hairlines, CTA glow, eyebrows    |
| `--color-stone`   | `#8C8A8A` | Muted captions                   |

**Type pairing:** Fraunces (display serif, variable axes) + Manrope (sans) + JetBrains Mono (eyebrows/labels).
**Easing:** every motion uses `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-luxe`).
**Grain:** ~3% opacity SVG noise overlays the body for richness.

---

## Motion language

- **Lenis** smooth scroll, gated by `prefers-reduced-motion`.
- **Hero** — Ken Burns slow zoom + word-by-word clip-path reveal + scroll parallax.
- **Scroll reveals** — `whileInView` with staggered children.
- **Page transitions** — soft fade-up between routes via `AnimatePresence`.
- **Magnetic CTAs** — cursor-attractive primary buttons with a radial gold glow.
- **Stats** — `AnimatedCounter` (cubic ease, RM-aware).
- **Marquee** — partner / estate names (pause on hover).
- **Floating contact** — pulsing maroon FAB → expands to WhatsApp + Call chips.

All heavy motion respects `prefers-reduced-motion`.

---

## Swapping in real DTDL imagery

The site ships with a handful of placeholder portraits and architectural renders from `/public`. To swap in real photography:

1. Drop the new files in [public/](public/) (e.g. `dantata-city-hero.jpg`).
2. Update the `heroImage`, `cardImage`, and `galleryImages` paths in [lib/projects.ts](lib/projects.ts).
3. For leadership portraits, add `portrait: "/leadership/name.jpg"` to the relevant entry in [app/about/page.tsx](app/about/page.tsx) — the grayscale → color hover treatment is already wired up.

---

## Forms

All four forms use **RHF + Zod** with **Resend** as transport.

- **Express Interest** — `useExpressInterest().openInterest(project?)`. Pre-fills project name on detail pages.
- **Schedule a Visit** — `useExpressInterest().openVisit(project?)`. Horizontal date strip (next 10 working days), time & party-size pills.
- **Contact** — [app/contact/ContactForm.tsx](app/contact/ContactForm.tsx).
- **Careers apply** — [app/careers/ApplicationForm.tsx](app/careers/ApplicationForm.tsx). Pill role picker, custom CV upload (PDF/Word, 4MB cap, base64 → Resend attachment), cover note.

Open the dialogs imperatively from any client component:

```tsx
"use client";
import { useExpressInterest } from "@/components/ExpressInterestProvider";

const { openInterest, openVisit } = useExpressInterest();
openInterest("Dantata City");
```

---

## Accessibility

- Semantic landmarks, skip-link, focus styles (gold ring) on every interactive.
- Dialogs: `role="dialog"`, `aria-modal`, ESC to close, body scroll lock.
- All motion gated by `prefers-reduced-motion`.
- Keyboard navigable carousels, accordions, and pill selectors.

---

## SEO

- Per-page `metadata` exports with templated titles.
- OpenGraph + Twitter cards in [app/layout.tsx](app/layout.tsx).
- JSON-LD `RealEstateAgent` on the homepage and `RealEstateListing` on project detail pages.
- [robots.ts](app/robots.ts) + [sitemap.ts](app/sitemap.ts).

---

## Deployment

Optimized for **Vercel**:

```bash
vercel
```

Add `RESEND_API_KEY` to the Vercel project's environment variables before going live.

---

## Conventions

- Brand tokens are the **only** source of color. Don't introduce hex codes inline.
- Animations use the `--ease-luxe` cubic-bezier.
- New forms: define the schema in [lib/schemas.ts](lib/schemas.ts), import into both the server action and the client form.
- New dialogs: register through `ExpressInterestProvider` (or follow its pattern) so body scroll lock and ESC handling stay consistent.
