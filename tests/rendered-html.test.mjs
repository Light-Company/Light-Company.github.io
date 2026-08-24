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
const projectedIntelligenceUrl = new URL("../site/projected-intelligence.html", import.meta.url);
const projectedIntelligenceCssUrl = new URL("../public/site/projected-intelligence/styles.css", import.meta.url);
const robotsUrl = new URL("../public/robots.txt", import.meta.url);
const sitemapUrl = new URL("../public/sitemap.xml", import.meta.url);
const llmsUrl = new URL("../public/llms.txt", import.meta.url);
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

  assert.match(main, /The Light Company \| Projected Intelligence for Physical Work/);
  assert.match(main, /<h1 id="hero-title" aria-label="The Light Company">[\s\S]*?<span>The Light Company<\/span>[\s\S]*?<\/h1>/);
  assert.match(main, /AI that points to the work\. <strong>No Glasses No Headset\.<\/strong>/);
  assert.doesNotMatch(main, /Project Intelligence onto the Physical World/);
  assert.match(main, /href="\/gallery"/);
  assert.match(main, /href="\/projected-intelligence"/);
  assert.match(main, /href="\/robotics"/);
  assert.match(main, /You’re probably here for Robotics[\s\S]*Go there instead[\s\S]*→/);
  assert.match(main, /href="https:\/\/prism\.lightcompany\.ai"/);
  assert.match(main, /https:\/\/lightcompany\.ai\/og\.png/);
  assert.match(script, /\/site\/assets\/media\/placements\.json/);
  assert.match(mainCss, /\.lamp-title-wrap\s*\{[\s\S]*?top:\s*50%[\s\S]*?transform:\s*translate\(-50%,\s*-50%\)/);
  assert.match(mainCss, /\.lamp-title-negative\s*\{[\s\S]*?z-index:\s*6[\s\S]*?mask-image:\s*radial-gradient/);
  assert.match(mainCss, /\.lamp-title-negative h1,[\s\S]*?\.lamp-title-negative p strong\s*\{\s*color:\s*#fff/);
  assert.match(mainCss, /\.lamp-focus\s*\{[\s\S]*?z-index:\s*4/);
  assert.match(mainCss, /\.hero\.is-lit \.lamp-focus\s*\{\s*opacity:\s*0\.1/);
  assert.doesNotMatch(mainCss, /\.hero\.is-lit \.lamp-focus\s*\{[\s\S]*?mix-blend-mode:\s*difference/);
  assert.match(mainCss, /\.hero-robotics-cta:hover[\s\S]*?color:\s*#fff[\s\S]*?background:\s*var\(--ink\)/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /127\.0\.0\.1|localhost/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /"assets\//);
});

test("publishes the dedicated robotics evaluation experience", async () => {
  const [robotics, roboticsUi] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsUiUrl, "utf8"),
  ]);

  assert.match(robotics, /Stop guessing[\s\S]*Make real progress[\s\S]*in Physical AI/);
  assert.match(robotics, /Don’t test blind[\s\S]*Find progress[\s\S]*Catch regressions[\s\S]*Iterate faster/);
  assert.match(robotics, /See how users improve Physical AI/);
  assert.match(robotics, /Compare policies under the same physical conditions/);
  assert.match(robotics, /Project the condition[\s\S]*Verify the scene[\s\S]*Compare and track/);
  assert.match(robotics, /projection to stage the scene and vision to verify it/i);
  assert.match(robotics, /aria-label="The Light Company home"/);
  assert.match(robotics, /class="brand-name">The Light Company<\/span>/);
  assert.match(robotics, />The Light Company Robotics<\/p>/);
  assert.match(robotics, /class="footer-brand"[\s\S]*?<span>The Light Company<\/span>/);
  assert.doesNotMatch(robotics, /(?:aria-label="|>)(?!The )Light Company/);
  assert.match(roboticsUi, /10×[\s\S]*faster evaluation cycles/);
  assert.match(roboticsUi, /20,000 hr[\s\S]*Pilot estimate to date/);
  assert.match(roboticsUi, /30 controlled runs instead of 300 brute-force runs/);
  assert.match(roboticsUi, /role="tooltip"/);
  assert.match(roboticsUi, /aria-describedby/);
  assert.match(robotics, /Platform sign in/);
  assert.match(robotics, /Get your own/);
  assert.match(robotics, /site\/robotics\/ui\.js/);
  assert.match(robotics, /media\/robotics\/lab-control\.mp4/);
  assert.match(robotics, /href="\/gallery"/);
  assert.match(robotics, /href="\/#top"/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/robotics/);
  assert.doesNotMatch(robotics, /127\.0\.0\.1|localhost/);
});

test("publishes a useful projected intelligence explainer", async () => {
  const [page, css] = await Promise.all([
    readFile(projectedIntelligenceUrl, "utf8"),
    readFile(projectedIntelligenceCssUrl, "utf8"),
  ]);

  assert.match(page, /<title>Projected Intelligence for Physical Work \| The Light Company<\/title>/);
  assert.match(page, /<h1 id="hero-title">Intelligence that appears on the work\.<\/h1>/);
  assert.match(page, /Projected intelligence turns the workspace into the interface/);
  assert.match(page, /Observe the workspace[\s\S]*Understand the task[\s\S]*Project the next move[\s\S]*Verify and continue/);
  assert.match(page, /href="\/robotics"/);
  assert.match(page, /href="\/gallery"/);
  assert.match(page, /https:\/\/lightcompany\.ai\/projected-intelligence/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(css, /\.hero\s*\{[\s\S]*?min-height:\s*100svh/);
  assert.doesNotMatch(`${page}${css}`, /127\.0\.0\.1|localhost/);
});

test("ships unique crawlable metadata and brand entities for every route", async () => {
  const [home, projected, robotics, gallery, privacy] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(projectedIntelligenceUrl, "utf8"),
    readFile(roboticsUrl, "utf8"),
    readFile(galleryUrl, "utf8"),
    readFile(privacyUrl, "utf8"),
  ]);
  const pages = [home, projected, robotics, gallery, privacy];
  const titles = pages.map((page) => page.match(/<title>(.*?)<\/title>/)?.[1]);
  const canonicals = pages.map((page) => page.match(/<link rel="canonical" href="(.*?)"/i)?.[1]);

  assert.equal(new Set(titles).size, pages.length);
  assert.deepEqual(canonicals, [
    "https://lightcompany.ai/",
    "https://lightcompany.ai/projected-intelligence",
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
  assert.match(home, /"@type": "Organization"/);
  assert.match(home, /"@type": "WebSite"/);
  assert.match(home, /"alternateName": \["Light Company", "lght\.co"\]/);
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
    "https://lightcompany.ai/projected-intelligence",
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
  assert.match(llms, /Projected Intelligence/);
  assert.match(llms, /Prism Robotics Evaluation/);
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
    readFile(projectedIntelligenceUrl, "utf8"),
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
