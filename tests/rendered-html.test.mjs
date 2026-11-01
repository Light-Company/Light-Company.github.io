import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
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
const gatewayScriptUrl = new URL("../src/experience-gateway.ts", import.meta.url);
const gatewayCssUrl = new URL("../public/site/gateway/styles.css", import.meta.url);
const galleryScriptUrl = new URL("../public/site/gallery/gallery.js", import.meta.url);
const manifestUrl = new URL("../public/site/assets/media/placements.json", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);

test("uses hi@lightcompany.ai for every website contact email", async () => {
  const files = ["main", "robotics", "gallery", "privacy", "prism-vision", "robotics-vision"];
  for (const file of files) {
    const html = await readFile(new URL(`../site/${file}.html`, import.meta.url), "utf8");
    const recipients = [...html.matchAll(/href="mailto:([^"?]+)/g)].map((match) => match[1]);
    assert.ok(recipients.length > 0, `${file} must retain its contact links`);
    assert.ok(recipients.every((email) => email === "hi@lightcompany.ai"), file);
    assert.doesNotMatch(html, /hello@lght\.co/);
  }
  const [main, llms] = await Promise.all([readFile(mainUrl, "utf8"), readFile(llmsUrl, "utf8")]);
  assert.match(main, /"email": "hi@lightcompany\.ai"/);
  assert.match(llms, /hi@lightcompany\.ai/);
  assert.doesNotMatch(llms, /hello@lght\.co/);
});

test("ships the finished Prism homepage without local-only links", async () => {
  const [main, script, gatewayScript, manifest] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(mainScriptUrl, "utf8"),
    readFile(gatewayScriptUrl, "utf8"),
    readFile(manifestUrl, "utf8"),
  ]);

  assert.match(main, /<title>Prism by The Light Co\.<\/title>/);
  assert.match(main, /AI that helps IRL/);
  assert.match(main, /Intelligence in every beam\./);
  assert.match(main, /Evals for Physical AI/);
  assert.match(main, /Project every condition\. Verify every scene\./);
  assert.match(main, /data-gateway-choice="irl"/);
  assert.match(main, /data-gateway-choice="robotics"/);
  assert.match(main, /gateway-preorder[\s\S]*Pre-order Prism/);
  assert.match(main, /gateway-signin[\s\S]*Platform sign in/);
  assert.match(main, /gateway-divider-vertical[\s\S]*?d="M50 0V100"/);
  assert.match(main, /gateway-divider-horizontal[\s\S]*?d="M0 50H100"/);
  assert.match(main, /gateway-divider-vertical[\s\S]*gateway-divider-horizontal/);
  assert.match(gatewayScript, /from "gsap"/);
  assert.match(gatewayScript, /prefers-reduced-motion/);
  assert.match(gatewayScript, /window\.location\.assign\("\/robotics"\)/);
  assert.match(main, /href="\/gallery"/);
  assert.match(main, /href="\/robotics"/);
  assert.doesNotMatch(main, /href="\/Robotics\//);
  assert.match(main, /href="https:\/\/prism\.lightcompany\.ai"/);
  assert.match(main, /https:\/\/lightcompany\.ai\/og\.png/);
  assert.match(main, /"@type": "Organization"/);
  assert.match(main, /"@type": "WebSite"/);
  assert.match(main, /"alternateName": \["Light Company", "lght\.co"\]/);
  assert.match(script, /\/site\/assets\/media\/placements\.json/);
  assert.doesNotMatch(`${main}${script}${gatewayScript}${manifest}`, /127\.0\.0\.1|localhost/);
});

test("keeps the launch selector responsive and operable", async () => {
  const [main, gatewayScript, gatewayCss] = await Promise.all([
    readFile(mainUrl, "utf8"),
    readFile(gatewayScriptUrl, "utf8"),
    readFile(gatewayCssUrl, "utf8"),
  ]);

  assert.match(main, /aria-labelledby="experience-gateway-title"/);
  assert.equal((main.match(/data-gateway-choice=/g) || []).length, 2);
  assert.match(gatewayCss, /\.gateway-options\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(gatewayCss, /@media \(max-width:\s*720px\)[\s\S]*?grid-template-rows:\s*repeat\(2,/);
  assert.match(gatewayCss, /\.gateway-option-blue\s*\{[\s\S]*?will-change:\s*opacity/);
  assert.doesNotMatch(gatewayCss, /\.gateway-option-white/);
  assert.match(gatewayCss, /\.gateway-options\s*\{[\s\S]*?border-radius:\s*var\(--gateway-card-radius\)[\s\S]*?box-shadow:/);
  assert.match(gatewayCss, /\.experience-gateway\s*\{[\s\S]*?background:\s*#eef1f4/);
  assert.match(gatewayCss, /\.gateway-prompt\s*\{[\s\S]*?background:\s*var\(--gateway-blue-deep\)/);
  assert.match(gatewayCss, /\.gateway-prompt\s*\{[\s\S]*?border-radius:\s*0\.8px/);
  assert.match(gatewayCss, /\.gateway-corner-action\s*\{[\s\S]*?color:\s*var\(--gateway-blue-deep\)[\s\S]*?background:\s*rgba\(255,\s*255,\s*255,\s*0\.96\)/);
  assert.match(gatewayCss, /\.gateway-brand img\s*\{[\s\S]*?width:\s*62px/);
  assert.match(gatewayCss, /\.gateway-option\.is-engaged::before\s*\{[\s\S]*?opacity:\s*1/);
  assert.match(gatewayCss, /\.gateway-divider-line\s*\{[\s\S]*?stroke-width:\s*8px/);
  assert.doesNotMatch(gatewayCss, /stroke-dash(?:array|offset)/);
  assert.match(gatewayScript, /opacity:\s*engaged\s*\?\s*0\.12/);
  assert.doesNotMatch(gatewayScript, /options\[0\]\?\.focus/);
  assert.match(gatewayCss, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(gatewayScript, /setAttribute\("inert",\s*""\)/);
  assert.match(gatewayScript, /removeAttribute\("inert"\)/);
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
  assert.match(robotics, /media\/robotics\/robot-policy-evaluation\.mp4/);
  assert.match(robotics, /media\/robotics\/live-scene-tracking\.mp4/);
  assert.match(robotics, /04 \/ Track[\s\S]*Keep the projection locked to the scene/);
  assert.match(robotics, /media\/robotics\/lab-control\.mp4/);
  assert.match(robotics, /media\/robotics\/projected-test-run\.mp4/);
  assert.match(robotics, /media\/robotics\/lab-team\.webp/);
  assert.match(robotics, /media\/robotics\/multi-station-lab\.webp/);
  assert.equal((robotics.match(/class="field-shot/g) || []).length, 6);
  assert.match(robotics, /href="\/gallery"/);
  assert.match(robotics, /href="\/#top"/);
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
    "https://lightcompany.ai/prism",
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

test("keeps the Robotics page in one centered visual story", async () => {
  const [robotics, css] = await Promise.all([
    readFile(roboticsUrl, "utf8"),
    readFile(roboticsCssUrl, "utf8"),
  ]);

  assert.match(css, /--shell:\s*1180px/);
  assert.match(css, /--sans:\s*-apple-system/);
  assert.match(css, /h1\s*\{[\s\S]*?font-size:\s*clamp\(56px,\s*7\.2vw,\s*96px\)/);
  assert.match(css, /\.hero\s*\{[\s\S]*?min-height:\s*100svh/);
  assert.match(css, /\.hero-content\s*\{[\s\S]*?text-align:\s*center/);
  assert.match(css, /\.case-study\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column/);
  assert.match(css, /\.case-media\s*\{[\s\S]*?order:\s*2;[\s\S]*?aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /\.system-stack\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /\.system-card video\s*\{[\s\S]*?aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /\.field-reel\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.equal((robotics.match(/class="field-shot/g) || []).length, 6);
  assert.doesNotMatch(robotics, /hero-grid|sprite-field|cta-orbit/);
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
  const exportRoot = new URL("../.pages-dist/", import.meta.url);
  const pages = (await readdir(exportRoot, { recursive: true })).filter((file) => file.endsWith(".html"));
  assert.ok(pages.length >= 10, "Check the current rendered public routes");
  const galleryScript = await readFile(galleryScriptUrl, "utf8");
  const sources = await Promise.all([
    ...pages.map((file) => readFile(new URL(file, exportRoot), "utf8")),
    readFile(manifestUrl, "utf8"),
  ]);
  const paths = new Set(
    sources.join("\n").match(/\/(?:site|media)\/[A-Za-z0-9_./-]+/g) || [],
  );
  for (const [, slug] of galleryScript.matchAll(/slug: "([a-z0-9-]+)"/g)) {
    paths.add(`/media/prism/${slug}.gif`);
  }
  for (const path of paths) {
    await access(new URL(`../public${path}`, import.meta.url));
    await access(new URL(`../dist/client${path}`, import.meta.url));
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
