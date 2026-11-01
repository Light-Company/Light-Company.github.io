// The Light Company: shared page behaviour (rebrand 2026-10).
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // nav: solid once the hero is behind us; mobile menu
  const nav = $(".nav");
  const onScroll = () => nav && nav.classList.toggle("is-solid", window.scrollY > 40 || nav.classList.contains("is-open"));
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  $(".nav-toggle")?.addEventListener("click", (e) => {
    const open = nav.classList.toggle("is-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
    onScroll();
  });
  const closeMenu = () => {
    nav?.classList.remove("is-open");
    $(".nav-toggle")?.setAttribute("aria-expanded", "false");
    onScroll();
  };
  $$(".nav-links a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("is-open")) {
      closeMenu();
      $(".nav-toggle")?.focus();
    }
  });

  // videos: only play what is on screen; mobile won't autoplay everything, so a first gesture kicks them
  const vids = $$("video[data-auto]");
  const play = (v) => { const p = v.play(); if (p) p.catch(() => {}); };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { if (v.preload === "none") v.preload = "auto"; play(v); } else v.pause();
  }), { rootMargin: "120px 0px", threshold: 0.15 });
  vids.forEach((v) => { v.muted = true; v.playsInline = true; io.observe(v); });
  const kick = () => { vids.forEach((v) => { const r = v.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) play(v); }); };
  ["touchstart", "pointerdown"].forEach((t) => window.addEventListener(t, kick, { once: true, passive: true }));
  document.addEventListener("visibilitychange", () => { if (document.hidden) vids.forEach((v) => v.pause()); else kick(); });

  // reveal on scroll
  const rio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".rv").forEach((el) => (reduce ? el.classList.add("in") : rio.observe(el)));

  // footer lockup: the real logo sampled into a character grid. Cells scramble in left to right,
  // then the beam keeps streaming outward and a slow light band crosses the wordmark.
  $$(".footer-ascii").forEach((cv) => {
    const RAMP = " .:-=+*#%@", BEAM = "=>~-*+:", NOISE = "01/\\|<>[]{}#%&$*+=-";
    const ctx = cv.getContext("2d"), img = new Image();
    let cells = [], cols = 0, rows = 0, cw = 0, ch = 0, start = 0, raf = 0, seen = false;
    let mx = -1e3, my = -1e3, hover = 0, hoverOn = false; // pointer in grid cells; hover eases 0..1
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim() || "#3cb4ff";
    const mono = css.getPropertyValue("--mono").trim() || "monospace";
    const build = () => {
      const w = cv.clientWidth; if (!w || !img.complete) return;
      cols = w < 640 ? 110 : 168; cw = w / cols; ch = cw * 1.9;
      rows = Math.round((w * 64 / 356) / ch);
      const dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = Math.round(w * dpr); cv.height = Math.round(rows * ch * dpr);
      cv.style.aspectRatio = `${cv.width} / ${cv.height}`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sx = 4, sy = 8, off = document.createElement("canvas");
      off.width = cols * sx; off.height = rows * sy;
      const o = off.getContext("2d");
      for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) o.drawImage(img, dx, dy, off.width, off.height);
      const d = o.getImageData(0, 0, off.width, off.height).data;
      cells = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        let a = 0, r = 0, b = 0;
        for (let j = 0; j < sy; j++) for (let i = 0; i < sx; i++) {
          const k = ((y * sy + j) * off.width + x * sx + i) * 4, al = d[k + 3] / 255;
          a += al; r += d[k] * al; b += d[k + 2] * al;
        }
        const cov = a / (sx * sy); if (cov < 0.06) continue;
        cells.push({ x, y, cov, beam: r < b * 0.6, t: x / cols * 0.75 + Math.random() * 0.25, g: 0 });
      }
    };
    const draw = (now) => {
      const t = (now - start) / 1000, rev = reduce ? 9 : t / 1.8;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.font = `${Math.round(ch * 0.92)}px ${mono}`; ctx.textBaseline = "top";
      const band = ((t * 0.16) % 1.4 - 0.2) * cols;
      hover += ((hoverOn ? 1 : 0) - hover) * (reduce ? 1 : 0.12);
      const R = cols * 0.16;
      for (const c of cells) {
        if (rev < c.t) continue;
        const settling = rev < c.t + 0.18;
        let chr, alpha;
        if (settling || (!reduce && c.g > now)) { chr = NOISE[(Math.random() * NOISE.length) | 0]; alpha = 0.7; }
        else if (c.beam) {
          chr = reduce ? "=" : BEAM[((c.x * 0.5 - t * 9 + c.y * 0.3) % BEAM.length + BEAM.length) % BEAM.length | 0];
          alpha = 0.45 + 0.55 * c.cov;
        } else {
          chr = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(c.cov * (RAMP.length - 1)))];
          alpha = 0.26 + 0.5 * c.cov + (reduce ? 0 : Math.max(0, 1 - Math.abs(c.x - band) / 9) * 0.5);
          if (!reduce && Math.random() < 0.0004) c.g = now + 120;
        }
        // hover: colour and flicker follow the pointer, hue running red to violet across the logo; the beam stays blue
        const lit = c.beam ? 0 : hover * Math.max(0, 1 - Math.hypot(c.x - mx, (c.y - my) * 1.9) / R);
        if (!settling && lit > 0.05 && Math.random() < lit * 0.35) chr = NOISE[(Math.random() * NOISE.length) | 0];
        ctx.globalAlpha = Math.min(1, alpha + lit * 0.6);
        ctx.fillStyle = settling ? "#f5f4ef" : lit > 0.02 ? `hsl(${(c.x / cols) * 290} 95% ${78 - lit * 22}%)` : c.beam ? accent : "#f5f4ef";
        ctx.fillText(chr, c.x * cw, c.y * ch);
      }
      ctx.globalAlpha = 1;
      if ((!reduce && seen) || Math.abs(hover - (hoverOn ? 1 : 0)) > 0.01) raf = requestAnimationFrame(draw);
    };
    const go = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
    img.onload = () => (document.fonts?.ready || Promise.resolve()).then(() => { build(); if (seen || reduce) go(); });
    img.src = cv.dataset.logo;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen) { seen = true; if (!start) start = performance.now(); go(); }
      else if (!e.isIntersecting) { seen = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.2 }).observe(cv);
    cv.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width * cols; my = (e.clientY - r.top) / r.height * rows;
      hoverOn = true; if (reduce || !seen) go();
    });
    cv.addEventListener("pointerleave", () => { hoverOn = false; if (reduce || !seen) go(); });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); go(); }, 150); });
  });

  // manifesto: split into words, light them as the paragraph crosses the viewport
  $$("[data-manifesto]").forEach((p) => {
    const hl = new Set((p.dataset.highlight || "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean));
    p.innerHTML = p.textContent.trim().split(/\s+/).map((w) => `<span class="w${hl.has(w.toLowerCase().replace(/[^a-z']/g, "")) ? " hl" : ""}">${w}</span>`).join(" ");
  });
  const words = $$("[data-manifesto] .w");
  if (words.length && !reduce) {
    const tick = () => {
      $$("[data-manifesto]").forEach((p) => {
        const r = p.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.35)));
        const ws = $$(".w", p), n = Math.round(t * ws.length);
        ws.forEach((w, i) => w.classList.toggle("on", i < n));
      });
    };
    tick();
    window.addEventListener("scroll", () => requestAnimationFrame(tick), { passive: true });
  } else words.forEach((w) => w.classList.add("on"));

  // film modal: sound on, real controls, Esc closes
  const film = $(".film");
  if (film) {
    const fv = $("video", film);
    const open = (src) => {
      if (src && fv.getAttribute("src") !== src) fv.setAttribute("src", src);
      film.classList.add("is-open"); film.setAttribute("aria-hidden", "false");
      fv.muted = false; fv.currentTime = 0; play(fv); $(".film-close", film).focus();
    };
    const close = () => { film.classList.remove("is-open"); film.setAttribute("aria-hidden", "true"); fv.pause(); };
    $$("[data-film]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(b.dataset.film); }));
    $(".film-close", film).addEventListener("click", close);
    film.addEventListener("click", (e) => { if (e.target === film) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && film.classList.contains("is-open")) close(); });
  }

  // inline film: cover click starts it with sound and native controls
  $$("[data-film-inline]").forEach((box) => {
    const v = $("video", box);
    $(".film-cover", box)?.addEventListener("click", () => {
      box.classList.add("is-playing");
      v.controls = true; v.muted = false; play(v);
    });
  });

  // corner link to the other product line appears once the hero is passed
  const peel = $(".corner-peel");
  if (peel) {
    const show = () => peel.classList.toggle("is-in", window.scrollY > innerHeight * 0.8 && window.scrollY < document.body.scrollHeight - innerHeight * 1.6);
    show();
    window.addEventListener("scroll", show, { passive: true });
  }
})();
