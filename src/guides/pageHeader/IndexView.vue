<template>
  <div class="page_header_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <PageHeaderPlane desc="当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。" :hasExp="false" />
      </AnchorItem>
      <AnchorItem label="无返回样式" :level="2">
        <PageHeaderPlane>
          <PageHeader title>页面标题</PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
      <AnchorItem label="带返回和操作按钮样式" :level="2">
        <PageHeaderPlane>
          <PageHeader title back @click="back">
            页面标题
            <template #btn>
              <el-button plain>次按钮</el-button>
              <el-button type="primary">主按钮</el-button>
            </template>
          </PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
      <AnchorItem label="带面包屑样式" :level="2">
        <PageHeaderPlane>
          <PageHeader crumb title back @click="back">
            <template #crumb>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>一级页面</el-breadcrumb-item>
                <el-breadcrumb-item>二级页面</el-breadcrumb-item>
                <el-breadcrumb-item>三级页面</el-breadcrumb-item>
              </el-breadcrumb>
            </template>
            页面标题
            <template #btn>
              <el-button plain>次按钮</el-button>
              <el-button type="primary">主按钮</el-button>
            </template>
          </PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
      <AnchorItem label="带面包屑-无标题样式" :level="2">
        <PageHeaderPlane>
          <PageHeader crumb>
            <template #crumb>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>一级页面</el-breadcrumb-item>
                <el-breadcrumb-item>二级页面</el-breadcrumb-item>
                <el-breadcrumb-item>三级页面</el-breadcrumb-item>
              </el-breadcrumb>
            </template>
          </PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
      <AnchorItem label="带面包屑-小标题样式" :level="2">
        <PageHeaderPlane>
          <PageHeader crumb title small back @click="back">
            <template #crumb>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>一级页面</el-breadcrumb-item>
                <el-breadcrumb-item>二级页面</el-breadcrumb-item>
                <el-breadcrumb-item>三级页面</el-breadcrumb-item>
              </el-breadcrumb>
            </template>
            页面标题
            <template #btn>
              <el-button plain>次按钮</el-button>
              <el-button type="primary">主按钮</el-button>
            </template>
          </PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
      <AnchorItem label="带选项卡样式" :level="2">
        <PageHeaderPlane>
          <PageHeader title back tab>
            页面标题
            <template #btn>
              <el-button plain>次按钮</el-button>
              <el-button type="primary">主按钮</el-button>
            </template>
            <template #tab>
              <TabsMenu
                :menuList="[
                  { name: 'specification_navigation_menu', meta: { title: '菜单' } },
                  { name: 'specification_navigation_pageHeader', meta: { title: '页头' } },
                  { name: 'specification_navigation_tabs', meta: { title: '标签页' } }
                ]"></TabsMenu>
            </template>
          </PageHeader>
        </PageHeaderPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import PageHeaderPlane from './cpns/PageHeaderPlane.vue'
import TabsMenu from '@/components/menu/TabsMenu.vue'

function back() {
  alert('返回')
}
</script>

<style scoped lang="scss">
.page_header_view {
  @include mainContentContainer(100%);
}
</style>
