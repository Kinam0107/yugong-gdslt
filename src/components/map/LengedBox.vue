<template>
  <div class="legend_box">
    <div class="legend_title">
      <span class="text">图例</span>
      <el-icon style="cursor: pointer" @click="toggle">
        <CaretBottom v-if="show" />
        <CaretTop v-else />
      </el-icon>
    </div>
    <div v-show="show" class="legend_content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
const toggle = () => {
  show.value = !show.value
}
</script>

<style scoped lang="scss">
.legend_box {
  border-radius: 2px;
  background: rgba(0, 15, 29, 0.8);
  border: 1px solid rgba(133, 243, 255, 0.3);
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
}
.legend_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 126px;
  height: 40px;
  padding: 0 20px 0 16px;
  background: linear-gradient(270deg, rgba(12, 61, 54, 0.0226) 16%, rgba(7, 157, 254, 0.4) 93%);
  .text {
    font-size: 16px;
  }
}
.legend_content {
  padding: 16px;
  :deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
    .el-checkbox__label {
      display: flex;
      align-items: center;
      > img {
        margin-bottom: -3px;
        margin-left: -5px;
        margin-right: 1px;
      }
      > span {
        font-size: 16px;
      }
    }
  }
  :deep(.el-radio-group) {
    display: flex;
    flex-direction: column;
    .el-radio__label {
      display: flex;
      align-items: center;
      > img {
        margin-bottom: -3px;
        margin-left: -5px;
        margin-right: 1px;
      }
      > span {
        font-size: 16px;
      }
    }
  }
}
</style>
