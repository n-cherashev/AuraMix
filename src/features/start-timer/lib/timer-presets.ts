import type { TimerPreset } from '@/entities/session/model/types'

export const timerPresets: TimerPreset[] = [
  { id: 'pomodoro-25', name: 'Pomodoro 25', minutes: 25, mode: 'pomodoro' },
  { id: 'deep-work-50', name: 'Deep Work 50', minutes: 50, mode: 'deep-work' },
  { id: 'custom-90', name: 'Custom 90', minutes: 90, mode: 'custom' },
]
