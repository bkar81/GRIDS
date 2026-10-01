// GRIDS service worker v1.0.1
// Caches the GRIDS app shell for offline use and supports the in-app
// update prompt. Google Drive/Sheets/Forms calls are never cached.

const CACHE_NAME = "grids-cache-v1.0.1";

const ASSETS = [
  "./",
  "./index.html",
  "./README.html",
  "./privacy.html",
  "./terms.html",
  "./manifest.json",
  "./pwa-192x192.png",
  "./pwa-512x512.png",
  "./pwa-maskable-512x512.png"
];

// Install the new service worker and cache the latest GRIDS app shell.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Remove old GRIDS caches and take control of open pages.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Allow the GRIDS app's Update button to activate the waiting worker.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never intercept Google authentication/API/Forms/Sheets/Drive traffic.
  if (
    url.hostname.endsWith("googleapis.com") ||
    url.hostname.endsWith("google.com") ||
    url.hostname.endsWith("googleusercontent.com")
  ) {
    return;
  }

  // Only handle GET requests.
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Prefer the network for the GRIDS app shell so published updates are
      // discovered promptly. If offline, fall back to the cached version.
      const isAppShell =
        url.pathname.endsWith("/index.html") ||
        url.pathname.endsWith("/") ||
        url.pathname.endsWith("/grids");

      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => cached);

      return isAppShell ? networkFetch : (cached || networkFetch);
    })
  );
});
