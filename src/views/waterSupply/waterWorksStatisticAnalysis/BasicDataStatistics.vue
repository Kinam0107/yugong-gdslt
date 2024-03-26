<template>
  <div class="content_wrapper">
    <div class="action_wrapper">
      <div class="function_bar">
        <export-out
          v-slot="{ disabled, exported }"
          url="/agricultural-water-center/waterSupplyAnalysis/basicDataStatisticsExport"
          :params="{ year: params.year, adcd: params.adcd, scale: params.scale, localCity: localCity.join(',') }"
          :name="`供水工程基本数据统计${new Date().format('_yy_MM_dd_HH_mm_ss')}`"
          largeAmount>
          <el-button v-permit:waterSupply:waterStationAnalysis:export :disabled="disabled" @click="exported">导出</el-button>
        </export-out>
      </div>
      <div class="filter_bar">
        <label>工程规模：</label>
        <el-select style="width: 160px" v-model="scale" placeholder="全部" clearable>
          <el-option v-for="item in getOptions('GSGCGM')" :key="'GSGCGM' + item.value" :label="item.label" :value="item.value" />
        </el-select>
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
        <el-table-column prop="projectNum" label="供水工程(宗)" min-width="105" align="right" header-align="left">
          <template #default="scope">{{ scope.row.projectNum?.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column label="工程规模" header-align="center">
          <el-table-column prop="scale1" label="城市管网延伸工程(宗)" min-width="160" align="right" header-align="left">
            <template #default="scope">{{ scope.row.scale1?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="scale2" label="千吨万人工程(宗)" min-width="135" align="right" header-align="left">
            <template #default="scope">{{ scope.row.scale2?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="scale3" label="千人工程(宗)" min-width="105" align="right" header-align="left">
            <template #default="scope">{{ scope.row.scale3?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="scale4" label="千人以下工程(宗)" min-width="135" align="right" header-align="left">
            <template #default="scope">{{ scope.row.scale4?.toLocaleString() }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="供水情况" header-align="center">
          <el-table-column prop="personNum" label="供水人口(人)" min-width="105" align="right" header-align="left">
            <template #default="scope">{{ scope.row.personNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="houseNum" label="供水户数(户)" min-width="105" align="right" header-align="left">
            <template #default="scope">{{ scope.row.houseNum?.toLocaleString() }}</template>
          </el-table-column>
          <el-table-column prop="villageNum" label="覆盖自然村(条)" min-width="120" align="right" header-align="left">
            <template #default="scope">{{ scope.row.villageNum?.toLocaleString() }}</template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getOptions } from '@/utils/enum'
import axios from '@/api/axios/base'

const props = defineProps({
  year: String,
  adcd: String
})
const scale = ref()
const expandTable = ref()
const tableData = ref([])
const loading = ref(false)
const localCity = ref([])
let resolveCity = {}
const params = computed(() => {
  return {
    year: props.year,
    adcd: props.adcd,
    scale: scale.value
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
    url: '/agricultural-water-center/waterSupplyAnalysis/basicDataStatistics',
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
    url: '/agricultural-water-center/waterSupplyAnalysis/basicDataStatistics',
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
