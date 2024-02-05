<template>
  <div class="icon_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <IconPlane desc="一般用于网页各类型内容示意；使用简单的抽象图形向使用者反映直观操作功能，快捷传达信息，表意明确，便于记忆。" />
      </AnchorItem>
      <AnchorItem label="基本用法">
        <BasicUsage />
      </AnchorItem>
      <AnchorItem label="icon尺寸">
        <IconSize />
      </AnchorItem>
      <AnchorItem label="keyline">
        <KeyLine />
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import IconPlane from './cpns/IconPlane.vue'
import BasicUsage from './BasicUsage.vue'
import IconSize from './IconSize.vue'
import KeyLine from './KeyLine.vue'
</script>

<style scoped lang="scss">
.icon_view {
  @include mainContentContainer(100%);
}
</style>
