import type { Preset } from '@/entities/preset/model/types'
import type { Result as ResultType } from '@/shared/lib/result'
import { Result } from '@/shared/lib/result'
import { failFromError } from '@/shared/lib/errors/map-platform-error'

export function exportPreset(preset: Preset): ResultType<string> {
  try {
    return Result.ok(JSON.stringify(preset, null, 2))
  } catch (error) {
    return failFromError(error)
  }
}
