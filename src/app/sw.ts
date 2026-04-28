/// <reference lib="WebWorker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

registerRoute(({ request }) => request.destination === 'audio', new CacheFirst({ cacheName: 'audio-cache' }))
registerRoute(({ url }) => url.pathname.endsWith('.json'), new NetworkFirst({ cacheName: 'preset-cache' }))
registerRoute(({ request }) => request.destination === 'script' || request.destination === 'style', new StaleWhileRevalidate({ cacheName: 'ui-cache' }))

const handler = createHandlerBoundToURL('/index.html')
registerRoute(new NavigationRoute(handler))
