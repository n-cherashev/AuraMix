<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import AppBuildStamp from '@/app/app-build-stamp.vue'
import AppHeader from '@/app/app-header.vue'
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
    <div class="min-h-screen bg-linear-to-b from-slate-100 via-white to-slate-50">
      <AppHeader />
      <main class="mx-auto max-w-4xl px-4 py-6 md:py-8">
        <component :is="PwaPrompts" v-if="PwaPrompts" />
        <RouterView />
        <AppBuildStamp />
      </main>
    </div>
  </ErrorBoundary>
</template>
