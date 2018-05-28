const staticCacheName = 'caio-incau-2018-05-28-09-50';

const filesToCache = [
  
  
    '/como-economizar-com-o-seu-cart%C3%A3o-mastercard/',
  
    '/economize-com-o-cart%C3%A3o-de-cr%C3%A9dito/',
  
    '/nao-seja-cuzao/',
  
    '/performance-webpack-final/',
  
    '/performance-webpack-parte-2/',
  
    '/performance-webpack-parte-1/',
  
  
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