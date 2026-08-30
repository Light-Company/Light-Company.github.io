"""Lightweight static preview server for this repo.

Serves site/*.html at their route paths and everything else from public/,
so the pages render without needing the full vinext/Cloudflare dev stack.
Useful when the local Node version is below the project's engines
requirement (>=22.13) and `npm run dev` can't start.
"""

import http.server
import os
import socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
SITE = os.path.join(ROOT, "site")
PORT = int(os.environ.get("PORT", "8899"))

PAGES = {
    "/": "main.html",
    "": "main.html",
    "/gallery": "gallery.html",
    "/gallery/": "gallery.html",
    "/robotics": "robotics.html",
    "/robotics/": "robotics.html",
    "/Robotics": "robotics.html",
    "/Robotics/": "robotics.html",
    "/projected-intelligence": "projected-intelligence.html",
    "/projected-intelligence/": "projected-intelligence.html",
    "/privacy": "privacy.html",
    "/privacy/": "privacy.html",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = path.split("?", 1)[0].split("#", 1)[0]
        if path in PAGES:
            return os.path.join(SITE, PAGES[path])
        return os.path.join(PUBLIC, path.lstrip("/"))

    def log_message(self, fmt, *args):
        pass


class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    with Server(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Serving on http://127.0.0.1:{PORT}")
        httpd.serve_forever()
