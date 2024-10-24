<!-- 基础布局 -->
<template>
  <div class="base--layout">
    <div class="head--contanier">
      <TopNav>
        <template #systemIcon>
          <img src="@/assets/images/logo.png" width="39" />
        </template>
        <TopMenu selectedStyle="deepbackground" />
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
$headHight: 10 * $baseDistance;
.base--layout {
  height: 100%;
}
.head--contanier {
  height: $headHight;
}
.body--container {
  position: relative;
  overflow: auto;
  height: calc(100% - $headHight);
  background-color: #e8ecf3;
}
</style>
