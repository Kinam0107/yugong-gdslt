<template>
  <el-table :data="tableData" :span-method="spanMethod" style="width: 85%" border>
    <el-table-column prop="xmmc" label="项目名称" min-width="240px" />
    <el-table-column prop="zxmmc" label="子项目名称" min-width="240px" />
    <el-table-column prop="pfje" label="批复金额(万元)" align="right" width="120px" />
    <el-table-column label="数据来源" min-width="120px">
      <el-checkbox :model-value="true">粤省市</el-checkbox>
      <el-checkbox :model-value="true">粤政易</el-checkbox>
      <el-checkbox :model-value="false">大数据平台</el-checkbox>
    </el-table-column>
    <el-table-column label="操作" width="104px" header-align="right" align="left">
      <el-button size="small" link type="primary">编辑</el-button>
      <el-button size="small" link type="primary">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script setup>
const tableData = [
  { id: 1, xmmc: '省某某厅局应用平台开发项目', zxmmc: '省某某厅局应用平台开发子项目某某某', pfje: '3888.00' },
  { id: 2, xmmc: '省某某厅局应用平台开发项目', zxmmc: '省某某厅局应用平台开发子项目某某某', pfje: '1688.00' },
  { id: 3, xmmc: '省某某厅局应用平台开发项目', zxmmc: '省某某厅局应用平台开发子项目某某某', pfje: '1288.00' },
  { id: 4, xmmc: '省某某厅局应用平台开发项目', zxmmc: '省某某厅局应用平台开发子项目某某某', pfje: '1088.00' }
]

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 0 || columnIndex === 3) {
    return rowIndex % 2 === 0 ? [2, 1] : [0, 0]
  }
}
</script>

<style scoped lang="scss">
.xmlx_tag + .xmlx_tag {
  margin-left: $baseDistance;
}
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5 * $baseDistance;
  &.dot_0 {
    background-color: $color-warning;
  }
  &.dot_1 {
    background-color: $color-success;
  }
  &.dot_2 {
    background-color: $color-error;
  }
}
</style>
