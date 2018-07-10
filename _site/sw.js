const staticCacheName = 'caio-incau-2018-07-10-08-15';

const filesToCache = [
  
  
    '/a-minha-vis%C3%A3o-de-um-senior/',
  
    '/voc%C3%AA-n%C3%A3o-precisa-palestrar/',
  
    '/como-economizar-com-o-seu-cart%C3%A3o-mastercard/',
  
    '/economize-com-o-cart%C3%A3o-de-cr%C3%A9dito/',
  
    '/nao-seja-cuzao/',
  
    '/performance-webpack-final/',
  
  
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