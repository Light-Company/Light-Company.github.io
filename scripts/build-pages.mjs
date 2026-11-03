import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { publishedVisionHtml } from "../lib/published-vision.mjs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { companyPages } from "../lib/company-content.mjs";
import { withSiteChrome } from "../lib/company-site.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, ".pages-dist");

// Physical AI Index: one static page per benchmark (/benchmarks/<id>/), all from the same shell.
// The scores ship encrypted (data/index.enc.json); routes.json is the plain list of page ids.
const benchmarkRoutes = JSON.parse(await readFile(join(projectRoot, "public/site/benchmarks/data/routes.json"), "utf8"));

const pages = [
  ["site/robotics.html", "index.html", "https://lightcompany.ai/"],
  ["site/robotics.html", "robotics/index.html", "https://lightcompany.ai/"],
  ["site/robotics.html", "Robotics/index.html", "https://lightcompany.ai/"],
  ["site/main.html", "prism/index.html", "https://lightcompany.ai/prism"],
  ["site/benchmarks.html", "benchmarks/index.html"],
  ["site/benchmarks-all.html", "benchmarks/all/index.html"],
  ...benchmarkRoutes.benchmarks.map((id) => ["site/benchmark.html", `benchmarks/${id}/index.html`]),
  ["site/gallery.html", "gallery/index.html"],
  ["site/order.html", "order/index.html"],
  ["site/investors.html", "investors/index.html"],
  ["site/robotics-investors.html", "robotics/investors/index.html"],
  ["site/demo.html", "demo/index.html"],
  ["site/privacy.html", "privacy/index.html"],
  ...companyPages.filter(page => page.path !== "/privacy").map(page => [`site/company${page.path}.html`, `${page.path.slice(1)}/index.html`]),
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(projectRoot, "public"), outputRoot, { recursive: true });

for (const [source, destination, canonical] of pages) {
  const destinationPath = join(outputRoot, destination);
  await mkdir(dirname(destinationPath), { recursive: true });
  const sample = source === "site/main.html" ? "prism-vision" : source === "site/robotics.html" ? "robotics-vision" : null;
  const route = `/${destination.replace(/index\.html$/, "")}`.replace(/(.)\/$/, "$1");
  let html;
  if (sample) {
    const [approved, previous] = await Promise.all([
      readFile(join(projectRoot, `site/${sample}.html`), "utf8"),
      readFile(join(projectRoot, source), "utf8"),
    ]);
    html = publishedVisionHtml(approved, previous, canonical);
  } else {
    html = await readFile(join(projectRoot, source), "utf8");
  }
  // Every page ships the one site footer, and the global nav where the page uses it.
  await writeFile(destinationPath, withSiteChrome(html, route));
}

await writeFile(join(outputRoot, ".nojekyll"), "");

const notFound = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page not found — Light Company</title>
    <style>
      body{min-height:100vh;margin:0;display:grid;place-items:center;color:#07111c;background:#fff;font-family:"Helvetica Neue",Arial,sans-serif;text-align:center}
      main{padding:40px}h1{margin:0;font-size:clamp(54px,10vw,110px);letter-spacing:-.07em}p{color:rgba(7,17,28,.6);font-size:19px}a{color:inherit;text-underline-offset:4px}
    </style>
  </head>
  <body><main><h1>Nothing here.</h1><p>The light is on somewhere else.</p><a href="/">Back to Light Company</a></main></body>
</html>`;

await writeFile(join(outputRoot, "404.html"), notFound);
