import { Result, type Result as ResultType } from '@/shared/lib/result'

export async function postSyncBatch(payload: string[], idempotencyKey: string): Promise<ResultType<true>> {
  try {
    await new Promise((resolve) => window.setTimeout(resolve, 100))
    console.info('sync stub', { payloadCount: payload.length, idempotencyKey })
    return Result.ok(true)
  } catch (error) {
    return Result.fail({
      code: error instanceof Error ? error.name : 'SyncError',
      message: error instanceof Error ? error.message : 'Failed to sync',
    })
  }
}
