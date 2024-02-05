<template>
  <el-button type="primary" link :icon="StarFilled" loading>加载中</el-button>
  <el-button link :icon="StarFilled" loading>加载中</el-button>
  <el-button type="primary" link loading></el-button>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
</script>
