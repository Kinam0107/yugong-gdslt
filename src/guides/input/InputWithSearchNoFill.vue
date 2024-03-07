<template>
  <div class="label">搜索无填充</div>
  <el-input class="no-fill" v-model="input" placeholder="请输入关键词">
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.no-fill {
  :deep(.el-input-group__append) {
    background-color: transparent;
  }
}
</style>
