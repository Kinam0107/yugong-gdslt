<template>
  <div class="table_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <TablePlane
          desc="常和排序、搜索、筛选、分页等其他界面元素一起协同，适用于信息的收集和展示、数据的分析和归纳整理、以及操作结构化数据。它结构简单，分隔归纳明确，使信息之间更易于对比，大大提升了用户对信息的接收效率和理解程度。" />
      </AnchorItem>
      <AnchorItem label="基础样式">
        <TablePlane desc="带操作类样式">
          <OperationTable />
        </TablePlane>
        <TablePlane desc="只读类样式">
          <ReadOnlyTable />
        </TablePlane>
      </AnchorItem>
      <AnchorItem label="复合样式">
        <TablePlane desc="多选类样式">
          <MultipleChoiceTable />
        </TablePlane>
        <TablePlane desc="表格内可输入且上下移动单元格样式">
          <CanInputTable />
        </TablePlane>
        <TablePlane desc="表格内多层级展示">
          <CellMergeTable />
        </TablePlane>
        <TablePlane desc="表头多层级展示">
          <MultiLevelHeaderTable />
        </TablePlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import TablePlane from './cpns/TablePlane.vue'
import OperationTable from './OperationTable.vue'
import ReadOnlyTable from './ReadOnlyTable.vue'
import MultipleChoiceTable from './MultipleChoiceTable.vue'
import CanInputTable from './CanInputTable.vue'
import CellMergeTable from './CellMergeTable.vue'
import MultiLevelHeaderTable from './MultiLevelHeaderTable.vue'
</script>

<style scoped lang="scss">
.table_view {
  @include mainContentContainer(100%);
}
</style>
