(() => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videos = [...document.querySelectorAll("[data-video]")];
  const inView = new Set();
  const userPaused = new WeakSet();
  const manualPlay = new WeakSet();
  const localNav = document.querySelector("[data-local-nav]");
  const hero = document.querySelector(".hero-runway");
  const chapters = [...document.querySelectorAll("[data-cinematic]")];
  const gallery = document.querySelector("[data-gallery]");

  const syncVideo = (video) => {
    if (inView.has(video) && !document.hidden && !userPaused.has(video) && (!motionQuery.matches || manualPlay.has(video))) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  videos.forEach((video) => {
    const button = video.parentElement.querySelector("[data-video-toggle]");
    if (!button) return;
    const label = button.getAttribute("aria-label").replace(/^(Play|Pause) /, "");
    const updateButton = () => {
      button.classList.toggle("is-playing", !video.paused);
      button.setAttribute("aria-label", `${video.paused ? "Play" : "Pause"} ${label}`);
    };
    video.addEventListener("play", updateButton);
    video.addEventListener("pause", updateButton);
    video.addEventListener("ended", updateButton);
    button.addEventListener("click", () => {
      if (video.paused) {
        userPaused.delete(video);
        manualPlay.add(video);
        video.play().catch(() => {});
      } else {
        userPaused.add(video);
        manualPlay.delete(video);
        video.pause();
      }
    });
    updateButton();
  });

  if ("IntersectionObserver" in window) {
    const prepareMedia = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.preload = "metadata";
        prepareMedia.unobserve(target);
      });
    }, { rootMargin: "150% 0px" });
    const playback = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= 0.45) inView.add(target);
        else inView.delete(target);
        syncVideo(target);
      });
    }, { threshold: [0, 0.45] });
    videos.forEach((video) => {
      prepareMedia.observe(video);
      playback.observe(video);
    });
  }
  document.addEventListener("visibilitychange", () => videos.forEach(syncVideo));
  motionQuery.addEventListener("change", () => { videos.forEach(syncVideo); scheduleScroll(); });

  if (gallery) {
    const slides = [...gallery.querySelectorAll(".gallery-item")];
    const previous = document.querySelector("[data-gallery-prev]");
    const next = document.querySelector("[data-gallery-next]");
    const status = document.querySelector("[data-gallery-status]");
    let selected = 0;
    let galleryFrame = 0;

    const getPosition = (slide) => {
      const inset = parseFloat(getComputedStyle(gallery).scrollPaddingLeft) || 0;
      return slide.offsetLeft - gallery.querySelector(".gallery-track").offsetLeft - inset;
    };
    const updateGallery = () => {
      galleryFrame = 0;
      let nearest = Infinity;
      slides.forEach((slide, index) => {
        const distance = Math.abs(getPosition(slide) - gallery.scrollLeft);
        if (distance < nearest) { nearest = distance; selected = index; }
      });
      previous.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2;
      status.textContent = `Example ${selected + 1} of ${slides.length}`;
    };
    const move = (direction) => {
      selected = Math.max(0, Math.min(slides.length - 1, selected + direction));
      gallery.scrollTo({ left: getPosition(slides[selected]), behavior: motionQuery.matches ? "instant" : "smooth" });
    };
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    gallery.addEventListener("scroll", () => {
      if (!galleryFrame) galleryFrame = requestAnimationFrame(updateGallery);
    }, { passive: true });
    gallery.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    });
    window.addEventListener("resize", updateGallery, { passive: true });
    updateGallery();
  }

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  let scrollFrame = 0;
  const updateScroll = () => {
    scrollFrame = 0;
    const viewport = window.innerHeight;
    const navVisible = window.scrollY > Math.min(140, viewport * 0.2);
    if (localNav) {
      localNav.classList.toggle("is-visible", navVisible);
      localNav.inert = !navVisible;
    }
    if (motionQuery.matches) {
      hero?.querySelector(".hero-copy").style.removeProperty("opacity");
      if (hero) hero.querySelector(".hero-copy").inert = false;
      chapters.forEach((chapter) => {
        chapter.style.removeProperty("--title-offset");
        chapter.style.removeProperty("--title-opacity");
        chapter.style.removeProperty("--shade");
      });
      return;
    }
    if (hero) {
      const heroTop = hero.getBoundingClientRect().top;
      const copy = hero.querySelector(".hero-copy");
      const opacity = 1 - clamp(-heroTop / (viewport * 0.6));
      copy.style.opacity = String(opacity);
      copy.inert = opacity < 0.05;
    }
    chapters.forEach((chapter) => {
      const rect = chapter.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) return;
      const entry = clamp((viewport - rect.top) / viewport);
      const elapsed = clamp(-rect.top / Math.max(1, rect.height - viewport));
      chapter.style.setProperty("--title-offset", `${(1 - entry) * 55}px`);
      chapter.style.setProperty("--title-opacity", String(1 - clamp((elapsed - 0.25) / 0.55)));
      chapter.style.setProperty("--shade", String(0.48 - elapsed * 0.36));
    });
  };
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  window.addEventListener("scroll", scheduleScroll, { passive: true });
  window.addEventListener("resize", scheduleScroll, { passive: true });
  updateScroll();
})();
