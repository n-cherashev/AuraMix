import { defineStore } from 'pinia'
import type { TimerState } from '@/entities/session/model/types'

type StoreState = TimerState

export const useTimerStore = defineStore('timer', {
  state: (): StoreState => ({
    isRunning: false,
    remainingSeconds: 0,
    selectedPresetId: 'pomodoro-25',
  }),
  actions: {
    start(seconds: number) {
      this.isRunning = true
      this.remainingSeconds = seconds
    },
    stop() {
      this.isRunning = false
      this.remainingSeconds = 0
    },
  },
})
