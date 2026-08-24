(() => {
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".reveal");
  const videos = document.querySelectorAll(".viewport-video");
  const topbar = document.querySelector("[data-topbar]");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.1 });

    revealTargets.forEach((element) => revealObserver.observe(element));

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && !reducedMotion) video.play().catch(() => {});
        else video.pause();
      });
    }, { rootMargin: "12% 0px", threshold: 0.2 });

    videos.forEach((video) => videoObserver.observe(video));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  if (topbar) {
    let scrollFrame = 0;
    const updateTopbar = () => {
      topbar.classList.toggle("is-scrolled", window.scrollY > 16);
      scrollFrame = 0;
    };

    window.addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateTopbar);
    }, { passive: true });
    updateTopbar();
  }
})();
