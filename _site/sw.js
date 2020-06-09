const staticCacheName = 'caio-incau-2020-06-09-13-18';

const filesToCache = [
  
  
    '/avalie-sua-empresa/',
  
    '/mudan%C3%A7a-de-emprego/',
  
    '/como-foi-a-qcon/',
  
    '/gestor-eficaz-2/',
  
    '/gestor-eficaz/',
  
    '/feitas-para-durar-parte-2/',
  
  
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