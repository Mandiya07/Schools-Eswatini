const CACHE_NAME = 'eswatini-schools-store-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      '/',
      '/index.html',
    ]))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Only handle HTTP/HTTPS GET requests
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  const url = new URL(e.request.url);

  // 1. NEVER cache any API requests or real-time socket endpoints
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/socket.io')) {
    return; // Let browser fetch normally
  }

  // 2. Network-First approach for HTML (navigation) and root index pages so users get instant updates when online
  if (e.request.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // Cache the latest copy of index.html/root
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseCopy);
          });
          return response;
        })
        .catch(() => {
          // If offline, serve the cached version
          return caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 3. Cache-First (with network fallback and dynamic caching) for static assets like images, CSS, JS, fonts
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((fetchResponse) => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }
        
        // Cache static files dynamically (don't cache dynamic pages or external requests)
        const isStaticAsset = /\.(js|css|png|jpg|jpeg|svg|gif|woff2?|json)$/i.test(url.pathname);
        if (isStaticAsset) {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return fetchResponse;
      });
    })
  );
});
