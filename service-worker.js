const CACHE_NAME='training-plan-v1';
const ASSETS=['./','./index.html','./style.css','./script.js','./manifest.json','https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js','https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js','https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{const req=event.request;if(new URL(req.url).origin===location.origin){event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));return res;})));}else{event.respondWith(fetch(req).catch(()=>caches.match(req)));}});
