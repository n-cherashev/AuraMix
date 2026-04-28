import { registerSW } from 'virtual:pwa-register'

export async function initPwa(): Promise<void> {
  if ('serviceWorker' in navigator) {
    registerSW({ immediate: true })
  }
}
