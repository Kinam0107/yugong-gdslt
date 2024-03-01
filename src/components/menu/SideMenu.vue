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
  width: 30 * $baseDistance;
  height: 100%;
  border: none !important;
  ::v-deep(span) {
    color: $color-titletext;
    font-size: 14px;
    font-weight: 400;
  }
  ::v-deep(i) {
    color: $color-titletext;
  }
  ::v-deep(> li) {
    > span,
    > i,
    > .el-sub-menu__title > span,
    > .el-sub-menu__title > i {
      font-weight: 500;
    }
  }
  ::v-deep(.is-active:not(.is-opened)) {
    background: transparentize($color-primary, 0.9);
    box-shadow: 4px 0px 0px 0px $color-primary inset;
    .svg-icon {
      color: $color-primary;
    }
  }
  ::v-deep(svg + span) {
    margin-left: $baseDistance;
  }
  &.el-menu--collapse {
    width: 8 * $baseDistance;
    ::v-deep(.is-active) {
      > div > svg {
        color: $color-primary;
      }
    }
  }
}
.side_menu.is_dark {
  background-color: $color-titletext;
  ::v-deep(.el-menu) {
    background-color: $color-titletext;
  }
  ::v-deep(span) {
    color: white;
  }
  ::v-deep(i) {
    color: white;
  }
  ::v-deep(.is-active:not(.is-opened)) {
    background: $color-primary;
    box-shadow: none;
  }
  ::v-deep(svg + span) {
    margin-left: $baseDistance;
  }
  ::v-deep(svg) {
    color: white;
  }
  ::v-deep(.el-menu-item:hover) {
    background-color: transparentize($color-primary, 0.5);
  }
  ::v-deep(.el-sub-menu__title:hover) {
    background-color: transparentize($color-primary, 0.5);
  }
  &.el-menu--collapse {
    ::v-deep(.is-active) {
      > div > svg {
        color: white;
      }
    }
  }
}
</style>
