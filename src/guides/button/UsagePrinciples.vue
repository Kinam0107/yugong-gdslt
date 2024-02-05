<template>
  <div class="design_description" style="position: relative; height: 300px; padding-left: 450px">
    <p>按钮样式的使用应从三个角度去考虑</p>
    <br />
    <p>1. 空间感</p>
    <p>- 当空间有限时，因遵循节省空间的理念使用按钮样式</p>
    <p>2. 辨识度</p>
    <p>- 需要增强或者弱化按钮的视觉吸引力时候，可考虑在按钮内增加图标或图标按钮</p>
    <p>3. 协调性</p>
    <p>- 在同一界面下，按钮样式需要进行统一</p>
    <p>- 界面空闲空间过多时，可以考虑在按钮内增加图标使得整体视觉效果更舒适</p>
    <div class="design_chart">
      <div class="x_axis">占用空间</div>
      <div class="y_axis">辨识度</div>
      <el-button class="low" :icon="Plus"></el-button>
      <el-button class="medium">按钮</el-button>
      <el-button class="high" :icon="Plus">按钮</el-button>
    </div>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.design_description {
  position: relative;
  height: 300px;
  padding-left: 450px;
  p {
    @include fontCategory();
  }
}
.design_chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 300px;
  border-left: 2px solid $color-prompttext;
  border-bottom: 2px solid $color-prompttext;
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -6px;
    width: 0;
    height: 0;
    border-bottom: 10px solid $color-prompttext;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    right: -3px;
    bottom: -6px;
    width: 0;
    height: 0;
    border-left: 10px solid $color-prompttext;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .x_axis {
    position: absolute;
    right: 0;
    bottom: 10px;
    @include fontCategory(3);
  }
  .y_axis {
    position: absolute;
    top: 0;
    left: 10px;
    @include fontCategory(3);
  }
  .low {
    position: absolute;
    left: 25%;
    top: 75%;
    transform: translate(-50%, -50%);
  }
  .medium {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .high {
    position: absolute;
    left: 75%;
    top: 25%;
    transform: translate(-50%, -50%);
  }
}
</style>
