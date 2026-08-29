// Open mailto: links in Gmail's web compose instead of the OS mail client.
// The mailto: href stays in the markup, so if the popup is blocked or JS is
// unavailable, the click falls back to the default mail-client behavior.
(() => {
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href^="mailto:"]');
    if (!link) return;

    let compose;
    try {
      const url = new URL(link.href);
      const params = new URLSearchParams(url.search);
      compose = new URL("https://mail.google.com/mail/");
      compose.searchParams.set("view", "cm");
      compose.searchParams.set("fs", "1");
      compose.searchParams.set("to", url.pathname);
      const subject = params.get("subject");
      if (subject) compose.searchParams.set("su", subject);
      const body = params.get("body");
      if (body) compose.searchParams.set("body", body);
    } catch {
      return;
    }

    const win = window.open(compose.toString(), "_blank", "noopener");
    if (win) event.preventDefault();
  });
})();
