<template>
  <div class="menu_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">
      导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
    </div>
    <div class="design_title">顶部导航</div>
    <div class="design_description">顶部导航高为8n（48px＜8n＜88px）。</div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" show-notice show-quit></TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="primary" show-notice show-quit>
        <TopMenu selected-style="deepbackground" />
      </TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="gradient" show-notice show-quit>
        <TopMenu />
      </TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" bg-type="white" show-notice show-quit></TopNav>
    </div>
    <div class="design_example">
      <TopNav system-name="广东省某某某平台应用管理系统" show-notice></TopNav>
    </div>
    <div class="design_title" style="margin-top: 80px">侧边导航</div>
    <div class="design_description">侧边导航垂直菜单，子菜单内嵌在菜单区域，宽为8n。</div>
    <div class="side_menu">
      <div class="menu_item">
        <div class="subtitle">浅色背景带图标样式（优先）</div>
        <div class="container">
          <SideNav />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">浅色背景无图标样式</div>
        <div class="container">
          <SideNav hiddenIcon />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">浅色背景左右折叠样式</div>
        <div class="container">
          <SideNav />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">浅色背景折叠样式</div>
        <div class="container">
          <SideNav :expandFlag="false" />
        </div>
      </div>
    </div>
    <div class="side_menu">
      <div class="menu_item">
        <div class="subtitle">深色背景带图标样式（优先）</div>
        <div class="container">
          <SideNav dark />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">深色背景无图标样式</div>
        <div class="container">
          <SideNav dark hiddenIcon />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">深色背景左右折叠样式</div>
        <div class="container">
          <SideNav dark />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">深色背景折叠样式</div>
        <div class="container">
          <SideNav dark :expandFlag="false" />
        </div>
      </div>
    </div>
    <div class="design_title" style="margin-top: 80px">树结构</div>
    <div class="design_description">
      通过逐级大纲的形式来展现信息的层级关系，高效且具有极佳的视觉可视性，使得整体信息框架一目了然。用户可同时浏览与处理多个树状层级的内容。适用于任何需要通过层级组织的信息场景，如文件夹、组织架构、生物分类、国家地区等等。
    </div>
    <div class="side_example" style="flex-wrap: wrap; background-color: #f8f9fb; padding-top: 40px">
      <div class="menu_item">
        <div class="subtitle">锚点样式</div>
        <div class="container" style="width: 320px; padding: 20px">
          <AnchorBox activeLabel="">
            <AnchorItem label="1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus corporis, consectetur hic non nihil, odit ullam harum at vero, dolore ratione quis. Illo mollitia laudantium nam
              exercitationem, libero tempore eum!
            </AnchorItem>
            <AnchorItem label="2" :level="1"></AnchorItem>
            <AnchorItem label="2-1" :level="2"></AnchorItem>
            <AnchorItem label="2-2" :level="2"></AnchorItem>
            <AnchorItem label="3" :level="1"></AnchorItem>
          </AnchorBox>
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">树导航样式</div>
        <div class="container" style="width: 320px; padding: 20px">
          <el-input v-model="input" placeholder="请输入关键字" style="margin-bottom: 4px">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all />
        </div>
      </div>
      <div class="menu_item">
        <div class="subtitle">树导航带状态样式</div>
        <div class="container" style="width: 320px; padding: 20px">
          <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all>
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <template v-if="data.status === 'success'">
                  <el-icon :size="16" color="#28CE8E">
                    <SuccessFilled />
                  </el-icon>
                </template>
                <template v-else-if="data.status === 'warning'">
                  <el-icon :size="16" color="#FAAD10">
                    <WarningFilled />
                  </el-icon>
                </template>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <div class="menu_item">
        <div class="container" style="width: 320px; padding: 20px">
          <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all>
            <template #default="{ node, data }">
              <span class="custom-tree-node1">
                <span class="node-content">
                  <span>{{ node.label }}</span>
                  <span class="tips">{{ data.tips }}</span>
                </span>
                <template v-if="data.tips">
                  <SvgIcon :size="16" icon="edit" />
                </template>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <div class="menu_item">
        <div class="container" style="width: 320px; padding: 20px">
          <el-input v-model="input" placeholder="请输入关键字" style="margin-bottom: 4px">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all show-checkbox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TopNav from '@/components/nav/TopNav.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
import SideNav from '@/components/nav/SideNav.vue'
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import { Search, SuccessFilled, WarningFilled } from '@element-plus/icons-vue'

const input = ref('')
const data = reactive([
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            status: 'success',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            status: 'warning',
            tips: '0000000000000',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
])
const defaultProps = reactive({
  children: 'children',
  label: 'label'
})
</script>

<style scoped lang="scss">
.menu_view {
  @include designMainContentContainer();
}
.design_example {
  height: 7 * $baseDistance;
  margin-top: 40px;
}
.side_menu,
.side_example {
  display: flex;
  padding: 20px;
  margin-top: 40px;
  gap: 80px;
  .menu_item {
    position: relative;
  }
  .subtitle {
    position: absolute;
    top: -30px;
    color: $color-info;
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 40px;
    white-space: nowrap;
  }
  .container {
    position: relative;
    background: #fff;
    box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
    height: 700px;
  }
}
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-right: 3 * $baseDistance;
}
.custom-tree-node1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-right: 3 * $baseDistance;
  height: 52px;
  .node-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .tips {
      color: $color-prompttext;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
