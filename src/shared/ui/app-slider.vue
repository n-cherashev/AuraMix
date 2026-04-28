<script setup lang="ts">
defineProps<{ modelValue: number; min?: number; max?: number; step?: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<template>
  <input
    class="w-full"
    type="range"
    :value="modelValue"
    :min="min ?? 0"
    :max="max ?? 1"
    :step="step ?? 0.01"
    @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
  />
</template>
