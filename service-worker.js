const CACHE_NAME = "estudo-pwa-v4";

const ARQUIVOS = [
  "./",
  "./estudo.html",
  "./manifest.json",
  "./logo-192.jpg",
  "./logo-512.jpg",
  "./logo.jpg"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARQUIVOS);
    })
  );

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))

      );

    })

  );

  self.clients.claim();

});


self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    fetch(event.request)

      .then(response => {

        return response;

      })

      .catch(() => {

        return caches.match(event.request);

      })

  );

});
