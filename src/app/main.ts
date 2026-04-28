import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Providers from '@/app/providers.vue'
import { router } from '@/app/router'
import { initPwa } from '@/app/pwa-init'

export async function bootstrapApp(): Promise<void> {
  const app = createApp(Providers)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
  await initPwa()
}
