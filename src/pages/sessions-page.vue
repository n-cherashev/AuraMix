<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSessionStore } from '@/entities/stores/session-store'
import { readSessionList } from '@/shared/lib/idb'

const sessionStore = useSessionStore()

onMounted(async () => {
  const result = await readSessionList()
  if (!result.ok) return
  sessionStore.setSessions(result.data)
})

const totalMinutes = computed(() => sessionStore.sessions.reduce((acc, item) => acc + item.durationMinutes, 0))
</script>

<template>
  <section class="grid gap-4">
    <h2 class="m-0 text-xl font-medium">Sessions</h2>
    <p class="m-0 text-sm text-slate-700">Total focused minutes: {{ totalMinutes }}</p>
    <ul class="m-0 grid list-none gap-2 p-0">
      <li
        v-for="session in sessionStore.sessions"
        :key="session.id"
        class="rounded-xl border border-slate-300 bg-white p-3"
      >
        {{ session.mode }} - {{ session.durationMinutes }} min - {{ new Date(session.finishedAt).toLocaleString() }}
      </li>
    </ul>
  </section>
</template>
