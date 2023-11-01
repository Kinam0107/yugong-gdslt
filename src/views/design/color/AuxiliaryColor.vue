<template>
  <ColorPlane desc="辅助色包含了绿、红、橙三种，分别代表了成功、失败和警告的状态，提高用户对场景状态的阅读理解。">
    <ColorItem name="成功状态" :value="['#28CE8E', '$color-success']"></ColorItem>
    <ColorItem name="失败状态" :value="['#F13939', '$color-error']"></ColorItem>
    <ColorItem name="警告状态" :value="['#FAAD10', '$color-warning']"></ColorItem>
  </ColorPlane>
</template>

<script setup>
import ColorPlane from './cpns/ColorPlane.vue'
import ColorItem from './cpns/ColorItem.vue'
</script>
