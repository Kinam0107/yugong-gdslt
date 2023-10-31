<template>
  <el-sub-menu v-if="props.menuData.children?.length > 0" :index="props.menuData.name">
    <template #title>
      <SvgIcon v-if="iconDispaly" :size="16" :icon="props.menuData.meta.icon" />
      <span>{{ menuData.meta?.title || '-' }}</span>
    </template>
    <template v-for="item in props.menuData.children" :key="item.name">
      <SideMenuRecursion :menuData="item" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="props.menuData.name">
    <SvgIcon v-if="iconDispaly" :size="16" :icon="props.menuData.meta.icon" />
    <template #title>
      <span>{{ menuData.meta?.title || '-' }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'
import SideMenuRecursion from './SideMenuRecursion.vue'
const props = defineProps({
  menuData: {
    type: Object,
    required: true
  },
  hiddenIcon: {
    type: Boolean,
    default: false
  },
  collapse: {
    type: Boolean,
    default: true
  }
})
const iconDispaly = computed(() => {
  if (!props.menuData.meta.icon) {
    return false
  } else {
    if (!props.hiddenIcon) {
      return true
    } else {
      if (props.collapse) {
        return true
      } else {
        return false
      }
    }
  }
})
</script>

<style scoped lang="scss"></style>
