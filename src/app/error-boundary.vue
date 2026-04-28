<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const hasError = ref(false)
const message = ref('Unexpected application error')

onErrorCaptured((error) => {
  hasError.value = true
  message.value = error instanceof Error ? error.message : 'Unknown error'
  console.warn('ErrorBoundary:', error)
  return false
})
</script>

<template>
  <section v-if="hasError" class="rounded-xl border border-red-500 bg-red-50 p-4 text-red-700">
    <h2 class="m-0 mb-2 text-lg font-semibold">Something went wrong</h2>
    <p class="m-0">{{ message }}</p>
  </section>
  <slot v-else />
</template>
