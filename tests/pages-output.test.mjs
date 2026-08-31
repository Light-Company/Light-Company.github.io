import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../.pages-dist/", import.meta.url);

test("builds every public GitHub Pages route", async () => {
  const routes = [
    "index.html",
    "robotics/index.html",
    "Robotics/index.html",
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

  assert.match(home, /hello@lght\.co/);
  assert.match(home, /href="\/privacy"/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/robotics/);
  assert.match(robotics, /site\/robotics\/ui\.js/);
});
