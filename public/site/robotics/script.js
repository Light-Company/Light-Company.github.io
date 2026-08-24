(() => {
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".reveal");
  const videos = document.querySelectorAll(".viewport-video");
  const topbar = document.querySelector("[data-topbar]");
  const hero = document.querySelector("[data-hero]");

  const reveal = (element) => element.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7%", threshold: 0.08 });

    revealTargets.forEach((element) => revealObserver.observe(element));

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && !reducedMotion) video.play().catch(() => {});
        else video.pause();
      });
    }, { rootMargin: "10% 0px", threshold: 0.16 });

    videos.forEach((video) => videoObserver.observe(video));
  } else {
    revealTargets.forEach(reveal);
    if (!reducedMotion) videos.forEach((video) => video.play().catch(() => {}));
  }

  if (topbar) {
    let scrollFrame = 0;
    const updateTopbar = () => {
      topbar.classList.toggle("is-scrolled", window.scrollY > 18);
      scrollFrame = 0;
    };

    window.addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateTopbar);
    }, { passive: true });
    updateTopbar();
  }

  if (hero && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    let pointerFrame = 0;
    let pointerX = 72;
    let pointerY = 46;

    const updatePointer = () => {
      hero.style.setProperty("--pointer-x", `${pointerX}%`);
      hero.style.setProperty("--pointer-y", `${pointerY}%`);
      pointerFrame = 0;
    };

    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
      pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
    }, { passive: true });
  }

  window.addEventListener("load", () => {
    document.documentElement.classList.add("is-ready");
  }, { once: true });
})();
