import { companyPages } from "./company-content.mjs";

const escape = (value) => String(value).replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const links = (items) => items.map(([label, path]) => `<li><a href="${path}">${label}</a></li>`).join("");
export const companyFooter = `<footer class="footer company-footer"><div class="wrap">
  <div class="footer-grid">
    <div><a class="brand" href="/"><img class="no-invert" src="/site/assets/brand/light-company-mark-inverse.svg" alt="" width="30" height="24" />The Light Company</a><p class="footer-tag">Prism for robotics<br />and everyday spaces.</p><a class="link" href="mailto:hi@lightcompany.ai">hi@lightcompany.ai</a></div>
    <div><h4>Prism</h4><ul>${links([["Prism Robotics","/prism-robotics"],["How it works","/prism-robotics/how-it-works"],["Scene history","/prism-robotics/scene-history"],["Benchmarks","/benchmarks"],["Prism IRL","/prism"],["Get a station","/order"]])}</ul></div>
    <div><h4>Explore</h4><ul>${links([["Evaluation guides","/resources"],["Lab films","/gallery"],["Technical brief","/media/prism-technical-brief.pdf"],["AI-readable overview","/llms.txt"],["Sign in","https://prism.lightcompany.ai"]])}</ul></div>
    <div><h4>Company</h4><ul>${links([["Company","/company"],["Investors","/robotics/investors"],["Careers","/careers"],["Contact","/contact"],["Security & trust","/trust"]])}</ul></div>
    <div><h4>Information</h4><ul>${links([["Terms of service","/terms"],["Privacy","/privacy"],["Cookies & storage","/cookies"],["Accessibility","/accessibility"]])}</ul></div>
  </div>
  <div class="footer-logo" aria-hidden="true"><canvas class="footer-ascii" data-logo="/site/assets/brand/light-company-logo-full.svg"></canvas></div>
  <div class="footer-legal"><span>© 2026 The Light Company</span><a href="#top">Back to top ↑</a></div>
</div></footer>`;

export function companyHeader(path = "") {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="nav is-solid"><div class="wrap nav-inner">
    <a class="brand" href="/" aria-label="The Light Company home"><img class="no-invert" src="/site/assets/brand/light-company-mark-inverse.svg" alt="" width="30" height="24" />The Light Company</a>
    <nav class="nav-links" aria-label="Primary">${[["Prism","/prism-robotics"],["Benchmarks","/benchmarks"],["Resources","/resources"],["Company","/company"],["Investors","/robotics/investors"]].map(([label, href])=>`<a href="${href}"${path===href?' aria-current="page"':path.startsWith(`${href}/`)?' aria-current="location"':""}>${label}</a>`).join("")}</nav>
    <div class="nav-cta"><a class="btn btn-primary btn-sm" href="/contact">Talk to us</a></div><button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
  </div></header>`;
}

const plain = (value) => String(value).replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "").trim();
const heading = (value) => String(value).replace(/<br\s*\/?\s*>/gi, " ");
const figurePattern = /<figure\b[^>]*>[\s\S]*?<\/figure>/;

function pageKind(page) {
  if (page.article) return "article";
  if (page.path === "/prism-robotics") return "product";
  if (page.path.endsWith("/how-it-works")) return "workflow";
  if (page.path.endsWith("/scene-history")) return "scene";
  if (["/company", "/careers", "/contact", "/resources"].includes(page.path)) return page.path.slice(1);
  return "reference";
}

function mediaFigure(media) {
  if (!media) return "";
  const isVideo = media.type === "video" || /\.mp4(?:$|\?)/.test(media.src);
  return `<figure class="editorial-media">${isVideo
    ? `<video controls playsinline preload="metadata"${media.poster ? ` poster="${escape(media.poster)}"` : ""} src="${escape(media.src)}" aria-label="${escape(media.alt || "Prism in operation")}"></video>`
    : `<img src="${escape(media.src)}" alt="${escape(media.alt || "")}" loading="eager" />`}${media.caption ? `<figcaption>${media.caption}</figcaption>` : ""}</figure>`;
}

function heroParts(page, kind) {
  if (page.heroMedia) return { media: mediaFigure(page.heroMedia), lead: (page.lead || "").replace(figurePattern, ""), borrowed: "" };
  const lead = page.lead || "";
  if (["product", "company", "careers", "workflow"].includes(kind)) {
    const figure = lead.match(figurePattern)?.[0];
    if (figure) return { media: figure, lead: lead.replace(figure, ""), borrowed: "" };
    if (kind === "workflow") {
      const section = page.sections.find((item) => figurePattern.test(item.body));
      const borrowed = section?.body.match(figurePattern)?.[0] || "";
      return { media: borrowed, lead, borrowed };
    }
  }
  return { media: "", lead, borrowed: "" };
}

function contents(page, kind) {
  if (["company", "careers", "contact", "resources", "scene"].includes(kind)) return "";
  const title = kind === "workflow" ? "Evaluation workflow" : "On this page";
  return `<aside class="contents"><p>${title}</p><nav aria-label="On this page">${page.sections.map((section) => `<a href="#${section.id}">${plain(section.title)}</a>`).join("")}</nav></aside>`;
}

function sections(page, kind, borrowed) {
  return page.sections.map((section, index) => {
    const body = borrowed ? section.body.replace(borrowed, "") : section.body;
    const figure = section.media ? mediaFigure(section.media) : "";
    const rich = /class="(?:definition-list|link-list)"/.test(body);
    return `<section id="${section.id}" class="editorial-section${rich ? " section-structured" : ""}${figure ? " section-with-media" : ""}">
      <div class="section-heading">${kind === "workflow" ? `<span class="workflow-step" aria-label="Step ${index + 1}">${String(index + 1).padStart(2, "0")}</span>` : ""}<h2>${section.title}</h2></div>
      <div class="section-copy">${body}${figure}</div>
    </section>`;
  }).join("");
}

function closing(page, kind) {
  if (page.close === false || ["reference", "contact"].includes(kind)) return "";
  if (kind === "article") return `<nav class="article-next" aria-label="More resources"><a class="link" href="/resources">All evaluation guides</a><a class="link" href="/prism-robotics">Explore Prism Robotics</a></nav>`;
  const title = page.close || (kind === "careers" ? "Work with The Light Company" : "Bring Prism to your lab");
  return `<section class="editorial-close"><div><h2>${heading(title)}</h2><p>${page.closeIntro || "Tell us about your robot, task and evaluation workflow."}</p></div><div class="close-actions"><a class="btn btn-primary" href="/contact">Talk to the team</a>${kind === "product" ? '<a class="link" href="/order">Get a station</a>' : '<a class="link" href="/prism-robotics">Explore Prism Robotics</a>'}</div></section>`;
}

function pageContent(page, kind) {
  const { media, lead, borrowed } = heroParts(page, kind);
  const words = plain(page.sections.map((section) => section.body).join(" ")).split(/\s+/).length;
  const articleMeta = page.article ? `<p class="article-meta"><span>The Light Company</span><time datetime="2026-11-01">November 1, 2026</time><span>${Math.max(1, Math.ceil(words / 220))} min read</span></p>` : "";
  const contactRoute = kind === "contact" ? `<div class="contact-direct"><span>Email</span><a href="mailto:hi@lightcompany.ai">hi@lightcompany.ai <span aria-hidden="true">↗</span></a><a class="link" href="/order">Request a Prism station</a></div>` : "";
  return `<div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${page.article ? '<a href="/resources">Resources</a><span aria-hidden="true">/</span>' : page.path.startsWith("/prism-robotics/") ? '<a href="/prism-robotics">Prism Robotics</a><span aria-hidden="true">/</span>' : ""}<span aria-current="page">${escape(page.label || page.title)}</span></nav>
    <header class="editorial-hero${media ? " has-media" : ""}"><div class="hero-copy"><h1>${heading(page.heading)}</h1><p class="editorial-intro">${page.intro}</p>${page.note ? `<p class="page-note">${page.note}</p>` : ""}${page.actions || ""}${articleMeta}</div>${media ? `<div class="hero-evidence">${media}</div>` : ""}${contactRoute}</header>
    ${lead ? `<div class="page-lead">${lead}</div>` : ""}
    <div class="editorial-layout">${contents(page, kind)}<div class="editorial-body">${sections(page, kind, borrowed)}</div></div>
    ${closing(page, kind)}
  </div>`;
}

export function renderCompanyPage(path) {
  const page = companyPages.find((item) => item.path === path);
  if (!page) throw new Error(`Unknown company page: ${path}`);
  const kind = pageKind(page);
  const url = `https://lightcompany.ai${path}`;
  const organization = { "@type": "Organization", "@id": "https://lightcompany.ai/#organization", name: "The Light Company", url: "https://lightcompany.ai/", logo: "https://lightcompany.ai/site/assets/brand/light-company-mark.svg", email: "hi@lightcompany.ai" };
  const schema = { "@context": "https://schema.org", "@graph": [organization, { "@type": page.article ? "Article" : "WebPage", "@id": `${url}#page`, url, name: page.title, ...(page.article ? {headline:page.heading, author:{"@id":organization["@id"]}, publisher:{"@id":organization["@id"]}, datePublished:"2026-11-01",dateModified:"2026-11-01", image:"https://lightcompany.ai/og-blue.png"}:{}), description:page.description, inLanguage:"en", isPartOf:{"@id":"https://lightcompany.ai/#website"} }, {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"The Light Company",item:"https://lightcompany.ai/"},{"@type":"ListItem",position:2,name:page.label||page.heading,item:url}]}] };
  return `<!doctype html><html lang="en"><head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#08090a" />
    <title>${escape(page.title)} | The Light Company</title><meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${url}" />${page.concept?'<meta name="robots" content="noindex, follow" />':""}
    <meta property="og:type" content="${page.article?'article':'website'}" /><meta property="og:site_name" content="The Light Company" /><meta property="og:title" content="${escape(page.title)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:url" content="${url}" /><meta property="og:image" content="https://lightcompany.ai/og-blue.png" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(page.title)}" /><meta name="twitter:description" content="${escape(page.description)}" /><meta name="twitter:image" content="https://lightcompany.ai/og-blue.png" />
    <link rel="icon" href="/site/assets/brand/light-company-mark.svg" type="image/svg+xml" /><link rel="preload" href="/site/assets/fonts/Satoshi-700.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/site/lc/lc.css" /><link rel="stylesheet" href="/site/company/company.css" /><script src="/site/lc/lc.js" defer></script><script src="/site/company/company.js" type="module"></script>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script>
  </head><body class="company-page layout-${kind}" id="top">${companyHeader(path)}
  <main id="main">${pageContent(page, kind)}</main>${companyFooter}</body></html>`.replace(/[ \t]+$/gm, "");
}
