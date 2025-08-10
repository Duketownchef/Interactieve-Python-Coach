const CACHE = 'pypath-cache-v2';
const ASSETS = ['.', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

// Stale-while-revalidate for same-origin requests
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request);
    try {
      const fresh = await fetch(e.request);
      cache.put(e.request, fresh.clone());
      return cached || fresh;
    } catch (err) {
      return cached || Promise.reject(err);
    }
  })());
});
