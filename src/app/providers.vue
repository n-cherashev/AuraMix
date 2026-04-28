<script setup lang="ts">
import ErrorBoundary from '@/app/error-boundary.vue'
</script>

<template>
  <ErrorBoundary>
    <main class="mx-auto min-h-screen max-w-4xl px-4 py-6">
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
