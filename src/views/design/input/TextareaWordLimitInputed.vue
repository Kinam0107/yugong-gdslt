<template>
  <div class="label">字数限制提示（已输入）</div>
  <el-input v-model="input" type="textarea" placeholder="请输入" show-word-limit :maxlength="100" :rows="5" resize="none"></el-input>
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
