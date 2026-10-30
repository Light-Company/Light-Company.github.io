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
