<template>
  <div v-if="isOnlineSvg" :style="{ '--svg-icon-url': `url(${icon})` }" class="svg-icon svg-icon-online" :class="className" />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  // 图标大小
  size: {
    type: Number,
    default: 24
  },
  // 图标颜色
  color: {
    type: String,
    default: '#262626'
  }
})

const fontSize = computed(() => props.size + 'px')
const iconColor = computed(() => props.color)

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))
</script>

<style scoped lang="scss">
.svg-icon {
  overflow: hidden;
  color: v-bind(iconColor);
  fill: currentColor;
  font-size: v-bind(fontSize);
  width: 1em;
  height: 1em;
}

.svg-icon-online {
  color: v-bind(iconColor);
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
