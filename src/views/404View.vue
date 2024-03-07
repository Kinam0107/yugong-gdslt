<template>
  <div class="page404_container">
    <div class="head--contanier">
      <TopNav show-datetime show-config show-notice>
        <template #systemIcon>
          <img src="@/assets/images/login/system-icon.png" width="30" />
        </template>
        <TopMenu />
      </TopNav>
    </div>
    <div class="body--container">
      <ExceptionPageLayout title="404" sub-title="这是一段很长的信息说明提示文案" />
    </div>
  </div>
</template>

<script setup>
import TopNav from '@/components/nav/TopNav.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
import ExceptionPageLayout from '@/components/layout/ExceptionPageLayout.vue'
</script>

<style scoped lang="scss">
$headHight: 7 * $baseDistance;
.page404_container {
  width: 100%;
  height: 100%;
}
.head--contanier {
  height: $headHight;
}
.body--container {
  position: relative;
  overflow: auto;
  height: calc(100% - $headHight);
  background-color: $color-graybg;
}
</style>
