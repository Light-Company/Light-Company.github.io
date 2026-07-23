# Prism Labs marketing site

The refreshed single-page site for PrismOS / Desklight: AI guidance projected
onto physical work.

## What is included

- concrete positioning for robotics and hardware teams
- real prototype footage from the existing Prism media library
- clearly labeled future footage slots for assembly, soldering, and cooking
- an August 20, 2026 San Francisco RSVP flow backed by D1
- responsive layouts, reduced-motion support, and host-aware social metadata

## Local development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`.

## Validation

```bash
npm run build
npm run lint
node --test tests/rendered-html.test.mjs
```

When the RSVP schema changes, regenerate the migration:

```bash
npm run db:generate
```
