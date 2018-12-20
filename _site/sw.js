const staticCacheName = 'caio-incau-2018-12-20-11-12';

const filesToCache = [
  
  
    '/inspired/',
  
    '/economize-e-ser%C3%A1-livre/',
  
    '/nao-corte-o-cafezinho/',
  
    '/cultura-de-debate/',
  
    '/cuidado-com-os-hero-is/',
  
    '/a-minha-visa-o-de-um-senior/',
  
  
];

// Cache on install
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
    })
  )
});

// Clear cache on activate
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('caio-incau-')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Serve from Cache
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  )
});