<template>
  <div class="exit_single_mode" @click="quit">
    <SvgIcon :size="16" icon="quit" />
    <span>退出单库模式</span>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/projectStore.js'

const emits = defineEmits(['quit'])

const quit = () => {
  useProjectStore().resetAll()
  emits('quit')
}
</script>

<style scoped lang="scss">
.exit_single_mode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 150px;
  height: 40px;
  border-radius: 2px;
  background: rgba(0, 15, 29, 0.6);
  border: 1px solid rgba(133, 243, 255, 0.3);
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
  cursor: pointer;
  > span {
    font-size: 16px;
  }
}
</style>
