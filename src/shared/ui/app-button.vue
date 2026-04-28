<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button :type="type" class="cursor-pointer rounded-lg border-0 bg-slate-900 px-3 py-2 text-sm text-white">
    <slot />
  </button>
</template>
