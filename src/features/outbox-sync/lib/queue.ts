import { v4 as uuidV4 } from 'uuid'
import { postSyncBatch } from '@/features/outbox-sync/api/sync-client'
import { readOutboxQueue, saveOutboxQueue } from '@/shared/lib/idb'
import { Result, type Result as ResultType } from '@/shared/lib/result'

let onlineListenerAttached = false

export function ensureOnlineSyncListener(): void {
  if (onlineListenerAttached || typeof window === 'undefined') return
  onlineListenerAttached = true
  window.addEventListener('online', () => {
    void flushQueue()
  })
}

export async function enqueueSync(payload: string): Promise<ResultType<number>> {
  const queueResult = await readOutboxQueue()
  if (!queueResult.ok) return queueResult

  const nextQueue = [...queueResult.data, payload]
  const saveResult = await saveOutboxQueue(nextQueue)
  if (!saveResult.ok) return saveResult
  return Result.ok(nextQueue.length)
}

export async function flushQueue(): Promise<ResultType<number>> {
  const queueResult = await readOutboxQueue()
  if (!queueResult.ok) return queueResult
  if (queueResult.data.length === 0) return Result.ok(0)

  const syncResult = await postSyncBatch(queueResult.data, uuidV4())
  if (!syncResult.ok) return syncResult

  const clearResult = await saveOutboxQueue([])
  if (!clearResult.ok) return clearResult
  return Result.ok(queueResult.data.length)
}

/** @deprecated Используйте ensureOnlineSyncListener один раз при старте приложения */
export function registerOnlineSync(): void {
  ensureOnlineSyncListener()
}
