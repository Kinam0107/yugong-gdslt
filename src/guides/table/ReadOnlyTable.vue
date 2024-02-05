<template>
  <el-table :data="tableData" style="width: 85%" border>
    <el-table-column prop="xmmc" label="项目名称" min-width="240px" />
    <el-table-column prop="xmbh" label="项目编号" min-width="120px" />
    <el-table-column label="申报单位" min-width="120px">省某某厅局</el-table-column>
    <el-table-column prop="xmzq" label="项目周期" width="200px" />
    <el-table-column prop="pfje" label="批复金额(万元)" align="right" width="120px" />
    <el-table-column label="负责人" min-width="80px">张三</el-table-column>
    <el-table-column prop="zt" label="项目阶段" min-width="120px">
      <template #default="scope">
        {{ ['方案初审', '专家审核', '立项批复', '项目备案'][scope.row.zt] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const tableData = [
  { id: 1, xmmc: '省某某厅局应用平台开发项目', xmbh: '2020081458', xmzq: '2020-08-25至2021-05-20', pfje: '3888.00', zt: 0 },
  { id: 2, xmmc: '省某某厅局应用平台开发项目', xmbh: '2020081458', xmzq: '2020-08-25至2021-05-20', pfje: '1688.00', zt: 0 },
  { id: 3, xmmc: '省某某厅局应用平台开发项目', xmbh: '2020081458', xmzq: '2020-08-25至2021-05-20', pfje: '1288.00', zt: 1 },
  { id: 4, xmmc: '省某某厅局应用平台开发项目', xmbh: '2020081458', xmzq: '2020-08-25至2021-05-20', pfje: '1088.00', zt: 2 },
  { id: 5, xmmc: '省某某厅局应用平台开发项目', xmbh: '2020081458', xmzq: '2020-08-25至2021-05-20', pfje: '888.00', zt: 3 }
]
</script>
