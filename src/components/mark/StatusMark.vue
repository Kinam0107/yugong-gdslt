<template>
  <i :style="{ backgroundColor: props.iconColor }" />
  <slot></slot>
</template>

<script setup>
const props = defineProps(['iconColor'])
</script>

<style scoped lang="scss">
i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
