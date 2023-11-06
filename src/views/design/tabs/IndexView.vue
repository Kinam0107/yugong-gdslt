<template>
  <div class="tabs_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <TabsPlane desc="一种轻量的方式来组织多个相同性质但又分别独立的内容；通常用于页面内某个模块中，方便用户在同一个模块内，快速切换多个内容，起导航的作用。" :hasExp="false" />
      </AnchorItem>
      <AnchorItem label="基础样式"></AnchorItem>
      <AnchorItem label="基本横向样式" :level="2">
        <TabsPlane>
          <div style="background-color: #fff">
            <TabBar v-model="tab1" :tabs="['已选中', '禁用', '未选中项1', '未选中项2']" :disabled="['禁用']" />
          </div>
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="复合横向样式" :level="2">
        <TabsPlane>
          <div style="background-color: #fff">
            <div class="tabs_title">Crontab配置器</div>
            <TabBar v-model="tab2" :tabs="['接口列表', '使用指南']" />
          </div>
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="卡片样式" :level="2">
        <TabsPlane>
          <div style="border-bottom: 1px solid #f0f0f0">
            <TabBar v-model="tab3" :tabs="['已选中', '禁用', '未选中项1', '未选中项2']" :disabled="['禁用']" type="card" />
          </div>
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="卡片可删除样式" :level="2">
        <TabsPlane>
          <div style="border-bottom: 1px solid #f0f0f0">
            <TabBar v-model="tab4" v-model:tabs="tabs" type="card" deletable />
          </div>
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="卡片可删除样式" :level="2">
        <TabsPlane>
          <div style="border-bottom: 1px solid #f0f0f0">
            <TabBar v-model="tab4" v-model:tabs="tabs" type="card" deletable added />
          </div>
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="填充样式" :level="2">
        <TabsPlane>
          <TabBar v-model="tab5" :tabs="['选中项', '禁用', '可选项', '较长的可选项']" :disabled="['禁用']" type="fill" />
        </TabsPlane>
      </AnchorItem>
      <AnchorItem label="无填充样式" :level="2">
        <TabsPlane>
          <TabBar v-model="tab6" :tabs="['选中项', '禁用', '可选项', '较长的可选项']" :disabled="['禁用']" type="no-fill" />
        </TabsPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import TabsPlane from './cpns/TabsPlane.vue'
import { ref } from 'vue'

const tabs = ref(['已选中', '未选中项0', '未选中项1', '未选中项2'])
const tab1 = ref('已选中')
const tab2 = ref('接口列表')
const tab3 = ref('已选中')
const tab4 = ref('已选中')
const tab5 = ref('选中项')
const tab6 = ref('选中项')
</script>

<style scoped lang="scss">
.tabs_view {
  @include mainContentContainer(100%);
}
.tabs_title {
  color: $color-titletext;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding-top: 12px;
}
</style>
