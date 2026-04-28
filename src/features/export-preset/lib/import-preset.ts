import { z } from 'zod'
import type { Preset } from '@/entities/preset/model/types'
import { Result, type Result as ResultType } from '@/shared/lib/result'

const trackSchema = z.object({
  id: z.string(),
  name: z.string(),
  src: z.string(),
  volume: z.number().min(0).max(1),
  pan: z.number().min(-1).max(1),
  isPlaying: z.boolean(),
})

const presetSchema = z.object({
  id: z.string(),
  name: z.string(),
  schemaVersion: z.literal(1),
  tracks: z.array(trackSchema),
  createdAt: z.string(),
})

export function importPreset(json: string): ResultType<Preset> {
  const parsed = presetSchema.safeParse(JSON.parse(json))
  if (!parsed.success) {
    return Result.fail({
      code: 'InvalidPreset',
      message: parsed.error.message,
    })
  }

  return Result.ok(parsed.data)
}
