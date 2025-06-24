/* eslint-disable no-restricted-globals */
/* global workbox */

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);