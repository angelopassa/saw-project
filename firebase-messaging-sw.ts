import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute, setDefaultHandler } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { offlineFallback } from 'workbox-recipes';

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

setDefaultHandler(new NetworkOnly());
offlineFallback();

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { denylist: [new RegExp("/profile"), new RegExp("/search"), new RegExp("/signup"), new RegExp("/restore")] }
));

registerRoute(
  ({ url }) => url.origin.startsWith('https://api.themoviedb.org'),
  new NetworkFirst({
    cacheName: 'api-cache'
  })
);

self.addEventListener('push', function (event) {
  let dati = event.data.json();
  let { title, body } = dati.notification;
  let data = dati.data;
  let options = {
    body: body,
    lang: 'it',
    badge: 'windows11/LargeTile.scale-100.png',
    icon: 'windows11/LargeTile.scale-100.png',
    data: data,
    vibration: [200, 100, 200],
    action: [
      {
        action: 'coffee-action',
        title: 'Coffee',
        type: 'button',
        icon: 'windows11/LargeTile.scale-100.png',
      }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  let notification = event.notification;
  console.log(notification);
  notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});