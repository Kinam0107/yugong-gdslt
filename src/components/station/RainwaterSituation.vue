<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200" append-to-body>
    <div class="station_box">
      <div class="station_item" v-for="item in stationList" :key="item.stcd" :class="{ active: stationId === item.stcd && stationType === item.sttp }" @click="changeStation(item)">
        <div class="name">{{ item.stnm }}</div>
        <div class="value">
          <template v-if="item.sttp === 'RR'">当前水位：{{ item.rrtd }}m</template>
          <template v-else-if="item.sttp === 'PP'">累积雨量：{{ item.prtd }}mm</template>
          <template v-else-if="item.sttp === 'QQ'">实时流量：{{ item.todo }}m³/s</template>
        </div>
        <div v-if="item.sttp === 'RR'" class="state" :style="{ color: item.wheRrtd === '1' ? '#47F5A7' : '#FFA01E' }">{{ item.wheRrtd === '1' ? '正常' : '超汛限' }}</div>
        <div v-else-if="item.sttp === 'PP'" class="state" style="color: #47F5A7">{{ '正常' }}</div>
        <div v-else-if="item.sttp === 'QQ'" class="state" style="color: #47F5A7">{{ '正常' }}</div>
      </div>
    </div>
    <div class="operating_area">
      <el-radio-group v-model="radio" @change="getChartData">
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
          @change="getWaterLevelData" />
      </div>
      <el-radio-group v-model="mode">
        <el-radio-button :label="1">图</el-radio-button>
        <el-radio-button :label="2">表</el-radio-button>
      </el-radio-group>
    </div>
    <div class="chart_data_area">
      <div class="chart_area" :style="{ visibility: mode == 2 ? 'hidden' : '' }">
        <div class="chart_box">
          <WaterLevelLine ref="waterLevelLine" v-if="dialogVisible && stationType === 'RR'" :xAxisValue="xAxisValue" :data="waterLevelData" />
          <RainfallData ref="rainfallData" v-if="dialogVisible && stationType === 'PP'" :xAxisValue="xAxisValue" :barData="rainfallBarData" :lineData="rainfallLineData" />
          <FlowLine ref="flowLine" v-if="dialogVisible && stationType === 'QQ'" :xAxisValue="xAxisValue" yAxisUnit="m³/s" :data="flowData" />
        </div>
        <div class="extra_box">
          <template v-if="stationType === 'RR'">
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
          </template>
          <template v-else-if="stationType === 'PP'">
            <div class="item">
              <span class="label">累积雨量：</span>
              <span class="value">{{ totalRainfall }}mm</span>
            </div>
          </template>
          <template v-else-if="stationType === 'QQ'">
            <div class="item">
              <span class="label">最大流量：</span>
              <span class="value">{{ extremeValue.max }}m³/s</span>
              <span class="time">({{ extremeValue.maxTm }})</span>
            </div>
          </template>
        </div>
      </div>
      <div class="data_area" :style="{ visibility: mode == 1 ? 'hidden' : '' }">
        <el-table :data="tableData" style="width: 100%" :height="580" size="large" stripe>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <template v-if="stationType === 'RR'">
            <el-table-column prop="tm" label="时间" align="center"></el-table-column>
            <el-table-column prop="rz" label="水位(m)" align="center"></el-table-column>
          </template>
          <template v-else-if="stationType === 'PP'">
            <el-table-column prop="tm" label="时间" align="center"></el-table-column>
            <el-table-column prop="drp" label="雨量(mm)" align="center"></el-table-column>
          </template>
          <template v-else-if="stationType === 'QQ'">
            <el-table-column prop="tm" label="时间" align="center"></el-table-column>
            <el-table-column prop="todo" label="流量(m³/s)" align="center"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick, reactive } from 'vue'
import WaterLevelLine from '@/components/chart/WaterLevelLine.vue'
import RainfallData from '@/components/chart/RainfallData.vue'
import FlowLine from '@/components/chart/WaterLevelLine.vue'
import axios from '@/api/axios'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  prcd: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
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
const waterLevelLine = ref()
const rainfallData = ref()
const flowLine = ref()
const xAxisValue = ref([])
const xxWaterlevel = ref('')
const waterLevelData = ref({
  实时水位: [],
  汛限水位: []
})
const extremeValue = reactive({
  min: '',
  minTm: '',
  max: '',
  maxTm: ''
})
const rainfallBarData = ref({
  雨量: []
})
const rainfallLineData = ref({
  累积雨量: []
})
const totalRainfall = ref('')
const flowData = ref({
  流量: []
})
const tableData = ref([])
watch(
  () => dialogVisible.value,
  (val) => {
    if (val) {
      getStationList()
    } else {
      stationType.value = ''
      stationId.value = ''
      stationList.value = []
    }
  }
)

const stationList = ref([])
const getStationList = () => {
  axios
    .yw({
      url: '/res-base-info-count/stbprpTypeCount',
      method: 'get',
      params: {
        prcd: props.prcd
      }
    })
    .then((res) => {
      stationList.value = res.data.data
    })
    .catch(() => {
      stationList.value = []
    })
    .finally(() => {
      if (stationList.value.length) changeStation(stationList.value[0])
    })
}
const stationId = ref('')
const stationType = ref('')
const changeStation = (station) => {
  stationType.value = station.sttp
  stationId.value = station.stcd
  if (stationType.value === 'RR') xxWaterlevel.value = station.mFS
  getChartData()
}
const getChartData = () => {
  if (stationType.value === 'RR') {
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
          ss: [],
          xx: [],
          min: '',
          minTm: '',
          max: '',
          maxTm: ''
        }
        data.forEach((e) => {
          temp.xa.push(e.tm.substring(5, 16))
          temp.ss.push(e.rz)
          temp.xx.push(xxWaterlevel.value)
          if (temp.min) {
            if (temp.min > e.rz) {
              temp.min = e.rz
              temp.minTm = e.tm.substring(5, 16)
            }
          } else {
            temp.min = e.rz
            temp.minTm = e.tm.substring(5, 16)
          }
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
        extremeValue.min = temp.min
        extremeValue.minTm = temp.minTm
        extremeValue.max = temp.max
        extremeValue.maxTm = temp.maxTm
        xAxisValue.value = temp.xa
        waterLevelData.value['实时水位'] = temp.ss
        waterLevelData.value['汛限水位'] = temp.xx
        tableData.value = data
      })
      .catch(() => {
        extremeValue.min = '-'
        extremeValue.minTm = '-'
        extremeValue.max = '-'
        extremeValue.maxTm = '-'
        xAxisValue.value = []
        waterLevelData.value['实时水位'] = []
        waterLevelData.value['汛限水位'] = []
        tableData.value = []
      })
      .finally(() => {
        nextTick(() => {
          waterLevelLine.value.initChart()
        })
      })
  } else if (stationType.value === 'PP') {
    axios
      .yw({
        url: '/pptn-r/findDataList',
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
          yl: [],
          ljyl: [],
          total: 0
        }
        data.forEach((e) => {
          temp.xa.push(e.tm.substring(5, 16))
          temp.yl.push(e.drp)
          temp.total += e.drp
          temp.ljyl.push(temp.total)
        })
        xAxisValue.value = temp.xa
        rainfallBarData.value['雨量'] = temp.yl
        rainfallLineData.value['累积雨量'] = temp.ljyl
        totalRainfall.value = temp.total
        tableData.value = data
      })
      .catch(() => {
        xAxisValue.value = []
        rainfallBarData.value['雨量'] = []
        rainfallLineData.value['累积雨量'] = []
        totalRainfall.value = '-'
        tableData.value = []
      })
      .finally(() => {
        nextTick(() => {
          rainfallData.value.initChart()
        })
      })
  } else if (stationType.value === 'QQ') {
    axios
      .yw({
        url: '/todo/findDataList',
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
}
</script>

<style scoped lang="scss">
.station_box {
  overflow: auto;
  display: flex;
  width: 100%;
  margin-top: -16px;
  margin-bottom: 16px;
  .station_item {
    position: relative;
    width: 220px;
    height: 64px;
    background-image: url(@/assets/images/stationBoxBg.png);
    cursor: pointer;
    &.active {
      background-image: url(@/assets/images/stationBoxActiveBg.png);
    }
    + .station_item {
      margin-left: 8px;
    }
    .name {
      position: absolute;
      top: 7px;
      left: 16px;
      font-size: 14px;
      line-height: 24px;
    }
    .value {
      position: absolute;
      top: 35px;
      left: 16px;
      font-size: 14px;
      line-height: 19px;
    }
    .state {
      position: absolute;
      top: 7px;
      right: 14px;
      font-size: 14px;
      line-height: 24px;
    }
  }
}
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
