import { defineStore } from 'pinia'
import type { Session } from '@/entities/session/model/types'

type SessionState = {
  sessions: Session[]
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({ sessions: [] }),
  actions: {
    setSessions(sessions: Session[]) {
      this.sessions = sessions
    },
    addSession(session: Session) {
      this.sessions.unshift(session)
    },
  },
})
