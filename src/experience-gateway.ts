import { gsap } from "gsap";

const gateway = document.querySelector<HTMLElement>("[data-experience-gateway]");

if (gateway) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const options = [...gateway.querySelectorAll<HTMLAnchorElement>("[data-gateway-choice]")];
  const pageRegions = [
    document.querySelector<HTMLElement>(".topbar"),
    document.querySelector<HTMLElement>("main"),
    document.querySelector<HTMLElement>(".site-footer"),
  ].filter((region): region is HTMLElement => Boolean(region));
  const transition = gateway.querySelector<HTMLElement>("[data-gateway-transition]");
  const transitionVideo = transition?.querySelector<HTMLVideoElement>("video");
  const transitionLabel = transition?.querySelector<HTMLElement>("[data-transition-label]");
  let isTransitioning = false;

  document.body.classList.add("gateway-active");
  pageRegions.forEach((region) => region.setAttribute("inert", ""));

  const playVideo = (video: HTMLVideoElement | null) => {
    if (!video || reducedMotion.matches) return;
    void video.play().catch(() => {});
  };

  gateway.querySelectorAll<HTMLVideoElement>("video").forEach(playVideo);

  const setEngaged = (active: HTMLAnchorElement | null) => {
    gateway.querySelector(".gateway-options")?.classList.toggle("has-engaged", Boolean(active));
    options.forEach((option) => {
      const engaged = option === active;
      const blueOverlay = option.querySelector<HTMLElement>(".gateway-option-blue");
      option.classList.toggle("is-engaged", engaged);
      gsap.to(blueOverlay, {
        opacity: engaged ? 0.12 : active ? 0.96 : 0.86,
        duration: reducedMotion.matches ? 0 : engaged ? 0.18 : 0.14,
        ease: "power1.out",
        overwrite: true,
      });
      gsap.to(option.querySelector(".gateway-option-video"), {
        scale: engaged ? 1.01 : active ? 1.045 : 1.035,
        duration: reducedMotion.matches ? 0 : 0.24,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  options.forEach((option) => {
    option.addEventListener("pointerenter", () => setEngaged(option));
    option.addEventListener("pointerleave", () => setEngaged(null));
    option.addEventListener("focus", () => setEngaged(option));
    option.addEventListener("blur", () => setEngaged(null));
  });

  const revealMainSite = () => {
    pageRegions.forEach((region) => region.removeAttribute("inert"));
    document.body.classList.remove("gateway-active");
    gateway.remove();
    const mainHeading = document.querySelector<HTMLElement>("#hero-title");
    mainHeading?.setAttribute("tabindex", "-1");
    mainHeading?.focus({ preventScroll: true });
  };

  const choose = (option: HTMLAnchorElement) => {
    if (isTransitioning) return;
    isTransitioning = true;

    const destination = option.dataset.gatewayChoice;
    const isRobotics = destination === "robotics";
    const video = option.querySelector<HTMLVideoElement>("video");
    const source = video?.querySelector<HTMLSourceElement>("source")?.src;

    if (reducedMotion.matches || !transition || !transitionVideo || !transitionLabel) {
      if (isRobotics) window.location.assign("/robotics");
      else revealMainSite();
      return;
    }

    if (source) {
      const transitionSource = transitionVideo.querySelector<HTMLSourceElement>("source");
      if (transitionSource) transitionSource.src = source;
      transitionVideo.poster = video?.poster ?? "";
      transitionVideo.load();
      playVideo(transitionVideo);
    }

    transitionLabel.textContent = option.querySelector("h2")?.textContent ?? "";
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    const origin = mobile
      ? isRobotics ? "center bottom" : "center top"
      : isRobotics ? "right center" : "left center";
    const startScale = mobile ? { scaleY: 0.5, scaleX: 1 } : { scaleX: 0.5, scaleY: 1 };
    const counterScale = mobile ? { scaleY: 2, scaleX: 1 } : { scaleX: 2, scaleY: 1 };

    gsap.set(transition, { ...startScale, transformOrigin: origin, autoAlpha: 1 });
    gsap.set(transitionVideo, { ...counterScale, transformOrigin: origin });
    gsap.set(transitionLabel, { opacity: 0, y: 18 });

    gsap.timeline({ defaults: { overwrite: true } })
      .to(option.querySelector(".gateway-option-content"), {
        opacity: 0,
        y: isRobotics ? 18 : -18,
        duration: 0.18,
        ease: "power2.in",
      })
      .to(transition, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.54,
        ease: "expo.inOut",
      }, 0.08)
      .to(transitionVideo, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.54,
        ease: "expo.inOut",
      }, 0.08)
      .to(transitionLabel, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      }, 0.38)
      .call(() => {
        if (isRobotics) {
          window.location.assign("/robotics");
          return;
        }
        gsap.to(gateway, {
          opacity: 0,
          duration: 0.26,
          ease: "power2.in",
          onComplete: revealMainSite,
        });
      }, [], 0.7);
  };

  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      choose(option);
    });
  });

  if (!reducedMotion.matches) {
    gsap.timeline()
      .fromTo(gateway, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: "power1.out" })
      .fromTo(".gateway-option-video", { scale: 1.1 }, { scale: 1.035, duration: 1.1, ease: "expo.out", stagger: 0.06 }, 0)
      .fromTo(".gateway-option-content", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.08 }, 0.12)
      .fromTo(".gateway-prompt, .gateway-brand", { opacity: 0 }, { opacity: 1, duration: 0.38, ease: "power1.out" }, 0.26)
      .fromTo(".gateway-divider", { opacity: 0 }, { opacity: 1, duration: 0.38, ease: "power1.out" }, 0.16);
  }
}
