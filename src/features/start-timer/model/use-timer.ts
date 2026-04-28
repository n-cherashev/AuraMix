import { computed, onBeforeUnmount, ref } from 'vue'
import { useTimerStore } from '@/entities/stores/timer-store'
import { timerPresets } from '@/features/start-timer/lib/timer-presets'

export function useTimer() {
  const timerStore = useTimerStore()
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
  /** Время окончания по часам (устойчиво к нескольким интервалам и троттлингу вкладки). */
  const endsAtMs = ref(0)

  function clearTickInterval() {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  function stopTimer() {
    clearTickInterval()
    endsAtMs.value = 0
    timerStore.stop()
  }

  function syncFromDeadline() {
    if (!timerStore.isRunning || endsAtMs.value <= 0) return

    const left = Math.max(0, Math.ceil((endsAtMs.value - Date.now()) / 1000))
    timerStore.$patch({ remainingSeconds: left })

    if (left <= 0) {
      stopTimer()
    }
  }

  function startTimer(presetId: string) {
    const preset = timerPresets.find((item) => item.id === presetId)
    if (!preset) return

    clearTickInterval()

    const totalSeconds = preset.minutes * 60
    endsAtMs.value = Date.now() + totalSeconds * 1000
    timerStore.selectedPresetId = preset.id
    timerStore.start(totalSeconds)

    syncFromDeadline()
    intervalId.value = window.setInterval(syncFromDeadline, 1000)
  }

  onBeforeUnmount(stopTimer)

  const remainingLabel = computed(() => {
    const minutes = Math.floor(timerStore.remainingSeconds / 60)
    const seconds = timerStore.remainingSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  return { timerPresets, timerStore, remainingLabel, startTimer, stopTimer }
}
