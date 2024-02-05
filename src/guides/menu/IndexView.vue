<template>
  <div class="menu_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <MenuPlane desc="导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。" />
      </AnchorItem>
      <AnchorItem label="顶部导航">
        <TopNavigation />
      </AnchorItem>
      <AnchorItem label="侧边导航">
        <MenuPlane desc="侧边导航垂直菜单，子菜单内嵌在菜单区域，宽为8n。" />
      </AnchorItem>
      <AnchorItem label="浅色背景带图标样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="浅色背景无图标样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav hiddenIcon /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="浅色背景左右折叠样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="浅色背景折叠样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav :expandFlag="false" /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="深色背景带图标样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav dark /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="深色背景无图标样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav dark hiddenIcon /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="深色背景左右折叠样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav dark /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="深色背景折叠样式" :level="2">
        <MenuPlane>
          <div class="container"><SideNav dark :expandFlag="false" /></div>
        </MenuPlane>
      </AnchorItem>
      <AnchorItem label="树结构">
        <MenuPlane
          desc="通过逐级大纲的形式来展现信息的层级关系，高效且具有极佳的视觉可视性，使得整体信息框架一目了然。用户可同时浏览与处理多个树状层级的内容。适用于任何需要通过层级组织的信息场景，如文件夹、组织架构、生物分类、国家地区等等。" />
      </AnchorItem>
      <AnchorItem label="树导航样式" :level="2">
        <div class="container2"><TreeNavigation /></div>
      </AnchorItem>
      <AnchorItem label="树导航带状态样式" :level="2">
        <div class="container2"><TreeNavigationWithStatus /></div>
      </AnchorItem>
      <AnchorItem label="树导航可编辑样式" :level="2">
        <div class="container2"><TreeNavigationWithEditable /></div>
      </AnchorItem>
      <AnchorItem label="树导航可多选样式" :level="2">
        <div class="container2"><TreeNavigationWithMultipleChoices /></div>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import MenuPlane from './cpns/MenuPlane.vue'
import TopNavigation from './TopNavigation.vue'
import SideNav from '@/components/nav/SideNav.vue'
import TreeNavigation from './TreeNavigation.vue'
import TreeNavigationWithStatus from './TreeNavigationWithStatus.vue'
import TreeNavigationWithEditable from './TreeNavigationEditable.vue'
import TreeNavigationWithMultipleChoices from './TreeNavigationWithMultipleChoices.vue'
</script>

<style scoped lang="scss">
.menu_view {
  @include mainContentContainer(100%);
}
.container {
  position: relative;
  display: inline-block;
  height: 700px;
  margin-left: 8px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
}
.container2 {
  overflow: auto;
  width: 320px;
  height: 500px;
  margin-left: 8px;
}
</style>
