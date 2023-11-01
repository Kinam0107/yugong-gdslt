<template>
  <el-button type="danger" :icon="StarFilled" style="padding: 8px" disabled></el-button>
  <el-button :icon="StarFilled" style="padding: 8px" disabled></el-button>
  <el-button type="primary" link :icon="StarFilled" disabled></el-button>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
</script>
