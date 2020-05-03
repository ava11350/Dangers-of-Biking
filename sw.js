const staticDangersOfBiking = "Dangers-Of-Biking"
const assets = [
  "./",
  "./index.html",
  "./author_img.jpg"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDangersOfBiking).then(cache => {
      cache.addAll(assets)
    })
  )
})

/*
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
}) */

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(staticDangersOfBiking).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});