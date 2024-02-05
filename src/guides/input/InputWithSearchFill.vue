<template>
  <div class="label">搜索填充</div>
  <el-input class="fill" v-model="input" placeholder="请输入关键词">
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
.fill {
  ::v-deep(.el-input-group__append) {
    background-color: $color-primary;
    color: #ffffff;
    box-shadow: none;
  }
}
</style>
