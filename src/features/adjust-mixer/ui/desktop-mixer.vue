<script setup lang="ts">
import type { Track } from '@/entities/track/model/types'

defineProps<{ tracks: Track[] }>()
</script>

<template>
  <section class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <article v-for="track in tracks" :key="track.id" class="rounded border p-4">
      <h3 class="font-medium">{{ track.name }}</h3>
      <p class="text-sm text-slate-600">vol: {{ track.volume.toFixed(2) }} pan: {{ track.pan.toFixed(2) }}</p>
    </article>
  </section>
</template>
