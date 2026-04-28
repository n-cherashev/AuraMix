import { describe, expect, it } from 'vitest'
import { useMixerControls } from '@/features/adjust-mixer/lib/use-mixer-controls'

describe('useMixerControls', () => {
  it('clamps volume to [0,1]', () => {
    const controls = useMixerControls({
      id: '1',
      name: 'Track',
      src: 'track.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false,
    })

    controls.setVolume(2)
    expect(controls.volume.value).toBe(1)

    controls.setVolume(-1)
    expect(controls.volume.value).toBe(0)
  })
})
