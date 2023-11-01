<template>
  <el-button type="danger" :icon="StarFilled" style="padding: 8px" loading></el-button>
  <el-button :icon="StarFilled" style="padding: 8px" loading></el-button>
  <el-button type="primary" link :icon="StarFilled" loading></el-button>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
</script>
