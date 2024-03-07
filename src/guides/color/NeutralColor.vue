<template>
  <ColorPlane desc="中性色包含了黑、白、灰，有层次的灰阶色调可以帮助用户提升阅读体验。">
    <ColorItem name="标题正文" :value="['#262626', '$color-titletext']"></ColorItem>
    <ColorItem name="说明文字" :value="['#595959', '$color-explaintext']"></ColorItem>
    <ColorItem name="提示文字" :value="['#8C8C8C', '$color-prompttext']"></ColorItem>
    <ColorItem name="提示或禁用" :value="['#BFBFBF', '$color-placeholdertext', '$color-disabletext']"></ColorItem>
    <ColorItem name="边框" :value="['#D9D9D9', '$color-border']"></ColorItem>
    <ColorItem name="分隔线" :value="['#F0F0F0', '$color-separator']"></ColorItem>
    <ColorItem name="浅灰背景" :value="['#F4F9F7', '$color-graybg']"></ColorItem>
    <ColorItem name="纯白背景" :value="['#FFFFFF', '$color-whitebg']"></ColorItem>
  </ColorPlane>
</template>

<script setup>
import ColorPlane from './cpns/ColorPlane.vue'
import ColorItem from './cpns/ColorItem.vue'
</script>
