<template>
  <div class="label">输入区域可调整</div>
  <el-input v-model="input" type="textarea" placeholder="请输入" show-word-limit :rows="5"></el-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
