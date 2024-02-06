<template>
  <div class="descriptions_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <DescriptionsPlane desc="常见于详情页的信息展示。" />
      </AnchorItem>
      <AnchorItem label="基本样式">
        <DescriptionsPlane desc="文本样式，适用于字段较少且有限空间的详情展示">
          <TextDesc />
        </DescriptionsPlane>
        <DescriptionsPlane desc="表格样式，适用于字段较多且有足够空间的详情展示">
          <TableDesc />
        </DescriptionsPlane>
        <DescriptionsPlane desc="可折叠总分表单详情样式">
          <FoldableDetailDesc />
        </DescriptionsPlane>
        <DescriptionsPlane desc="可折叠总分表单填写样式">
          <FoldableFillingDesc />
        </DescriptionsPlane>
        <DescriptionsPlane desc="有完成状态时间轴样式">
          <TimelineWithStateDesc style="padding: 0 8px" />
        </DescriptionsPlane>
        <DescriptionsPlane desc="无完成状态时间轴样式">
          <TimelineDesc style="padding: 0 8px" />
        </DescriptionsPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import DescriptionsPlane from './cpns/DescriptionsPlane.vue'
import TextDesc from './TextDesc.vue'
import TableDesc from './TableDesc.vue'
import FoldableDetailDesc from './FoldableDetailDesc.vue'
import FoldableFillingDesc from './FoldableFillingDesc.vue'
import TimelineWithStateDesc from './TimelineWithStateDesc.vue'
import TimelineDesc from './TimelineDesc.vue'
</script>

<style scoped lang="scss">
.descriptions_view {
  @include mainContentContainer(100%);
}
</style>
