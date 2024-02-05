<template>
  <div class="list_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <ListPlane
          desc="列表页可以查看和处理大量的条目，常有导航至详情的作用。用户可在列表页对条目进行编辑、对比、新增、分析、下钻至条目完整详情页等操作，帮助用户更高效的查看、处理、查找条目。每条条目需要展示很多字段；用户在搜寻条目时有准确的查询范围时使用。当页面只有列表时，高度自适应浏览器高度；当页面有多个模块时，固定高度为506px，列表内加滚动条。" />
      </AnchorItem>
      <AnchorItem label="基础样式">
        <ListPlane desc="通用型列表（常用于数据列展示较少，列间距为等距分布）">
          <UniversalList />
        </ListPlane>
        <ListPlane desc="操作列固定型列表（常用于数据展示列较多，列间距为48px）">
          <FixedOperationList />
        </ListPlane>
      </AnchorItem>
      <AnchorItem label="复合样式">
        <ListPlane desc="可多选类列表">
          <MultipleChoiceList />
        </ListPlane>
        <ListPlane desc="可折叠展开类列表">
          <CollapseExpandList />
        </ListPlane>
        <ListPlane desc="可折叠展开且多选类列表">
          <CollapseExpandMultipleChoiceList />
        </ListPlane>
        <ListPlane desc="任务事项类列表">
          <TaskItemsList />
        </ListPlane>
        <ListPlane desc="资讯公告类列表">
          <InfoAnnouncementList />
        </ListPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ListPlane from './cpns/ListPlane.vue'
import UniversalList from './UniversalList.vue'
import FixedOperationList from './FixedOperationList.vue'
import MultipleChoiceList from './MultipleChoiceList.vue'
import CollapseExpandList from './CollapseExpandList.vue'
import CollapseExpandMultipleChoiceList from './CollapseExpandMultipleChoiceList.vue'
import TaskItemsList from './TaskItemsList.vue'
import InfoAnnouncementList from './InfoAnnouncementList.vue'
</script>

<style scoped lang="scss">
.list_view {
  @include mainContentContainer(100%);
}
</style>
