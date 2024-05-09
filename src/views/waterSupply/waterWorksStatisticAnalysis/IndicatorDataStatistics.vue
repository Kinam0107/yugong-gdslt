<template>
  <div class="content_wrapper">
    <div class="action_wrapper">
      <div class="function_bar">
        <export-out
          v-slot="{ disabled, exported }"
          url="/agricultural-water-center/waterSupplyAnalysis/fiveModernizationsAnalysisExport"
          :params="{ year: params.year, adcd: params.adcd, localCity: localCity.join(',') }"
          :name="`供水工程五化指标数据统计${new Date().format('_yy_MM_dd_HH_mm_ss')}`"
          largeAmount>
          <el-button v-permit:waterSupply:waterStationAnalysis:export :disabled="disabled" @click="exported">导出</el-button>
        </export-out>
      </div>
    </div>
    <div class="table_wrapper">
      <el-table
        ref="expandTable"
        v-loading="loading"
        :data="tableData"
        :max-height="580"
        border
        row-key="adcd"
        :expand-row-keys="[tableData[0]?.adcd ?? '']"
        lazy
        :load="load"
        :tree-props="{ children: 'nextLevelList', hasChildren: 'hasChildren' }"
        @expand-change="expandChange">
        <el-table-column type="index" label="序号" width="60" align="center" fixed />
        <el-table-column prop="adnm" label="行政区划" width="150"></el-table-column>
        <el-table-column prop="scaleProjectNum" label="规模化供水工程(宗)" min-width="155" align="right" header-align="left">
          <template #default="scope">{{ scope.row.scaleProjectNum?.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column prop="smallProjectNum" label="小型供水工程(宗)" min-width="140" align="right" header-align="left">
          <template #default="scope">{{ scope.row.smallProjectNum?.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column label="规模化覆盖人口比例" align="center">
          <el-table-column prop="scalePersonNum" label="覆盖人口(人)" width="110" align="right">
            <template #default="scope">{{ scope.row.scalePersonNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column label="比例(%)" width="80" align="right">
            <template #default="scope">
              <span>{{ Number((scope.row.scaleProjectRate * 100).toFixed(2)) + '%' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="标准化建设工程比例" align="center">
          <el-table-column prop="standardProjectNum" label="工程数量(宗)" width="110" align="right">
            <template #default="scope">{{ scope.row.standardProjectNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column label="比例(%)" width="80" align="right">
            <template #default="scope">
              <span>{{ Number((scope.row.standardProjectRate * 100).toFixed(2)) + '%' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="县域统管覆盖人口比例" align="center">
          <el-table-column prop="countyProjectNum" label="工程数量(宗)" width="110" align="right">
            <template #default="scope">{{ scope.row.countyProjectNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="countyPersonNum" label="覆盖人口(人)" width="110" align="right">
            <template #default="scope">{{ scope.row.countyPersonNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column label="比例(%)" width="80" align="right">
            <template #default="scope">
              <span>{{ Number((scope.row.countyPersonRate * 100).toFixed(2)) + '%' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="专业化管理工程比例" align="center">
          <el-table-column prop="majorProjectNum" label="工程数量(宗)" width="110" align="right">
            <template #default="scope">{{ scope.row.majorProjectNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column label="比例(%)" width="80" align="right">
            <template #default="scope">
              <span>{{ Number((scope.row.majorProjectRate * 100).toFixed(2)) + '%' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="智慧化服务人口比例" align="center">
          <el-table-column prop="wisdomPersonNum" label="覆盖人口(人)" width="110" align="right">
            <template #default="scope">{{ scope.row.wisdomPersonNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column label="比例(%)" width="80" align="right">
            <template #default="scope">
              <span>{{ Number((scope.row.wisdomPersonRate * 100).toFixed(2)) + '%' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import axios from '@/api/axios'

const props = defineProps({
  year: String,
  adcd: String
})
const expandTable = ref()
const tableData = ref([])
const loading = ref(false)
const localCity = ref([])
let resolveCity = {}
const params = computed(() => {
  return {
    year: props.year,
    adcd: props.adcd
  }
})
const search = (flag) => {
  loading.value = true
  if (flag) {
    if (localCity.value.length > 0) {
      tableData.value.map((i) => {
        if (i.nextLevelList && i.nextLevelList.length > 0) {
          i.nextLevelList
            .filter((e) => localCity.value.includes(e.adcd))
            .map((item) => {
              expandTable.value.toggleRowExpansion(item, false)
            })
        }
      })
      localCity.value = []
    }
    resolveCity = {}
  }
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/fiveModernizationsAnalysis',
    method: 'get',
    params: params.value
  })
    .then((res) => {
      delete res.data.hasChildren
      tableData.value = [res.data]
      if (localCity.value.length > 0) {
        localCity.value.map((i) => {
          load({ adcd: i }, null, resolveCity[i], true)
        })
      }
    })
    .finally(() => {
      loading.value = false
    })
}
watch(
  () => params.value,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    let flag
    if (!oldVal) {
      flag = false
    } else if (!newVal.adcd && !oldVal.adcd) {
      flag = false
    } else if (newVal.adcd && oldVal.adcd) {
      flag = newVal.adcd != oldVal.adcd
    } else {
      flag = true
    }
    search(flag)
  },
  { immediate: true }
)
const load = (tree, treeNode, resolve, flag) => {
  if (!flag) {
    localCity.value.push(tree.adcd)
    resolveCity[tree.adcd] = resolve
  }
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/fiveModernizationsAnalysis',
    method: 'get',
    params: { ...params.value, adcd: tree.adcd }
  }).then((res) => {
    resolve(res.data?.nextLevelList || [])
  })
}
const expandChange = (row, expanded) => {
  if (!expanded) {
    localCity.value = localCity.value.filter((i) => i != row.adcd)
    delete resolveCity[row.adcd]
  }
}
</script>

<style scoped lang="scss"></style>
