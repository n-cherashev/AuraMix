export type AppError = {
  code: string
  message: string
  stack?: string
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError }

export const Result = {
  ok<T>(data: T): Result<T> {
    return { ok: true, data }
  },
  fail(error: AppError): Result<never> {
    return { ok: false, error }
  },
}
