<template>
  <div class="layout_view">
    <AnchorBox active-label="左右布局">
      <AnchorItem label="左右布局">
        <LeftRightLayout />
      </AnchorItem>
      <AnchorItem label="上下布局">
        <TopBottomLayout />
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import LeftRightLayout from './LeftRightLayout.vue'
import TopBottomLayout from './TopBottomLayout.vue'
</script>

<style scoped lang="scss">
.layout_view {
  @include mainContentContainer(100%);
}
</style>
