# Prism order page

## Direction
- Add `/order` to the existing live source ffe0e6a without replacing the homepage or lab evidence.
- Use the supplied Prism concept as the product identity, two new generated studio views, real lab photos, and the existing thermal Light Company flag.
- Palette: void #070c13, midnight #101f31, silver #e5edf4, white #f8fbff, cyan #04b9ef, thermal #f2642a (flag only).
- Type: Barlow Semi Condensed for display, Barlow for reading, IBM Plex Mono for concise labels.
- Signature: a cinematic product reveal followed by an interactive optics/placement explorer and an animated thermal brand flag. Keep the purchase section direct and light.

## Work
- [x] Verify owner deployment/GitHub access; open canonical Sites source and branch from deployed ffe0e6a.
- [x] Baseline: full build and 29 tests pass.
- [x] Add order route, cinematic product page, responsive gallery, accessible motion controls, FAQ, and order module.
- [x] Integrate Stripe Payment Links with exact host validation and inactive fallback until the real offer is supplied.
- [x] Connect existing purchase CTAs, preserve the rest of the site, and add static export/discovery entries.
- [x] Verify desktop/mobile (320, 390, 768 and 1280px), gallery, hardware selectors, pause control, FAQ, full build and 39 tests. Reduced motion CSS reviewed. Changed-file ESLint and diff checks pass. Full lint has no errors and 704 existing warnings. Type check has the same 3 Cloudflare type errors as the unchanged live baseline.
- [ ] Push complete branch and create reviewable pull request; show the local page.

## Release dependencies
- The public site has conflicting historical $250 preorder and $1,500 station offers. User confirmation of the current offer is pending.
- No Stripe link is configured. Do not invent a destination or claim a completed purchase from a return URL.
- Concept images depict a proposed enclosure. Label the concept views and show real prototype/lab images separately.
- Checkout must work on the static Pages build as well as the current Sites Worker. Stripe-hosted Payment Links avoid secret keys in frontend code.

## Validation and assets
- New product/flag imagery is 565 KB total after WebP compression (94.6% less than the originals).
- Both new studio views were generated from the original supplied Prism design; the working prototype and lab images are real photographs.
- Browser verification found no console errors, broken images or horizontal overflow at the tested widths.
- All purchasing CTAs on the live Robotics homepage now enter /order.
