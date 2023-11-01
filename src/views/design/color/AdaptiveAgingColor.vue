<template>
  <ColorPlane desc="画面采用多种饱和度较高的颜色，而不是单色；颜色的丰富程度决定了画面的视觉表达，色彩越丰富，画面表现越好。">
    <ColorItem name="蓝色" :value="['#165DFF']"></ColorItem>
    <ColorItem name="绿色" :value="['#28CE8E']"></ColorItem>
    <ColorItem name="橙红色" :value="['#F86220']"></ColorItem>
    <ColorItem name="黄色" :value="['#FFAB00']"></ColorItem>
  </ColorPlane>
</template>

<script setup>
import ColorPlane from './cpns/ColorPlane.vue'
import ColorItem from './cpns/ColorItem.vue'
</script>
