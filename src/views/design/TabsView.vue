<template>
  <div class="tabs_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">一种轻量的方式来组织多个相同性质但又分别独立的内容；通常用于页面内某个模块中，方便用户在同一个模块内，快速切换多个内容，起导航的作用。</div>
    <div class="design_title">基础样式</div>
    <div class="desing_example">
      <div class="desing_subtitle">基本横向样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px; background-color: #fff">
        <TabBar v-model="tab1" :tabs="['已选中', '禁用', '未选中项1', '未选中项2']" :disabled="['禁用']" />
      </div>
      <div class="desing_subtitle">复合横向样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px; background-color: #fff">
        <div class="tabs_title">Crontab配置器</div>
        <TabBar v-model="tab2" :tabs="['接口列表', '使用指南']" />
      </div>
      <div class="desing_subtitle">卡片样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px">
        <TabBar v-model="tab3" :tabs="['已选中', '禁用', '未选中项1', '未选中项2']" :disabled="['禁用']" type="card" />
      </div>
      <div class="desing_subtitle">卡片可删除样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px">
        <TabBar v-model="tab6" v-model:tabs="tabs" type="card" operabled />
      </div>
      <div class="desing_subtitle">卡片可新增样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px">
        <TabBar v-model="tab6" v-model:tabs="tabs" type="card" operabled added />
      </div>
      <div class="desing_subtitle">填充样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px; border: none">
        <TabBar v-model="tab4" :tabs="['选中项', '禁用', '可选项', '较长的可选项']" :disabled="['禁用']" type="fill" />
      </div>
      <div class="desing_subtitle">无填充样式</div>
      <div class="tabs_wrapper" style="margin-bottom: 40px; border: none">
        <TabBar v-model="tab5" :tabs="['选中项', '禁用', '可选项', '较长的可选项']" :disabled="['禁用']" type="no-fill" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tab1 = ref('已选中')
const tab2 = ref('接口列表')
const tab3 = ref('已选中')
const tab4 = ref('选中项')
const tab5 = ref('选中项')
const tab6 = ref('已选中')
const tabs = ref(['已选中', '未选中项0', '未选中项1', '未选中项2'])
</script>

<style scoped lang="scss">
.tabs_view {
  @include designMainContentContainer();
}
.desing_example {
  background: #f8f9fb;
  padding: 40px;
}
.desing_subtitle {
  color: $color-prompttext;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 24px;
}
.tabs_wrapper {
  padding: 0 24px;
  border-bottom: 1px solid $color-separator;
  .tabs_title {
    color: $color-titletext;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding-top: 12px;
  }
}
</style>
