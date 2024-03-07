<template>
  <div class="label">带筛选项搜索</div>
  <el-input class="fill" v-model="input" placeholder="请输入关键词">
    <template #prepend>
      <el-select style="width: 80px" v-model="select" placeholder="筛选">
        <el-option label="Restaurant" value="1" />
        <el-option label="Order No." value="2" />
        <el-option label="Tel" value="3" />
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const select = ref('')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.fill {
  :deep(.el-input-group__append) {
    background-color: $color-primary;
    color: #ffffff;
    box-shadow: none;
  }
}
</style>
