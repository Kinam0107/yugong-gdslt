<template>
  <div>
    <div class="label">选择日期+时间区间</div>
    <el-date-picker
      type="datetimerange"
      v-model="value"
      start-placeholder="请选择开始时间"
      end-placeholder="请选择结束日期"
      clearable
      format="YYYY/MM/DD HH:mm:ss"
      value-format="YYYY/MM/DD HH:mm:ss"
      range-separator="→" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['2021/05/20 00:00:00', '2021/06/08 00:00:00'])
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
