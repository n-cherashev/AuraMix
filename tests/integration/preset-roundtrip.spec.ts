import { describe, expect, it } from 'vitest'
import { exportPreset } from '@/features/export-preset/lib/export-preset'
import { importPreset } from '@/features/export-preset/lib/import-preset'

describe('preset roundtrip', () => {
  it('exports and imports same preset', () => {
    const preset = {
      id: 'preset-1',
      name: 'Deep Rain',
      schemaVersion: 1 as const,
      createdAt: new Date().toISOString(),
      tracks: [{ id: 'rain', name: 'Rain', src: '/audio/rain.mp3', volume: 0.6, pan: 0, isPlaying: true }],
    }

    const exported = exportPreset(preset)
    expect(exported.ok).toBe(true)
    if (!exported.ok) return

    const imported = importPreset(exported.data)
    expect(imported.ok).toBe(true)
  })
})
