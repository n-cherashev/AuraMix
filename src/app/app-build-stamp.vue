<script setup lang="ts">
import { computed } from 'vue'

const version = __APP_VERSION__

const builtLabel = computed(() => {
  try {
    const d = new Date(__BUILD_TIME__)
    return d.toLocaleString('ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return __BUILD_TIME__
  }
})
</script>

<template>
  <footer
    class="mt-10 flex flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-5"
    aria-label="Сведения о сборке"
  >
    <div class="flex items-center gap-3">
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-slate-700 to-slate-900 text-xs font-bold tracking-wide text-white shadow-md"
        aria-hidden="true"
      >
        PWA
      </span>
      <div class="min-w-0">
        <p class="m-0 text-xs font-semibold uppercase tracking-wider text-slate-500">Сборка приложения</p>
        <p class="m-0 truncate font-mono text-sm font-semibold text-slate-900">
          v{{ version }}
          <span class="font-sans font-normal text-slate-600"> — после деплоя время ниже должно измениться</span>
        </p>
      </div>
    </div>
    <p class="m-0 shrink-0 font-mono text-xs text-slate-600 md:text-right">
      {{ builtLabel }}
    </p>
  </footer>
</template>
