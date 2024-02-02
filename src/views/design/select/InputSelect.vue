<template>
  <div>
    <div class="label">输入下拉选择（带相同字段弹窗）</div>
    <el-select filterable v-model="value" placeholder="请选择" style="width: 100%">
      <el-option label="选项一" value="选项一"></el-option>
      <el-option label="选项二" value="选项二"></el-option>
      <el-option label="选项三" value="选项三"></el-option>
      <el-option label="选项四" value="选项四"></el-option>
      <el-option label="选项五" value="选项五"></el-option>
      <el-option label="选项六" value="选项六"></el-option>
      <el-option label="选项七" value="选项七"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('选项二')
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
</style>
