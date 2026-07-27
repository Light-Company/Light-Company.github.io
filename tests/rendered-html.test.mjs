import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/page.tsx", import.meta.url);
const layoutUrl = new URL("../app/layout.tsx", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);
const markUrl = new URL("../public/brand/light-company-mark.svg", import.meta.url);

test("keeps the positioning concrete, adopts The Light Company, and retains one CTA", async () => {
  const page = await readFile(pageUrl, "utf8");

  assert.match(page, /THE LIGHT COMPANY/);
  assert.match(page, /src="\/brand\/light-company-mark\.svg"/);
  assert.match(
    page,
    /A lamp that projects AI guidance onto robotics and hardware work\./,
  );
  assert.match(page, /robotics and hardware teams/i);
  assert.match(page, /APPLE VISION PRO INFRASTRUCTURE ENGINEER/);
  assert.match(page, /action="\/api\/rsvp"/);
  assert.match(page, /RSVP \/ GET NOTIFIED/);
  assert.match(page, /San Francisco · August 20, 2026/i);
  assert.match(page, /FOOTAGE NOT YET PUBLISHED/);
  assert.doesNotMatch(page, /future of spatial computing/i);
  assert.doesNotMatch(page, /light[\s.]+intelligence[\s.]+forward/i);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton/i);
});

test("uses the extracted vector light mark instead of the old CSS approximation", async () => {
  const [page, css, mark] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(cssUrl, "utf8"),
    readFile(markUrl, "utf8"),
  ]);

  assert.match(mark, /viewBox="0 0 140 140"/);
  assert.match(mark, /linearGradient id="light-beam"/);
  assert.match(mark, /linearGradient id="graphite-blade"/);
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
  assert.match(layout, /The Light Company · AI guidance projected onto physical work/);
  assert.match(css, /color-scheme: light/);
  assert.match(css, /--room: #f7f8fa/);
  assert.match(css, /\.light-mark/);
  assert.match(css, /\.hero-beams/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});

test("validates and stores RSVPs without collecting extra personal data", async () => {
  const route = await readFile(routeUrl, "utf8");

  assert.match(route, /emailPattern/);
  assert.match(route, /\.insert\(rsvps\)/);
  assert.match(route, /\.onConflictDoNothing/);
  assert.match(route, /honeypot/);
  assert.doesNotMatch(route, /\bip\b|x-forwarded-for|user-agent/i);
});
