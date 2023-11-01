<template>
  <el-button type="danger" :icon="StarFilled" style="padding: 8px"></el-button>
  <el-button :icon="StarFilled" style="padding: 8px"></el-button>
  <el-button type="primary" link :icon="StarFilled"></el-button>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
</script>
