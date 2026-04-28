<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Mixer' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/settings', label: 'Settings' },
] as const
</script>

<template>
  <div class="sticky top-0 z-50">
    <div
      class="h-1 bg-linear-to-r from-indigo-500 via-violet-500 to-teal-400 shadow-[0_1px_12px_rgba(99,102,241,0.35)]"
      aria-hidden="true"
    />
    <header
      class="border-b border-slate-200/90 bg-white/95 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
    >
      <div class="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 md:py-4">
        <RouterLink
          to="/"
          class="group flex min-w-0 items-center gap-2.5 rounded-xl sm:gap-3.5 sm:no-underline"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-500/35 ring-1 ring-white/20 transition group-hover:shadow-indigo-500/50 sm:h-11 sm:w-11"
          >
            <svg class="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="12" width="3.5" height="8" rx="1" />
              <rect x="10.25" y="6" width="3.5" height="14" rx="1" />
              <rect x="17.5" y="9" width="3.5" height="11" rx="1" />
            </svg>
          </span>
          <span class="min-w-0">
            <span
              class="block truncate bg-linear-to-r from-slate-900 via-indigo-950 to-violet-900 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-xl md:text-2xl"
            >
              AuraMix
            </span>
            <span class="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block sm:text-xs">
              Mixer & focus timer
            </span>
          </span>
        </RouterLink>

        <nav class="flex shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-1.5" aria-label="Main navigation">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-4 sm:py-2 sm:text-sm"
            active-class="pointer-events-none bg-linear-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/30"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>
  </div>
</template>
