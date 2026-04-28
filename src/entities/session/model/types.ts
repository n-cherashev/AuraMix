export type SessionMode = 'pomodoro' | 'deep-work' | 'custom'

export type Session = {
  id: string
  mode: SessionMode
  startedAt: string
  finishedAt: string
  durationMinutes: number
}

export type TimerPreset = {
  id: string
  name: string
  minutes: number
  mode: SessionMode
}

export type TimerState = {
  isRunning: boolean
  remainingSeconds: number
  selectedPresetId: string
}
