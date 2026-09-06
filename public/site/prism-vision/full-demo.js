(() => {
  const frame = document.querySelector("[data-full-demo]");
  if (!frame) return;
  const button = frame.querySelector("[data-full-demo-toggle]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let player;
  let loading = false;
  let ready = false;
  let visible = false;
  let userPaused = false;
  let manualPlay = false;

  const sync = () => {
    if (!ready) return;
    if (visible && !document.hidden && !userPaused && (!motion.matches || manualPlay)) player.playVideo();
    else player.pauseVideo();
  };
  const start = () => {
    if (loading) return;
    loading = true;
    const createPlayer = () => {
      player = new window.YT.Player(frame.querySelector("[data-full-demo-player]"), {
        host: "https://www.youtube-nocookie.com",
        videoId: frame.dataset.fullDemo,
        playerVars: { autoplay: 0, mute: 1, controls: 0, playsinline: 1, loop: 1, playlist: frame.dataset.fullDemo, rel: 0, origin: location.origin },
        events: {
          onReady: () => {
            ready = true;
            player.getIframe().title = "Full Air Hockey on Prism demonstration";
            player.mute();
            sync();
          },
          onStateChange: ({ data }) => {
            const playing = data === window.YT.PlayerState.PLAYING;
            if (playing) frame.classList.add("is-ready");
            button.classList.toggle("is-playing", playing);
            button.setAttribute("aria-label", `${playing ? "Pause" : "Play"} full air hockey video`);
          },
          onError: () => {
            frame.classList.remove("is-ready");
            frame.classList.add("has-error");
            button.hidden = true;
          },
        },
      });
    };
    if (window.YT?.Player) createPlayer();
    else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { previousReady?.(); createPlayer(); };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => { frame.classList.add("has-error"); button.hidden = true; };
      document.head.append(script);
    }
  };
  button.addEventListener("click", () => {
    if (ready && player.getPlayerState() === window.YT.PlayerState.PLAYING) {
      userPaused = true;
      manualPlay = false;
    } else {
      userPaused = false;
      manualPlay = true;
      start();
    }
    sync();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
    if (visible && !motion.matches) start();
    sync();
  }, { threshold: [0, 0.45] }).observe(frame);
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", () => { if (visible && !motion.matches) start(); sync(); });
})();
