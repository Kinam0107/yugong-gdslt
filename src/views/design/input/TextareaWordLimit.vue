<template>
  <div class="label">字数限制提示</div>
  <el-input v-model="input" type="textarea" placeholder="请输入" show-word-limit :maxlength="100" :rows="5" resize="none"></el-input>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
