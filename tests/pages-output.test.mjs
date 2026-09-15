import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../.pages-dist/", import.meta.url);

test("builds every public GitHub Pages route", async () => {
  const routes = [
    "index.html",
    "robotics/index.html",
    "Robotics/index.html",
    "prism-vision/index.html",
    "gallery/index.html",
    "privacy/index.html",
    "404.html",
  ];

  for (const route of routes) {
    await access(new URL(route, outputRoot));
  }
});

test("keeps the public media and brand assets in the Pages artifact", async () => {
  const assets = [
    "media/hero-workbench.mp4",
    "site/main/styles.css",
    "site/main/script.js",
    "site/gateway/styles.css",
    "site/gateway/animation.js",
    "site/robotics/ui.js",
    "media/robotics/arm-stage.mp4",
    "site/assets/fonts/barlow-semi-condensed-700.woff2",
    "site/assets/brand/light-company-mark.svg",
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
  ];

  for (const asset of assets) {
    await access(new URL(asset, outputRoot));
  }
});

test("publishes production contact and privacy links", async () => {
  const home = await readFile(new URL("index.html", outputRoot), "utf8");
  const robotics = await readFile(new URL("robotics/index.html", outputRoot), "utf8");

  assert.match(home, /hi@lightcompany\.ai/);
  for (const route of ["index.html", "robotics/index.html", "gallery/index.html", "privacy/index.html", "llms.txt"]) {
    const content = await readFile(new URL(route, outputRoot), "utf8");
    assert.match(content, /hi@lightcompany\.ai/);
    assert.doesNotMatch(content, /hello@lght\.co/);
  }
  assert.match(home, /href="\/privacy"/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/robotics/);
  assert.match(robotics, /site\/robotics-vision\/script\.js/);
});

test("opens Robotics by default and preserves the direct Robotics and AR experiences", async () => {
  const home = await readFile(new URL("index.html", outputRoot), "utf8");
  const robotics = await readFile(new URL("robotics/index.html", outputRoot), "utf8");
  const ar = await readFile(new URL("prism-vision/index.html", outputRoot), "utf8");
  assert.equal(home, robotics);
  assert.match(home, /Stop guessing\. Make real progress/);
  assert.match(home, /rel="canonical" href="https:\/\/lightcompany.ai\/"/);
  assert.match(robotics, /class="corner-peel-link" href="\/prism-vision"/);
  assert.match(robotics, /robotics-hero-full.mp4/);
  assert.match(ar, /AI that helps IRL\./);
  assert.match(ar, /class="corner-peel-link" href="\/robotics"/);
  assert.match(ar, /piano-guidance-full.mp4/);
  assert.match(ar, /rel="canonical" href="https:\/\/lightcompany.ai\/prism-vision"/);
  for (const html of [home, robotics, ar]) {
    assert.doesNotMatch(html, /noindex|experience-gateway|href="\/robotics-vision"/);
    assert.match(html, /class="button button-investor" href="\/robotics\/investors"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /property="og:image" content="https:\/\/lightcompany.ai\/og-blue.png"/);
    assert.match(html, /name="twitter:image" content="https:\/\/lightcompany.ai\/og-blue.png"/);
    assert.match(html, /type="application\/ld\+json"/);
    const assets = new Set([...html.matchAll(/(?:src|poster|href)="(\/(?:site|media)\/[^"?#]+)/g)].map((match) => match[1]));
    await Promise.all([...assets].map((path) => access(new URL(path.slice(1), outputRoot))));
  }
  assert.equal(robotics, await readFile(new URL("Robotics/index.html", outputRoot), "utf8"));
});
