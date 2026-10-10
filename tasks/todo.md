# Publish approved Vision designs

- [x] User selected the blue link-preview card; use it for both canonical pages, keep the dark alternative and original image, and preserve the headline wording.
- [x] User approved replacing the public homepage and /robotics. Serve the approved designs at both canonical addresses, preserve existing search/share metadata, and link the corner peels between the public pages.
- [x] Full production build, 22 tests, lint error checks, and static output/assets pass. Prior layouts retained in source for rollback.
- [ ] Push the validated source, publish through the existing public Sites project, and verify both public pages and the new hero asset.
- Transfer finding: bulk source push failed with HTTP 413; the 38 MB hero blob failed twice with HTTP 500. IRL media transfer succeeded. Optimize the full hero below 25 MiB and publish an identical-tree source snapshot based on the existing Sites head, retaining the full original history on GitHub.

# Supplied Robotics landing video

- [x] Inspect the complete supplied IMG_5578 3 (1).mov and make a full-length, silent H.264/SDR web copy with a matching action poster. Preserve the original.
- [x] Replace only the Robotics reference hero video and poster; preserve text, other media, and playback controls. Scope desktop/mobile framing to this hero.
- [x] Full build, all 21 tests, lint error checks, and local HTML/video responses pass. Full 113.3-second silent clip verified; no publication.

# Flush triangular corner peels

- [x] Replace the floating rectangle with a triangular blue reveal pinned to top: 0 / right: 0. Keep both crease endpoints attached while the whole fold opens on hover.
- [x] Add reciprocal IRL and Robotics links on both reference previews; preserve all page content and video placements.
- [x] Reserve navigation clearance and use a compact two-row mobile header so contact and primary actions remain accessible. Keep native first-tap navigation, focus indication, and reduced-motion support.
- [x] Verified source geometry, full build, all 21 tests, lint error checks, and both local preview responses. No publication.

# IRL corner-peel tab

- [x] Add a fixed blue “Check out IRL” link from the Robotics reference preview to `/prism-vision`, with a folded paper corner and brief entry/hover animation.
- [x] Match the existing blue and type; place the tab top-right below the navigation, with the hero video control on the opposite side. Include keyboard focus, safe-area spacing, touch sizing, and reduced-motion support.
- [x] Full build, all 20 tests, lint error checks, and local preview response pass; no publication performed.

# Video framing, marked Robotics swap, and contact email

- [x] Swap only the marked standalone Robotics operation video and the Capability maps chapter, including posters and media descriptions. Keep the hero, gallery, section copy, and playback controls unchanged.
- [x] Fill the four new IRL video frames, preserving full duration. Use clip-specific focal points, cap the wide-screen piano close-up at 4:3 to retain keys and hands, and keep its stage full-height on mobile to avoid empty scroll space.
- [x] Point all site contact links, visible contact addresses, organization metadata, and discovery text to `hi@lightcompany.ai`; preserve email subjects.
- [x] Full build, 19 regression tests, lint error checks, and both local preview responses pass. No publication performed.

# New IRL footage placement

- Keep the approved main-page design, headline, hero, and Robotics sample unchanged.
- Add full desk-timer and gesture-dial clips beside the everyday-use gallery examples.
- Group the two piano clips with learning: the live side view in the gallery, the longer first-person view as a centered cinematic chapter before notebook guidance.
- Preserve portrait framing, complete video duration, muted loops, pause controls, and reduced-motion behavior. Tone-map the HLG originals to SDR browser copies without changing the originals.
- Touch only the main sample HTML/CSS, new media and source records, and regression tests. Confirm source durations, all assets, and the full build/tests.

## Complete

- [x] Added all four full-length clips; originals remain unchanged.
- [x] Grouped the timer and gesture dial in the daily-use gallery, then piano footage with the learning examples.
- [x] Verified portrait orientation, H.264/SDR conversion, and full durations to within one frame of each source.
- [x] All 17 tests, full build, and lint error checks pass; local preview responds successfully.
- [x] Confirmed the original homepage, Robotics sample, and shared behavior/styles are byte-for-byte unchanged from the start of this edit.

# Vision Pro reference sample

- Build the matching main Prism sample at `/prism-vision`, reusing the approved reference typography, spacing, gallery, and motion treatment.
- Preserve the original homepage and both Robotics samples. This is local review only.
- Use actual Prism demos and preserve tall source footage. Convert existing GIFs to controlled, reduced-motion-aware video clips.
- Saved the first Robotics sample in commit `695676e`; it remains at `/robotics`.
- Build the new reference adaptation independently at `/robotics-vision`.
- Match the supplied page: 980px content grid, 80/64/40px section titles, full-screen media, a blurred manifesto transition, and an inline closer-look carousel.
- Preserve The Light Company branding, approved Robotics claims, copy, and media. Keep pilot outcomes identified as estimates.
- Verify the carousel, video controls, reduced motion, mobile layout, and build. Keep both samples local.

## Verification and follow-up

- [x] Desktop and 390px mobile previews checked for both samples; no horizontal overflow.
- [x] Full gallery navigation, manual playback, offscreen pausing, reduced motion, and hidden hero keyboard focus checked.
- [x] Preserve the approved Robotics sample and original homepage; add independent preview routes only.
- [x] Replace 3.1-second main-gallery loops with full newspaper, chess, books, and drawing source videos. Full air hockey uses its inline YouTube player because direct retrieval returned 403; playback verified.
- [x] Replace the Robotics “Set the test condition” visual with the complete 11.833-second user upload; convert HDR to SDR for consistent browser playback.
- [x] Final full build, all 16 tests, and lint error checks pass after the full-video follow-up.

# Connected selector cards

# Robotics single-story sample

## Direction

- Keep the approved Robotics copy, claims, media, routes, and brand identity.
- Replace competing multi-column grids with one centered vertical reading lane.
- Use large system typography, generous white space, and one matched visual at a time.
- Make "See Prism in the lab" a simple vertical media sequence instead of a mosaic.

## Work

- [x] Rebuild the Robotics stylesheet around a restrained single-column system.
- [x] Remove decorative hero and CTA layers that compete with the product footage.
- [x] Update layout regression checks for the new vertical structure.
- [x] Verify desktop and mobile screenshots, motion behavior, and the full test suite.

## Risks

- Do not rewrite approved claims or replace existing product media.
- Keep the sample local until the user explicitly asks to publish it.
- Preserve keyboard focus, responsive navigation, and reduced-motion behavior.

---

## Direction

- Inset both choices as one connected floating card with curved outer edges and a shared bottom shadow.
- Use a clearly thick center seam, a larger Prism mark, and a blue prompt badge with white text.
- Start with equal idle states; reveal an active frame and full-color video only on hover or keyboard focus.

## Work

- [x] Recompose the desktop and mobile selector as one inset connected card.
- [x] Remove forced initial focus and give both choices identical interaction behavior.
- [x] Verify settled, left-hover, right-hover, keyboard-focus, and narrow-screen states.

## Risks

- Preserve the approved selector copy, destinations, videos, and click transition.
- Keep touch targets accessible and avoid layout animation on hover.

---

# Selector hover performance and center divider

## Direction

- Reveal each video in full color on hover and keyboard focus.
- Remove full-screen filter and custom-property animation from the hover path.
- Replace the stretched, dashed zigzag with one continuous solid white center divider.

## Work

- [x] Move hover feedback to compositor-friendly opacity and transform changes.
- [x] Draw continuous desktop and mobile center-divider paths without dash styling.
- [x] Rebuild, run the full checks, and keep the local preview live.

## Risks

- Keep the existing selector copy, destinations, videos, and click transition unchanged.
- Preserve focus parity and reduced-motion behavior.

---

# Full-screen experience selector demo

## Direction

- Keep Omkar's homepage and the restored live Robotics page unchanged behind a launch selector.
- Open with two full-bleed product videos on an electric-blue field.
- Use one clean white line as the divider and one GSAP transition as the signature interaction.
- Let the selected side turn white on hover or keyboard focus, then fill the viewport on activation.

## Work

- [x] Add the two-path selector and responsive mobile composition.
- [x] Bundle GSAP locally and add an interruptible transition into each destination.
- [x] Verify keyboard, reduced-motion, desktop, and mobile behavior in the implementation and regression checks.
- [x] Run the full build and tests, then serve the demo locally for review.

## Risks

- Do not change the existing homepage or Robotics copy.
- Do not publish this selector before the user approves the local demo.

---

# Preserve Omkar site with live Robotics

## Direction

- Keep the current `main` homepage, gallery, privacy page, navigation, and shared brand assets unchanged.
- Restore only the `/robotics` experience from the last approved live Robotics release.
- Keep every existing link to `/robotics` intact so the current site opens the restored page.

## Work

- [ ] Restore the Robotics page, styling, and client script from the approved live release.
- [ ] Update only Robotics-specific regression checks.
- [ ] Verify the full build, tests, lint, and exact change boundary.
- [ ] Merge through protected `main`, publish, and verify the live route.

## Risks

- Do not roll back Omkar's homepage, gallery, privacy page, or shared brand mark.
- Do not publish until the restored route and unchanged routes pass the production checks.

---

# Robotics lab media expansion

## Direction

- Keep the current Robotics copy, product hierarchy, and visual system unchanged.
- Use the supplied policy-evaluation video as the Robotics hero without changing the approved hero copy.
- Treat the supplied video as the motion anchor and the two supplied photos as real-world evidence of the lab and multi-station setup.
- Add the supplied tracking footage to the product process as a fourth, concrete capability proof.
- Expand the existing field gallery into one asymmetric six-item reel instead of adding an unrelated section.
- Preserve source media outside the repository and ship web-optimized derivatives only.

## Work

- [x] Create optimized web derivatives and accessible media descriptions.
- [x] Replace the hero media and add a responsive live-tracking proof card.
- [x] Recompose the field gallery around the new video, two photos, and the three existing clips.
- [x] Add responsive and rendered-markup regression coverage.
- [x] Verify the gallery visually at desktop and mobile sizes, then run the complete test and lint gates.

## Risks

- Do not change approved Robotics copy or CTA labels.
- Keep autoplay video muted, inline, and compatible with reduced-motion behavior.
- Do not publish or push without a separate request.

---

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

# Search and discovery foundation

## Direction

- Keep `https://lightcompany.ai/` as the canonical site; use the verified permanent `lght.co` redirect as an alternate brand signal.
- Target The Light Company, Light Company, projected intelligence, physical AI, robotics evaluation, and Prism through useful visible content rather than keyword repetition.
- Create one distinct projected-intelligence explainer and strengthen crawlable links to Robotics.
- Use schema and metadata only for claims and entities already supported by the site.

## Work

- [x] Add unique titles, descriptions, canonical URLs, social metadata, and structured data to each public route.
- [x] Add a useful `/projected-intelligence` landing page with a strong route to `/robotics`.
- [x] Add `robots.txt`, `sitemap.xml`, and `llms.txt`, then expose them in both Sites and Pages builds.
- [x] Strengthen visible internal anchors between the home page, projected intelligence, Robotics, gallery, and privacy.
- [ ] Add regression coverage, run build and lint, inspect rendered metadata, and publish.

## Risks

- Do not add hidden text, keyword stuffing, fabricated third-party links, fake backlinks, or unsupported claims.
- Do not split ranking signals between `lightcompany.ai` and `lght.co`; the latter must continue to redirect to the canonical domain.
- Keep the approved home hero copy and Robotics headline unchanged.

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

---

# Robotics marketing proof pass

## Direction

- Lead with the customer outcome: 10x faster evaluation cycles.
- Keep supporting numbers large, sparse, and easy to scan in three seconds.
- Replace the electric blue with a darker cyan that belongs to the existing Light Company palette.
- Keep the 20,000-hour claim explicitly framed as a pilot estimate to date.

## Work

- [x] Rewrite the Why Prism section around gambling less, catching regressions, and iterating faster.
- [x] Rebuild the evaluation sheet around one dominant result and three supporting proof points.
- [x] Align the case-study metric with the 20,000-hour pilot estimate.
- [x] Change the Robotics footer lockup to The Light Company.
- [x] Update regression assertions and verify desktop and mobile renders.
- [x] Run the full build, tests, lint, and diff review.

## Risks

- Do not present an unsupported estimate as an audited result.
- Avoid adding more decorative cards or dashboard chrome.
- Preserve the existing hero, media, routes, and CTA labels.


# Prism preorder page revision

- Match the existing Robotics typography, white/gray palette (#fff, #f5f5f7, #1d1d1f, #6e6e73) and blue (#0071e3) controls. Use the existing global navigation and footer.
- Replace the cinematic launch page with a compact two-column product explanation and preorder interest form. The approved robot-arm projection illustration is the main visual.
- Required: full name, work email, company/lab. Optional: use case, role, robot, quantity, product update consent. Save to private D1; success only after the server confirms persistence.
- [x] Existing baseline: build and 39 tests pass.
- [x] Add form, projection assets and approved product PDF; remove the long launch sequence.
- [x] Add validated same-origin POST and additive D1 migration; test invalid, failed and repeated submissions.
- [x] Verify responsive page, playing lab video and real persistence locally. Final build and all 49 tests pass; changed-file lint and diff checks pass. Independent review resolved.
- [x] Verify production migration and a labeled synthetic submission in the live database. The browser showed success; readback confirmed all submitted fields and unchecked update consent.
- [x] Push same branch, update PR, publish, show the live revision. Sites version 25 is live at https://lightcompany.ai/order.
