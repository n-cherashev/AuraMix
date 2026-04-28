export type TrackId = string

export type Track = {
  id: TrackId
  name: string
  src: string
  volume: number
  pan: number
  isPlaying: boolean
}
