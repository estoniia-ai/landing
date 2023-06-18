// Service Worker installation event
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('estoniia-app-cache').then((cache) => {
        // Cache the core assets of your app
        return cache.addAll([
          'https://estoniia.ai',
          'manifest.json',
          'qr.png',
          'mets.png',
          'Estoniia.mp4'
          // Add other core assets here
        ]);
      })
    );
});

// Service Worker activation event
self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        // Remove outdated caches
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'estoniia-app-cache') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

// Service Worker fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached response if available, otherwise fetch from the network
        return response || fetch(event.request);
      })
    );
});
