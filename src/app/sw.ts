/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

/** Ответ на сообщение из `workbox-window` при вызове `messageSkipWaiting()` из приложения. */
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const payload = event.data as { type?: string } | undefined
  if (payload?.type === 'SKIP_WAITING') {
    void self.skipWaiting()
  }
})

/** Регистрирует обработчик activate и вызывает `clients.claim()` после активации — нужно вместе с `skipWaiting`. */
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

registerRoute(({ request }) => request.destination === 'audio', new CacheFirst({ cacheName: 'audio-cache' }))
registerRoute(({ url }) => url.pathname.endsWith('.json'), new NetworkFirst({ cacheName: 'preset-cache' }))
registerRoute(({ request }) => request.destination === 'script' || request.destination === 'style', new StaleWhileRevalidate({ cacheName: 'ui-cache' }))

const indexUrl = new URL('index.html', self.location.origin + import.meta.env.BASE_URL).pathname
const handler = createHandlerBoundToURL(indexUrl)
registerRoute(new NavigationRoute(handler))
