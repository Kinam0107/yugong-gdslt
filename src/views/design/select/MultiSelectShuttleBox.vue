<template>
  <div>
    <div class="label">多选穿梭框</div>
    <el-transfer v-model="value" :data="data" filterable filter-placeholder="请输入关键词" :titles="[`源列表${data.length}项`, `目标列表${value.length}项`]" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['选项二'])
const data = [
  { key: '选项一', label: '选项一' },
  { key: '选项二', label: '选项二' },
  { key: '选项三', label: '选项三' },
  { key: '选项四', label: '选项四' },
  { key: '选项五', label: '选项五' },
  { key: '选项六', label: '选项六' },
  { key: '选项七', label: '选项七' }
]
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.el-transfer {
  ::v-deep(.el-transfer__buttons) {
    padding: 0 20px;
    button {
      display: block;
      padding: 4px 8px;
      + button {
        margin: $baseDistance 0 0 0;
      }
    }
  }
}
</style>
