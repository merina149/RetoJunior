/* =========================================================
   SERVICE WORKER: hace que la app funcione sin conexión
   Guarda una copia de los archivos la primera vez que la abres.
   IMPORTANTE: si cambias algún archivo, sube el número de VERSION
   para que los móviles descarguen la versión nueva.
   ========================================================= */
const VERSION = 'reto-junior-v1';

const ARCHIVOS = [
  './', 'index.html', 'manifest.json', 'css/app.css',
  'js/storage.js', 'js/runner.js', 'js/tutor.js', 'js/app.js',
  'data/rutas.js', 'data/ej-html.js', 'data/ej-css.js', 'data/ej-js.js', 'data/ej-git.js',
  'data/ej-criterio.js', 'data/ej-sql.js', 'data/ej-ts-react.js', 'data/ej-backend.js', 'data/teoria.js',
  'vendor/sql-wasm.js', 'vendor/sql-wasm.wasm',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

// 1. Instalar: descargar y guardar todos los archivos
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

// 2. Activar: borrar copias de versiones antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 3. Cada petición: primero la red (para tener lo último); si no hay conexión, la copia
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copia));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
