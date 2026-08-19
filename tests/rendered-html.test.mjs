import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const mainUrl = new URL("../site/main.html", import.meta.url);
const roboticsUrl = new URL("../site/robotics.html", import.meta.url);
const galleryUrl = new URL("../site/gallery.html", import.meta.url);
const mainScriptUrl = new URL("../public/site/main/script.js", import.meta.url);
const galleryScriptUrl = new URL("../public/site/gallery/gallery.js", import.meta.url);
const manifestUrl = new URL("../public/site/assets/media/placements.json", import.meta.url);
const routeUrl = new URL("../app/api/rsvp/route.ts", import.meta.url);

test("ships the finished Light Company page without local-only links", async () => {
  const [main, script, manifest] = await Promise.all([
    readFile(mainUrl, "utf8"),
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
  assert.doesNotMatch(`${main}${script}${manifest}`, /127\.0\.0\.1|localhost/);
  assert.doesNotMatch(`${main}${script}${manifest}`, /"assets\//);
});

test("publishes the smaller dedicated robotics experience", async () => {
  const robotics = await readFile(roboticsUrl, "utf8");

  assert.match(robotics, /Light Company for Robotics/);
  assert.match(robotics, /Make the scene repeatable/);
  assert.match(robotics, /href="\/gallery"/);
  assert.match(robotics, /href="\/#top"/);
  assert.match(robotics, /https:\/\/lightcompany\.ai\/Robotics\//);
  assert.doesNotMatch(robotics, /127\.0\.0\.1|localhost/);
});

test("publishes a self-contained video mosaic", async () => {
  const [gallery, galleryScript] = await Promise.all([
    readFile(galleryUrl, "utf8"),
    readFile(galleryScriptUrl, "utf8"),
  ]);

  assert.match(gallery, /Intelligence,<br \/>cast into the room/);
  assert.match(gallery, /No Glasses No Headset/);
  assert.match(galleryScript, /const archive = \[/);
  assert.equal((galleryScript.match(/preview: "\/(?:site\/assets\/media|media)\//g) || []).length, 23);
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
