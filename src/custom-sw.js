/* eslint-disable no-restricted-globals */
/* global importScripts, workbox */

// Import Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Precache files injected by Workbox
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

// The Workbox InjectManifest plugin will search for this string and replace it.
// eslint-disable-next-line no-restricted-globals
const manifest = self.__WB_MANIFEST || [];
workbox.precaching.precacheAndRoute(manifest);
