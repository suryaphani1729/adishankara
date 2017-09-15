var cacheName = 'adishankaraCache-5';
var dataCacheName = 'slokaData-v1';


var filesToCache = [
   '/adishankara/',
  '/adishankara/index.html',
  '/adishankara/main.js',
   '/adishankara/firebase.js',
   '/adishankara/material.css',
   '/adishankara/material.js',
   '/adishankara/angular.js'
];



self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
   if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Activate');
           e.waitUntil(
             caches.keys().then(function(keyList) {
               return Promise.all(keyList.map(function(key) {
                 if (key !== cacheName) {
                   console.log('[ServiceWorker] Removing old cache', key);
                   return caches.delete(key);
                 }
               }));
             })
           );
   }
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
   var dataUrl = "https://test-250316.firebaseio.com";
   
   if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
