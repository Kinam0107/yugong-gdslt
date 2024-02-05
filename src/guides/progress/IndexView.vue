<template>
  <div class="progress_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <ProgressPlane desc="在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。" />
      </AnchorItem>
      <AnchorItem label="基础样式">
        <div style="display: flex; gap: 48px">
          <div class="item" style="flex: 1">
            <div class="item_label">常规尺寸</div>
            <el-progress :percentage="70" :stroke-width="8" />
            <el-progress :percentage="70" :stroke-width="8" status="exception" />
            <el-progress :percentage="100" :stroke-width="8" status="success" />
          </div>
          <div class="item" style="flex: 1">
            <div class="item_label">小尺寸</div>
            <el-progress :percentage="70" :stroke-width="4" />
            <el-progress :percentage="70" :stroke-width="4" status="exception" />
            <el-progress :percentage="100" :stroke-width="4" status="success" />
          </div>
          <div class="item" style="flex: 1">
            <div class="item_label">极小尺寸</div>
            <el-progress :percentage="70" :stroke-width="2" />
            <el-progress :percentage="70" :stroke-width="2" status="exception" />
            <el-progress :percentage="100" :stroke-width="2" status="success" />
          </div>
        </div>
        <div style="margin-top: 24px">
          <div class="item_label">进度圈</div>
          <el-progress type="circle" :percentage="70" color="#36b29e" />
          <el-progress type="circle" :percentage="70" status="exception" />
          <el-progress type="circle" :percentage="100" status="success" />
        </div>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ProgressPlane from './cpns/ProgressPlane.vue'
</script>

<style scoped lang="scss">
.progress_view {
  @include mainContentContainer(100%);
  .item {
    div {
      + div {
        margin-top: 3 * $baseDistance;
      }
    }
  }
  .item_label {
    @include fontCategory(3);
    color: $color-prompttext;
  }
  .el-progress--circle + .el-progress--circle {
    margin-left: 48px;
    margin-top: 24px;
  }
}
</style>
