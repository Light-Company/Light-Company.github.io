# Impeccable benchmark refinement

Impeccable 4.8.0 is installed for Codex at `.agents/skills/impeccable`, with project hooks in `.codex/hooks.json`. The native engine is installed locally and ignored by Git; the checked-in launcher retrieves the platform-specific engine when needed. Tooling assets are excluded from application lint.

## Design scope

This is a refinement of the existing dark Prism benchmark workspace in Operate mode. Existing Light Company brand assets, factual copy, model data, uncertainty calculations, and all five product views are retained. Source installation and application changes belong to `design/impeccable-benchmarks`; production is unchanged by this review branch.

## Changes

- Reduced repeated framing and condensed the dataset summary so model rankings carry the page.
- Increased control, label, and data readability; added consistent focus states and retained the existing Lucide icon family.
- Replaced the clipped mobile navigation row with a labeled native view selector. All five views are available.
- Kept model identity and completion visible together on phones, with the model column pinned while scrolling task results.
- Added a useful empty search state and clear-search action, preserving keyboard focus.
- Made context collapsible on phones, kept it visible on desktop, and restored the top of the page when changing views.
- Kept sample download accessible on phones and focused the heading after moving from model details to trial records.

## Verification

The full production build and 51 tests pass. Application lint has no errors; its 704 existing warnings remain. The standalone TypeScript check has the same three pre-existing Cloudflare type errors in `db/index.ts` and `worker/index.ts` (missing `cloudflare:workers`, `Fetcher`, and `D1Database`). These files are unchanged.

Browser checks cover search recovery and focus, comparison swap, untested map cells, mobile view switching, model-to-trial navigation, context disclosure, and page overflow at 320, 390, 900, and 1440 pixels. No browser console errors were recorded. All displayed model results remain illustrative.

Design context was loaded through Impeccable. The existing implementation supplied the design authority for this scoped refinement; PRODUCT.md and DESIGN.md have not been invented. `/impeccable init` can capture broader product context in a follow-up.
