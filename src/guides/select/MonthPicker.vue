<template>
  <div>
    <div class="label">选择月份</div>
    <el-date-picker type="month" v-model="value" placeholder="请选择" clearable format="YYYY/MM" value-format="YYYY/MM" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('2021/07')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
