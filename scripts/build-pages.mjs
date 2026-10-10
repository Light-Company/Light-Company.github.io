import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { publishedVisionHtml } from "../lib/published-vision.mjs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, ".pages-dist");

const pages = [
  ["site/robotics.html", "index.html"],
  ["site/main.html", "prism-vision/index.html"],
  ["site/robotics.html", "robotics/index.html"],
  ["site/robotics.html", "Robotics/index.html"],
  ["site/gallery.html", "gallery/index.html"],
  ["site/order.html", "order/index.html"],
  ["site/investors.html", "investors/index.html"],
  ["site/robotics-investors.html", "robotics/investors/index.html"],
  ["site/demo.html", "demo/index.html"],
  ["site/privacy.html", "privacy/index.html"],
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(projectRoot, "public"), outputRoot, { recursive: true });

for (const [source, destination] of pages) {
  const destinationPath = join(outputRoot, destination);
  await mkdir(dirname(destinationPath), { recursive: true });
  const sample = source === "site/main.html" ? "prism-vision" : source === "site/robotics.html" ? "robotics-vision" : null;
  if (sample) {
    const [approved, previous] = await Promise.all([
      readFile(join(projectRoot, `site/${sample}.html`), "utf8"),
      readFile(join(projectRoot, source), "utf8"),
    ]);
    const canonicalUrl = sample === "robotics-vision" ? "https://lightcompany.ai/" : "https://lightcompany.ai/prism-vision";
    await writeFile(destinationPath, publishedVisionHtml(approved, previous, { canonicalUrl }));
  } else {
    await cp(join(projectRoot, source), destinationPath);
  }
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
