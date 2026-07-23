import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/page.tsx", import.meta.url);
const layoutUrl = new URL("../app/layout.tsx", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);

test("keeps the Prism positioning concrete and the CTA singular", async () => {
  const page = await readFile(pageUrl, "utf8");

  assert.match(
    page,
    /A desk lamp that projects AI guidance onto the work in your hands\./,
  );
  assert.match(page, /robotics and hardware teams/i);
  assert.match(page, /Former Apple Vision Pro infrastructure engineer/);
  assert.match(page, /action="\/api\/rsvp"/);
  assert.match(page, /RSVP \/ GET NOTIFIED/);
  assert.match(page, /San Francisco · August 20, 2026/i);
  assert.match(page, /FOOTAGE NOT YET PUBLISHED/);
  assert.doesNotMatch(page, /future of spatial computing/i);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton/i);
});

test("includes host-aware social metadata and responsive safeguards", async () => {
  const [layout, css] = await Promise.all([
    readFile(layoutUrl, "utf8"),
    readFile(cssUrl, "utf8"),
  ]);

  assert.match(layout, /requestHeaders\.get\("x-forwarded-host"\)/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(layout, /card: "summary_large_image"/);
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
