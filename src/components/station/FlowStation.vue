<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200" append-to-body>
    <div class="operating_area">
      <el-radio-group v-model="radio" @change="getFlowData">
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
          @change="getFlowData" />
      </div>
      <el-radio-group v-model="mode">
        <el-radio-button :label="1">图</el-radio-button>
        <el-radio-button :label="2">表</el-radio-button>
      </el-radio-group>
    </div>
    <div class="chart_data_area">
      <div class="chart_area" :style="{ visibility: mode == 2 ? 'hidden' : '' }">
        <div class="chart_box">
          <WaterLevelLine ref="flowLine" v-if="dialogVisible" :xAxisValue="xAxisValue" yAxisUnit="m³/s" :data="flowData" />
        </div>
        <div class="extra_box">
          <div class="item">
            <span class="label">最高水位：</span>
            <span class="value">{{ extremeValue.max }}m</span>
            <span class="time">({{ extremeValue.maxTm }})</span>
          </div>
          <div class="item">
            <span class="label">最低水位：</span>
            <span class="value">{{ extremeValue.min }}m</span>
            <span class="time">({{ extremeValue.minTm }})</span>
          </div>
        </div>
      </div>
      <div class="data_area" :style="{ visibility: mode == 1 ? 'hidden' : '' }">
        <el-table :data="tableData" style="width: 100%" :height="580" size="large" stripe>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="tm" label="时间" align="center"></el-table-column>
          <el-table-column prop="rz" label="流量(m³/s)" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick, reactive } from 'vue'
import WaterLevelLine from '@/components/chart/WaterLevelLine.vue'
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
    default: '流量站'
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
const flowLine = ref()
const xAxisValue = ref([])
const flowData = ref({
  流量: []
})
const extremeValue = reactive({
  max: '',
  maxTm: ''
})
const tableData = ref([])
watch(
  () => dialogVisible.value,
  (val) => {
    if (val) getFlowData()
  }
)
const getFlowData = () => {
  axios
    .yw({
      url: '/rsvr-r/findDataList',
      method: 'get',
      params: {
        stcd: props.id,
        startTime: startTime.value,
        endTime: endTime.value
      }
    })
    .then((res) => {
      const data = res.data || []
      let temp = {
        xa: [],
        ll: [],
        max: '',
        maxTm: ''
      }
      data.forEach((e) => {
        temp.xa.push(e.tm.substring(5, 16))
        temp.ll.push(e.rz)
        if (temp.max) {
          if (temp.max < e.rz) {
            temp.max = e.rz
            temp.maxTm = e.tm.substring(5, 16)
          }
        } else {
          temp.max = e.rz
          temp.maxTm = e.tm.substring(5, 16)
        }
      })
      extremeValue.max = temp.max
      extremeValue.maxTm = temp.maxTm
      xAxisValue.value = temp.xa
      flowData.value['流量'] = temp.ll
      tableData.value = data
    })
    .catch(() => {
      extremeValue.max = '-'
      extremeValue.maxTm = '-'
      xAxisValue.value = []
      flowData.value['流量'] = []
      tableData.value = []
    })
    .finally(() => {
      nextTick(() => {
        flowLine.value.initChart()
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
    .chart_box {
      width: 100%;
      height: calc(100% - 50px);
    }
    .extra_box {
      display: flex;
      align-items: center;
      padding: 0 18px;
      width: 100%;
      height: 50px;
      background: rgba(72, 152, 251, 0.1);
      .item {
        display: flex;
        align-items: center;
        color: #ffffff;
        + .item {
          margin-left: 24px;
        }
        .label {
          font-size: 14px;
        }
        .value {
          font-size: 16px;
        }
        .time {
          font-size: 14px;
          margin-left: 4px;
        }
      }
    }
  }
  .data_area {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
}
</style>
