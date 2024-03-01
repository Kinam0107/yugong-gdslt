<template>
  <div class="developing--layout">
    <div class="head--container" v-if="!route.meta.end">
      <PageHeader title>{{ route.meta.title }}</PageHeader>
    </div>
    <div class="body--container">{{ props.title }}页面正在开发中...</div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps(['title'])
</script>

<style scoped lang="scss">
.developing--layout {
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
