<script setup lang="ts">
import { computed, onMounted } from 'vue'
import MixerLayout from '@/features/adjust-mixer/ui/mixer-layout.vue'
import TimerPanel from '@/features/start-timer/ui/timer-panel.vue'
import { useTrackStore } from '@/entities/stores/track-store'
import { loadTrack } from '@/shared/lib/audio/howler-adapter'
import { enqueueSync, registerOnlineSync } from '@/features/outbox-sync/lib/queue'

const trackStore = useTrackStore()

onMounted(() => {
  if (trackStore.tracks.length > 0) return

  trackStore.upsertTrack({ id: 'rain', name: 'Rain', src: '/audio/rain.mp3', volume: 0.5, pan: 0, isPlaying: false })
  trackStore.upsertTrack({ id: 'wind', name: 'Wind', src: '/audio/wind.mp3', volume: 0.5, pan: 0, isPlaying: false })
  trackStore.tracks.forEach((track) => loadTrack(track.id, track.src))
  registerOnlineSync()
})

const payload = computed(() => JSON.stringify(trackStore.tracks))

async function sendStubSync() {
  await enqueueSync(payload.value)
}
</script>

<template>
  <section class="grid gap-4">
    <h2 class="m-0 text-xl font-medium">Mixer</h2>
    <MixerLayout :tracks="trackStore.tracks" />
    <TimerPanel />
    <button type="button" class="w-fit cursor-pointer rounded-lg border-0 bg-emerald-600 px-3 py-2 text-sm text-white" @click="sendStubSync">
      Queue sync payload
    </button>
  </section>
</template>
