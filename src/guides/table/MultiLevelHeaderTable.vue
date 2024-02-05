<template>
  <el-table :data="tableData" :span-method="spanMethod" style="width: 100%" border>
    <el-table-column type="index" label="序号" width="53px" align="center" />
    <el-table-column prop="sf" label="省份" min-width="67px" />
    <el-table-column prop="ds" label="地市" min-width="67px" />
    <el-table-column label="三级医院情况" header-align="center">
      <el-table-column prop="sjyyzs" label="医院总数" min-width="81px" />
      <el-table-column prop="sjyysls" label="受理数" min-width="67px" />
      <el-table-column prop="sjyysll" label="受理率" min-width="67px" />
      <el-table-column label="较上月新增" min-width="95px">
        <template #default="scope">
          <span :style="{ color: scope.row.sjyyjsyxz.indexOf('↑') > -1 ? '#00B687' : '#F86220' }">{{ scope.row.sjyyjsyxz }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="二级医院情况" header-align="center">
      <el-table-column prop="ejyyzs" label="医院总数" min-width="81px" />
      <el-table-column prop="ejyysls" label="受理数" min-width="67px" />
      <el-table-column prop="ejyysll" label="受理率" min-width="67px" />
      <el-table-column label="较上月新增" min-width="95px">
        <template #default="scope">
          <span :style="{ color: scope.row.ejyyjsyxz.indexOf('↑') > -1 ? '#00B687' : '#F86220' }">{{ scope.row.ejyyjsyxz }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="基层卫生机构情况" header-align="center">
      <el-table-column prop="jcwsjgzs" label="机构总数" min-width="81px" />
      <el-table-column prop="jcwsjgsls" label="受理数" min-width="67px" />
      <el-table-column prop="jcwsjgsll" label="受理率" />
    </el-table-column>
  </el-table>
</template>

<script setup>
const tableData = [
  {
    id: 1,
    sf: '广东省',
    ds: '广州市',
    sjyyzs: 700,
    sjyysls: 600,
    sjyysll: '80%',
    sjyyjsyxz: '↑10%',
    ejyyzs: 700,
    ejyysls: 600,
    ejyysll: '80%',
    ejyyjsyxz: '↑10%',
    jcwsjgzs: 500,
    jcwsjgsls: 400,
    jcwsjgsll: '80%'
  },
  {
    id: 2,
    sf: '广东省',
    ds: '深圳市',
    sjyyzs: 700,
    sjyysls: 600,
    sjyysll: '80%',
    sjyyjsyxz: '↑10%',
    ejyyzs: 700,
    ejyysls: 600,
    ejyysll: '80%',
    ejyyjsyxz: '↑10%',
    jcwsjgzs: 500,
    jcwsjgsls: 400,
    jcwsjgsll: '80%'
  },
  {
    id: 3,
    sf: '广东省',
    ds: '佛山市',
    sjyyzs: 700,
    sjyysls: 600,
    sjyysll: '80%',
    sjyyjsyxz: '↑10%',
    ejyyzs: 700,
    ejyysls: 600,
    ejyysll: '80%',
    ejyyjsyxz: '↑10%',
    jcwsjgzs: 500,
    jcwsjgsls: 400,
    jcwsjgsll: '80%'
  },
  {
    id: 4,
    sf: '广东省',
    ds: '中山市',
    sjyyzs: 700,
    sjyysls: 600,
    sjyysll: '80%',
    sjyyjsyxz: '↑10%',
    ejyyzs: 700,
    ejyysls: 600,
    ejyysll: '80%',
    ejyyjsyxz: '↑10%',
    jcwsjgzs: 500,
    jcwsjgsls: 400,
    jcwsjgsll: '80%'
  },
  {
    id: 5,
    sf: '广东省',
    ds: '珠海市',
    sjyyzs: 700,
    sjyysls: 600,
    sjyysll: '80%',
    sjyyjsyxz: '↓10%',
    ejyyzs: 700,
    ejyysls: 600,
    ejyysll: '80%',
    ejyyjsyxz: '↓10%',
    jcwsjgzs: 500,
    jcwsjgsls: 400,
    jcwsjgsll: '80%'
  }
]

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 1) {
    return rowIndex === 0 ? [5, 1] : [0, 0]
  }
}
</script>
