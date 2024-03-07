<!-- 侧边菜单 -->
<template>
  <el-menu :class="[{ is_dark: dark }, 'side_menu']" :collapse="props.collapse" :default-active="defaultActive" @select="handleSelect">
    <template v-for="item in menuData.children" :key="item.name">
      <SideMenuRecursion :menuData="item" :hiddenIcon="props.hiddenIcon" :collapse="props.collapse" />
    </template>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SideMenuRecursion from './SideMenuRecursion.vue'

const props = defineProps({
  hiddenIcon: {
    type: Boolean,
    default: false
  },
  collapse: {
    type: Boolean,
    default: true
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const router = useRouter()

const defaultActive = computed(() => {
  return route.meta.end || route.name
})
const menuData = computed(() => {
  return router.getRoutes().find((e) => e.name === route.meta.mark)
})

function handleSelect(name) {
  router.push({ name: name })
}
</script>

<style scoped lang="scss">
.side_menu {
  width: 32 * $baseDistance;
  height: 100%;
  border: none !important;
  :deep(span) {
    color: $color-titletext;
    font-size: 14px;
    font-weight: 400;
  }
  :deep(i) {
    color: $color-titletext;
  }
  :deep(> li) {
    > span,
    > i,
    > .el-sub-menu__title > span,
    > .el-sub-menu__title > i {
      font-weight: 500;
    }
  }
  :deep(.is-active:not(.is-opened)) {
    background: transparentize($color-primary, 0.9);
    box-shadow: -4px 0px 0px 0px $color-primary inset;
  }
  :deep(svg + span) {
    margin-left: $baseDistance;
  }
  &.el-menu--collapse {
    width: 8 * $baseDistance;
    :deep(.is-active) {
      > div > svg {
        color: $color-primary;
      }
    }
  }
}
.side_menu.is_dark {
  background-color: $color-titletext;
  :deep(.el-menu) {
    background-color: $color-titletext;
  }
  :deep(span) {
    color: white;
  }
  :deep(i) {
    color: white;
  }
  :deep(.is-active:not(.is-opened)) {
    background: $color-primary;
    box-shadow: none;
  }
  :deep(svg + span) {
    margin-left: $baseDistance;
  }
  :deep(svg) {
    color: white;
  }
  :deep(.el-menu-item:hover) {
    background-color: transparentize($color-primary, 0.5);
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: transparentize($color-primary, 0.5);
  }
  &.el-menu--collapse {
    :deep(.is-active) {
      > div > svg {
        color: white;
      }
    }
  }
}
</style>
