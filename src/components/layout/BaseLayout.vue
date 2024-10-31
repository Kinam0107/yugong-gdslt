<!-- 基础布局 -->
<template>
  <div class="base--layout">
    <div class="head--contanier" v-if="!isEmbedded">
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
import { computed, ref } from 'vue';
const isEmbedded = ref(window.top !== window.self)
const headHight = computed(() => {
  return isEmbedded.value ? '0px' : '80px'
})
</script>

<style scoped lang="scss">
$headHight: v-bind(headHight);

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
