import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

for (const name of ["robotics-vision", "prism-vision"]) {
  test(`${name} is an independent, non-indexed reference preview`, async () => {
    const html = await readFile(new URL(`../site/${name}.html`, import.meta.url), "utf8");
    const route = await readFile(new URL(`../app/${name}/route.ts`, import.meta.url), "utf8");
    assert.ok(route.includes(`site/${name}.html?raw`));
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(html, /The Light Company/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /data-local-nav inert/);
    assert.match(html, /data-gallery-prev/);
    assert.match(html, /data-gallery-next/);
    assert.equal((html.match(/<video\b/g) || []).length, (html.match(/data-video-toggle/g) || []).length);
    assert.doesNotMatch(html, /<video[^>]*\bautoplay\b/);

    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, "Element IDs must be unique");
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(id), `Missing anchor target: ${id}`);
    }
    const assets = new Set([...html.matchAll(/(?:src|poster|href)="(\/(?:site|media)\/[^"?#]+)/g)].map((match) => match[1]));
    await Promise.all([...assets].map((path) => access(new URL(`../public${path}`, import.meta.url))));
  });
}

test("main reference sample shares the approved presentation without replacing the homepage", async () => {
  const [sample, main, css, script] = await Promise.all([
    readFile(new URL("../site/prism-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../site/main.html", import.meta.url), "utf8"),
    readFile(new URL("../public/site/prism-vision/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/site/robotics-vision/script.js", import.meta.url), "utf8"),
  ]);
  assert.match(sample, /AI that helps IRL/);
  assert.match(sample, /No glasses\. No headset\./);
  assert.match(sample, /href="\/robotics-vision"/);
  assert.match(sample, /\/site\/robotics-vision\/styles\.css/);
  assert.match(css, /\.cinematic-portrait video \{ object-fit: contain/);
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /visibilitychange/);
  assert.match(main, /experience-gateway/);
  assert.doesNotMatch(main, /prism-vision|robotics-vision/);
});

test("reference samples use full demo sources and the supplied condition video", async () => {
  const [main, robotics, fullDemo] = await Promise.all([
    readFile(new URL("../site/prism-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../site/robotics-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../public/site/prism-vision/full-demo.js", import.meta.url), "utf8"),
  ]);
  for (const name of ["newspaper", "chess", "books", "drawing"]) {
    assert.ok(main.includes(`/media/${name}-full.mp4`));
    assert.ok(!main.includes(`/media/${name}.mp4`));
  }
  assert.match(main, /data-full-demo="HG1q5wkIn6g"/);
  assert.match(fullDemo, /loop: 1, playlist: frame.dataset.fullDemo/);
  assert.match(fullDemo, /prefers-reduced-motion/);
  assert.match(robotics, /\/site\/robotics-vision\/test-condition-full.mp4/);
});

test("places new IRL footage in everyday demos and the learning chapter", async () => {
  const [main, css, sources] = await Promise.all([
    readFile(new URL("../site/prism-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../public/site/prism-vision/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/site/prism-vision/media/sources.json", import.meta.url), "utf8").then(JSON.parse),
  ]);
  const clips = ["desk-timer", "gesture-dial", "piano-live", "piano-guidance"];
  for (const clip of clips) {
    assert.equal(main.split(`src="/site/prism-vision/media/${clip}-full.mp4"`).length - 1, 1);
    assert.ok(sources[`${clip}-full.mp4`].durationSeconds > 15);
  }
  assert.match(main, /newspaper-full.mp4[\s\S]*desk-timer-full.mp4[\s\S]*gesture-dial-full.mp4[\s\S]*books-full.mp4[\s\S]*chess-full.mp4/);
  assert.match(main, /id="piano"[\s\S]*piano-guidance-full.mp4[\s\S]*id="guidance"[\s\S]*registered-guidance.mp4/);
  assert.equal((main.match(/<figure class="gallery-item/g) || []).length, 8);
  assert.match(main, /Example 1 of 8/);
  assert.match(css, /\.gallery-media-portrait video \{ position: relative; object-fit: cover;/);
  for (const [clip, focus] of [["timer", "70"], ["dial", "75"], ["piano", "60"]]) {
    assert.ok(main.includes(`gallery-media-portrait gallery-media-${clip}`));
    assert.ok(css.includes(`.gallery-media-${clip} video { object-position: 50% ${focus}%; }`));
  }
  assert.match(css, /\.cinematic-piano \.cinematic-stage \{[^}]*width: min\(100%, calc\(\(100svh - var\(--nav\)\) \* 4 \/ 3\)\);/);
  assert.match(css, /\.cinematic-piano \.cinematic-stage \{[^}]*height: calc\(100svh - var\(--nav\)\); min-height: 0;/);
  assert.match(css, /\.cinematic-piano video \{ object-fit: cover; object-position: 50% 75%;/);
  assert.doesNotMatch(main, /class="gallery-backdrop"/);
  assert.match(main, /<source src="\/media\/hero-reel.mp4"/);
});

test("swaps the marked Robotics operation and capability-map videos with their posters", async () => {
  const html = await readFile(new URL("../site/robotics-vision.html", import.meta.url), "utf8");
  const intro = html.match(/<section class="intro-film"[\s\S]*?<\/section>/)?.[0];
  const learn = html.match(/<section class="experience" id="learn"[\s\S]*?<\/section>/)?.[0];
  assert.ok(intro);
  assert.ok(learn);
  for (const extension of ["jpg", "mp4"]) {
    assert.ok(intro.includes(`/site/assets/media/curated/img-5387-b10dc5e5b.${extension}`));
    assert.ok(learn.includes(`/media/robotics/projected-test-run.${extension}`));
  }
  assert.doesNotMatch(intro, /projected-test-run/);
  assert.doesNotMatch(learn, /img-5387-b10dc5e5b/);
  assert.match(intro, /aria-label="Projected test grids across a robot evaluation workcell"/);
  assert.match(learn, /aria-label="Projected test conditions across a robotic workcell"/);
  assert.match(learn, /Map where the robot<br \/>works and fails\./);
  const lab = html.match(/<section class="closer-look"[\s\S]*?<\/section>/)?.[0];
  assert.match(lab, /projected-test-run.mp4/);
});

test("uses the full supplied Robotics landing video without changing other placements", async () => {
  const [html, css, sources] = await Promise.all([
    readFile(new URL("../site/robotics-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../public/site/robotics-vision/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/site/robotics-vision/sources.json", import.meta.url), "utf8").then(JSON.parse),
  ]);
  const hero = html.match(/<section class="hero-runway"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /class="hero-video robotics-hero-video"[^>]*muted loop playsinline/);
  for (const extension of ["jpg", "mp4"]) {
    assert.ok(hero.includes(`/site/robotics-vision/robotics-hero-full.${extension}`));
  }
  assert.equal(html.split('src="/site/robotics-vision/robotics-hero-full.mp4"').length - 1, 1);
  assert.match(hero, /Stop guessing\. Make real progress/);
  assert.match(hero, /data-video-toggle/);
  assert.match(css, /\.robotics-hero-video \{ object-position: 50% 50%; \}/);
  assert.match(css, /@media \(max-width: 734px\)[\s\S]*?\.robotics-hero-video \{ object-position: 44% 50%; \}/);
  const source = sources["robotics-hero-full.mp4"];
  assert.equal(source.sourceFile, "IMG_5578 3 (1).mov");
  assert.ok(Math.abs(source.sourceDurationSeconds - source.durationSeconds) < 1 / 30);
});

test("offers reciprocal triangular corner-peel links on both previews", async () => {
  const [robotics, main, css] = await Promise.all([
    readFile(new URL("../site/robotics-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../site/prism-vision.html", import.meta.url), "utf8"),
    readFile(new URL("../public/site/robotics-vision/styles.css", import.meta.url), "utf8"),
  ]);
  assert.match(robotics, /<a class="corner-peel-link" href="\/prism-vision" aria-label="Check out IRL">/);
  assert.match(main, /<a class="corner-peel-link" href="\/robotics-vision" aria-label="Check out Robotics">/);
  for (const html of [robotics, main]) {
    assert.match(html, /<body class="[^"]*corner-peel-page/);
    assert.equal((html.match(/class="corner-peel-link"/g) || []).length, 1);
    assert.match(html, /class="corner-peel-fold" aria-hidden="true"/);
    assert.doesNotMatch(html, /irl-corner-tab/);
  }
  assert.match(css, /\.corner-peel \{[^}]*position: fixed;[^}]*top: 0; right: 0;/);
  assert.match(css, /\.corner-peel \{[^}]*transform-origin: 100% 0;/);
  assert.match(css, /\.corner-peel-reveal \{[^}]*clip-path: polygon\(0 0, 100% 0, 100% 100%\)/);
  assert.match(css, /\.corner-peel-fold \{[^}]*clip-path: polygon\(0 0, 100% 100%, var\(--fold-x\) var\(--fold-y\)\)/);
  assert.doesNotMatch(css, /\.corner-peel-fold \{[^}]*(?:transform:|animation:|border-radius:)/);
  assert.match(css, /\.corner-peel-link:focus-visible \.corner-peel-label \{ outline: 2px solid #fff/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\) and \(min-width: 735px\)/);
  assert.match(css, /\.corner-peel-page \.hero-toggle \{ left: 28px; right: auto !important; \}/);
  assert.match(css, /\.local-nav.is-visible ~ main \.hero-toggle \{ top: calc\(var\(--nav\) \+ 18px\); \}/);
  assert.match(css, /max-width: calc\(100% - var\(--corner-clearance\) - 32px\)/);
  assert.match(css, /@media \(max-width: 734px\)[\s\S]*?\.corner-peel-page \.global-nav \{ height: 80px/);
  assert.match(css, /@media \(max-width: 360px\)[\s\S]*?\.corner-peel-page \.local-nav \.product-name \{ display: none; \}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.corner-peel:hover, \.corner-peel:focus-within \{[^}]*transform: none; \}/);
  assert.doesNotMatch(css, /irl-tab|irl-corner-tab/);
});
