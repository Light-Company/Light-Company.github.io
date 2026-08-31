(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyMediaManifest = async () => {
    try {
      const response = await fetch("/site/assets/media/placements.json", { cache: "no-store" });
      if (!response.ok) return;
      const manifest = await response.json();
      document.querySelectorAll("[data-media-slot]").forEach((element) => {
        const placement = manifest.placements?.[element.dataset.mediaSlot];
        if (!placement) return;
        if (element instanceof HTMLImageElement && placement.kind === "image") {
          element.src = placement.src;
          return;
        }
        if (!(element instanceof HTMLVideoElement)) return;
        element.pause();
        if (placement.kind === "image") {
          element.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
          element.poster = placement.src;
        } else {
          let source = element.querySelector("source");
          if (!source) {
            source = document.createElement("source");
            source.type = "video/mp4";
            element.append(source);
          }
          source.src = placement.src;
          if (placement.poster) element.poster = placement.poster;
        }
        element.load();
      });
    } catch {
      // The static site works normally before a chooser manifest exists.
    }
  };

  const mediaManifestReady = applyMediaManifest();

  document.querySelectorAll(".hero .reveal").forEach((element) => {
    element.classList.add("is-visible");
  });

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

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = [...track.children];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth);
    const setActiveDot = (i) => dots.forEach((dot, j) => dot.classList.toggle("is-active", j === i));
    // Instant, not smooth: scroll-snap mandatory fights animated programmatic
    // scrolls, which left the arrows doing nothing. The slide still changes
    // immediately, and swiping keeps its native feel.
    const goTo = (i) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "auto" });
      setActiveDot(clamped);
    };
    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => goTo(currentIndex() - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => goTo(currentIndex() + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
    track.addEventListener("scroll", () => setActiveDot(currentIndex()), { passive: true });
  }

  const answers = document.querySelector("[data-answers]");
  if (answers) {
    const slides = [...answers.querySelectorAll("[data-answer-slide]")];
    let active = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));

    // The selected slide gets its emphasis set directly rather than relying on
    // a class-driven restyle, so the change is applied no matter what.
    const show = (next) => {
      active = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === active;
        slide.classList.toggle("is-active", on);
        slide.style.opacity = on ? "1" : "";
        slide.style.transform = on ? "scale(1)" : "";
      });
    };

    show(active);

    answers.querySelector("[data-answers-prev]")?.addEventListener("click", () => show(active - 1));
    answers.querySelector("[data-answers-next]")?.addEventListener("click", () => show(active + 1));
    slides.forEach((slide, i) => slide.addEventListener("click", () => show(i)));
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12%", threshold: 0.12 },
  );

  document.querySelectorAll(".reveal:not(.hero .reveal)").forEach((element) => {
    revealObserver.observe(element);
  });

  const videos = [...document.querySelectorAll(".viewport-video")];
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          const playAttempt = video.play();
          if (playAttempt) playAttempt.catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "12% 0px", threshold: 0.25 },
  );

  mediaManifestReady.finally(() => {
    videos.forEach((video) => {
      if (reducedMotion) {
        video.pause();
        return;
      }
      videoObserver.observe(video);
      video.addEventListener("click", () => {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  });
})();
