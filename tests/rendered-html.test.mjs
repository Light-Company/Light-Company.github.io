import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/page.tsx", import.meta.url);
const layoutUrl = new URL("../app/layout.tsx", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);
const markUrl = new URL("../public/brand/light-company-mark.svg", import.meta.url);

test("keeps the positioning concrete, adopts Light Company, and retains the demo CTA", async () => {
  const page = await readFile(pageUrl, "utf8");

  assert.match(page, /Light Company/);
  assert.match(page, /src="\/brand\/light-company-mark\.svg"/);
  assert.match(page, /AI That Points to the Work\./);
  assert.match(page, /A lamp that sees the workbench, understands the task/);
  assert.match(page, /High-Mix Robotics Benches/);
  assert.match(page, /Apple Vision Pro infrastructure engineer/i);
  assert.match(page, /action="\/api\/rsvp"/);
  assert.match(page, /Reserve My Seat/);
  assert.match(page, /new Intl\.DateTimeFormat/);
  assert.match(page, /Next Public Captures/);
  assert.doesNotMatch(page, /future of spatial computing/i);
  assert.doesNotMatch(page, /light[\s.]+intelligence[\s.]+forward/i);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton/i);
});

test("uses the cropped transparent vector mark from the supplied logo", async () => {
  const [page, css, mark] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(cssUrl, "utf8"),
    readFile(markUrl, "utf8"),
  ]);

  assert.match(mark, /viewBox="128 124 225 183"/);
  assert.match(mark, /linearGradient id="projection-beam"/);
  assert.match(mark, /stroke="#0A1118"/);
  assert.doesNotMatch(mark, /<rect|fill="#fff"|fill="#ffffff"/i);
  assert.doesNotMatch(page, /light-mark-(glow|beam|blade)/);
  assert.doesNotMatch(css, /\.light-mark-(glow|beam|blade)/);
});

test("makes IMG_5010 the hero and restores every original-site video", async () => {
  const page = await readFile(pageUrl, "utf8");
  const expectedVideos = [
    "img-5010.mp4",
    "founder-intro.mp4",
    "registered-guidance.mp4",
    "hero-workbench.mp4",
    "object-measurement.mp4",
    "measure.mp4",
    "overhead.mp4",
    "track-person.mp4",
    "object.mp4",
    "scene-scan.mp4",
    "room-layout.mp4",
    "room-seg.mp4",
    "rooms-grid.mp4",
    "ambient-bird.mp4",
    "ambient-art.mp4",
    "ambient-display.mp4",
    "artwork.mp4",
    "signoff.mp4",
  ];

  assert.match(
    page,
    /<section className="hero"[\s\S]*?src="\/media\/img-5010\.mp4"/,
  );
  for (const video of expectedVideos) {
    assert.match(page, new RegExp(`/media/${video.replace(".", "\\.")}`));
  }
  assert.equal(
    new Set(page.match(/\/media\/[\w-]+\.mp4/g)).size,
    expectedVideos.length,
  );
});

test("uses lightcompany.ai as the canonical social domain and keeps responsive safeguards", async () => {
  const [layout, css] = await Promise.all([
    readFile(layoutUrl, "utf8"),
    readFile(cssUrl, "utf8"),
  ]);

  assert.match(layout, /new URL\("https:\/\/lightcompany\.ai"\)/);
  assert.match(layout, /canonical: "https:\/\/lightcompany\.ai"/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(layout, /card: "summary_large_image"/);
  assert.match(layout, /The Light Company · AI That Points to the Work/);
  assert.match(css, /color-scheme: light/);
  assert.match(css, /--field: #f5f8fa/);
  assert.match(css, /\.light-mark/);
  assert.match(css, /\.hero-beam/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /transition:\s*all/);
});

test("validates and stores RSVPs without collecting extra personal data", async () => {
  const route = await readFile(routeUrl, "utf8");

  assert.match(route, /emailPattern/);
  assert.match(route, /\.insert\(rsvps\)/);
  assert.match(route, /\.onConflictDoNothing/);
  assert.match(route, /honeypot/);
  assert.doesNotMatch(route, /\bip\b|x-forwarded-for|user-agent/i);
});
