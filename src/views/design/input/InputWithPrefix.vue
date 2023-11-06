<template>
  <div class="label">带网站前缀</div>
  <el-input v-model="input" placeholder="请输入">
    <template #prepend>http://</template>
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
