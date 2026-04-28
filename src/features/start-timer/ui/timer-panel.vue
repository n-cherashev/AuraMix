<script setup lang="ts">
import { useTimer } from '@/features/start-timer/model/use-timer'

const { timerPresets, remainingLabel, timerStore, startTimer, stopTimer } = useTimer()
</script>

<template>
  <section class="rounded border p-4">
    <h3 class="mb-2 font-medium">Focus Timer</h3>
    <p class="mb-3 text-2xl">{{ remainingLabel }}</p>
    <div class="mb-3 flex flex-wrap gap-2">
      <button
        v-for="preset in timerPresets"
        :key="preset.id"
        class="rounded bg-indigo-600 px-2 py-1 text-xs text-white"
        @click="startTimer(preset.id)"
      >
        {{ preset.name }}
      </button>
    </div>
    <button v-if="timerStore.isRunning" class="rounded bg-rose-600 px-3 py-1 text-sm text-white" @click="stopTimer">Stop</button>
  </section>
</template>
