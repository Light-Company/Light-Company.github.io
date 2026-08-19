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

  const showPage = () => {
    document.body.classList.add("is-ready");
    document.querySelectorAll(".hero .reveal").forEach((element) => {
      element.classList.add("is-visible");
    });
  };

  if (document.readyState === "complete") {
    window.setTimeout(showPage, 220);
  } else {
    window.addEventListener("load", () => window.setTimeout(showPage, 220), { once: true });
  }
  window.setTimeout(showPage, 2200);

  const hero = document.querySelector(".hero");
  const lampStage = document.querySelector("[data-lamp-stage]");

  if (hero && lampStage) {
    const beam = lampStage.querySelector(".lamp-beam");
    const lamp = lampStage.querySelector(".hero-lamp");
    const instruction = lampStage.querySelector(".lamp-instruction");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    let stageWidth = 0;
    let stageHeight = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderLamp = () => {
      if (!beam || !lamp) return;

      const lampRect = lamp.getBoundingClientRect();
      const lampWidth = lampRect.width || 180;
      const lampHeight = lampRect.height || 230;
      const lampBottom = Number.parseFloat(getComputedStyle(lamp).bottom) || 0;
      const lampLeft = lampWidth * -0.12;

      lamp.style.left = `${lampLeft}px`;

      const pivotX = lampLeft + lampWidth * (96 / 180);
      const pivotY = stageHeight - lampBottom - lampHeight + lampHeight * (58 / 230);
      const angle = Math.atan2(pointerY - pivotY, pointerX - pivotX);
      const headLength = lampWidth * (67 / 180);
      const sourceX = pivotX + Math.cos(angle) * headLength;
      const sourceY = pivotY + Math.sin(angle) * headLength;
      const distance = Math.hypot(pointerX - sourceX, pointerY - sourceY);

      lamp.style.setProperty("--head-angle", `${angle}rad`);
      beam.style.left = `${sourceX}px`;
      beam.style.top = `${sourceY}px`;
      beam.style.width = `${distance}px`;
      beam.style.transform = `translateY(-50%) rotate(${angle}rad)`;
      lampStage.style.setProperty("--light-x", `${pointerX}px`);
      lampStage.style.setProperty("--light-y", `${pointerY}px`);
    };

    const setStageSize = () => {
      const rect = lampStage.getBoundingClientRect();
      stageWidth = rect.width;
      stageHeight = rect.height;

      if (!pointerX && !pointerY) {
        pointerX = stageWidth * 0.55;
        pointerY = stageHeight * 0.32;
      } else {
        pointerX = clamp(pointerX, 24, stageWidth - 24);
        pointerY = clamp(pointerY, 92, stageHeight - 150);
      }

      renderLamp();
    };

    const aimLamp = (event) => {
      const rect = lampStage.getBoundingClientRect();
      const lampWidth = lamp?.getBoundingClientRect().width || 180;
      const lampHeight = lamp?.getBoundingClientRect().height || 230;
      stageWidth = rect.width;
      stageHeight = rect.height;
      pointerX = clamp(event.clientX - rect.left, 22, stageWidth - 22);
      pointerY = clamp(event.clientY - rect.top, 88, stageHeight - Math.max(150, lampHeight * 0.82));

      hero.classList.add("is-lit");
      renderLamp();
    };

    lampStage.addEventListener("pointermove", aimLamp, { passive: true });
    lampStage.addEventListener("pointerdown", aimLamp, { passive: true });
    window.addEventListener("resize", setStageSize, { passive: true });

    window.requestAnimationFrame(() => {
      setStageSize();
      if (reducedMotion || !finePointer) {
        hero.classList.add("is-lit");
        instruction?.replaceChildren(document.createTextNode("Drag the light"));
      }
    });
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

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const track = carousel.querySelector(".carousel-track");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

    const activate = (nextIndex) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeIndex));
      if (window.innerWidth <= 900) {
        slides[activeIndex].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
      }
    };

    carousel.querySelector(".carousel-prev")?.addEventListener("click", () => activate(activeIndex - 1));
    carousel.querySelector(".carousel-next")?.addEventListener("click", () => activate(activeIndex + 1));

    track?.addEventListener("scroll", () => {
      if (window.innerWidth > 900) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      const closest = slides.reduce(
        (best, slide, index) => {
          const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const distance = Math.abs(center - slideCenter);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: activeIndex, distance: Number.POSITIVE_INFINITY },
      );
      activeIndex = closest.index;
      slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeIndex));
    }, { passive: true });
  });

  const visionDialog = document.querySelector("#vision-dialog");
  const visionTrigger = document.querySelector(".info-trigger");
  const visionClose = visionDialog?.querySelector(".dialog-close");

  visionTrigger?.addEventListener("click", () => {
    if (visionDialog instanceof HTMLDialogElement) visionDialog.showModal();
  });
  visionClose?.addEventListener("click", () => visionDialog?.close());
  visionDialog?.addEventListener("click", (event) => {
    const bounds = visionDialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) visionDialog.close();
  });

  const topbar = document.querySelector(".topbar");
  const productFooter = document.querySelector(".product-footer");
  const updateHeader = () => {
    if (!topbar || !productFooter) return;
    const footerTop = productFooter.getBoundingClientRect().top;
    topbar.classList.toggle("is-clear", footerTop < 90);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
