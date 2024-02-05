<template>
  <el-button type="primary" link :icon="StarFilled" disabled>按钮</el-button>
  <el-button link :icon="StarFilled" disabled>按钮</el-button>
  <el-button type="primary" link disabled>按钮</el-button>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
</script>
