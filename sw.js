const CACHE_NAME = 'radio-v3';
const assets = [
  './',
  './index.html',
  './icono.png',
  './manifest.json'
];
 
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});
 
self.addEventListener('activate', event => {
  // Borrar cachés antiguas al activar la nueva versión
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
 
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
 
// Permite activación inmediata cuando el index.html lo solicita
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
 
