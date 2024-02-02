<template>
  <div>
    <div class="label">选择年份</div>
    <el-date-picker type="year" v-model="value" placeholder="请选择" clearable format="YYYY" value-format="YYYY" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('2025')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
