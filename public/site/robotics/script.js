(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && !reducedMotion) video.play().catch(() => {});
      else video.pause();
    });
  }, { rootMargin: "12% 0px", threshold: 0.2 });

  document.querySelectorAll(".viewport-video").forEach((video) => videoObserver.observe(video));

  const heroVideo = document.querySelector("[data-hero-video]");
  const heroPause = document.querySelector("[data-hero-pause]");
  if (heroVideo && heroPause) {
    const syncPauseState = () => {
      const playing = !heroVideo.paused;
      heroPause.classList.toggle("is-paused", !playing);
      heroPause.setAttribute("aria-label", playing ? "Pause background video" : "Play background video");
    };
    heroVideo.addEventListener("play", syncPauseState);
    heroVideo.addEventListener("pause", syncPauseState);
    if (reducedMotion) heroVideo.pause();
    syncPauseState();
    heroPause.addEventListener("click", () => {
      if (heroVideo.paused) {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    });
  }
})();
