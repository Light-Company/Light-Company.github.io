(() => {
  const grid = document.querySelector("[data-gallery-grid]");
  const error = document.querySelector("[data-gallery-error]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxPlayerMount = document.querySelector("[data-lightbox-player]");
  const lightboxPoster = document.querySelector("[data-lightbox-poster]");
  const lightboxTitle = document.querySelector("[data-lightbox-title]");
  const lightboxCloseEls = document.querySelectorAll("[data-lightbox-close]");
  const canHoverPreview = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Warm the YouTube IFrame Player API as soon as the page is idle, well before any click,
  // so opening the modal can create/reuse a player synchronously and keep the click's
  // user-gesture context (required for reliable unmuted autoplay).
  let ytApiPromise = null;
  const loadYouTubeApi = () => {
    if (window.YT && window.YT.Player) return Promise.resolve();
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve) => {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        resolve();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.append(script);
    });
    return ytApiPromise;
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadYouTubeApi, { timeout: 2000 });
  } else {
    window.setTimeout(loadYouTubeApi, 300);
  }

  // Light Company's "Prism" YouTube playlist: https://www.youtube.com/playlist?list=PLa4QFCA0Kmy4
  // Hover previews are self-hosted GIFs cut from these same videos (see public/media/prism) —
  // a YouTube embed can never fully hide its own player chrome, so it can't pass for a GIF loop.
  const playlist = [
    { id: "8l_HrdypTt8", slug: "books", title: "Books on Prism" },
    { id: "HG1q5wkIn6g", slug: "air-hockey", title: "Air Hockey on Prism" },
    { id: "y228KXS4wVg", slug: "newspaper", title: "Newspaper on Prism" },
    { id: "Kt7czlsjFJk", slug: "pong", title: "Pong on Prism" },
    { id: "A4yp3IgU63Y", slug: "vinyls-weather", title: "Vinyls and Weather on Prism" },
    { id: "NkcO3S3RgWA", slug: "browser-use", title: "Browser Use on Prism" },
    { id: "n02_uJRY94M", slug: "earth", title: "Earth on Prism" },
    { id: "MpvXBa2JWww", slug: "drawing", title: "Drawing on Prism" },
    { id: "H-fQiTYJAV4", slug: "chess", title: "Chess on Prism" },
    { id: "bkwtg7ZtMdc", slug: "videos-1", title: "Videos on Prism 1" },
    { id: "rLkvr6TPuFc", slug: "dodger", title: "Dodger on Prism" },
    { id: "dS0Vy89RNks", slug: "prism-home", title: "Prism Home" },
    { id: "BbePEVE6CMg", slug: "fruit-ninja", title: "Fruit Ninja on Prism" },
  ];

  const displayTitle = (title) => title.replace(/\bon Prism\b/i, "").replace(/\s+/g, " ").trim() || title;

  const thumbSources = (id) => [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ];

  const startPreview = (tile) => {
    if (!canHoverPreview || reducedMotion) return;
    const frame = tile.querySelector(".tile-frame");
    if (frame.dataset.loaded) {
      frame.classList.add("is-active");
      return;
    }
    const gif = document.createElement("img");
    gif.src = `/media/prism/${tile.dataset.slug}.gif?v=2`;
    gif.alt = "";
    frame.append(gif);
    frame.dataset.loaded = "true";
    frame.classList.add("is-active");
  };

  const stopPreview = (tile) => {
    const frame = tile.querySelector(".tile-frame");
    frame.classList.remove("is-active");
    frame.innerHTML = "";
    delete frame.dataset.loaded;
  };

  // Request the highest resolution YouTube has for the video, every time playback actually starts —
  // covers both a fresh player and a reused one switching videos via loadVideoById.
  const applyBestQuality = (target) => {
    const levels = target.getAvailableQualityLevels?.();
    if (levels && levels.length) target.setPlaybackQuality(levels[0]);
  };

  let player = null;
  let spinnerFallback = null;

  const markReady = () => {
    window.clearTimeout(spinnerFallback);
    lightbox.classList.add("is-ready");
  };

  const playVideo = (id) => {
    if (player) {
      player.loadVideoById(id);
      return;
    }
    player = new window.YT.Player(lightboxPlayerMount, {
      videoId: id,
      playerVars: { autoplay: 1, mute: 0, rel: 0, modestbranding: 1, playsinline: 1 },
      events: {
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            applyBestQuality(event.target);
            markReady();
          }
        },
      },
    });
  };

  const openLightbox = (id, title, posterSrc) => {
    lightboxTitle.textContent = title;
    lightboxPoster.src = posterSrc || "";
    lightbox.classList.remove("is-ready");
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    lightboxCloseEls[0]?.focus();

    // Fail safe: if the player API stalls or state events don't fire, don't leave the spinner stuck forever.
    window.clearTimeout(spinnerFallback);
    spinnerFallback = window.setTimeout(markReady, 6000);

    if (window.YT && window.YT.Player) {
      playVideo(id);
    } else {
      loadYouTubeApi().then(() => playVideo(id));
    }
  };

  const closeLightbox = () => {
    if (lightbox.hidden) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    player?.pauseVideo?.();
    window.setTimeout(() => {
      lightbox.hidden = true;
    }, 350);
  };

  lightboxCloseEls.forEach((el) => el.addEventListener("click", closeLightbox));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  // Hero film — the centerpiece summary video. Plays inline in place, no modal.
  const heroFrame = document.querySelector("[data-hero-video]");
  if (heroFrame) {
    const heroId = heroFrame.dataset.videoId;
    const heroPoster = heroFrame.querySelector("[data-hero-poster]");
    const heroPlayerMount = heroFrame.querySelector("[data-hero-player]");
    const heroPlayBtn = heroFrame.querySelector("[data-hero-play]");

    const heroSources = thumbSources(heroId);
    let heroSourceIndex = 0;
    const tryNextHeroSource = () => {
      heroSourceIndex += 1;
      if (heroSourceIndex < heroSources.length) heroPoster.src = heroSources[heroSourceIndex];
    };
    heroPoster.addEventListener("error", tryNextHeroSource);
    heroPoster.addEventListener("load", () => {
      if (heroPoster.naturalWidth && heroPoster.naturalWidth <= 120) tryNextHeroSource();
    });
    heroPoster.src = heroSources[heroSourceIndex];

    let heroPlayer = null;
    const playHero = () => {
      heroFrame.classList.add("is-playing");
      if (heroPlayer) {
        heroPlayer.playVideo();
        return;
      }
      const start = () => {
        heroPlayer = new window.YT.Player(heroPlayerMount, {
          videoId: heroId,
          playerVars: { autoplay: 1, mute: 0, rel: 0, modestbranding: 1, playsinline: 1 },
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) applyBestQuality(event.target);
            },
          },
        });
      };
      if (window.YT && window.YT.Player) start();
      else loadYouTubeApi().then(start);
    };

    heroPlayBtn.addEventListener("click", playHero);
  }

  const makeTile = (item) => {
    const label = displayTitle(item.title);

    const tile = document.createElement("article");
    tile.className = "tile";
    tile.dataset.id = item.id;
    tile.dataset.slug = item.slug;
    tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", `Play ${label}`);

    const media = document.createElement("div");
    media.className = "tile-media";

    const img = document.createElement("img");
    img.className = "tile-thumb";
    img.loading = "lazy";
    img.alt = "";
    const sources = thumbSources(item.id);
    let sourceIndex = 0;
    const tryNextSource = () => {
      sourceIndex += 1;
      if (sourceIndex < sources.length) img.src = sources[sourceIndex];
    };
    img.addEventListener("error", tryNextSource);
    img.addEventListener("load", () => {
      if (img.naturalWidth && img.naturalWidth <= 120) tryNextSource();
    });
    img.src = sources[sourceIndex];
    media.append(img);

    const frame = document.createElement("div");
    frame.className = "tile-frame";

    const veil = document.createElement("div");
    veil.className = "tile-veil";
    const span = document.createElement("span");
    span.className = "tile-label";
    span.textContent = label;
    veil.append(span);

    tile.append(media, frame, veil);

    let hoverTimer = null;
    tile.addEventListener("mouseenter", () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => startPreview(tile), 180);
    });
    tile.addEventListener("mouseleave", () => {
      window.clearTimeout(hoverTimer);
      stopPreview(tile);
    });
    tile.addEventListener("click", () => openLightbox(item.id, label, img.src));
    tile.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(item.id, label, img.src);
      }
    });

    return tile;
  };

  try {
    const fragment = document.createDocumentFragment();
    playlist.forEach((item) => fragment.append(makeTile(item)));
    grid.append(fragment);
  } catch (err) {
    error.hidden = false;
  }
})();
