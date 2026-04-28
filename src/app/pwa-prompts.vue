<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { getInstalledPwaSurface } from '@/shared/lib/platform/use-installed-pwa'

const installDeferred = ref<BeforeInstallPromptEvent | null>(null)

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({ immediate: true })

const surfaceTick = ref(0)

let unsubscribeMedia: Array<() => void> = []

function bumpSurface() {
  surfaceTick.value += 1
}

function onBeforeInstall(e: Event) {
  e.preventDefault()
  installDeferred.value = e as BeforeInstallPromptEvent
}

onMounted(() => {
  const queries = ['(display-mode: standalone)', '(display-mode: browser)', '(display-mode: window-controls-overlay)']
  for (const q of queries) {
    try {
      const mq = window.matchMedia(q)
      mq.addEventListener('change', bumpSurface)
      unsubscribeMedia.push(() => mq.removeEventListener('change', bumpSurface))
    } catch {
      /* ignore */
    }
  }
  window.addEventListener('beforeinstallprompt', onBeforeInstall)
})

onUnmounted(() => {
  unsubscribeMedia.forEach((fn) => fn())
  unsubscribeMedia = []
  window.removeEventListener('beforeinstallprompt', onBeforeInstall)
})

const showUpdateBanner = computed(() => {
  surfaceTick.value
  if (!needRefresh.value) return false
  return getInstalledPwaSurface()
})

const showOfflineInPwa = computed(() => {
  surfaceTick.value
  if (!offlineReady.value) return false
  return getInstalledPwaSurface()
})

async function installApp() {
  const evt = installDeferred.value
  if (!evt) return
  await evt.prompt()
  await evt.userChoice
  installDeferred.value = null
}

async function applyUpdate() {
  await updateServiceWorker(true)
}

function dismissInstall() {
  installDeferred.value = null
}
</script>

<template>
  <div class="mb-4 flex flex-col gap-2">
    <div
      v-if="installDeferred"
      class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950"
      role="status"
    >
      <span>Установите AuraMix как приложение — быстрый доступ с главного экрана.</span>
      <div class="flex gap-2">
        <button type="button" class="rounded-lg bg-indigo-600 px-3 py-2 text-white" @click="installApp">Установить</button>
        <button type="button" class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700" @click="dismissInstall">
          Позже
        </button>
      </div>
    </div>

    <div
      v-if="showUpdateBanner"
      class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="status"
    >
      <span>Доступна новая версия приложения.</span>
      <button type="button" class="rounded-lg bg-amber-600 px-3 py-2 text-white" @click="applyUpdate">Обновить</button>
    </div>

    <div v-if="showOfflineInPwa" class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">
      AuraMix готов работать офлайн.
    </div>
  </div>
</template>
