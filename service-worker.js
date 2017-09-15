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
  console.log('[ServiceWorker] Fetch', e.request.url+"/"+config.databaseURL);
   
   
   
   
   
   
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
