<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import ErrorBoundary from '@/app/error-boundary.vue'
import { ensureOnlineSyncListener } from '@/features/outbox-sync/lib/queue'

/** В dev не подключаем `virtual:pwa-register` — иначе конфликт с Vite HMR / manifest в консоли. */
const PwaPrompts = import.meta.env.PROD
  ? defineAsyncComponent(() => import('@/app/pwa-prompts.vue'))
  : null

onMounted(() => {
  ensureOnlineSyncListener()
})
</script>

<template>
  <ErrorBoundary>
    <main class="mx-auto min-h-screen max-w-4xl px-4 py-6">
      <component :is="PwaPrompts" v-if="PwaPrompts" />
      <header class="mb-6 flex items-center justify-between gap-3">
        <h1 class="m-0 text-3xl font-bold">AuraMix</h1>
        <nav class="flex gap-2">
          <RouterLink class="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white no-underline" to="/">Mixer</RouterLink>
          <RouterLink class="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white no-underline" to="/sessions">Sessions</RouterLink>
          <RouterLink class="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white no-underline" to="/settings">Settings</RouterLink>
        </nav>
      </header>
      <RouterView />
    </main>
  </ErrorBoundary>
</template>
