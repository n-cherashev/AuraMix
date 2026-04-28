<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { getInstalledPwaSurface } from '@/shared/lib/platform/use-installed-pwa'

/** Chromium покажет свой UI установки сам, если не вызывать preventDefault на beforeinstallprompt — только отмечаем факт. */
const installPromotionSeen = ref(false)

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({ immediate: true })

const surfaceTick = ref(0)

let unsubscribeMedia: Array<() => void> = []

function bumpSurface() {
  surfaceTick.value += 1
}

function onBeforeInstallPrompt() {
  installPromotionSeen.value = true
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
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
})

onUnmounted(() => {
  unsubscribeMedia.forEach((fn) => fn())
  unsubscribeMedia = []
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
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

/** Safari (iOS/macOS): своего beforeinstallprompt нет — подсказка «Поделиться → На экран Домой». */
const showSafariInstallHint = computed(() => {
  surfaceTick.value
  if (getInstalledPwaSurface()) return false
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(ua)
  const isIOS = /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints! > 1)
  return isSafari && isIOS
})

/** Chromium: после выполнения эвристик (≈30 с на странице + был клик) показывается иконка установки в адресной строке; мы дублируем короткую подсказку. */
const showChromiumInstallHint = computed(() => {
  surfaceTick.value
  if (getInstalledPwaSurface()) return false
  if (showSafariInstallHint.value) return false
  return installPromotionSeen.value
})

async function applyUpdate() {
  await updateServiceWorker(true)
}
</script>

<template>
  <div class="mb-4 flex flex-col gap-2">
    <div
      v-if="showChromiumInstallHint"
      class="flex flex-wrap items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/90 px-4 py-3 text-sm text-indigo-950"
      role="status"
    >
      <span>
        Приложение можно установить: нажмите значок установки в адресной строке Chrome или Edge (или меню «Приложение» → «Установить AuraMix»).
      </span>
    </div>

    <div
      v-if="showSafariInstallHint"
      class="rounded-xl border border-indigo-200 bg-indigo-50/90 px-4 py-3 text-sm text-indigo-950"
      role="status"
    >
      На iPhone и iPad: <strong>Поделиться</strong> → <strong>На экран «Домой»</strong>. На Mac в Safari — меню «Файл» → «Добавить в Dock» (если доступно).
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
