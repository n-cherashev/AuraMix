<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button :type="type" class="rounded bg-slate-900 px-3 py-2 text-sm text-white">
    <slot />
  </button>
</template>
