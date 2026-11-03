import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { companyFooter, companyHeader } from "../lib/company-site.mjs";

// One nav, one footer, one destination per action, on every page that uses the shared chrome.
const root = new URL("../.pages-dist/", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const exists = (url) => access(url).then(() => true, () => false);

// Pages that carry the global nav. The two investor pages keep their own section nav (Why now, Proof, ...).
const NAV_PAGES = [
  "index.html", "prism/index.html", "order/index.html", "privacy/index.html", "terms/index.html", "careers/index.html",
  "contact/index.html", "trust/index.html", "cookies/index.html", "accessibility/index.html", "resources/index.html",
  "prism-robotics/index.html", "prism-robotics/how-it-works/index.html", "prism-robotics/scene-history/index.html",
];
const FOOTER_PAGES = [...NAV_PAGES, "investors/index.html", "robotics/investors/index.html"];
const BENCHMARK_PAGES = ["benchmarks/index.html", ...(await readdir(new URL("benchmarks/", root), { withFileTypes: true }))
  .filter((d) => d.isDirectory()).map((d) => `benchmarks/${d.name}/index.html`)];

const navOf = (html) => {
  const nav = html.match(/<nav class="nav-links"[^>]*>([\s\S]*?)<\/nav>/);
  return nav && [...nav[1].matchAll(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map((m) => `${m[2]} → ${m[1]}`);
};
const buttonsOf = (html) => {
  const cta = html.match(/<div class="nav-cta">([\s\S]*?)<\/div>/);
  return cta && [...cta[1].matchAll(/<(?:a|button) class="([^"]+)"([^>]*)>([^<]+)</g)].map((m) => `${m[3].trim()} | ${m[1]} | ${m[2].match(/href="([^"]+)"/)?.[1] || "button"}`);
};

async function allHtml(dir = root) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) out.push(...await allHtml(url));
    else if (entry.name.endsWith(".html")) out.push([url.pathname.split(".pages-dist/")[1], await readFile(url, "utf8")]);
  }
  return out;
}

test("the shared nav is Benchmarks, Prism Robotics, Investors, Prism IRL, with Sign in and Book a demo", () => {
  const header = companyHeader("");
  assert.deepEqual(navOf(header), ["Benchmarks → /benchmarks/", "Prism Robotics → /prism-robotics", "Investors → /robotics/investors", "Prism IRL → /prism"]);
  assert.deepEqual(buttonsOf(header), ["Sign in | btn btn-ghost btn-sm | https://prism.lightcompany.ai", "Book a demo | btn btn-primary btn-sm | /order"]);
});

test("every page shows that same nav and the same buttons", async () => {
  const header = companyHeader("");
  for (const page of NAV_PAGES) {
    const html = await read(page);
    assert.deepEqual(navOf(html), navOf(header), `${page} nav`);
    assert.deepEqual(buttonsOf(html), buttonsOf(header), `${page} buttons`);
  }
});

test("page styles cannot resize the footer's columns", async () => {
  // the benchmark app's .wrap pads its columns; the footer's .wrap must not inherit that
  const css = await readFile(new URL("../public/site/lc/footer.css", import.meta.url), "utf8");
  assert.match(css, /\.company-footer \.wrap \{[^}]*padding-inline: 0;/);
});

test("the site footer is the one on the home page", () => {
  assert.match(companyFooter, /<p class="footer-tag">The full evaluation workflow\.<br \/>One platform\.<\/p>/);
  assert.match(companyFooter, /<span>Light\. Space\. Understanding\.<\/span>/);
  for (const column of ["Prism", "Explore", "Company", "Information"]) assert.match(companyFooter, new RegExp(`<h4>${column}</h4>`));
});

test("every page, the benchmarks included, ends with the one site footer", async () => {
  for (const page of [...FOOTER_PAGES, ...BENCHMARK_PAGES]) {
    assert.ok((await read(page)).includes(companyFooter), `${page} footer differs from lib/company-site.mjs`);
  }
});

test("Book a demo always goes to the order page", async () => {
  for (const [page, html] of await allHtml()) {
    for (const m of html.matchAll(/<a\b[^>]*>\s*Book a demo\s*</g)) assert.match(m[0], /href="\/order"/, page);
  }
});

test("the Company page and the founders photo are gone", async () => {
  assert.equal(await exists(new URL("company/index.html", root)), false);
  assert.equal(await exists(new URL("../public/site/assets/media/founders.jpg", import.meta.url)), false);
  for (const [page, html] of await allHtml()) {
    assert.doesNotMatch(html, /href="\/company"/, page);
    assert.doesNotMatch(html, /founders\.jpg/, page);
  }
});

test("desktop pages render at 80%, the same as the browser's own 80% zoom", async () => {
  const site = (file) => readFile(new URL(`../public/site/${file}`, import.meta.url), "utf8");
  assert.match(await site("lc/lc.css"), /@media \(min-width: 761px\) \{ html \{ zoom: 0\.8; \} :root \{ --z: 0\.8; \} \}/);
  for (const page of [...FOOTER_PAGES, "gallery/index.html"]) assert.match(await read(page), /href="\/site\/lc\/lc\.css"/, page);
  for (const file of ["company/company.css", "gallery/gallery.css"]) assert.doesNotMatch(await site(file), /zoom/, `${file} must not override the site zoom`);
  // CSS zoom also shrinks vw/vh (browser zoom does not), so every viewport unit divides the zoom back out.
  for (const file of ["lc/lc.css", "lc/footer.css", "company/company.css", "gallery/gallery.css"]) {
    const raw = [...(await site(file)).matchAll(/\d(?:vw|vh|svh|dvh|lvh)\b(?! \/ var\(--z, 1\))/g)];
    assert.equal(raw.length, 0, `${file}: ${raw.length} viewport units ignore the zoom`);
  }
});

test("the home hero has no ticker strip under it", async () => {
  const home = await read("index.html");
  assert.doesNotMatch(home, /hero-foot/);
  assert.doesNotMatch(home, /Projected guidance in real workcells/);
});
