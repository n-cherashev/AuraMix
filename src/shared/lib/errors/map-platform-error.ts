import { Result, type AppError, type Result as ResultType } from '@/shared/lib/result'

const KNOWN_ERRORS: Record<string, string> = {
  QuotaExceededError: 'Local storage quota exceeded',
  AbortError: 'Operation was aborted',
  InvalidStateError: 'Invalid state',
}

export function mapPlatformError(error: unknown): AppError {
  if (error instanceof Error) {
    return {
      code: error.name,
      message: KNOWN_ERRORS[error.name] ?? error.message,
      stack: error.stack,
    }
  }

  return { code: 'UnknownError', message: 'Unexpected platform error' }
}

export function failFromError(error: unknown): ResultType<never> {
  return Result.fail(mapPlatformError(error))
}
