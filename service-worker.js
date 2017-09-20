var cacheName = 'adishankaraCache-9';
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
  
            console.log('[ServiceWorker] Activate');
           e.waitUntil(
             caches.keys().then(function(keyList) {
               return Promise.all(keyList.map(function(key) {
                 if (key !== cacheName && key !== dataCacheName) {
                   console.log('[ServiceWorker] Removing old cache', key);
                   return caches.delete(key);
                 }
               }));
             })
           );
   
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
   var dataUrl = "https://test-250316.firebaseio.com";
   console.log("----------");
   console.log(e);
   if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
      
      console.log("fetching from if");
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
      console.log("fetching from else");
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});


//regarding push notifications

// Register event listener for the 'push' event.
self.addEventListener('push', function(event) {

 payload = event.data.text();

 // Keep the service worker alive until the notification is created.
 event.waitUntil(
   // Show a notification with title and use the payload
   // as the body.
   self.registration.showNotification(payload.title, payload.options)
 );
});

// Event Listener for notification click
self.addEventListener('notificationclick', function(event) {

 event.notification.close();

 event.waitUntil(
   clients.openWindow("https://suryaphani1729.github.com/sample1/src")
 );
});
