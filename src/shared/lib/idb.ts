import { createStore, del, get, getMany, keys, set, setMany } from 'idb-keyval'
import type { Preset } from '@/entities/preset/model/types'
import type { Session } from '@/entities/session/model/types'
import type { Result as ResultType } from '@/shared/lib/result'
import { Result } from '@/shared/lib/result'
import { failFromError } from '@/shared/lib/errors/map-platform-error'

const store = createStore('auramix-db', 'auramix-kv')
const SESSIONS_KEY = 'sessions.byDate'
const PRESETS_KEY = 'presets.byId'
const OUTBOX_KEY = 'outbox.queue'

export async function savePresetList(presets: Preset[]): Promise<ResultType<true>> {
  try {
    await set(PRESETS_KEY, presets, store)
    return Result.ok(true)
  } catch (error) {
    return failFromError(error)
  }
}

export async function readPresetList(): Promise<ResultType<Preset[]>> {
  try {
    const value = await get<Preset[]>(PRESETS_KEY, store)
    return Result.ok(value ?? [])
  } catch (error) {
    return failFromError(error)
  }
}

export async function saveSessionList(sessions: Session[]): Promise<ResultType<true>> {
  try {
    await set(SESSIONS_KEY, sessions, store)
    return Result.ok(true)
  } catch (error) {
    return failFromError(error)
  }
}

export async function readSessionList(): Promise<ResultType<Session[]>> {
  try {
    const value = await get<Session[]>(SESSIONS_KEY, store)
    return Result.ok(value ?? [])
  } catch (error) {
    return failFromError(error)
  }
}

export async function saveOutboxQueue(payload: string[]): Promise<ResultType<true>> {
  try {
    await set(OUTBOX_KEY, payload, store)
    return Result.ok(true)
  } catch (error) {
    return failFromError(error)
  }
}

export async function readOutboxQueue(): Promise<ResultType<string[]>> {
  try {
    const value = await get<string[]>(OUTBOX_KEY, store)
    return Result.ok(value ?? [])
  } catch (error) {
    return failFromError(error)
  }
}

export const idbRaw = { get, set, setMany, getMany, del, keys, store }
