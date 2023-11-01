<template>
  <ColorPlane desc="延续“河长制”LOGO配色，使用单色和渐变色，应用于主题背景、按钮、图标、可点击文字、强调信息等元素。">
    <ColorItem name="单色" :value="['#36B29E', '$color-primary']"></ColorItem>
    <ColorItem name="渐变色" :value="['#83B26B/#3D9CCC', '$color-gradient']"></ColorItem>
  </ColorPlane>
</template>

<script setup>
import ColorPlane from './cpns/ColorPlane.vue'
import ColorItem from './cpns/ColorItem.vue'
</script>
