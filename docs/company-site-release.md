# Prism/company website expansion · November 1, 2026

Built on recovered main 4e0dafc. The full source stays on GitHub; the existing Sites project receives a matching release tree with unused media omitted.

## What changed
- 16 authored pages: Prism product/workflow/concept, company/careers/contact/resource hub, four guides and five policy/trust pages (including the replaced privacy page).
- Shared editorial renderer and generated HTML/Worker routes; four practical guides and a downloadable evaluation checklist.
- Scene-history concept with independent position, orientation, clutter, object and lighting examples. It never contacts hardware or an evaluation service.
- Company/footer navigation, investor visibility, no-wrap navigation labels and earlier menu collapse. Escape closes the menu and returns focus.
- Sitemap/canonical metadata and Article/WebPage/Organization/Breadcrumb structured data. Illustrative concepts and existing noindex investor pages are excluded from the sitemap.
- AGENTS.md, PRODUCT.md, public agents.md, llms.txt/llms-full.txt, installed SEO/content-strategy skills and an eight-week campaign kit.
- At the user's final request, the projected-cup staging clip and poster now occupy the main hero. The recovered 44-second lab film moved to the lower reel. Other clip placements and hero headline remain intact.

## Verification
Production build and 60 tests pass, including static/Worker content parity, internal links/assets, metadata and indexing boundaries. Media pruning preserves the original sources and produces a release below the hosting limit. Campaign asset validation passes.

Browser checks covered desktop and phone layouts, product and guide reading, Terms via the footer, investor/navigation links, all five scene-change controls plus baseline, menu Escape behavior, and no horizontal overflow in checked views. Structured data was also observed in the rendered browser DOM. The new hero source/poster and lower lab-film placement are checked in source and browser.

ESLint reports zero errors (705 warnings across the repository). Standalone TypeScript retains three pre-existing Cloudflare environment-type errors: cloudflare:workers, Fetcher and D1Database. The production build passes; this change does not alter those files.

## Scope of verification
This is website verification, not physical calibration or policy evaluation. Search indexing, rankings, field Core Web Vitals and complete accessibility conformance were not measured. New future-facing capabilities remain labeled concepts. No external posts, outreach, paid campaign or analytics enrollment occurred.

Contracting entity, deployment-specific legal/data commitments and actual hiring openings remain owner decisions; the site does not invent them.
