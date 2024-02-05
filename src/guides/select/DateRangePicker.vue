<template>
  <div>
    <div class="label">选择日期区间</div>
    <el-date-picker type="daterange" v-model="value" start-placeholder="起始日期" end-placeholder="结束日期" clearable format="YYYY/MM/DD" value-format="YYYY/MM/DD" range-separator="→" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['2021/05/20', '2021/06/08'])
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
