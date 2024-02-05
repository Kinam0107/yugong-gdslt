<template>
  <div class="label">输入错误提示</div>
  <el-form-item validate-status="error" error="输入错误时出现，并说明错误原因" label-width="0">
    <el-input v-model="input" placeholder="请输入"></el-input>
  </el-form-item>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('已完成输入')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
