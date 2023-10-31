<!-- 基础布局 -->
<template>
  <div class="base--layout">
    <div class="head--contanier">
      <TopNav show-datetime show-config show-notice>
        <template #systemIcon>
          <img src="@/assets/images/login/system-icon.png" width="30" />
        </template>
        <TopMenu />
      </TopNav>
    </div>
    <div class="body--container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TopNav from '@/components/nav/TopNav.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
</script>

<style scoped lang="scss">
$headHight: 7 * $baseDistance;
.base--layout {
  height: 100%;
}
.head--contanier {
  height: $headHight;
}
.body--container {
  overflow: auto;
  height: calc(100% - $headHight);
  background-color: $color-garybg;
}
</style>
