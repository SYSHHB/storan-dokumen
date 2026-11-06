// Minimal service worker: lets phones offer "Install app". It does not cache anything,
// so people always get the latest version of the site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
