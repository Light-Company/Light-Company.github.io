/* Physical AI Index — Prism Benchmarks · The Light Company
   One script for all pages. Everything renders from the index data: data/index.json in the standalone
   preview, or the password-sealed data/index.enc.json on lightcompany.ai (window.PAI.vault). */
(() => {
'use strict';

const PAGE = document.body.dataset.page;          // home | benchmarks | benchmark
// Paths. The standalone preview uses relative files; lightcompany.ai sets window.PAI in each page shell.
const CFG = Object.assign({ lc: 'https://lightcompany.ai', base: '', home: 'index.html', list: 'benchmarks.html', bench: (id) => 'benchmark.html?id=' + encodeURIComponent(id), idFromPath: () => '' }, window.PAI || {});
const LC = CFG.lc, HOME = CFG.home, LIST = CFG.list, BENCH = CFG.bench, A = (p) => CFG.base + p;
const MARK = '<svg class="lc-mark" viewBox="13 13 205 153" fill="none" aria-hidden="true"><path d="M132.623513 76.505581 L100 20 L20 158.564 H180 L158.930868 122.071257" stroke="currentColor" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M100 96 L212 61 L212 131 Z" fill="#00B7F0"/></svg>';
let DATA, M = {}, O = {};

// ---------- utils ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const fmtDate = (iso, opts = { month: 'long', day: 'numeric', year: 'numeric' }) => { const d = new Date(iso + (iso.length <= 10 ? 'T12:00:00' : '')); return isNaN(d) ? iso : d.toLocaleDateString('en-US', opts); };
const shortDate = (iso) => fmtDate(iso, { month: 'short', day: 'numeric' });
const fmt = (v, d = 0) => (v == null || isNaN(v)) ? '—' : Number(v).toFixed(d);
const smartFmt = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : Number(v).toFixed(2));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const SUN = '<svg viewBox="0 0 24 24" class="only-dark" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" class="only-light" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
const model = (id) => M[id] || { id, name: id, short: id, org: '?', config: '' };
const org = (id) => O[id] || { name: id, color: 'character', logo: null };
const colorVar = (orgId) => `var(--m-${org(orgId).color || 'character'})`;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function logoHTML(orgId, cls = '') {
  const o = org(orgId), L = (window.LOGOS || {})[o.logo];
  if (L && L.svg) return `<svg viewBox="0 0 24 24" class="logo ${cls}" focusable="false" aria-hidden="true">${L.svg}</svg>`;
  if (L && L.mask) return `<span class="logo is-mask ${cls}" style="--logo-src:url('${new URL(A(L.mask), location.href).href}')" aria-hidden="true"></span>`;
  return `<span class="logo is-mono ${cls}" aria-hidden="true">${esc(o.monogram || (o.name || '?')[0])}</span>`;
}
const chipHTML = (orgId) => `<span class="chip" style="background:${colorVar(orgId)}">${logoHTML(orgId)}</span>`;

// ---------- data ----------
async function loadData() {
  if (CFG.vault) return unlock();
  for (const url of [A('data/index.json'), A('data/seed.json')]) {
    try { const r = await fetch(url + '?t=' + Date.now(), { cache: 'no-store' }); if (r.ok) return await r.json(); } catch (e) { /* try next */ }
  }
  throw new Error('No data file found');
}
// The published scores are sealed (assets/vault.mjs). One unlock is remembered for every benchmark page.
async function unlock() {
  const vault = await import(A('assets/vault.mjs'));
  const env = await (await fetch(CFG.vault, { cache: 'no-cache' })).json();
  try {
    const saved = JSON.parse(localStorage.getItem('pai-key') || 'null');
    if (saved && saved.salt === env.salt) return await vault.openWithKey(env, await vault.importKey(saved.key));
  } catch (e) { /* stale or unavailable: ask */ }
  document.body.classList.add('is-locked');
  $('#main').innerHTML = `<div class="gate"><form class="gate-form">
    <a class="gate-brand" href="${LC}/" aria-label="The Light Company home">${MARK}<span>The Light Company</span></a>
    <h1 class="gate-title">Physical AI Index</h1>
    <div class="gate-row"><label class="sr-only" for="gate-pw">Password</label><input id="gate-pw" type="password" autocomplete="current-password" placeholder="Password" required><button class="lc-pill" type="submit">Enter</button></div>
    <p class="gate-msg" role="alert"></p></form></div>`;
  const form = $('.gate-form'), input = $('#gate-pw'), msg = $('.gate-msg');
  input.focus();
  return new Promise((resolve) => form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.remove('is-wrong'); msg.textContent = '';
    try {
      const key = await vault.deriveKey(env, input.value);
      const data = await vault.openWithKey(env, key);
      try { localStorage.setItem('pai-key', JSON.stringify({ salt: env.salt, key: await vault.exportKey(key) })); } catch (err) { /* private mode: ask again next page */ }
      $('#main').innerHTML = '';
      document.body.classList.remove('is-locked');
      resolve(data);
    } catch (err) {
      form.classList.add('is-wrong'); msg.textContent = 'Wrong password'; input.select();
    }
  }));
}
function liveReload() {
  if (!/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(location.hostname)) return;
  let last = null;
  const tick = async () => {
    try {
      const r = await fetch((CFG.vault || A('data/index.json')) + '?t=' + Date.now(), { cache: 'no-store' });
      const txt = r.ok ? await r.text() : 'missing';
      const heads = await Promise.all([A('assets/app.js'), A('assets/styles.css')].map((u) => fetch(u + '?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' }).then((x) => x.headers.get('last-modified') || '').catch(() => '')));
      const sig = txt.length + ':' + txt.slice(0, 200) + txt.slice(-200) + heads.join('|');
      if (last && sig !== last) { sessionStorage.setItem('pai-scroll', String(scrollY)); location.reload(); }
      last = sig;
    } catch (e) { /* ignore */ }
  };
  tick(); setInterval(tick, 2500);
}
// --vw is the layout width in page px; desktop pages render at zoom .75, so divide the zoom back out.
function geometry() { const root = document.documentElement, zoom = parseFloat(getComputedStyle(root).zoom) || 1; root.style.setProperty('--vw', root.clientWidth / zoom + 'px'); }

// ---------- theme ----------
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('pai-theme', t); } catch (e) { /* private mode */ }
  const b = $('.theme-toggle'); if (b) b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  const meta = $('meta[name=theme-color]'); if (meta) meta.content = t === 'dark' ? '#08090a' : '#f6f5f1';
}

// ---------- header + footer ----------
function mountHeader() {
  const s = DATA.site;
  const tabs = [
    ['Index', HOME, PAGE === 'home'],
    ['Benchmarks', LIST, PAGE === 'benchmarks' || PAGE === 'benchmark'],
    ['Standings', LIST + '#standings', false],
    ['By topic', HOME + '#topics', false],
    ['Changelog', HOME + '#changes', false],
    ['Our why', HOME + '#why', false],
  ];
  $('#site-header').innerHTML = `
    <div class="lc-row"><div class="lc-topbar">
      <a class="lc-brand" href="${LC}/" aria-label="The Light Company home">${MARK}<span>${esc(s.org)}</span></a>
      <a class="lc-location" href="${HOME}">Benchmarks</a>
      <nav class="lc-global-nav" aria-label="Company navigation"><a href="${LC}/prism-robotics">Prism Robotics</a><a href="${LC}/robotics/investors">Investors</a><a href="${LC}/prism">Prism IRL</a></nav>
      <button class="theme-toggle" type="button">${MOON}${SUN}</button>
      <a class="lc-button" href="${esc(s.submitUrl || 'mailto:hi@lightcompany.ai')}">Submit a model <span aria-hidden="true">↗</span></a>
    </div></div>
    <div class="lc-row"><nav class="lc-subnav" aria-label="Index sections">
      ${tabs.map(([t, href, on]) => `<a href="${href}"${on ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
    </nav></div>`;
  const btn = $('.theme-toggle');
  btn.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
}

// ---------- rail ----------
function mountRail() {
  const page = $('.page');
  const secs = $$('[data-rail]');
  if (!secs.length) return;
  const rail = h(`<nav class="rail rail-page" aria-label="Sections"></nav>`);
  secs.forEach((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    rail.appendChild(h(`<a href="#${s.id}" class="rail-number" aria-label="${n}: ${esc(s.dataset.rail)}">${n}</a>`));
  });
  rail.appendChild(h(`<button type="button" class="rail-top" aria-label="Back to the top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.5V4.5M5.25 11.25 12 4.5l6.75 6.75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`));
  page.appendChild(rail);
  const nums = $$('.rail-number', rail), top = $('.rail-top', rail);
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  const place = () => {
    const pr = page.getBoundingClientRect();
    secs.forEach((s, i) => {
      const t = s.querySelector('.section-title') || s.querySelector('.type-section-title') || s;
      const r = t.getBoundingClientRect();
      nums[i].style.top = (r.top - pr.top + r.height / 2 - 16) + 'px';
    });
  };
  const active = () => {
    const line = innerHeight * 0.35;
    let k = 0;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) k = i; });
    nums.forEach((n, i) => n.classList.toggle('is-active', i === k));
    top.classList.toggle('is-shown', scrollY > 700);
  };
  place(); active();
  addEventListener('scroll', active, { passive: true });
  addEventListener('resize', () => { place(); active(); });
  new ResizeObserver(place).observe(document.body);
}

// ---------- reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const t = e.target; io.unobserve(t);
    t.classList.add('is-revealed');
    t.dispatchEvent(new CustomEvent('reveal'));
  });
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
const observe = (el) => { if (reduced) { el.classList.add('is-revealed'); el.dispatchEvent(new CustomEvent('reveal')); } else io.observe(el); };

// ---------- pinning ----------
function setPin(id) {
  const cur = document.body.dataset.pinned;
  const next = cur === id ? null : id;
  $$('.is-pinned').forEach((e) => e.classList.remove('is-pinned'));
  if (next) {
    document.body.dataset.pinned = next;
    $$(`[data-model="${CSS.escape(next)}"]`).forEach((e) => e.classList.add('is-pinned'));
  } else delete document.body.dataset.pinned;
  $$('.mini-bar').forEach((b) => b.setAttribute('aria-pressed', String(b.closest('.mini-col').dataset.model === next)));
}
addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.dataset.pinned) setPin(document.body.dataset.pinned); });
document.addEventListener('click', (e) => { const li = e.target.closest('.leaders li[data-model], .standings tbody tr[data-model]'); if (li) setPin(li.dataset.model); });

// ---------- shared pieces ----------

function leadersHTML(scores, n = 5) {
  const top = [...scores].filter((r) => M[r.model]).sort((a, b) => b.score - a.score).slice(0, n);
  const max = top.length ? top[0].score : 100;
  return `<ol class="leaders">${top.map((r, i) => {
    const m = model(r.model);
    return `<li data-model="${esc(m.id)}" style="--i:${i}"><span class="rank">${i + 1}</span>${chipHTML(m.org)}<span class="who"><b>${esc(m.name)}</b><i>${esc(org(m.org).name)} · ${esc(m.config)}</i></span><span class="num">${fmt(r.score, 1)}</span><span class="bar"><i style="width:${(r.score / max * 100).toFixed(1)}%;background:${colorVar(m.org)}"></i></span></li>`;
  }).join('')}</ol>`;
}

// ---------- mini chart card ----------
function miniChart({ id, kicker, title, href, description, scores, limit = 10, dense = false }) {
  const rows = [...scores].filter((s) => M[s.model]).sort((a, b) => b.score - a.score).slice(0, limit);
  const art = h(`<article class="block category-chart" id="${esc(id)}" data-reveal ${dense ? 'data-density="dense"' : ''}>
    <header class="category-chart-head">
      ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
      <h3 class="block-title type-card-title"><a class="card-title-link" href="${esc(href)}">${esc(title)}</a></h3>
      <p class="block-text type-description">${esc(description)}</p>
    </header>
    <a class="block-link" aria-label="Open ${esc(title)}" href="${esc(href)}">${ARROW}</a>
    <div class="mini-scroll" role="region" aria-label="${esc(title)} results">
      <div class="mini-plot" style="--mini-count:${rows.length}">
        <div class="mini-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <ol class="mini" aria-label="Models for ${esc(title)}"></ol>
      </div>
    </div></article>`);
  const ol = $('ol.mini', art);
  rows.forEach((s, i) => {
    const m = model(s.model), o = org(m.org);
    const val = smartFmt(s.score);
    ol.appendChild(h(`<li class="mini-col" data-model="${esc(m.id)}" style="--mini-i:${i}">
      <button type="button" class="mini-bar" aria-pressed="false" aria-label="${esc(m.name)} · ${esc(m.config)}, ${val} out of 100, pin model" title="${esc(m.name)} · ${esc(m.config)} · ${val}"
        style="height:${Math.max(0, Math.min(100, s.score))}%;min-height:34px;background-color:${colorVar(m.org)}"><span class="mini-value" aria-hidden="true">${Math.round(s.score)}</span></button>
      <span class="mini-mark" aria-hidden="true">${logoHTML(m.org)}</span>
      <span class="mini-label" aria-hidden="true"><span class="mini-company">${esc(o.name)}</span><span class="mini-configuration">${esc(m.short || m.name)}</span></span>
    </li>`));
  });
  ol.addEventListener('click', (e) => { const col = e.target.closest('.mini-col'); if (col) setPin(col.dataset.model); });
  let busy = false;
  $('.category-chart-head', art).addEventListener('mouseenter', () => {
    if (busy || !art.classList.contains('is-revealed') || reduced) return;
    busy = true; art.classList.remove('is-revealed'); art.removeAttribute('data-reveal');
    void art.offsetWidth; art.classList.add('is-rippling');
    setTimeout(() => { art.classList.remove('is-rippling'); busy = false; }, 720 + rows.length * 40);
  });
  observe(art);
  return art;
}

// ---------- big chart ----------
function bigChart(host, { rows, mode = 'score', valueOf, labelOf }) {
  const fig = h(`<figure class="chart chart-detailed"><div class="chart-plot"><div class="chart-gridlines"></div><div class="chart-bars"></div></div></figure>`);
  host.appendChild(fig);
  const plot = $('.chart-plot', fig), bars = $('.chart-bars', fig), grid = $('.chart-gridlines', fig);
  const state = { mode, hidden: new Set(), revealed: false };
  const cols = new Map();
  rows.forEach((r, i) => {
    const m = model(r.model), o = org(m.org);
    const col = h(`<div class="chart-col" data-model="${esc(m.id)}" style="--col-i:${i}">
      <button type="button" class="chart-bar" style="background-color:${colorVar(m.org)}" aria-label="${esc(m.name)}"><span class="chart-mark">${logoHTML(m.org)}</span></button>
      <span class="chart-bar-value"></span>
      <div class="chart-label" aria-hidden="true"><span class="chart-company">${esc(o.name)}</span><span class="chart-model-detail">${esc(m.short || m.name)}</span></div>
      <div class="chart-tooltip" role="tooltip"><p class="chart-tooltip-name">${esc(m.name)} · ${esc(m.config)}</p><dl></dl></div>
    </div>`);
    col.querySelector('.chart-bar').addEventListener('click', () => setPin(m.id));
    bars.appendChild(col);
    cols.set(r.model, { col, r, shown: 0 });
  });
  function domain(vals) {
    const lo0 = Math.min(...vals), hi0 = Math.max(...vals), range = Math.max(5, hi0 - lo0);
    const lo = Math.max(0, Math.floor((lo0 - range * 0.3) / 5) * 5);
    const hi = Math.min(100, Math.ceil((hi0 + 0.01) / 5) * 5 + (hi0 % 5 > 3.5 ? 5 : 0));
    return [lo, Math.max(hi, lo + 10)];
  }
  function countTo(node, from, to, dur, delay, cb, digits = 2) {
    if (!dur || reduced) { node.textContent = fmt(to, digits); cb(to); return; }
    const t0 = performance.now() + delay;
    const step = (t) => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
      const x = from + (to - from) * e; node.textContent = fmt(x, digits); cb(x);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function render(animate) {
    const W = plot.clientWidth, H = plot.clientHeight;
    const vis = rows.filter((r) => !state.hidden.has(r.model));
    const vals = vis.map((r) => valueOf(r, state.mode));
    const [lo, hi] = domain(vals.length ? vals : [0, 100]);
    grid.innerHTML = '';
    for (let t = Math.ceil(lo / 10) * 10; t <= hi; t += 10) grid.appendChild(h(`<i style="top:${(H - (t - lo) / (hi - lo) * H).toFixed(1)}px"></i>`));
    const sorted = [...vis].sort((a, b) => valueOf(b, state.mode) - valueOf(a, state.mode));
    const n = sorted.length, gap = n > 18 ? 5 : 10;
    const w = Math.max(12, (W - gap * (n - 1)) / Math.max(1, n));
    const compact = w < 40; fig.classList.toggle('is-compact', compact);
    const digits = compact ? 0 : 2;
    cols.forEach(({ col }, id) => { if (state.hidden.has(id)) col.setAttribute('data-hidden', ''); else col.removeAttribute('data-hidden'); });
    sorted.forEach((r, i) => {
      const c = cols.get(r.model), v = valueOf(r, state.mode);
      const bh = Math.max(30, (v - lo) / (hi - lo) * H);
      c.col.style.width = w + 'px';
      c.col.style.transform = `translateX(${(i * (w + gap)).toFixed(1)}px)`;
      c.col.style.setProperty('--col-i', i);
      const bar = c.col.querySelector('.chart-bar'), val = c.col.querySelector('.chart-bar-value');
      bar.style.height = bh + 'px';
      const inside = bh >= 54 && w >= 22;
      val.style.bottom = (inside ? bh / 2 - 5 : bh + 6) + 'px';
      val.style.color = inside ? '#fff' : 'var(--text)';
      const tip = c.col.querySelector('.chart-tooltip');
      tip.dataset.side = i > n * 0.62 ? 'left' : 'right';
      tip.style.setProperty('--tip-top', Math.max(0, H - bh - 8) + 'px');
      const m = model(r.model);
      const extra = r.extra ? Object.entries(r.extra).filter(([k]) => k !== 'Config').slice(0, 3).map(([k, x]) => `<div><dt>${esc(k)}</dt><dd>${esc(x)}</dd></div>`).join('') : '';
      tip.querySelector('dl').innerHTML = `<div><dt>${state.mode === 'fail' ? 'Failure rate' : 'Score'}</dt><dd>${fmt(v, 2)}</dd></div><div><dt>Rank</dt><dd>${i + 1} / ${n}</dd></div><div><dt>Lab</dt><dd style="font-family:var(--body)">${esc(org(m.org).name)}</dd></div><div><dt>Type</dt><dd style="font-family:var(--body)">${esc(m.type || '')}</dd></div>${extra}`;
      const label = labelOf ? labelOf(r, state.mode) : null;
      if (label != null) { val.textContent = label; c.shown = v; }
      else countTo(val, c.shown, v, animate ? (state.revealed ? 600 : 900) : 0, animate && !state.revealed ? i * 35 : 0, (x) => { c.shown = x; }, digits);
    });
  }
  const api = {
    setMode(m) { state.mode = m; render(true); },
    toggle(id, on) { if (on) state.hidden.delete(id); else state.hidden.add(id); render(true); },
    rows: () => rows.filter((r) => !state.hidden.has(r.model)).map((r) => ({ ...r, value: valueOf(r, state.mode) })),
  };
  render(false);
  cols.forEach((c) => { c.col.querySelector('.chart-bar-value').textContent = fig.classList.contains('is-compact') ? '0' : '0.00'; c.shown = 0; });
  new ResizeObserver(() => render(false)).observe(plot);
  fig.addEventListener('reveal', () => { bars.setAttribute('data-reveal', ''); render(true); state.revealed = true; });
  observe(fig);
  return api;
}

function chartCard({ id, title, description, higherIs, toggles, rows, valueOf, labelOf, link, filename, rail }) {
  const sec = h(`<section class="index-section" id="${esc(id)}"${rail ? ` data-rail="${esc(rail)}"` : ''}>
    <div class="index-card">
      <div class="card-head">
        <div class="card-head-text">
          <h2 class="type-section-title">${esc(title)}</h2>
          ${description ? `<p class="block-text type-description">${esc(description)}</p>` : ''}
        </div>
        <div class="card-controls">
          <div class="toolbar">
            <button class="tool" data-act="link" aria-label="Copy link"><svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg><span class="tool-tip">Link copied</span></button>
            <button class="tool" data-act="share" aria-label="Share"><svg viewBox="0 0 24 24"><path d="M12 15V3m0 0L8 7m4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg><span class="tool-tip">Copied</span></button>
            <button class="tool" data-act="download" aria-label="Download CSV"><svg viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14"/></svg><span class="tool-tip">Downloaded</span></button>
            <button class="tool" data-act="filter" aria-label="Filter labs" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/></svg></button>
            ${link ? `<a class="tool is-bare" href="${esc(link)}" aria-label="Open">${ARROW}</a>` : ''}
            <div class="filter-pop" role="dialog" aria-label="Filter labs"></div>
          </div>
          ${toggles ? `<div class="scale-toggle" role="group">${toggles.map((t, i) => `<button type="button" data-mode="${esc(t.mode)}" aria-pressed="${i === 0}">${esc(t.label)}</button>`).join('')}</div>` : ''}
        </div>
      </div>
      <div class="chart-byline-row"><span class="higher-is">${esc(higherIs || '')}</span></div>
      <div class="chart-scroll"><div class="chart-host"></div></div>
    </div></section>`);
  const chart = bigChart($('.chart-host', sec), { rows, valueOf, labelOf, mode: toggles ? toggles[0].mode : 'score' });
  $$('.scale-toggle button', sec).forEach((b) => b.addEventListener('click', () => {
    $$('.scale-toggle button', sec).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    chart.setMode(b.dataset.mode);
  }));
  const flash = (btn) => { btn.classList.remove('is-done'); void btn.offsetWidth; btn.classList.add('is-done'); setTimeout(() => btn.classList.remove('is-done'), 1400); };
  const url = () => location.href.split('#')[0] + '#' + id;
  $('[data-act=link]', sec).addEventListener('click', (e) => { navigator.clipboard?.writeText(url()); flash(e.currentTarget); });
  $('[data-act=share]', sec).addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (navigator.share) { try { await navigator.share({ title, url: url() }); return; } catch (x) { /* fall through */ } }
    navigator.clipboard?.writeText(url()); flash(btn);
  });
  $('[data-act=download]', sec).addEventListener('click', (e) => {
    const now = chart.rows().sort((a, b) => b.value - a.value);
    const csv = ['rank,model,lab,configuration,value', ...now.map((r, i) => { const m = model(r.model); return [i + 1, `"${m.name}"`, `"${org(m.org).name}"`, `"${m.config}"`, r.value.toFixed(2)].join(','); })].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = (filename || id) + '.csv'; a.click();
    flash(e.currentTarget);
  });
  const pop = $('.filter-pop', sec), fbtn = $('[data-act=filter]', sec);
  const orgsIn = [...new Set(rows.map((r) => model(r.model).org))];
  pop.innerHTML = orgsIn.map((o) => `<label><input type="checkbox" checked data-org="${esc(o)}"><span class="swatch" style="background:${colorVar(o)}"></span>${esc(org(o).name)}</label>`).join('');
  fbtn.addEventListener('click', (e) => { e.stopPropagation(); const open = pop.classList.toggle('is-open'); fbtn.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', (e) => { if (!pop.contains(e.target) && e.target !== fbtn) pop.classList.remove('is-open'); });
  pop.addEventListener('change', (e) => {
    const o = e.target.dataset.org, on = e.target.checked;
    rows.filter((r) => model(r.model).org === o).forEach((r) => chart.toggle(r.model, on));
  });
  return sec;
}

// ---------- pages ----------
function heroTitleHTML(s) {
  const t = esc(s.heroTitle), a = s.heroAccent && esc(s.heroAccent);
  return a && t.includes(a) ? t.replace(a, `<span class="accent">${a}</span>`) : t;
}
const updatedHTML = () => `<span class="meta-live">Updated ${esc(fmtDate(DATA.site.published))}</span>`;
const sectionHead = (title, side = '', kicker = '') => `<div class="section-head"><div>${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}<h2 class="section-title type-section-title">${title}</h2></div>${side ? `<p class="type-description">${side}</p>` : ''}</div>`;

function renderHome() {
  const s = DATA.site, main = $('#main'), ix = DATA.index;
  main.appendChild(h(`<div class="wrap"><header class="lc-hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="type-page-title">${heroTitleHTML(s)}</h1>
        <p class="lead">${esc(s.heroSub)}</p>
        <div class="actions"><a class="lc-pill" href="${LIST}">Explore the benchmarks</a><a class="lc-pill is-ghost" href="${esc(s.submitUrl || '#')}">Submit a model ↗</a></div>
      </div>
      <div class="hero-side">
        <p class="hero-meta">${updatedHTML()}</p>
        <aside class="box" aria-label="Top of the index">
          <div class="box-head"><h2>Top of the index</h2><a href="${LIST}#standings">Full standings →</a></div>
          ${leadersHTML(ix.scores, 5)}
        </aside>
      </div>
    </div>
  </header></div>`));
  main.appendChild(h('<div class="gap-8" aria-hidden="true"></div>'));
  main.appendChild(chartCard({
    id: 'index', title: ix.title, description: ix.description, higherIs: ix.higherIs, link: LIST, filename: 'physical-ai-index',
    toggles: [{ mode: 'score', label: ix.rateLabels?.[0] || 'Success rate' }, { mode: 'fail', label: ix.rateLabels?.[1] || 'Failure rate' }],
    rows: ix.scores.filter((r) => M[r.model]),
    valueOf: (r, mode) => mode === 'fail' ? 100 - r.score : r.score,
  }));
  const wrap = h('<div class="wrap"></div>'); main.appendChild(wrap);

  const why = DATA.why || { title: 'Our Why', paragraphs: [] };
  const news = DATA.news || [];
  wrap.appendChild(h(`<section class="home-section" id="why" data-rail="${esc(why.title)}">
    ${sectionHead(esc(why.title))}
    <div class="why-grid">
      <div class="prose has-drop" data-rise>${why.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
      <figure class="why-figure" data-rise><div class="frame"><img src="${A('assets/img/lab-why.jpg')}" alt="A bimanual robot rig working on a Prism-projected grid table in the lab" loading="lazy"></div></figure>
    </div></section>`));

  wrap.appendChild(h(`<section class="home-section" id="news" data-rail="In the news">
    ${sectionHead('Physical AI in the news')}
    <div class="news-grid" data-cols="${news.length % 3 === 0 ? 3 : 4}" style="--news-cols:${news.length % 3 === 0 ? 3 : 4}">${news.map((n) => `<a class="news-item" href="${esc(n.url || '#')}" target="_blank" rel="noreferrer" data-rise>
      <p class="news-meta">${esc(n.source)} · ${esc(shortDate(n.date))}</p><p class="news-title">${esc(n.title)}</p>${n.dek ? `<p class="news-dek">${esc(n.dek)}</p>` : ''}<span class="go">${ARROW}</span></a>`).join('')}</div>
  </section>`));

  const s2 = h(`<section class="home-section" id="topics" data-rail="Compare by topic">
    ${sectionHead('Compare physical AI by topic')}
    <div class="three-up"></div></section>`);
  DATA.domains.forEach((d) => $('.three-up', s2).appendChild(miniChart({
    id: 'topic-' + d.id, kicker: d.question ? (d.indexName || d.name) : '', title: d.question || d.indexName || d.name, href: LIST + '#section-' + d.id,
    description: d.finding || d.description, scores: d.scores, limit: 12, dense: true,
  })));
  wrap.appendChild(s2);

  const ch = DATA.changelog || [], partners = DATA.partners || [];
  const s3 = h(`<section class="home-section" id="changes" data-rail="Changelog"><div class="two-up" style="margin-top:0">
    <div class="block" data-rise>
      ${sectionHead('Changelog')}
      <div class="changelog">${ch.map((c) => {
        const m = c.model ? model(c.model) : null;
        const icon = m ? `<span class="change-icon" style="background:${colorVar(m.org)}">${logoHTML(m.org)}</span>` : `<span class="change-icon is-method">✦</span>`;
        return `<div class="change">${icon}<div><p class="change-kind">${esc(c.kind)} · ${esc(shortDate(c.date))}</p><p class="change-title">${esc(c.title)}</p></div><span class="change-score">${c.score != null ? fmt(c.score, 2) : ''}</span></div>`;
      }).join('')}</div>
    </div>
    <div class="block" data-rise>
      ${sectionHead('Test platforms')}
      <div class="platforms">${partners.map((p) => `<div class="platform" title="${esc(p.note || '')}"><span class="platform-badge" aria-hidden="true">${esc((p.name || '?').trim()[0])}</span><div><p class="platform-name">${esc(p.name)}</p>${p.note ? `<p class="platform-note">${esc(p.note)}</p>` : ''}</div></div>`).join('')}</div>
    </div></div></section>`);
  wrap.appendChild(s3);
  main.appendChild(outro());
  $$('[data-rise]', main).forEach(observe);
}

// "Stay up to date" turns into the Light Company logo, in type, as the section scrolls in.
// Every character cell samples both the words and the logo, and a left-to-right wave scrambles one into
// the other (scroll back up and it reverses). Then the beam keeps streaming, and colour and flicker follow
// the pointer, the same treatment as the lightcompany.ai footer.
function outro() {
  const c = DATA.cta || {};
  const title = c.title || 'Stay up to date';
  const wrap = h(`<div class="wrap"><section class="outro" id="outro" aria-labelledby="outro-title">
    <h2 class="sr-only" id="outro-title">${esc(title)}</h2>
    <canvas class="outro-ascii" aria-hidden="true"></canvas>
    <div class="outro-row">
      <p class="outro-sub">${esc(c.text || '')}</p>
      <form class="outro-form"><input type="email" required placeholder="you@company.com" aria-label="Email"><button class="lc-pill" type="submit">${esc(c.button || 'Join the mailing list')}</button></form>
    </div></section></div>`);
  const sec = $('.outro', wrap);
  $('form', sec).addEventListener('submit', (e) => { e.preventDefault(); $('button', sec).textContent = 'You’re on the list'; });

  const cv = $('canvas', sec), ctx = cv.getContext('2d'), img = new Image();
  const RAMP = ' .:-=+*#%@', BEAM = '=>~-*+:', NOISE = '01/\\|<>[]{}#%&$*+=-';
  const glyph = (cov) => RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(cov * (RAMP.length - 1)))];
  let cells = [], cols = 0, rows = 0, cw = 0, ch = 0, p = reduced ? 1 : 0, raf = 0, seen = false, t0 = performance.now();
  let mx = -1e3, my = -1e3, hover = 0, hoverOn = false;
  const sample = (paint, W, H) => {
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true }); paint(o, W, H);
    return o.getImageData(0, 0, W, H).data;
  };
  const build = () => {
    const w = cv.clientWidth; if (!w || !img.naturalWidth) return;
    cols = w < 640 ? 96 : 168; cw = w / cols; ch = cw * 1.9;
    rows = Math.max(9, Math.round((w * 64 / 356) / ch));
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.round(w * dpr); cv.height = Math.round(rows * ch * dpr); cv.style.height = rows * ch + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sx = 4, sy = 8, W = cols * sx, H = rows * sy;
    const logo = sample((o) => { for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) o.drawImage(img, dx, dy, W, H); }, W, H);
    const display = getComputedStyle(document.documentElement).getPropertyValue('--display').trim() || 'sans-serif';
    const words = sample((o) => {
      let f = H * 0.66; const font = () => `700 ${f}px ${display}`;
      o.font = font(); const tw = o.measureText(title).width;
      if (tw > W * 0.92) { f *= W * 0.92 / tw; o.font = font(); }
      o.fillStyle = '#000'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(title, W / 2, H * 0.53);
    }, W, H);
    cells = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      let a = 0, r = 0, b = 0, ta = 0;
      for (let j = 0; j < sy; j++) for (let i = 0; i < sx; i++) {
        const k = ((y * sy + j) * W + x * sx + i) * 4, al = logo[k + 3] / 255;
        a += al; r += logo[k] * al; b += logo[k + 2] * al; ta += words[k + 3] / 255;
      }
      const cov = a / (sx * sy), tcov = ta / (sx * sy);
      if (cov < 0.06 && tcov < 0.06) continue;
      cells.push({ x, y, cov, tcov, beam: cov >= 0.06 && r < b * 0.6, t: x / cols * 0.7 + Math.random() * 0.2, g: 0 });
    }
  };
  const draw = (now) => {
    raf = 0;
    const t = (now - t0) / 1000, cs = getComputedStyle(cv);
    const ink = cs.color, accent = cs.getPropertyValue('--accent').trim() || '#0a8fe0';
    const dark = document.documentElement.dataset.theme === 'dark';
    ctx.clearRect(0, 0, cv.clientWidth, rows * ch);
    ctx.font = `${Math.round(ch * 0.92)}px ${cs.getPropertyValue('--mono').trim() || 'monospace'}`; ctx.textBaseline = 'top';
    hover += ((hoverOn ? 1 : 0) - hover) * (reduced ? 1 : 0.12);
    const band = ((t * 0.16) % 1.4 - 0.2) * cols, R = cols * 0.16;
    for (const c of cells) {
      const k = (p - c.t) / 0.1;                 // < 0 words · 0..1 scrambling · > 1 logo
      let chr, alpha, beam = false;
      if (k < 0) { if (c.tcov < 0.06) continue; chr = glyph(c.tcov); alpha = 0.3 + 0.65 * c.tcov; }
      else if (k < 1) { chr = NOISE[(Math.random() * NOISE.length) | 0]; alpha = 0.5; }
      else if (c.cov < 0.06) continue;
      else if (!reduced && c.g > now) { chr = NOISE[(Math.random() * NOISE.length) | 0]; alpha = 0.6; }
      else if (c.beam) { beam = true; chr = reduced ? '=' : BEAM[((c.x * 0.5 - t * 9 + c.y * 0.3) % BEAM.length + BEAM.length) % BEAM.length | 0]; alpha = 0.5 + 0.5 * c.cov; }
      else {
        chr = glyph(c.cov);
        alpha = 0.28 + 0.55 * c.cov + (reduced ? 0 : Math.max(0, 1 - Math.abs(c.x - band) / 9) * 0.4);
        if (!reduced && Math.random() < 0.0004) c.g = now + 120;
      }
      const lit = beam ? 0 : hover * Math.max(0, 1 - Math.hypot(c.x - mx, (c.y - my) * 1.9) / R);
      if (lit > 0.05 && Math.random() < lit * 0.35) chr = NOISE[(Math.random() * NOISE.length) | 0];
      ctx.globalAlpha = Math.min(1, alpha + lit * 0.55);
      ctx.fillStyle = lit > 0.02 ? `hsl(${(c.x / cols) * 290} 90% ${dark ? 74 - lit * 20 : 48 - lit * 10}%)` : beam ? accent : ink;
      ctx.fillText(chr, c.x * cw, c.y * ch);
    }
    ctx.globalAlpha = 1;
    if (seen && !reduced) raf = requestAnimationFrame(draw);
  };
  const go = () => { if (!raf) raf = requestAnimationFrame(draw); };
  const progress = () => {
    if (reduced) return 1;
    const r = cv.getBoundingClientRect();
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) return 1;
    return Math.min(1, Math.max(0, (innerHeight * 0.66 - r.top) / (innerHeight * 0.36)));
  };
  addEventListener('scroll', () => { p = progress(); if (reduced) go(); }, { passive: true });
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen) { p = progress(); go(); } }).observe(cv);
  cv.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width * cols; my = (e.clientY - r.top) / r.height * rows; hoverOn = true; go();
  });
  cv.addEventListener('pointerleave', () => { hoverOn = false; go(); });
  new MutationObserver(go).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); go(); }, 150); });
  img.onload = () => (document.fonts?.ready || Promise.resolve()).then(() => { build(); p = progress(); go(); });
  img.src = A('assets/img/light-company-logo-full-ink.svg');
  return wrap;
}

function paperMast({ crumbs, kicker, question, title, intro, split = false, after = '' }) {
  return `<header class="paper-mast${split ? ' is-split' : ''}">
    <div class="mast-top">
      <nav aria-label="Breadcrumb" class="breadcrumbs type-breadcrumb"><ol>${crumbs.map(([t, href], i) => `<li>${i ? '<span class="breadcrumb-separator" aria-hidden="true">/</span>' : ''}${href ? `<a href="${href}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join('')}</ol></nav>
      ${updatedHTML()}
    </div>
    <div class="mast-grid">
      <div>${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}${question ? `<p class="mast-question">${esc(question)}</p>` : ''}<h1 class="hero-title type-page-title is-inner">${esc(title)}</h1></div>
      ${intro ? `<p class="mast-intro type-page-intro">${esc(intro)}</p>` : ''}
    </div>${after}</header>`;
}

function standingsTable() {
  const idx = Object.fromEntries((DATA.index.scores || []).map((r) => [r.model, r.score]));
  const dom = DATA.domains.map((d) => ({ d, s: Object.fromEntries(d.scores.map((r) => [r.model, r.score])) }));
  const mean = (id) => { const v = dom.map((x) => x.s[id]).filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
  const ids = DATA.models.map((m) => m.id).filter((id) => idx[id] != null || dom.some((x) => x.s[id] != null));
  ids.sort((a, b) => ((idx[b] ?? -1) - (idx[a] ?? -1)) || (mean(b) - mean(a)));
  const range = (vals) => { const v = vals.filter((x) => x != null); return [Math.min(...v), Math.max(...v)]; };
  const cols = [{ key: 'index', vals: idx, label: 'Index', href: HOME + '#index', isIndex: true }, ...dom.map((x) => ({ key: x.d.id, vals: x.s, label: x.d.name, href: '#section-' + x.d.id }))];
  cols.forEach((c) => { c.range = range(ids.map((id) => c.vals[id])); });
  const cell = (c, id) => {
    const v = c.vals[id];
    if (v == null) return `<td class="is-empty${c.isIndex ? ' is-index' : ''}">—</td>`;
    const [lo, hi] = c.range, t = hi > lo ? (v - lo) / (hi - lo) : 1;
    return `<td class="${c.isIndex ? 'is-index' : ''}${v === hi ? ' is-best' : ''}" style="background-color:rgba(var(--accent-rgb),${(0.015 + 0.17 * t * t * t).toFixed(3)})">${fmt(v, 1)}</td>`;
  };
  return `<div class="chart-scroll standings-wrap"><table class="standings">
    <thead><tr><th class="is-model" colspan="2">Model</th>${cols.map((c) => `<th class="${c.isIndex ? 'is-index' : ''}"><a href="${c.href}">${esc(c.label)}</a></th>`).join('')}</tr></thead>
    <tbody>${ids.map((id, i) => { const m = model(id); return `<tr data-model="${esc(id)}" style="--row-i:${i}"><td class="is-rank">${String(i + 1).padStart(2, '0')}</td><td class="is-model"><span class="st-model">${chipHTML(m.org)}<b>${esc(m.name)}</b><span>${esc(org(m.org).name)} · ${esc(m.config)}</span></span></td>${cols.map((c) => cell(c, id)).join('')}</tr>`; }).join('')}</tbody>
  </table></div>
  <div class="standings-legend"><span><i class="sw"></i>Darker is higher in its column</span><span><u>00.0</u> Best in column</span></div>`;
}

function renderBenchmarks() {
  const s = DATA.site, main = $('#main');
  const wrap = h(`<div class="wrap"></div>`); main.appendChild(wrap);
  wrap.innerHTML = paperMast({ crumbs: [['Index', HOME], ['Benchmarks']], title: 'Benchmarks', intro: s.benchmarksIntro, split: true });
  wrap.appendChild(h(`<section class="home-section" id="standings" data-rail="Standings">
    ${sectionHead('Standings', 'Every model, overall and in each domain. Out of 100.')}
    ${standingsTable()}</section>`));
  const BM = Object.fromEntries(DATA.benchmarks.map((b) => [b.id, b]));
  DATA.domains.forEach((d) => {
    const list = d.benchmarks.map((id) => BM[id]).filter(Boolean);
    const sec = h(`<section class="home-section" id="section-${esc(d.id)}" data-rail="${esc(d.name)}" tabindex="-1">
      ${sectionHead(`<a href="${HOME}#topic-${esc(d.id)}">${esc(d.question || d.name)} <span class="arrow">↗</span></a>`, esc(d.finding || d.description), d.question ? d.name : '')}
      <div class="three-up index-cards" data-count="${list.length}"></div></section>`);
    list.forEach((b) => $('.three-up', sec).appendChild(miniChart({
      id: 'benchmark-' + b.id, kicker: b.question ? b.name : '', title: b.question || b.name, href: BENCH(b.id),
      description: b.finding || b.description, scores: b.scores, limit: 10,
    })));
    wrap.appendChild(sec);
  });
}

function tasksOf(b) {
  if (Array.isArray(b.tasks) && b.tasks.length) return b.tasks;
  const items = (b.measured || {}).Items || '';
  const list = items.includes(':') ? items.split(':').slice(1).join(':') : '';
  return list.split(',').map((t) => t.trim()).filter(Boolean).map((name) => ({ name, detail: '' }));
}

function renderBenchmark() {
  const id = new URLSearchParams(location.search).get('id') || CFG.idFromPath() || DATA.benchmarks[0].id;
  const b = DATA.benchmarks.find((x) => x.id === id) || DATA.benchmarks[0];
  const d = DATA.domains.find((x) => x.id === b.domain) || { name: '' };
  document.title = `${b.name} · Prism Benchmarks · The Light Company`;
  const s = DATA.site, main = $('#main');
  const rows = b.scores.filter((r) => M[r.model]);
  const sorted = [...rows].sort((a, c) => c.score - a.score);
  const scoresOnly = sorted.map((r) => r.score);
  const median = scoresOnly.length ? scoresOnly[Math.floor(scoresOnly.length / 2)] : null;
  const hasNative = rows.some((r) => r.native != null && r.native !== '');
  const lead = sorted[0], second = sorted[1];
  const labs = new Set(rows.map((r) => model(r.model).org)).size;

  const stats = lead ? `<dl class="stats">
      <div><dt>Top score</dt><dd>${fmt(lead.score, 1)}</dd><p>${esc(model(lead.model).name)}</p></div>
      <div><dt>Lead</dt><dd>${second ? '+' + fmt(lead.score - second.score, 1) : '—'}</dd><p>${second ? `points over ${esc(model(second.model).name)}` : ''}</p></div>
      <div><dt>Median</dt><dd>${fmt(median, 1)}</dd><p>the typical model</p></div>
      <div><dt>Tested</dt><dd>${rows.length}</dd><p>models from ${labs} labs</p></div>
    </dl>` : '';
  const wrap = h(`<div class="wrap">${paperMast({
    crumbs: [['Index', HOME], ['Benchmarks', LIST], [b.name]],
    question: b.question, title: b.finding || b.name, intro: b.dek || b.description, after: stats,
  })}
    <div class="article"><div class="article-main"></div><aside class="article-aside"><div class="aside-inner"></div></aside></div></div>`);
  main.appendChild(wrap);
  const art = $('.article-main', wrap), aside = $('.aside-inner', wrap);

  const tasks = tasksOf(b);
  if (tasks.length) art.appendChild(h(`<section class="home-section is-first" id="test" data-rail="The test">
    ${sectionHead('What the robot does')}
    <ol class="tasks">${tasks.map((t, i) => `<li data-rise><span class="task-n">${String(i + 1).padStart(2, '0')}</span><div><p class="task-name">${esc(t.name)}</p>${t.detail ? `<p class="task-detail">${esc(t.detail)}</p>` : ''}</div></li>`).join('')}</ol>
  </section>`));

  const results = chartCard({
    id: 'comparison', title: 'Results', filename: b.id, rail: 'Results',
    description: b.headline ? `${b.headline.replace(/\s*\((higher|lower) is better\)/i, '')}.` : '',
    higherIs: 'Higher is better',
    toggles: hasNative ? [{ mode: 'score', label: '0–100' }, { mode: 'native', label: 'Original scale' }] : null,
    rows, valueOf: (r) => r.score,
    labelOf: (r, mode) => mode === 'native' && r.native != null ? String(r.native) : null,
  });
  results.classList.add('is-article');
  art.appendChild(results);

  if (b.why) art.appendChild(h(`<section class="home-section" id="why-it-matters" data-rail="Why it matters">
    ${sectionHead('Why it matters')}
    <blockquote class="pull" data-rise>${esc(b.why)}</blockquote></section>`));

  const ex = b.examples || [];
  if (ex.length) {
    const sec = h(`<section class="home-section" id="examples" data-rail="Two attempts">
      ${sectionHead('Two attempts, side by side')}
      <div class="examples"></div></section>`);
    ex.forEach((e) => {
      const m = model(e.model);
      $('.examples', sec).appendChild(h(`<article class="example" data-rise>
        <div class="example-head"><span class="example-who">${chipHTML(m.org)}${esc(m.name)}</span><span class="verdict ${e.verdict === 'good' ? 'is-good' : 'is-poor'}">${e.verdict === 'good' ? 'Handled well' : 'Handled poorly'}</span></div>
        <div class="example-body">${e.task ? `<span class="prompt-chip">${esc(e.task)}</span>` : ''}<p class="prompt">“${esc(e.prompt)}”</p>
          <div class="steps">${(e.steps || []).map((st) => `<div class="step ${st.kind === 'result' ? 'is-result' : ''}"><span class="step-kind">${esc(st.kind)}</span><span class="step-text">${esc(st.text)}</span></div>`).join('')}</div></div>
        ${Object.keys(e.grade || {}).length ? `<div class="grade"><dl>${Object.entries(e.grade || {}).filter(([k]) => !/^run( id)?$/i.test(k)).map(([k, v]) => `<div class="${String(v).length > 40 ? 'is-long' : ''}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>` : ''}</article>`));
    });
    art.appendChild(sec);
  }

  const extraKeys = [...new Set(sorted.flatMap((r) => Object.keys(r.extra || {})))].filter((k) => k !== 'Config').slice(0, 3);
  art.appendChild(h(`<section class="home-section" id="scores" data-rail="Every score">
    ${sectionHead('Every score', `${rows.length} models, ranked`)}
    <div class="chart-scroll"><table class="data-table"><thead><tr><th>Model</th><th>Score / 100</th>${hasNative ? '<th>Raw</th>' : ''}${extraKeys.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
    <tbody>${sorted.map((r, i) => { const m = model(r.model); return `<tr data-model="${esc(m.id)}" style="--row-i:${i}"><td><span class="rank">${String(i + 1).padStart(2, '0')}</span><strong>${esc(m.name)}</strong> <span class="cfg">· ${esc(m.config)}</span></td><td class="num">${fmt(r.score, 1)}</td>${hasNative ? `<td class="num">${esc(r.native ?? '—')}</td>` : ''}${extraKeys.map((k) => `<td class="num">${esc((r.extra || {})[k] ?? '—')}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div></section>`));

  const ms = Object.entries(b.measured || {}).filter(([k]) => !/^(items|headline metric)$/i.test(k));
  aside.innerHTML = `
    <div class="box"><div class="box-head"><h3>Leaders</h3><a href="#scores">All ${rows.length} →</a></div>${leadersHTML(rows, 5)}</div>
    ${ms.length ? `<div class="box"><div class="box-head"><h3>How it’s run</h3></div><dl class="facts is-stacked">${ms.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>` : ''}
    <a class="lc-button aside-cta" href="${esc(s.submitUrl || '#')}">Submit a model ↗</a>`;

  const same = DATA.benchmarks.filter((x) => x.domain === b.domain && x.id !== b.id);
  const rel = [...same, ...DATA.benchmarks.filter((x) => x.domain !== b.domain)].slice(0, 4);
  const dn = Object.fromEntries(DATA.domains.map((x) => [x.id, x.name]));
  wrap.appendChild(h(`<section class="home-section" id="related" data-rail="Keep reading">
    ${sectionHead('Keep reading')}
    <div class="related">${rel.map((r) => `<a href="${BENCH(r.id)}"><span class="rel-domain">${esc(dn[r.domain] || '')} · ${esc(r.name)}</span><h3>${esc(r.question || r.name)}</h3><p>${esc(r.finding || r.description)}</p></a>`).join('')}</div></section>`));
  $$('[data-rise]', main).forEach(observe);
}

// ---------- boot ----------
async function boot() {
  DATA = await loadData();
  DATA.models.forEach((m) => { M[m.id] = m; });
  O = DATA.orgs || {};
  if (PAGE === 'home') document.title = `${DATA.site.name} · Prism Benchmarks · The Light Company`;
  if (PAGE === 'benchmarks') document.title = 'Benchmarks · Prism Benchmarks · The Light Company';
  geometry();
  mountHeader();
  if (PAGE === 'home') renderHome();
  else if (PAGE === 'benchmarks') renderBenchmarks();
  else renderBenchmark();
  mountRail();
  const saved = sessionStorage.getItem('pai-scroll');
  if (saved) { sessionStorage.removeItem('pai-scroll'); requestAnimationFrame(() => scrollTo(0, +saved)); }
  else if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 60); }
  addEventListener('resize', geometry);
  liveReload();
}
boot().catch((e) => { console.error(e); document.body.insertAdjacentHTML('beforeend', `<pre style="padding:2rem;color:#94601c">${esc(e.message)}</pre>`); });
})();
