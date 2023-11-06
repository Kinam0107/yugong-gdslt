<template>
  <MenuPlane desc="顶部导航高为8n（48px＜8n＜88px）。">
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" show-notice show-quit></TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="primary" show-notice show-quit>
        <TopMenu selected-style="deepbackground" />
      </TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="gradient" show-notice show-quit>
        <TopMenu />
      </TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="white" show-notice show-quit></TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" show-notice></TopNav>
    </div>
  </MenuPlane>
</template>

<script setup>
import MenuPlane from './cpns/MenuPlane.vue'
import TopNav from '@/components/nav/TopNav.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
</script>

<style scoped lang="scss">
.design_example {
  height: 7 * $baseDistance;
  margin-top: 5 * $baseDistance;
}
</style>
