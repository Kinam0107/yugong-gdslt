<template>
  <el-dialog v-model="dialogVisible" title="安全鉴定" width="1200" append-to-body>
    <div class="operate_box">
      <div class="filter_box">
        <el-select v-model="params.adcd" placeholder="行政区划" style="width: 240px" size="large" popper-class="transparent_pooper" @change="search">
          <el-option v-for="item in getOptions('XZQH')" :key="'adcd' + item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="params.projectScale" placeholder="工程规模" style="width: 240px" size="large" popper-class="transparent_pooper" clearable @change="search">
          <el-option v-for="item in getOptions('SKGM')" :key="'sacle' + item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="params.name" placeholder="请输入水库名称搜索" style="width: 240px" size="large" clearable @change="search">
          <template #suffix>
            <el-icon style="cursor: pointer" @click="search"><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="button_box">
        <el-button class="ghost_button" type="primary" size="large">导出</el-button>
      </div>
    </div>
    <div class="table_box">
      <el-table :data="tableData" style="width: 100%" :height="500" size="large" stripe>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="NAME" label="水库名称" align="center"></el-table-column>
        <el-table-column prop="countryADNM" label="乡镇/街道" align="center"></el-table-column>
        <el-table-column label="工程规模" align="center">
          <template #default="scope">{{ dataEcho('SKGM', scope.row.project_scale) }}</template>
        </el-table-column>
        <el-table-column label="安全鉴定(最近一次)" align="center">
          <el-table-column prop="satm" label="鉴定时间" align="center"></el-table-column>
          <el-table-column prop="saAppRst" label="鉴定结论" align="center"></el-table-column>
          <el-table-column prop="dueTm" label="到期时间" align="center"></el-table-column>
          <el-table-column prop="idtret" label="安全鉴定报告" align="center">
            <template #default="scope">
              <SvgIcon v-if="scope.row.idtret" :size="16" color="#46fdff" icon="viewFile" />
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, watch, ref } from 'vue'
import { dataEcho, getOptions } from '@/utils/enum'
import axios from '@/api/axios'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
watch(
  () => dialogVisible.value,
  (val) => {
    if (val) search()
  }
)
const params = reactive({
  fetchAll: true,
  adcd: '330782000000',
  projectScale: '',
  name: '',
  moduleType: '66'
})
const tableData = ref([])
const search = () => {
  axios
    .rscp({
      url: '/mgt/bm/reservoirMatrix/fourTube',
      method: 'post',
      data: params
    })
    .then((res) => {
      tableData.value = res.data.list || []
    })
    .catch(() => {
      tableData.value = []
    })
}
</script>

<style scoped lang="scss">
.operate_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .filter_box {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>
