<!-- 侧边菜单栏布局 -->
<template>
  <div class="sidebar--layout">
    <div class="left--container">
      <SideNav />
    </div>
    <div class="right_main--container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import SideNav from '@/components/nav/SideNav.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.sidebar--layout {
  display: flex;
  height: 100%;
}
.left--container {
  position: relative;
  background-color: $color-whitebg;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
  border-right: 1px solid $color-separator;
}
.right_main--container {
  position: relative;
  overflow: auto;
  flex: 1;
  height: 100%;
}
</style>
