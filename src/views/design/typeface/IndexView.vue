<template>
  <div class="typeface_view">
    <AnchorBox active-label="字体家族">
      <AnchorItem label="字体家族">
        <FontFamily />
      </AnchorItem>
      <AnchorItem label="行宽/行长">
        <TypefacePlane
          desc="行宽/行长：是指一行字的长度。计算行宽的简单方法，使用Robert Bringhurst的方法：行宽=字号x30。如果定义网站的基础字号为14px，那么最适宜基础行宽为：14(字号)x30=420px(行宽)。较适宜的宽度为40-70个字符。" />
      </AnchorItem>
      <AnchorItem label="字体大小">
        <FontSize />
      </AnchorItem>
      <AnchorItem label="字体样式">
        <FontStyle />
      </AnchorItem>
      <AnchorItem label="适老化字体大小">
        <AdaptiveAgingFontSize />
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import TypefacePlane from './cpns/TypefacePlane.vue'
import FontFamily from './FontFamily.vue'
import FontSize from './FontSize.vue'
import FontStyle from './FontStyle.vue'
import AdaptiveAgingFontSize from './AdaptiveAgingFontSize.vue'
</script>

<style scoped lang="scss">
.typeface_view {
  @include mainContentContainer(100%);
}
</style>
