<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import MixerLayout from '@/features/adjust-mixer/ui/mixer-layout.vue'
import TimerPanel from '@/features/start-timer/ui/timer-panel.vue'
import { useTrackStore } from '@/entities/stores/track-store'
import { loadTrack } from '@/shared/lib/audio/howler-adapter'
import { enqueueSync, flushQueue } from '@/features/outbox-sync/lib/queue'

const trackStore = useTrackStore()
const syncHint = ref('')

onMounted(() => {
  if (trackStore.tracks.length === 0) {
    trackStore.upsertTrack({ id: 'rain', name: 'Rain', src: '/audio/rain.mp3', volume: 0.5, pan: 0, isPlaying: false })
    trackStore.upsertTrack({ id: 'wind', name: 'Wind', src: '/audio/wind.mp3', volume: 0.5, pan: 0, isPlaying: false })
    trackStore.tracks.forEach((track) => loadTrack(track.id, track.src))
  }
})

const payload = computed(() => JSON.stringify(trackStore.tracks))

async function sendStubSync() {
  syncHint.value = ''
  const result = await enqueueSync(payload.value)
  if (!result.ok) {
    syncHint.value = `Ошибка очереди: ${result.error.code} — ${result.error.message}`
    return
  }
  let msg = `В очереди элементов: ${result.data}.`
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    const flushed = await flushQueue()
    if (flushed.ok) {
      msg += ` Отправлено (заглушка синха): ${flushed.data}.`
    } else {
      msg += ` Ошибка отправки: ${flushed.error.message}`
    }
  } else {
    msg += ' Оффлайн — отправка при появлении сети.'
  }
  syncHint.value = msg
}
</script>

<template>
  <section class="grid gap-4">
    <h2 class="m-0 text-xl font-medium">Mixer</h2>
    <MixerLayout :tracks="trackStore.tracks" />
    <TimerPanel />
    <div class="flex flex-col gap-2">
      <button type="button" class="w-fit cursor-pointer rounded-lg border-0 bg-emerald-600 px-3 py-2 text-sm text-white" @click="sendStubSync">
        Queue sync payload
      </button>
      <p v-if="syncHint" class="m-0 max-w-prose text-sm text-slate-700">{{ syncHint }}</p>
    </div>
  </section>
</template>
