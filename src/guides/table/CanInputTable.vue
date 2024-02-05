<template>
  <el-table :data="tableData" style="width: 85%" border>
    <el-table-column type="index" label="序号" width="53px" align="center"></el-table-column>
    <el-table-column label="项目名称">
      <template #default="scope">
        <el-input v-model="scope.row.xmmc"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="申报单位">
      <template #default="scope">
        <el-input v-model="scope.row.sbdw"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="负责人">
      <template #default="scope">
        <el-input v-model="scope.row.fzr"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="194px" header-align="right" align="left">
      <template #default="scope">
        <el-button size="small" link :type="scope.$index === 0 ? '' : 'primary'" :disabled="scope.$index === 0" @click="moveUp(scope)">上移</el-button>
        <el-button size="small" link :type="scope.$index === tableDataLength - 1 ? '' : 'primary'" :disabled="scope.$index === tableDataLength - 1" @click="moveDown(scope)">下移</el-button>
        <el-button size="small" link type="primary" @click="add(scope)">新增</el-button>
        <el-button size="small" link type="primary" @click="remove(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, reactive } from 'vue'
const tableData = reactive([
  { id: 1, xmmc: '省某某厅局应用平台开发项目1', sbdw: '省某某厅局', fzr: '张小峰' },
  { id: 2, xmmc: '省某某厅局应用平台开发项目2', sbdw: '省某某厅局', fzr: '张小峰' },
  { id: 3, xmmc: '省某某厅局应用平台开发项目3', sbdw: '省某某厅局', fzr: '张小峰' },
  { id: 4, xmmc: '省某某厅局应用平台开发项目4', sbdw: '省某某厅局', fzr: '张小峰' },
  { id: 5, xmmc: '省某某厅局应用平台开发项目5', sbdw: '省某某厅局', fzr: '张小峰' }
])
const tableDataLength = computed(() => {
  return tableData.length
})

const moveUp = (val) => {
  const i = val.$index
  const temp = tableData[i - 1]
  tableData[i - 1] = tableData[i]
  tableData[i] = temp
}
const moveDown = (val) => {
  const i = val.$index
  const temp = tableData[i + 1]
  tableData[i + 1] = tableData[i]
  tableData[i] = temp
}
const add = (val) => {
  const i = val.$index
  tableData.splice(i + 1, 0, { xmmc: '新增', sbdw: '', fzr: '' })
}
const remove = (val) => {
  const i = val.$index
  tableData.splice(i, 1)
}
</script>
