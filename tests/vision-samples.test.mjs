import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

for (const name of ["robotics-vision", "prism-vision"]) {
  test(`${name} is a complete page on the shared Light Company design system`, async () => {
    const html = await read(`site/${name}.html`);
    const route = await read(`app/${name}/route.ts`);
    assert.ok(route.includes(`site/${name}.html?raw`));
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(html, /The Light Company/);
    assert.match(html, /href="\/site\/lc\/lc\.css"/);
    assert.match(html, /src="\/site\/lc\/lc\.js"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /light-company-mark-inverse\.svg/);
    assert.match(html, /data-film(?:-inline)?[ =>]/);
    assert.doesNotMatch(html, /tel:|415 523/, "No phone number until the correct one is confirmed");
    assert.doesNotMatch(html, /—(?![^<]*<\/title>)/, "No em dashes in page copy");

    // every muted loop is managed by lc.js, and only the hero may autoplay
    const autoplay = html.match(/<video[^>]*\bautoplay\b/g) || [];
    assert.ok(autoplay.length <= 1);
    for (const video of html.match(/<video\b[^>]*>/g) || []) {
      if (!/\bcontrols\b|evals-/.test(video)) for (const attr of ["data-auto", "muted", "loop", "playsinline"]) assert.match(video, new RegExp(`\\b${attr}\\b`));
    }

    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, "Element IDs must be unique");
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(id), `Missing anchor target: ${id}`);
    }
    const assets = new Set([...html.matchAll(/(?:src|poster|href|data-film)="(\/(?:site|media)\/[^"?#]+)/g)].map((match) => match[1]));
    await Promise.all([...assets].map((path) => access(new URL(`../public${path}`, import.meta.url))));
  });
}

test("the shared script respects reduced motion and pauses hidden videos", async () => {
  const [script, css] = await Promise.all([read("public/site/lc/lc.js"), read("public/site/lc/lc.css")]);
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /visibilitychange/);
  assert.match(script, /IntersectionObserver/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--accent: #3cb4ff/);
});

test("the homepage tells the Prism story with the real demo footage", async () => {
  const [main, home] = await Promise.all([read("site/main.html"), read("site/prism-vision.html")]);
  assert.match(home, /AI that helps IRL/);
  assert.match(home, /No glasses\. No headset\./);
  assert.match(home, /surfaces and objects/);
  assert.match(home, /href="\/robotics-vision"/);
  assert.match(home, /<source src="\/media\/brand-film\/hero-loop.mp4"/);
  assert.match(home, /data-film="\/media\/brand-film\/prism-film.mp4"/);
  for (const clip of ["desk-timer", "gesture-dial", "piano-live", "piano-guidance"]) {
    assert.ok(home.includes(`/site/prism-vision/media/${clip}-full.mp4`), clip);
  }
  assert.match(home, /id="piano"[\s\S]*piano-guidance-full.mp4[\s\S]*id="in-action"[\s\S]*id="guidance"[\s\S]*registered-guidance.mp4/);
  assert.match(main, /experience-gateway/);
  assert.doesNotMatch(main, /prism-vision|robotics-vision/);
});

test("the Robotics page keeps its landing video, method and qualified pilot numbers", async () => {
  const [html, sources] = await Promise.all([
    read("site/robotics-vision.html"),
    read("public/site/robotics-vision/sources.json").then(JSON.parse),
  ]);
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /Robot evaluation,<br \/>from setup to results/);
  assert.match(hero, /poster="\/site\/robotics-vision\/test-condition-full.jpg"/);
  assert.match(hero, /src="\/site\/robotics-vision\/test-condition-full.mp4"/);
  assert.match(html, /aria-label="Prism in the lab"[\s\S]*?robotics-hero-lab.mp4/);
  assert.equal(html.split('src="/site/robotics-vision/robotics-hero-lab.mp4"').length - 1, 1);
  assert.match(html, /\/site\/robotics-vision\/test-condition-full.mp4/);
  assert.match(html, /\/media\/robotics\/projected-test-run.mp4/);
  assert.match(html, /data-film-inline[\s\S]*\/media\/brand-film\/evals-explainer.mp4/);
  assert.match(html, /id="deeper"[\s\S]*Capability maps[\s\S]*robot-eval-staging.mp4/);
  assert.match(html, /id="outcomes"[\s\S]*Evaluation estimates from pilot customers/);
  assert.equal(sources["robotics-hero-full.mp4"].sourceFile, "IMG_5578 3 (1).mov");
  assert.deepEqual(sources["robotics-hero-lab.mp4"].sourceFile, ["MVI_0099.MP4", "MVI_0098.MP4", "MVI_0097.MP4", "MVI_0096.MP4"]);
  for (const file of ["site/robotics-vision/robotics-hero-lab.mp4", "media/brand-film/hero-loop.mp4", "media/brand-film/prism-film.mp4", "media/brand-film/evals-explainer.mp4"]) {
    const video = await stat(new URL(`../public/${file}`, import.meta.url));
    assert.ok(video.size < 25 * 1024 * 1024, `${file} must fit the hosting static-asset limit`);
  }
});

test("offers reciprocal corner links between the two product lines", async () => {
  const [robotics, prism] = await Promise.all([read("site/robotics-vision.html"), read("site/prism-vision.html")]);
  assert.match(robotics, /<a class="corner-peel-link" href="\/prism-vision" aria-label="Check out IRL">/);
  assert.match(prism, /<a class="corner-peel-link" href="\/robotics-vision" aria-label="Check out Robotics">/);
});
