import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const mainUrl = new URL("../site/main.html", import.meta.url);
const mainCssUrl = new URL("../public/site/main/styles.css", import.meta.url);
const roboticsUrl = new URL("../site/robotics.html", import.meta.url);
const roboticsCssUrl = new URL("../public/site/robotics/styles.css", import.meta.url);
const roboticsUiUrl = new URL("../src/robotics-ui.tsx", import.meta.url);
const galleryUrl = new URL("../site/gallery.html", import.meta.url);
const privacyUrl = new URL("../site/privacy.html", import.meta.url);
const robotsUrl = new URL("../public/robots.txt", import.meta.url);
const sitemapUrl = new URL("../public/sitemap.xml", import.meta.url);
const llmsUrl = new URL("../public/llms.txt", import.meta.url);
const mainScriptUrl = new URL("../public/site/main/script.js", import.meta.url);
const galleryScriptUrl = new URL("../public/site/gallery/gallery.js", import.meta.url);
const manifestUrl = new URL("../public/site/assets/media/placements.json", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);

test("ships the finished Prism homepage without local-only links", async () => {
  const [main, script, manifest] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(mainScriptUrl, "utf8"),
    readFile(manifestUrl, "utf8"),
  ]);

  assert.match(main, /<title>Prism by The Light Co\.<\/title>/);
  assert.match(main, /AI that helps IRL/);
  assert.match(main, /href="\/gallery"/);
  assert.match(main, /href="\/robotics"/);
  assert.doesNotMatch(main, /href="\/Robotics\//);
  assert.match(main, /href="https:\/\/prism\.lightcompany\.ai"/);
  assert.match(main, /https:\/\/lightcompany\.ai\/og\.png/);
  assert.match(main, /"@type": "Organization"/);
  assert.match(main, /"@type": "WebSite"/);
  assert.match(main, /"alternateName": \["Light Company", "lght\.co"\]/);
  assert.match(script, /\/site\/assets\/media\/placements\.json/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /127\.0\.0\.1|localhost/);
});

test("publishes the dedicated robotics evaluation experience", async () => {
  const [robotics, roboticsUi] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsUiUrl, "utf8"),
  ]);

  assert.match(robotics, /Stop guessing\. Make real progress in Physical AI/);
  assert.match(robotics, /Find progress\. Catch regressions\. Iterate faster/);
  assert.match(robotics, /See how users improve Physical AI/);
  assert.match(robotics, /Compare policies under the same physical conditions/);
  assert.match(robotics, /Project the condition[\s\S]*Verify the scene[\s\S]*Compare and track/);
  assert.match(robotics, /aria-label="The Light Company home"/);
  assert.match(robotics, /class="topbar-wordmark"[\s\S]*?<span>The Light Company<\/span>/);
  assert.match(robotics, />The Light Company Robotics<\/p>/);
  assert.match(robotics, /Enterprise sign in/);
  assert.match(roboticsUi, /10×[\s\S]*faster evaluation cycles/);
  assert.match(roboticsUi, /role="tooltip"/);
  assert.match(robotics, /Get your own/);
  assert.match(robotics, /site\/robotics\/ui\.js/);
  assert.match(robotics, /media\/robotics\/robot-policy-evaluation\.mp4/);
  assert.match(robotics, /media\/robotics\/live-scene-tracking\.mp4/);
  assert.match(robotics, /media\/robotics\/lab-team\.webp/);
  assert.equal((robotics.match(/class="frame/g) || []).length, 12);
  assert.match(robotics, /href="\/gallery"/);
  assert.doesNotMatch(robotics, /—/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/robotics/);
  assert.doesNotMatch(robotics, /127\.0\.0\.1|localhost/);
});

test("ships unique crawlable metadata and brand entities for every route", async () => {
  const [home, robotics, gallery, privacy] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(roboticsUrl, "utf8"),
    readFile(galleryUrl, "utf8"),
    readFile(privacyUrl, "utf8"),
  ]);
  const pages = [home, robotics, gallery, privacy];
  const titles = pages.map((page) => page.match(/<title>(.*?)<\/title>/)?.[1]);
  const canonicals = pages.map((page) => page.match(/<link rel="canonical" href="(.*?)"/i)?.[1]);

  assert.equal(new Set(titles).size, pages.length);
  assert.deepEqual(canonicals, [
    "https://lightcompany.ai/",
    "https://lightcompany.ai/robotics",
    "https://lightcompany.ai/gallery",
    "https://lightcompany.ai/privacy",
  ]);
  for (const page of pages) {
    assert.match(page, /name="description"/);
    assert.match(page, /property="og:title"/);
    assert.match(page, /name="twitter:title"/);
    assert.match(page, /type="application\/ld\+json"/);
  }
  assert.match(robotics, /"@type": "Product"/);
});

test("publishes search and AI discovery files with every canonical page", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    readFile(robotsUrl, "utf8"),
    readFile(sitemapUrl, "utf8"),
    readFile(llmsUrl, "utf8"),
  ]);
  const canonicalUrls = [
    "https://lightcompany.ai/",
    "https://lightcompany.ai/robotics",
    "https://lightcompany.ai/gallery",
    "https://lightcompany.ai/privacy",
  ];

  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/lightcompany\.ai\/sitemap\.xml/);
  for (const url of canonicalUrls) {
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
  }
  assert.match(llms, /The Light Company/);
  assert.match(llms, /lght\.co/);
});

test("keeps the Robotics page on the site's shared visual system", async () => {
  const [robotics, css] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsCssUrl, "utf8"),
  ]);

  assert.match(css, /--font-display:\s*"Instrument Sans"/);
  assert.match(css, /\.hero\s*\{[\s\S]*?height:\s*100svh/);
  assert.match(css, /\.topbar\s*\{[\s\S]*?backdrop-filter:\s*blur\(20px\)/);
  assert.match(css, /\.frame:hover figcaption/);
  assert.match(robotics, /<header class="topbar"/);
  assert.match(robotics, /<footer class="site-footer">/);
  assert.match(robotics, /data-hero-pause/);
});

test("publishes the Prism playlist gallery grid", async () => {
  const [gallery, galleryScript] = await Promise.all([
    readFile(galleryUrl, "utf8"),
    readFile(galleryScriptUrl, "utf8"),
  ]);

  assert.match(gallery, /data-gallery-grid/);
  assert.match(gallery, /data-lightbox-player/);
  assert.match(gallery, /data-lightbox-poster/);
  assert.match(gallery, /rel="preconnect" href="https:\/\/www\.youtube-nocookie\.com"/);
  assert.match(gallery, /rel="preconnect" href="https:\/\/www\.youtube\.com"/);
  assert.match(galleryScript, /const playlist = \[/);
  assert.equal((galleryScript.match(/\{ id: "[A-Za-z0-9_-]{11}", slug: "[a-z0-9-]+", title: "/g) || []).length, 13);
  assert.match(galleryScript, /iframe_api/);
  assert.match(galleryScript, /new window\.YT\.Player/);
  assert.match(galleryScript, /\/media\/prism\/\$\{tile\.dataset\.slug\}\.gif/);
  assert.doesNotMatch(`${gallery}${galleryScript}`, /\/api\/media|127\.0\.0\.1|localhost/);
});

test("keeps every referenced production asset in the published bundle", async () => {
  const sources = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(roboticsUrl, "utf8"),
    readFile(galleryScriptUrl, "utf8"),
    readFile(manifestUrl, "utf8"),
  ]);
  const paths = new Set(
    sources.join("\n").match(/\/(?:site\/assets|media)\/[A-Za-z0-9_./-]+/g) || [],
  );

  for (const path of paths) {
    await access(new URL(`../public${path.split("?")[0]}`, import.meta.url));
  }
});

test("validates and stores RSVPs without collecting extra personal data", async () => {
  const route = await readFile(routeUrl, "utf8");

  assert.match(route, /emailPattern/);
  assert.match(route, /\.insert\(rsvps\)/);
  assert.match(route, /\.onConflictDoNothing/);
  assert.match(route, /honeypot/);
  assert.doesNotMatch(route, /\bip\b|x-forwarded-for|user-agent/i);
});
