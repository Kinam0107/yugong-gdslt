<template>
  <el-dialog v-model="dialogVisible" title="村级水务员资金支撑" width="1200" append-to-body>
    <el-table :data="tableData" style="width: 100%" :height="500" size="large" stripe>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="street" label="镇街" align="center"></el-table-column>
      <el-table-column prop="smallOne" label="小(一)型水库(座)" align="center"></el-table-column>
      <el-table-column prop="smallTwo" label="小(二)型水库(座)" align="center"></el-table-column>
      <el-table-column prop="moutainPond" label="山塘(座)" align="center"></el-table-column>
      <el-table-column prop="riverLine" label="县级以上河道长度(公里)" align="center"></el-table-column>
      <el-table-column prop="positionsNumber" label="配备职数" align="center"></el-table-column>
      <el-table-column prop="yearCost" label="每人每年费用(万元)" align="center"></el-table-column>
      <el-table-column prop="citySupportRate" label="市级支持比例" align="center"></el-table-column>
      <el-table-column prop="citySupport" label="市级支持(万元)" align="center"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
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
const tableData = ref([])
const search = () => {
  axios
    .yw({
      url: '/water-fund-support/page',
      method: 'get'
    })
    .then((res) => {
      const dataObj = res.data || {}
      tableData.value = dataObj.outVOS || []
      delete dataObj.outVOS
      tableData.value.push({
        ...dataObj,
        street: '合计'
      })
    })
    .catch(() => {
      tableData.value = []
    })
}
</script>

<style scoped lang="scss"></style>
