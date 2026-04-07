const CACHE_NAME = 'radio-v1';

// Esto mantiene viva la lógica en segundo plano
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Simplemente deja pasar las peticiones de audio
  event.respondWith(fetch(event.request));
});
