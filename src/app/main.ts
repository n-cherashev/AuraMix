import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Providers from '@/app/providers.vue'
import { router } from '@/app/router'

export async function bootstrapApp(): Promise<void> {
  const app = createApp(Providers)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}
