<template>
  <el-date-picker size="small" type="date" v-model="value" placeholder="请选择" clearable format="YYYY/MM/DD" value-format="YYYY/MM/DD" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
