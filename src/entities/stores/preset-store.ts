import { defineStore } from 'pinia'
import type { Preset } from '@/entities/preset/model/types'

type PresetState = {
  presets: Preset[]
}

export const usePresetStore = defineStore('preset', {
  state: (): PresetState => ({ presets: [] }),
  actions: {
    setPresets(presets: Preset[]) {
      this.presets = presets
    },
    savePreset(preset: Preset) {
      const index = this.presets.findIndex((item) => item.id === preset.id)
      if (index === -1) {
        this.presets.push(preset)
        return
      }
      this.presets[index] = preset
    },
  },
})
