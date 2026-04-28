<script setup lang="ts">
import type { Track } from '@/entities/track/model/types'

defineProps<{ tracks: Track[] }>()
</script>

<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article v-for="track in tracks" :key="track.id" class="rounded-xl border border-slate-300 bg-white p-4">
      <h3 class="m-0 mb-1.5 font-medium">{{ track.name }}</h3>
      <p class="m-0 text-sm text-slate-600">vol: {{ track.volume.toFixed(2) }} pan: {{ track.pan.toFixed(2) }}</p>
    </article>
  </section>
</template>
