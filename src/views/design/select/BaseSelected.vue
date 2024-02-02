<template>
  <el-select v-model="value" placeholder="请选择" clearable>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('已完成选择')
const options = [
  { value: '已完成选择', label: '已完成选择' },
  { value: '只读文本', label: '只读文本' }
]
</script>
