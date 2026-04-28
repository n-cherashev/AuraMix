<script setup lang="ts">
import ErrorBoundary from '@/app/error-boundary.vue'
</script>

<template>
  <ErrorBoundary>
    <main class="mx-auto min-h-screen max-w-5xl px-4 py-6">
      <header class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-semibold">AuraMix</h1>
        <nav class="flex gap-2">
          <RouterLink class="rounded bg-slate-800 px-3 py-1 text-sm text-white" to="/">Mixer</RouterLink>
          <RouterLink class="rounded bg-slate-800 px-3 py-1 text-sm text-white" to="/sessions">Sessions</RouterLink>
          <RouterLink class="rounded bg-slate-800 px-3 py-1 text-sm text-white" to="/settings">Settings</RouterLink>
        </nav>
      </header>
      <RouterView />
    </main>
  </ErrorBoundary>
</template>
