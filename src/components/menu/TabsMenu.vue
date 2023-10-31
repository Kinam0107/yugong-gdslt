<!-- 顶部菜单 -->
<template>
  <ul class="tabs_menu">
    <RouterLink v-for="item in props.menuList" :key="item.name" :to="{ name: item.name }" custom v-slot="{ isActive, navigate }">
      <li :class="{ active: isActive }" @click="navigate" role="link">{{ item.title }}</li>
    </RouterLink>
  </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.tabs_menu {
  display: flex;
  gap: 4 * $baseDistance;
  li {
    line-height: 3 * $baseDistance;
    font-size: 14px;
    color: $color-titletext;
    padding-bottom: 12px;
    cursor: pointer;
    &.active {
      color: $color-primary;
      border-bottom: 4px solid $color-primary;
    }
  }
}
</style>
