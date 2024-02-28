<template>
  <el-table :data="tableData" style="width: 85%" border>
    <el-table-column prop="xmmc" label="项目名称" min-width="240px" />
    <el-table-column prop="xmlx" label="项目类型" min-width="140px">
      <template #default="scope">
        <el-tag class="xmlx_tag" size="small" v-for="item in scope.row.xmlx" :key="scope.row.id + item">{{ item }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="xmzq" label="项目周期" width="200px" />
    <el-table-column prop="pfje" label="批复金额(万元)" align="right" width="120px" />
    <el-table-column prop="zt" label="状态" min-width="100px">
      <template #default="scope">
        <i class="dot" :class="'dot_' + scope.row.zt"></i>
        {{ ['待完成', '已完成', '已超时'][scope.row.zt] }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="104px" header-align="right" align="left">
      <el-button size="small" link type="primary">编辑</el-button>
      <el-button size="small" link type="primary">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script setup>
const tableData = [
  { id: 1, xmmc: '省某某厅局应用平台开发项目', xmlx: ['基础', '软件'], xmzq: '2020-08-25至2021-05-20', pfje: '3888.00', zt: 0 },
  { id: 2, xmmc: '省某某厅局应用平台开发项目', xmlx: ['基础', '软件'], xmzq: '2020-08-25至2021-05-20', pfje: '1688.00', zt: 0 },
  { id: 3, xmmc: '省某某厅局应用平台开发项目', xmlx: ['基础', '软件'], xmzq: '2020-08-25至2021-05-20', pfje: '1288.00', zt: 1 },
  { id: 4, xmmc: '省某某厅局应用平台开发项目', xmlx: ['基础', '软件'], xmzq: '2020-08-25至2021-05-20', pfje: '1088.00', zt: 1 },
  { id: 5, xmmc: '省某某厅局应用平台开发项目', xmlx: ['基础', '软件'], xmzq: '2020-08-25至2021-05-20', pfje: '888.00', zt: 2 }
]
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
