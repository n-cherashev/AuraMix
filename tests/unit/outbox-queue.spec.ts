import { describe, expect, it, vi } from 'vitest'
import * as idb from '@/shared/lib/idb'
import { enqueueSync, flushQueue } from '@/features/outbox-sync/lib/queue'

describe('outbox queue', () => {
  it('enqueue and flush payload', async () => {
    vi.spyOn(idb, 'readOutboxQueue').mockResolvedValueOnce({ ok: true, data: [] })
    vi.spyOn(idb, 'saveOutboxQueue').mockResolvedValue({ ok: true, data: true })
    const queued = await enqueueSync('a')
    expect(queued.ok).toBe(true)

    vi.spyOn(idb, 'readOutboxQueue').mockResolvedValueOnce({ ok: true, data: ['a'] })
    const flushed = await flushQueue()
    expect(flushed.ok).toBe(true)
  })
})
