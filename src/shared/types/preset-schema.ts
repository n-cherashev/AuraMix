import type { Track } from '@/entities/track/model/types'

export type PresetSchemaV1 = {
  schemaVersion: 1
  id: string
  name: string
  tracks: Track[]
  createdAt: string
}
