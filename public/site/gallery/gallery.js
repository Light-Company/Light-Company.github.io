(() => {
  const grid = document.querySelector("[data-gallery-grid]");
  const count = document.querySelector("[data-gallery-count]");
  const error = document.querySelector("[data-gallery-error]");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let items = [];

  const archive = [
    { filename: "Projected artwork.mp4", preview: "/media/ambient-art.mp4", thumb: "/media/ambient-art.jpg", width: 720, height: 1280, duration: 15, orientation: "portrait" },
    { filename: "Projected bird.mp4", preview: "/media/ambient-bird.mp4", thumb: "/media/ambient-bird.jpg", width: 720, height: 1280, duration: 15, orientation: "portrait" },
    { filename: "Ambient display.mp4", preview: "/media/ambient-display.mp4", thumb: "/media/ambient-display.jpg", width: 720, height: 1278, duration: 14, orientation: "portrait" },
    { filename: "Artwork on the surface.mp4", preview: "/media/artwork.mp4", thumb: "/media/artwork.jpg", width: 720, height: 1280, duration: 10, orientation: "portrait" },
    { filename: "Founder introduction.mp4", preview: "/media/founder-intro.mp4", thumb: "/media/founder-intro.jpg", width: 640, height: 360, duration: 60.4, orientation: "landscape" },
    { filename: "Workbench guidance.mp4", preview: "/media/hero-workbench.mp4", thumb: "/media/hero-workbench.jpg", width: 1280, height: 720, duration: 12, orientation: "landscape" },
    { filename: "Early field capture.mp4", preview: "/media/img-5010.mp4", thumb: "/media/img-5010-poster.jpg", width: 540, height: 960, duration: 141.8, orientation: "portrait" },
    { filename: "Measurement in light.mp4", preview: "/media/measure.mp4", thumb: "/media/measure.jpg", width: 1280, height: 720, duration: 12, orientation: "landscape" },
    { filename: "Object measurement.mp4", preview: "/media/object-measurement.mp4", thumb: "/media/object-measurement.jpg", width: 720, height: 1280, duration: 11, orientation: "portrait" },
    { filename: "Object tracking.mp4", preview: "/media/object.mp4", thumb: "/media/object.jpg", width: 720, height: 960, duration: 9, orientation: "portrait" },
    { filename: "Overhead system view.mp4", preview: "/media/overhead.mp4", thumb: "/media/overhead.jpg", width: 720, height: 1280, duration: 16, orientation: "portrait" },
    { filename: "Registered guidance.mp4", preview: "/media/registered-guidance.mp4", thumb: "/media/registered-guidance.jpg", width: 720, height: 1280, duration: 14, orientation: "portrait" },
    { filename: "Room layout.mp4", preview: "/media/room-layout.mp4", thumb: "/media/room-layout.jpg", width: 1280, height: 720, duration: 13, orientation: "landscape" },
    { filename: "Room segmentation.mp4", preview: "/media/room-seg.mp4", thumb: "/media/room-seg.jpg", width: 1280, height: 1280, duration: 12, orientation: "landscape" },
    { filename: "Rooms grid.mp4", preview: "/media/rooms-grid.mp4", thumb: "/media/rooms-grid.jpg", width: 1280, height: 720, duration: 12, orientation: "landscape" },
    { filename: "Scene scan.mp4", preview: "/media/scene-scan.mp4", thumb: "/media/scene-scan.jpg", width: 1280, height: 1280, duration: 14, orientation: "landscape" },
    { filename: "Step signoff.mp4", preview: "/media/signoff.mp4", thumb: "/media/signoff.jpg", width: 720, height: 1280, duration: 3.5, orientation: "portrait" },
    { filename: "Person tracking.mp4", preview: "/media/track-person.mp4", thumb: "/media/track-person.jpg", width: 720, height: 1280, duration: 10, orientation: "portrait" },
    { filename: "World model lab.mp4", preview: "/site/assets/media/world-model-lab.mp4", thumb: "/site/assets/media/world-model-lab.jpg", width: 1280, height: 720, duration: 4.3, orientation: "landscape" },
    { filename: "Founder field capture.mp4", preview: "/site/assets/media/curated/img-5012-mov-f6294507d.mp4", thumb: "/site/assets/media/curated/img-5012-mov-f6294507d.jpg", width: 720, height: 1280, duration: 49.3, orientation: "portrait" },
    { filename: "Projected interface study.mp4", preview: "/site/assets/media/curated/img-5387-6d070b6f5.mp4", thumb: "/site/assets/media/curated/img-5387-6d070b6f5.jpg", width: 1600, height: 900, duration: 15, orientation: "landscape" },
    { filename: "Robotics scene study.mp4", preview: "/site/assets/media/curated/img-5387-b10dc5e5b.mp4", thumb: "/site/assets/media/curated/img-5387-b10dc5e5b.jpg", width: 1600, height: 900, duration: 17.1, orientation: "landscape" },
    { filename: "Answer in light.mp4", preview: "/site/assets/media/curated/img-5523-f36267f05.mp4", thumb: "/site/assets/media/curated/img-5523-f36267f05.jpg", width: 1080, height: 1920, duration: 20.2, orientation: "portrait" },
  ];

  const formatDuration = (seconds) => {
    const total = Math.max(0, Math.round(Number(seconds) || 0));
    const minutes = Math.floor(total / 60);
    return `${minutes}:${String(total % 60).padStart(2, "0")}`;
  };

  const displayName = (filename) => filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b(img|dsc)\s*(\d+)\b/i, "Field capture $2")
    .replace(/\b(mov|mp4)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const video = card.querySelector("video");
      if (!video) return;
      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
        }
        if (!reducedMotion) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { rootMargin: "320px 0px", threshold: 0.04 });

  const makeCard = (item) => {
    const card = document.createElement("article");
    const ratio = item.width > 0 && item.height > 0 ? item.width / item.height : 16 / 9;
    const safeRatio = Math.min(1.78, Math.max(0.7, ratio));
    card.className = "film is-loading";
    card.dataset.orientation = item.orientation;
    card.style.aspectRatio = String(safeRatio);

    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.poster = item.thumb;
    video.dataset.src = item.preview;
    video.setAttribute("aria-label", `Light Company field video: ${displayName(item.filename)}`);
    video.addEventListener("canplay", () => card.classList.remove("is-loading"), { once: true });

    const copy = document.createElement("div");
    copy.className = "film-copy";
    const label = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = displayName(item.filename) || "Light Company field capture";
    const meta = document.createElement("p");
    meta.textContent = `${item.orientation} · ${formatDuration(item.duration)}`;
    label.append(title, meta);

    const sound = document.createElement("button");
    sound.className = "sound-toggle";
    sound.type = "button";
    sound.textContent = "Sound off";
    sound.setAttribute("aria-label", `Turn sound on for ${title.textContent}`);
    sound.addEventListener("click", () => {
      video.muted = !video.muted;
      sound.textContent = video.muted ? "Sound off" : "Sound on";
      sound.setAttribute("aria-label", `${video.muted ? "Turn sound on" : "Mute"} for ${title.textContent}`);
      if (video.paused) video.play().catch(() => {});
    });

    copy.append(label, sound);
    card.append(video, copy);
    videoObserver.observe(card);
    return card;
  };

  const applyFilter = (filter) => {
    document.querySelectorAll(".film").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.orientation !== filter;
      if (card.hidden) card.querySelector("video")?.pause();
    });
    filterButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === filter));
  };

  filterButtons.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter)));

  items = archive.filter((item) => item.duration >= 0.8 && item.width > 0 && item.height > 0);
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.append(makeCard(item)));
  grid.append(fragment);
  count.textContent = `${items.length} field films in the living archive`;
})();
