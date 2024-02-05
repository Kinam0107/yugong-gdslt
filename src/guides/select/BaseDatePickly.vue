<template>
  <el-date-picker type="date" v-model="value" placeholder="请选择" clearable disabled format="YYYY/MM/DD" value-format="YYYY/MM/DD" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('2021/05/20')
</script>
