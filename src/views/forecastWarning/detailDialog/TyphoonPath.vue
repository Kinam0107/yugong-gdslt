<template>
  <el-dialog v-model="dialogVisible" title="气象云图" append-to-body fullscreen>
    <iframe style="width: 100%; height: 100%" src="https://typhoon.slt.zj.gov.cn/" />
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss"></style>
