<template>
  <div class="endbar--layout">
    <div class="head--container">
      <PageHeader title tab>
        {{ route.meta.fatherTitle }}
        <template #tab><TabsMenu /></template>
      </PageHeader>
    </div>
    <div class="body--container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import TabsMenu from '@/components/menu/TabsMenu.vue'
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped lang="scss">
.endbar--layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .head--container {
    background-color: #fff;
  }
  .body--container {
    overflow: auto;
    flex: 1;
  }
}
</style>
