import { computed, onBeforeUnmount, ref } from 'vue'
import { useTimerStore } from '@/entities/stores/timer-store'
import { timerPresets } from '@/features/start-timer/lib/timer-presets'

export function useTimer() {
  const timerStore = useTimerStore()
  const intervalId = ref<number | null>(null)

  function startTimer(presetId: string) {
    const preset = timerPresets.find((item) => item.id === presetId)
    if (!preset) return

    timerStore.start(preset.minutes * 60)
    timerStore.selectedPresetId = preset.id
    intervalId.value = window.setInterval(() => {
      timerStore.tick()
      if (timerStore.remainingSeconds > 0) return
      stopTimer()
    }, 1000)
  }

  function stopTimer() {
    if (intervalId.value !== null) {
      window.clearInterval(intervalId.value)
      intervalId.value = null
    }
    timerStore.stop()
  }

  onBeforeUnmount(stopTimer)

  const remainingLabel = computed(() => {
    const minutes = Math.floor(timerStore.remainingSeconds / 60)
    const seconds = timerStore.remainingSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  return { timerPresets, timerStore, remainingLabel, startTimer, stopTimer }
}
