<template>
  <div class="color_view">
    <AnchorBox active-label="颜色介绍">
      <AnchorItem label="颜色介绍">
        <ColorPlane desc="颜色是指UI界面设计中使用的色彩体系，我们定义了：主题色、辅助色、中性色三部分色彩，以及衍生出的UI调色板。可用于创建反应您的品牌或风格的颜色主题。"></ColorPlane>
      </AnchorItem>
      <AnchorItem label="主题色">
        <ThemeColor />
      </AnchorItem>
      <AnchorItem label="辅助色">
        <AuxiliaryColor />
      </AnchorItem>
      <AnchorItem label="中性色">
        <NeutralColor />
      </AnchorItem>
      <AnchorItem label="适老化色彩选择">
        <AdaptiveAgingColor />
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ColorPlane from './cpns/ColorPlane.vue'
import ThemeColor from './ThemeColor.vue'
import AuxiliaryColor from './AuxiliaryColor.vue'
import NeutralColor from './NeutralColor.vue'
import AdaptiveAgingColor from './AdaptiveAgingColor.vue'
</script>

<style scoped lang="scss">
.color_view {
  @include mainContentContainer(100%);
}
</style>
