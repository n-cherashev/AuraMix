import { Howl, Howler } from 'howler'

type SoundMap = Map<string, Howl>
const sounds: SoundMap = new Map()

export function loadTrack(id: string, src: string): Howl {
  const existing = sounds.get(id)
  if (existing) return existing

  const sound = new Howl({ src: [src], html5: true, loop: true, volume: 0.5 })
  sounds.set(id, sound)
  return sound
}

export function setTrackVolume(id: string, volume: number): void {
  const sound = sounds.get(id)
  if (!sound) return
  sound.volume(Math.max(0, Math.min(1, volume)))
}

export function setTrackPan(id: string, pan: number): void {
  const sound = sounds.get(id)
  if (!sound) return
  sound.stereo(Math.max(-1, Math.min(1, pan)))
}

export function crossfade(fromId: string, toId: string, durationMs: number): void {
  const from = sounds.get(fromId)
  const to = sounds.get(toId)
  if (!from || !to) return
  to.play()
  from.fade(from.volume(), 0, durationMs)
  to.fade(0, 1, durationMs)
}

export function stopAllTracks(): void {
  Howler.stop()
}
