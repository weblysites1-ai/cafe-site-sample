/* Service worker: shows the order-ready notification even when the café page is closed. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title || 'Your order is ready', { body: d.body || '', tag: d.tag || 'order', requireInteraction: true, vibrate: [200, 100, 200] }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(l => (l[0] ? l[0].focus() : self.clients.openWindow('./'))));
});
