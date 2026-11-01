import { companyPages } from "./company-content.mjs";

const escape = (value) => String(value).replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const links = (items) => items.map(([label, path]) => `<li><a href="${path}">${label}</a></li>`).join("");
export const companyFooter = `<footer class="footer company-footer"><div class="wrap">
  <div class="footer-grid">
    <div><a class="brand" href="/"><img class="no-invert" src="/site/assets/brand/light-company-mark-inverse.svg" alt="" width="30" height="24" />The Light Company</a><p class="footer-tag">Give the physical world<br />a memory.</p><a class="link" href="mailto:hi@lightcompany.ai">hi@lightcompany.ai</a></div>
    <div><h4>Prism</h4><ul>${links([["Prism Robotics","/prism-robotics"],["How it works","/prism-robotics/how-it-works"],["Scene history · concept","/prism-robotics/scene-history"],["Benchmarks","/benchmarks"],["Prism IRL","/prism"],["Get a station","/order"]])}</ul></div>
    <div><h4>Explore</h4><ul>${links([["Evaluation guides","/resources"],["Lab films","/gallery"],["Technical brief","/media/prism-technical-brief.pdf"],["AI-readable overview","/llms.txt"],["Sign in","https://prism.lightcompany.ai"]])}</ul></div>
    <div><h4>Company</h4><ul>${links([["Our purpose","/company"],["Investors","/robotics/investors"],["Careers","/careers"],["Contact","/contact"],["Security & trust","/trust"]])}</ul></div>
    <div><h4>Information</h4><ul>${links([["Terms of service","/terms"],["Privacy","/privacy"],["Cookies & storage","/cookies"],["Accessibility","/accessibility"]])}</ul></div>
  </div>
  <div class="footer-logo" aria-hidden="true"><canvas class="footer-ascii" data-logo="/site/assets/brand/light-company-logo-full.svg"></canvas></div>
  <div class="footer-legal"><span>© 2026 The Light Company</span><span>Light. Space. Understanding.</span><a href="#top">Back to top ↑</a></div>
</div></footer>`;

export function companyHeader(path = "") {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="nav is-solid"><div class="wrap nav-inner">
    <a class="brand" href="/" aria-label="The Light Company home"><img class="no-invert" src="/site/assets/brand/light-company-mark-inverse.svg" alt="" width="30" height="24" />The Light Company</a>
    <nav class="nav-links" aria-label="Primary">${[["Prism","/prism-robotics"],["Benchmarks","/benchmarks"],["Resources","/resources"],["Company","/company"],["Investors","/robotics/investors"]].map(([label, href])=>`<a href="${href}"${path===href?' aria-current="page"':""}>${label}</a>`).join("")}</nav>
    <div class="nav-cta"><a class="btn btn-primary btn-sm" href="/contact">Talk to us</a></div><button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
  </div></header>`;
}

export function renderCompanyPage(path) {
  const page = companyPages.find((item) => item.path === path);
  if (!page) throw new Error(`Unknown company page: ${path}`);
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
  </head><body class="company-page ${page.feature?'feature-page':'reading-page'}" id="top">${companyHeader(path)}
  <main id="main"><div class="wrap"><div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span>${page.article?'<a href="/resources">Resources</a><span aria-hidden="true">/</span>':""}<span>${escape(page.label||page.title)}</span></div>
    <header class="editorial-hero"><h1>${page.heading}</h1><p class="editorial-intro">${page.intro}</p>${page.note?`<p class="page-note">${page.note}</p>`:""}${page.actions||""}</header>
    ${page.lead||""}
    <div class="editorial-layout"><aside class="contents"><p>On this page</p><nav aria-label="On this page">${page.sections.map(s=>`<a href="#${s.id}">${s.title.replace(/<[^>]*>/g,"")}</a>`).join("")}</nav>${page.article?'<p class="article-credit">The Light Company<br /><time datetime="2026-11-01">November 1, 2026</time></p>':""}</aside>
    <div class="editorial-body">${page.sections.map(s=>`<section id="${s.id}" class="editorial-section"><h2>${s.title}</h2>${s.body}</section>`).join("")}</div></div>
    ${page.close===false?"":`<section class="editorial-close"><h2>${page.close||"Bring us the scene<br />you want to understand."}</h2><p>Tell us about your robot, your task and the question your current evaluations cannot answer.</p><a class="btn btn-primary" href="/contact">Talk to the Prism team</a><a class="link" href="/prism-robotics">Explore Prism Robotics</a></section>`}
  </div></main>${companyFooter}</body></html>`.replace(/[ \t]+$/gm, "");
}
