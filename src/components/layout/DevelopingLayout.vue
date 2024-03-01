<template>
  <div class="developing--layout">
    <div class="head--container" v-if="!route.meta.end">
      <PageHeader title>{{ route.meta.title }}</PageHeader>
    </div>
    <div class="body--container">
      <ExceptionPageLayout icon="noData" :title="props.title + '页面正在开发中...'" />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import ExceptionPageLayout from '@/components/layout/ExceptionPageLayout.vue'
const route = useRoute()
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
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
