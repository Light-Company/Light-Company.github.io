import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../.pages-dist/", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const exists = (url) => access(url).then(() => true, () => false);
const routesUrl = new URL("../public/site/benchmarks/data/routes.json", import.meta.url);
const benchmarkIds = async () => JSON.parse(await readFile(routesUrl, "utf8")).benchmarks;

test("the vault opens with the right password and refuses a wrong one", async () => {
  const { sealVault, openVault } = await import("../public/site/benchmarks/assets/vault.mjs");
  const data = { benchmarks: [{ id: "tabletop-6", scores: [{ model: "m", score: 59.3 }] }] };
  const envelope = await sealVault(data, "correct horse");
  assert.deepEqual(await openVault(envelope, "correct horse"), data);
  await assert.rejects(openVault(envelope, "wrong"));
  assert.doesNotMatch(JSON.stringify(envelope), /tabletop-6|59\.3/);
});

test("the published data is only the encrypted envelope plus the list of page ids", async () => {
  assert.equal(await exists(new URL("../public/site/benchmarks/data/index.json", import.meta.url)), false);
  const envelope = JSON.parse(await read("site/benchmarks/data/index.enc.json"));
  assert.equal(envelope.kdf, "PBKDF2-SHA256");
  assert.equal(envelope.cipher, "AES-GCM");
  assert.ok(envelope.iter >= 100000 && envelope.salt && envelope.iv && envelope.ct);
  const dir = new URL("site/benchmarks/", root);
  for (const entry of await readdir(dir, { recursive: true })) {
    if (!/\.(json|js|mjs|html)$/.test(entry) || entry.endsWith("index.enc.json")) continue;
    assert.doesNotMatch(await readFile(new URL(entry, dir), "utf8"), /"scores"\s*:\s*\[/, entry);
  }
  const ids = await benchmarkIds();
  assert.ok(ids.length >= 10 && !ids.includes("all"));
});

test("every benchmark page reads the vault and loads assets that exist", async () => {
  const ids = await benchmarkIds();
  for (const page of ["benchmarks/index.html", "benchmarks/all/index.html", ...ids.map((id) => `benchmarks/${id}/index.html`)]) {
    const html = await read(page);
    assert.match(html, /vault:'\/site\/benchmarks\/data\/index\.enc\.json'/, page);
    assert.doesNotMatch(html, /noindex/, page);
    for (const [, path] of html.matchAll(/(?:src|href)="(\/site\/[^"?#]+)/g)) await access(new URL(path.slice(1), root));
  }
  assert.match(await read("benchmarks/index.html"), /data-page="home"/);
  assert.match(await read("benchmarks/all/index.html"), /data-page="benchmarks"/);
  assert.match(await read(`benchmarks/${ids[0]}/index.html`), /data-page="benchmark"/);
  const css = await read("site/benchmarks/assets/styles.css");
  for (const [, font] of css.matchAll(/url\((fonts\/[^)]+)\)/g)) await access(new URL(`site/benchmarks/assets/${font}`, root));
});

test("the benchmark app links only to pages that still exist and offers no plaintext download", async () => {
  const app = await read("site/benchmarks/assets/app.js");
  assert.doesNotMatch(app, /\/company['"`]/);
  assert.doesNotMatch(app, /download="physical-ai-index\.json"/);
});

test("benchmark pages render at 75% on desktop while the site footer matches the 80% main site", async () => {
  const css = await read("site/benchmarks/assets/styles.css");
  assert.match(css, /@media \(min-width:761px\)\{html\{zoom:\.75\}\.company-footer\{zoom:1\.06667;--z:\.8\}\}/);
  assert.match(await read("site/benchmarks/assets/app.js"), /clientWidth \/ zoom/);
});

test("the home pages reach the index through the nav link alone, with no popup", async () => {
  assert.equal(await exists(new URL("../public/site/benchmarks/benchmarks.js", import.meta.url)), false);
  for (const page of ["index.html", "prism/index.html"]) {
    const html = await read(page);
    assert.doesNotMatch(html, /benchmarks\/benchmarks\.(js|css)|data-benchmark-open/, page);
    assert.match(html, /<nav class="nav-links" aria-label="Primary"><a href="\/benchmarks\/"/, page);
  }
});
