<!-- 末级菜单 -->
<template>
  <ul class="tabs_menu">
    <RouterLink v-for="item in props.menuList || menuData.children" :key="item.name" :to="{ name: item.name }" custom v-slot="{ isActive, navigate }">
      <li :class="{ active: isActive }" @click="navigate" role="link">{{ item.meta.title }}</li>
    </RouterLink>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const props = defineProps({
  menuList: {
    type: Array
  }
})

const route = useRoute()
const router = useRouter()

const menuData = computed(() => {
  return router.getRoutes().find((e) => e.name === route.meta.end)
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
