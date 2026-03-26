/* eslint-disable no-restricted-globals */
/* global importScripts, workbox, __WB_MANIFEST */

// Import Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Precache files injected by Workbox
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

// Fix for __WB_MANIFEST warning: use it directly if global or through self
const manifest = self.__WB_MANIFEST || [];
workbox.precaching.precacheAndRoute(manifest);
