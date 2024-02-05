<template>
  <div class="label">带金额单位后缀</div>
  <el-input v-model="input" placeholder="请输入">
    <template #append>万元</template>
  </el-input>
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
