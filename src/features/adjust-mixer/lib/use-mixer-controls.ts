import { computed, ref } from 'vue'
import type { Track } from '@/entities/track/model/types'

export function useMixerControls(track: Track) {
  const volume = ref(track.volume)
  const pan = ref(track.pan)

  function normalizeVolume(value: number): number {
    return Math.max(0, Math.min(1, value))
  }

  function normalizePan(value: number): number {
    return Math.max(-1, Math.min(1, value))
  }

  function setVolume(value: number): void {
    volume.value = normalizeVolume(value)
  }

  function setPan(value: number): void {
    pan.value = normalizePan(value)
  }

  const gain = computed(() => volume.value)

  function bindGesture(deltaY: number): void {
    setVolume(volume.value - deltaY * 0.01)
  }

  return { volume, pan, gain, setVolume, setPan, bindGesture, normalizeVolume }
}
