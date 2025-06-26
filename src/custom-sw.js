/* eslint-disable no-restricted-globals */
/* global importScripts, workbox, self, __WB_MANIFEST */
/* eslint no-undef: 0 */

// Import Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Precache files injected by Workbox
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);