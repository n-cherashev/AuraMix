import type { Track } from '@/entities/track/model/types'

export type Preset = {
  id: string
  name: string
  schemaVersion: 1
  tracks: Track[]
  createdAt: string
}
