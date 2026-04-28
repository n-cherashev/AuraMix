<script setup lang="ts">
import { computed } from 'vue'
import { usePresetStore } from '@/entities/stores/preset-store'
import { exportPreset } from '@/features/export-preset/lib/export-preset'
import { importPreset } from '@/features/export-preset/lib/import-preset'

const presetStore = usePresetStore()
const firstPreset = computed(() => presetStore.presets[0])

function exportFirstPreset() {
  if (!firstPreset.value) return
  const result = exportPreset(firstPreset.value)
  if (!result.ok) return
  navigator.clipboard.writeText(result.data)
}

function importFirstPreset() {
  if (!firstPreset.value) return
  const serialized = JSON.stringify(firstPreset.value)
  const parsed = importPreset(serialized)
  if (!parsed.ok) return
  presetStore.savePreset(parsed.data)
}
</script>

<template>
  <section class="grid gap-4">
    <h2 class="m-0 text-xl font-medium">Settings</h2>
    <p class="m-0 text-sm text-slate-700">Preset count: {{ presetStore.presets.length }}</p>
    <div class="flex gap-2">
      <button type="button" class="cursor-pointer rounded-lg border-0 bg-slate-800 px-3 py-2 text-sm text-white" @click="exportFirstPreset">
        Export first preset
      </button>
      <button type="button" class="cursor-pointer rounded-lg border-0 bg-slate-800 px-3 py-2 text-sm text-white" @click="importFirstPreset">
        Import first preset
      </button>
    </div>
  </section>
</template>
