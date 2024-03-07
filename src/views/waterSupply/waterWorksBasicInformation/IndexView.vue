<template>
  <div class="content_wrapper">
    <div class="action_wrapper">
      <div class="function_bar">
        <el-button type="primary" @click="add()">新增</el-button>
        <el-button>导出</el-button>
        <el-button>模板</el-button>
        <el-button>导入</el-button>
      </div>
      <div class="filter_bar">
        <label>名录年份：</label>
        <el-date-picker style="width: 160px" v-model="params.year" type="year" placeholder="全部" format="YYYY" value-format="YYYY" @change="search()" />
        <label>行政区划：</label>
        <admn-select style="width: 160px" v-model="params.adcd" placeholder="全部" clearable @change="search()" />
        <label>工程规模：</label>
        <el-select style="width: 160px" v-model="params.scale" placeholder="全部" clearable @change="search()">
          <el-option v-for="item in getOptions('GSGCGM')" :key="'GSGCGM' + item.value" :label="item.label" :value="item.value" />
        </el-select>
        <label></label>
        <el-input style="width: 200px" v-model="params.keyword" placeholder="请输入关键词" @change="search()">
          <template #append><el-button :icon="Search" @click="search()" /></template>
        </el-input>
      </div>
    </div>
    <div class="table_wrapper" ref="tableWrapper">
      <el-table :data="tableData" :max-height="tableMaxHeight" border @sort-change="sortChange">
        <el-table-column type="index" label="序号" width="60" align="center" fixed />
        <el-table-column prop="xzqh" label="行政区划" width="120" />
        <el-table-column prop="gcmc" label="工程名称" min-width="300" />
        <el-table-column prop="gcgm" label="工程规模" min-width="140">
          <template #default="scope">{{ dataEcho('GSGCGM', scope.row.gcgm) }}</template>
        </el-table-column>
        <el-table-column prop="sjrgsgm" label="设计日供水规模(m³/D)" min-width="200" align="right" sortable="custom" />
        <el-table-column prop="tysj" label="投运时间" min-width="110" sortable="custom" />
        <el-table-column prop="yxzt" label="运行状态" min-width="90">
          <template #default="scope">
            <i :style="{ backgroundColor: ['#f13939', '#28ce8e'][scope.row.yxzt] }" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 10px"></i>
            {{ ['异常', '正常'][scope.row.yxzt] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" header-align="right" align="left" fixed="right">
          <template #default="scope">
            <el-button size="small" link type="primary" @click="desc(scope.row.id)">查看</el-button>
            <el-button size="small" link type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="small" link type="primary">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <TablePagination v-model:currentPage="params.currentPage" v-model:pageSize="params.pageSize" :total="tableTotal" @change="search()" />
    </div>
  </div>
  <div class="mask_layer_under_form" v-if="showAddForm">
    <AddPage @back="back" />
  </div>
  <div class="mask_layer_under_form" v-if="showEditForm">
    <EditPage :id="formId" @back="back" />
  </div>
  <div class="mask_layer_under_form" v-if="showDescForm">
    <DescPage :id="formId" @back="back" @edit="edit" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { dataEcho, getOptions } from '@/utils/enum'
import AddPage from './AddPage.vue'
import EditPage from './EditPage.vue'
import DescPage from './DescPage.vue'

onMounted(() => {
  search()
  getTableMaxHeight()
})

const params = reactive({
  year: new Date().format('yyyy'),
  adcd: undefined,
  scale: undefined,
  keyword: undefined,
  currentPage: 1,
  pageSize: 10,
  order: undefined,
  sort: undefined
})
const tableTotal = ref(0)
const tableData = ref([])
const sortChange = ({ prop, order }) => {
  params.order = order ? (order === 'ascending' ? 'asc' : 'desc') : undefined
  params.sort = order ? prop : undefined
  search()
}
const search = () => {
  console.log('serach params:', params)
  tableData.value = [
    { id: '1', xzqh: '肇庆市 高要区', gcmc: '清湾水厂', gcgm: '1', sjrgsgm: '50000', tysj: '2023-09-01', yxzt: '1' },
    { id: '2', xzqh: '肇庆市', gcmc: '23', gcgm: '1', sjrgsgm: '34', tysj: '2023-10-25', yxzt: '1' },
    { id: '3', xzqh: '广州市 白云区', gcmc: '白云区城市供水管网延伸工程', gcgm: '1', sjrgsgm: '600000', tysj: '2019-02-01', yxzt: '1' }
  ]
  tableTotal.value = 3
}

const tableWrapper = ref()
const tableMaxHeight = ref()
const getTableMaxHeight = () => {
  tableMaxHeight.value = tableWrapper.value.clientHeight - 48
}

const showAddForm = ref(false)
const showEditForm = ref(false)
const showDescForm = ref(false)
const formId = ref()
const back = () => {
  showAddForm.value = false
  showEditForm.value = false
  showDescForm.value = false
  formId.value = null
}
const add = () => {
  showAddForm.value = true
  showEditForm.value = false
  showDescForm.value = false
}
const edit = (id) => {
  formId.value = id
  showEditForm.value = true
  showAddForm.value = false
  showDescForm.value = false
}
const desc = (id) => {
  formId.value = id
  showDescForm.value = true
  showAddForm.value = false
  showEditForm.value = false
}
</script>

<style scoped lang="scss">
.content_wrapper {
  @include mainContentContainer(100%);
}
.mask_layer_under_form {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-graybg;
  z-index: 999;
}
</style>
