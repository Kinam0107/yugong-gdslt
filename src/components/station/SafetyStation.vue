<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200" append-to-body>
    <div class="operating_area">
      <el-radio-group v-model="radio" @change="getMonitorData">
        <el-radio :label="1">近一天</el-radio>
        <el-radio :label="2">近一周</el-radio>
        <el-radio :label="3">自定义</el-radio>
      </el-radio-group>
      <div v-if="radio == 3" style="flex: 1; margin-left: 24px">
        <el-date-picker
          v-model="range"
          :clearable="false"
          type="datetimerange"
          start-placeholder="开始时间"
          range-separator="至"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          popper-class="transparent_pooper"
          @change="getMonitorData" />
      </div>
      <el-radio-group v-model="mode">
        <el-radio-button :label="1">图</el-radio-button>
        <el-radio-button :label="2">表</el-radio-button>
      </el-radio-group>
    </div>
    <div class="chart_data_area">
      <div class="chart_area" :style="{ visibility: mode == 2 ? 'hidden' : '' }">
        <SafetyLine ref="safetyLine" v-if="dialogVisible" :xAxisValue="xAxisValue" :data="monitorData" />
      </div>
      <div class="data_area" :style="{ visibility: mode == 1 ? 'hidden' : '' }">
        <el-table :data="tableData" style="width: 100%" :height="580" size="large" stripe>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="tongTime" label="时间" align="center"></el-table-column>
          <el-table-column prop="monitorType" label="检测类型" align="center"></el-table-column>
          <el-table-column prop="orvalue" label="监测值" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import SafetyLine from '@/components/chart/SafetyLine.vue'
import axios from '@/api/axios'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '安全监测'
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
const radio = ref(1)
const range = ref([new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd HH:mm:ss'), new Date().format('yyyy-MM-dd HH:mm:ss')])
const startTime = computed(() => {
  if (radio.value == 1) {
    return new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd HH:mm:ss')
  } else if (radio.value == 2) {
    return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd HH:mm:ss')
  } else {
    return range.value && range.value.length ? range.value[0] : ''
  }
})
const endTime = computed(() => {
  if (radio.value == 1) {
    return new Date().format('yyyy-MM-dd HH:mm:ss')
  } else if (radio.value == 2) {
    return new Date().format('yyyy-MM-dd HH:mm:ss')
  } else {
    return range.value && range.value.length ? range.value[1] : ''
  }
})
const mode = ref(1)
const safetyLine = ref()
const xAxisValue = ref([])
const monitorData = ref({
  监测值: []
})
const tableData = ref([])
watch(
  () => dialogVisible.value,
  (val) => {
    if (val) getMonitorData()
  }
)
const getMonitorData = () => {
  axios
    .yw({
      url: '/sa-mo-rd/page',
      method: 'get',
      params: {
        sensorId: props.id,
        startTime: startTime.value,
        endTime: endTime.value,
        fetchAll: true
      }
    })
    .then((res) => {
      const data = res.data.records || []
      xAxisValue.value = data.map((e) => e.tongTime.substring(5, 16))
      monitorData.value['监测值'] = data.map((e) => e.orvalue)
      tableData.value = data
    })
    .catch(() => {
      xAxisValue.value = []
      monitorData.value['监测值'] = []
      tableData.value = []
    })
    .finally(() => {
      nextTick(() => {
        safetyLine.value.initChart()
      })
    })
}
</script>

<style scoped lang="scss">
.operating_area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chart_data_area {
  position: relative;
  width: 100%;
  height: 600px;
  .chart_area {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .data_area {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
}
</style>
