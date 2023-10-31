<template>
  <div class="step_bar" :class="{ simple: props.type === 'simple', vertical: props.type === 'vertical' }">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide, useSlots } from 'vue'

const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  finishStatus: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})

provide('stepBarProps', {
  active: props.active,
  finishStatus: props.finishStatus,
  type: props.type,
  length: useSlots().default().length
})
</script>

<style scoped lang="scss">
.step_bar {
  display: flex;
  gap: 4px;
  &.simple {
    gap: 0;
  }
  &.vertical {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
