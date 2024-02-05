<template>
  <div class="color_block_wrapper">
    <div class="color_block" :class="[props.name === '渐变色' ? 'color_bgi' : 'color_bgc']"></div>
    <div class="color_description">
      <div class="color_name">{{ props.name }}</div>
      <div v-for="item in value" :key="item" class="color_value">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: String,
  value: Array
})
const color = computed(() => props.value[0])
const colors1 = computed(() => props.value[0].split('/')[0])
const colors2 = computed(() => props.value[0].split('/')[1])
</script>

<style scoped lang="scss">
.color_block_wrapper {
  display: flex;
  gap: 2 * $baseDistance;
  width: 285px;
  .color_block {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 1px solid $color-border;
    &.color_bgc {
      background-color: v-bind(color);
    }
    &.color_bgi {
      background-image: linear-gradient(90deg, v-bind(colors1) 0%, v-bind(colors2) 100%);
    }
  }
  .color_description {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 96px;
    .color_name {
      color: #000;
      @include fontCategory(1);
    }
    .color_value {
      color: $color-explaintext;
      @include fontCategory();
    }
  }
}
</style>
