<template>
  <el-cascader
    ref="admnSelect"
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
    style="width: 100%"
    @change="change"
    @visible-change="visibleChange" />
</template>

<script setup>
import { ref, computed } from 'vue'
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
const emits = defineEmits(['update:modelValue', 'change', 'visibleChange'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const admnSelect = ref()
const change = (val) => {
  const node = admnSelect.value.getCheckedNodes()[0]
  emits('change', val, node?.data?.level || '')
}

const visibleChange = (val) => {
  emits('visibleChange', val)
}
</script>
