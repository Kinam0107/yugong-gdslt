<template>
  <el-input v-model="input" placeholder="请输入" clearable></el-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
