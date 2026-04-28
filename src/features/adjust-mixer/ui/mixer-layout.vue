<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { Track } from '@/entities/track/model/types'

defineProps<{ tracks: Track[] }>()

const isMobile = useMediaQuery('(max-width: 768px)')
const layout = computed(() =>
  isMobile.value
    ? defineAsyncComponent(() => import('@/features/adjust-mixer/ui/mobile-mixer.vue'))
    : defineAsyncComponent(() => import('@/features/adjust-mixer/ui/desktop-mixer.vue')),
)
</script>

<template>
  <component :is="layout" :tracks="tracks" />
</template>
