# Robotics visual-structure correction

## Direction

- Keep Light Company media, routes, copy, and brand assets unchanged.
- Use the robot footage as the primary visual and treat copy as annotation.
- Use one 1,360 px desktop grid, an 8 px spacing rhythm, and four type roles.
- Keep Barlow Semi Condensed for restrained display text, Barlow for body copy, and IBM Plex Mono for data labels.
- Use cold black, white, slate, and Light Company cyan. Remove decorative layers that do not explain the product.

## Work

- [x] Replace oversized global type clamps with a controlled type scale.
- [x] Recompose the hero as an inset cinematic stage with compact copy and one data rail.
- [x] Rebuild the proof, case-study, process, gallery, and CTA sections on the same grid.
- [x] Add stylesheet regression assertions for the desktop hierarchy.
- [x] Verify the real page at desktop and mobile breakpoints, then run the full suite.

## Risks

- Preserve all video paths and production routes.
- Avoid CSS override layers; remove obsolete rules instead of stacking more overrides.
- Do not deploy or push from this branch without a separate request.

---

# Robotics cinematic hero correction

## Direction

- Use the full viewport as the video canvas; center the message over the robot footage.
- Remove the illustrative dashboard card so the centered message and footage carry the hero.
- Use the existing Light Company videos and the repository's ISC-licensed Lucide SVG set.
- Join the hero directly to the proof section with no empty white band.

## Work

- [x] Rebuild the hero markup around the unchanged centered copy.
- [x] Remove the inset-frame and left-column hero rules at every breakpoint.
- [x] Move vector product cues into the existing Stage, Verify, and Learn cards.
- [x] Correct the hero-to-proof transition and white-gap regression.
- [x] Update rendered-layout assertions for the full-bleed hero.
- [x] Verify desktop and mobile renders, then run the complete test and lint gates.

## Risks

- Keep the headline readable without hiding the robotics footage.
- Do not add a third-party runtime or load remote assets.
- Preserve keyboard focus, reduced-motion behavior, and all production links.
