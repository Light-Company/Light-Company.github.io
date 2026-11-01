# The Light Company web design system

The site presents Prism through real workcell footage, direct product language and interfaces people can inspect. The recovered blue-beam identity, local fonts, lab film and ASCII footer are the shared brand foundation.

## Visual language

- Ink `#08090a` is the page background; chalk `#f5f4ef` is primary text. Secondary text is `#b9bec7` and utility text `#a1a6b0`.
- Beam blue `#3cb4ff` marks actions, selected states and the projected guidance visible in the footage. Do not use repeated glows as decoration.
- Satoshi carries headings at restrained sizes; Inter carries reading and interface text. Plex Mono is reserved for real metadata, step numbers and measurements.
- Product headings top out at 48px; company and guide headings at 42px; reference headings at 38px. Body text is 16–17px, with a maximum reading measure around 72 characters.
- Media is evidence and explanation. Keep real projection/workcell material visible in the first product viewport. Preserve accurate alt text, captions, source and poster together. Do not replace footage with synthetic dashboards.
- Borders group related information. Avoid making every paragraph a card. Rounded media and tool frames use a small radius; navigation and button geometry inherit the recovered site.

## Four page families

1. **Product and workflow** — split introduction and real workcell media, a compact section index, feature sections with title and explanation, sequential workflow steps. Scene history places the interactive example immediately after its short introduction.
2. **Resources and articles** — the resource hub uses full-width guide rows, then specific links to films and research. Articles use a short introduction, reading metadata, a stable section index and a narrow reading column.
3. **Company and action** — Company pairs a normal-size introduction with the actual founders photograph. Careers explains areas of work without fabricated openings. Contact exposes the email address and routes immediately.
4. **Reference and trust** — compact page titles, update notes, readable sections and a persistent desktop index. No hero image or repeated conversion block.

## Implementation

`lib/company-site.mjs` selects a layout from the existing page path. Content remains in `lib/company-content.mjs`, `lib/company-guides.mjs` and `lib/company-legal.mjs`.

The renderer supports an optional `heroMedia` object on a page and an optional `media` object on each section:

```js
{ src, poster, alt, caption, type: "video" | "image" }
```

Existing lead figures remain supported. The workflow can promote its existing staging figure into the first viewport without repeating it below. Existing section IDs, scene-control selectors and machine-readable metadata remain stable.

`public/site/company/company.css` defines the inner-page layouts and shared footer treatment. It inherits base fonts, colors, controls, navigation behavior and reduced-motion handling from the recovered `lc` system.

## Copy and evidence

Use the supplied page headings and direct product descriptions. Explain what Prism does before introducing its metaphor. Avoid theatrical slogans, oversized copy and repeated caveats. Keep sample benchmark data labeled where it is read. A recorded lab film, an interactive example and a measured result are different types of content.

## Review standards

Check desktop, intermediate and phone widths. A first-time visitor should find the product explanation and physical media without scrolling through an empty cover. Benchmarks should expose useful controls and data in the first viewport. Navigation labels stay on one line; the menu collapses before crowding. Keep visible focus, touch-friendly controls, reduced motion, captions and semantic reading order. Preserve the ASCII footer as one closing brand moment.
