<template>
  <div class="page_header_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。</div>
    <div class="design_example">
      <div class="title">无返回样式</div>
      <div class="content">
        <PageHeader title>页面标题</PageHeader>
      </div>
      <div class="title">带返回和操作按钮样式</div>
      <div class="content">
        <PageHeader title back @click="back">
          页面标题
          <template #btn>
            <el-button plain>次按钮</el-button>
            <el-button type="primary">主按钮</el-button>
          </template>
        </PageHeader>
      </div>
      <div class="title">带面包屑样式</div>
      <div class="content">
        <PageHeader crumb title back>
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
      </div>
      <div class="title">带面包屑-无标题样式</div>
      <div class="content">
        <PageHeader crumb>
          <template #crumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>一级页面</el-breadcrumb-item>
              <el-breadcrumb-item>二级页面</el-breadcrumb-item>
              <el-breadcrumb-item>三级页面</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
        </PageHeader>
      </div>
      <div class="title">带面包屑-小标题样式</div>
      <div class="content">
        <PageHeader crumb title small back>
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
      </div>
      <div class="title">带选项卡样式</div>
      <div class="content">
        <PageHeader title back tab>
          页面标题
          <template #btn>
            <el-button plain>次按钮</el-button>
            <el-button type="primary">主按钮</el-button>
          </template>
          <template #tab>
            <TabsMenu
              :menuList="[
                { name: 'pageHeader', title: '选项1' },
                { name: 'menu', title: '选项2' },
                { name: 'tabs', title: '选项3' }
              ]"></TabsMenu>
          </template>
        </PageHeader>
      </div>
    </div>
  </div>
</template>

<script setup>
import TabsMenu from '@/components/menu/TabsMenu.vue'

function back() {
  alert('返回')
}
</script>

<style scoped lang="scss">
.page_header_view {
  @include designMainContentContainer();
}
.design_example {
  margin-top: 80px;
  background: #f8f9fb;
  padding: 40px;
  .title {
    color: $color-prompttext;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    margin-bottom: 24px;
  }
  .content {
    background-color: #fff;
    margin-bottom: 80px;
  }
}
</style>
