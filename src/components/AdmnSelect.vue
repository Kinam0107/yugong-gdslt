<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{
      multiple: false,
      checkStrictly: true,
      emitPath: false,
      value: 'adcd',
      label: 'adnm',
      children: 'childrens',
      leaf: 'leaf'
    }"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    show-all-levels
    style="width: 100%" />
</template>

<script setup>
import { computed } from 'vue'
import options from '@/assets/data/administrativeDivisionData.js'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  size: {
    type: String
  },
  placeholder: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  clearable: {
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>
