<template>
  <div class="single_project--layout">
    <div class="head--container">
      <PageHeader back crumb @click="back">
        <template #crumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="cursor: pointer" @click="back">{{ jumpInfo.projectName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </PageHeader>
    </div>
    <div class="body--container">
      <div class="left_menu--wrapper">
        <SideMenu :collapse="false" />
      </div>
      <div class="right_content--wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import SideMenu from '../menu/SideMenu.vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { localData } from '@/utils/storage'

const jumpInfo = reactive(localData.get('JumpInformation'))
const route = useRoute()
const router = useRouter()
const back = () => {
  router.push(jumpInfo.routePath)
}
</script>

<style scoped lang="scss">
.single_project--layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .body--container {
    display: flex;
    overflow: hidden;
    flex: 1;
    margin: 0 3 * $baseDistance 3 * $baseDistance 3 * $baseDistance;
    background-color: #fff;
    border-top-left-radius: $baseDistance;
    border-bottom-left-radius: $baseDistance;
    .left_menu--wrapper {
      overflow: auto;
      height: 100%;
      border-right: 1px solid $color-separator;
    }
    .right_content--wrapper {
      overflow: auto;
      flex: 1;
      height: 100%;
    }
  }
}
</style>
