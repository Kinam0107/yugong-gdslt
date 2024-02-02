<template>
  <div class="label">输入提示</div>
  <el-form-item label-width="0">
    <el-input v-model="input" placeholder="请输入"></el-input>
  </el-form-item>
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
