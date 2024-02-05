<template>
  <el-input size="large" v-model="input" placeholder="请输入" clearable></el-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('已完成输入')
</script>
