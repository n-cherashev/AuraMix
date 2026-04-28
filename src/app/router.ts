import { createRouter, createWebHistory } from 'vue-router'
import MixerPage from '@/pages/mixer-page.vue'
import SessionsPage from '@/pages/sessions-page.vue'
import SettingsPage from '@/pages/settings-page.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'mixer', component: MixerPage },
    { path: '/sessions', name: 'sessions', component: SessionsPage },
    { path: '/settings', name: 'settings', component: SettingsPage },
  ],
})
