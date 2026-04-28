import { defineStore } from 'pinia'
import type { Track } from '@/entities/track/model/types'

type TrackState = {
  tracks: Track[]
}

export const useTrackStore = defineStore('track', {
  state: (): TrackState => ({ tracks: [] }),
  actions: {
    upsertTrack(track: Track) {
      const index = this.tracks.findIndex((item) => item.id === track.id)
      if (index === -1) {
        if (this.tracks.length >= 6) return
        this.tracks.push(track)
        return
      }
      this.tracks[index] = track
    },
    setPlaying(id: string, isPlaying: boolean) {
      const track = this.tracks.find((item) => item.id === id)
      if (!track) return
      track.isPlaying = isPlaying
    },
  },
})
