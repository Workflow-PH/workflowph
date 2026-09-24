# WorkFlow PH

Volunteer-driven automation community of the Philippines — workshops, community days, and open automation templates for Filipino builders.

## Run it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start
```

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · `sharp`.

## Content

- Event records: `lib/data/events.ts` — every `photos[].src` must exist under `public/`. `value: null` renders as `TBC`; never estimate numbers.
- People: `lib/data/people.ts` — keep `pending: true` until the roster is verified.
- Partners: `lib/data/partners.ts` — `logo` stays undefined until an SVG is supplied (never trace a pubmat).
- Real event/partner photos live under `public/images/`; decorative collage under `public/collage/`; brand files under `public/brand/`.

## Design

The design in `app/`, `components/`, and `app/globals.css` is final. Polish and content only — no restyles, no new motion, no layout changes without approval.
