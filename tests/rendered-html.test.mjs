import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const mainUrl = new URL("../site/main.html", import.meta.url);
const mainCssUrl = new URL("../public/site/main/styles.css", import.meta.url);
const roboticsUrl = new URL("../site/robotics.html", import.meta.url);
const roboticsCssUrl = new URL("../public/site/robotics/styles.css", import.meta.url);
const roboticsUiUrl = new URL("../src/robotics-ui.tsx", import.meta.url);
const galleryUrl = new URL("../site/gallery.html", import.meta.url);
const mainScriptUrl = new URL("../public/site/main/script.js", import.meta.url);
const galleryScriptUrl = new URL("../public/site/gallery/gallery.js", import.meta.url);
const manifestUrl = new URL("../public/site/assets/media/placements.json", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);

test("ships the finished Light Company page without local-only links", async () => {
  const [main, mainCss, script, manifest] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(mainCssUrl, "utf8"),
    readFile(mainScriptUrl, "utf8"),
    readFile(manifestUrl, "utf8"),
  ]);

  assert.match(main, /Light Company — AI that points to the work/);
  assert.match(main, /No Glasses No Headset/);
  assert.match(main, /href="\/gallery"/);
  assert.match(main, /href="\/Robotics\/"/);
  assert.match(main, /href="https:\/\/prism\.lightcompany\.ai"/);
  assert.match(main, /https:\/\/lightcompany\.ai\/og\.png/);
  assert.match(script, /\/site\/assets\/media\/placements\.json/);
  assert.match(mainCss, /\.hero\.is-lit \.lamp-focus\s*\{\s*opacity:\s*0\.1/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /127\.0\.0\.1|localhost/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /"assets\//);
});

test("publishes the dedicated robotics evaluation experience", async () => {
  const [robotics, roboticsUi] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsUiUrl, "utf8"),
  ]);

  assert.match(robotics, /Stop guessing[\s\S]*Make real progress[\s\S]*in Physical AI/);
  assert.match(robotics, /Don’t gamble[\s\S]*Find progress[\s\S]*Catch regressions[\s\S]*Iterate faster/);
  assert.match(robotics, /See how users improve Physical AI/);
  assert.match(robotics, /Get accurate policy evaluations in 30 tests instead of 300/);
  assert.match(robotics, /20,000/);
  assert.match(robotics, /40%[\s\S]*3%/);
  assert.match(robotics, /10×[\s\S]*faster evaluation cycles/);
  assert.match(robotics, /The Light Company/);
  assert.match(roboticsUi, /10×[\s\S]*faster evaluation cycles/);
  assert.match(roboticsUi, /20,000 hr[\s\S]*Pilot estimate to date/);
  assert.match(robotics, /Platform sign in/);
  assert.match(robotics, /Get your own/);
  assert.match(robotics, /site\/robotics\/ui\.js/);
  assert.match(robotics, /media\/robotics\/lab-control\.mp4/);
  assert.match(robotics, /href="\/gallery"/);
  assert.match(robotics, /href="\/#top"/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/Robotics\//);
  assert.doesNotMatch(robotics, /127\.0\.0\.1|localhost/);
});

test("keeps the Robotics page on its compact visual-first layout system", async () => {
  const [robotics, css] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsCssUrl, "utf8"),
  ]);

  assert.match(css, /--shell:\s*1360px/);
  assert.match(css, /h1\s*\{[\s\S]*?font-size:\s*clamp\(56px,\s*5\.3vw,\s*80px\)/);
  assert.match(css, /\.hero\s*\{[\s\S]*?min-height:\s*100svh/);
  assert.match(css, /\.hero-media,[\s\S]*?\.sprite-field\s*\{[\s\S]*?inset:\s*0/);
  assert.match(css, /\.hero-content\s*\{[\s\S]*?text-align:\s*center/);
  assert.match(css, /\.case-study\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1\.2fr\)\s*minmax\(420px,\s*0\.8fr\)/);
  assert.match(css, /\.system-stack\s*\{[\s\S]*?grid-template-columns:\s*1\.12fr\s*1fr\s*1fr/);
  assert.match(robotics, /icons\/robotics\/crosshair\.svg/);
  assert.match(robotics, /icons\/robotics\/scan-line\.svg/);
  assert.match(robotics, /icons\/robotics\/activity\.svg/);
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
    await access(new URL(`../public${path}`, import.meta.url));
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
