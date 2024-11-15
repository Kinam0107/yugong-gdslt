<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200" append-to-body>
    <div class="station_box">
      <div class="station_item" v-for="item in stationList" :key="item.id" :class="{ active: stationId === item.id }" @click="changeStation(item)">
        <div class="name">{{ item.name }}</div>
        <div class="value">
          <template v-if="item.type === '1'">当前水位：{{ item.water }}m</template>
          <template v-else>累积雨量：{{ item.rain }}m</template>
        </div>
        <div class="state" :style="{ color: item.state === '1' ? '#47F5A7' : '#FFA01E' }">
          {{ item.state === '1' ? '正常' : item.type === '1' ? '超汛限' : '超警' }}
        </div>
      </div>
    </div>
    <div class="operating_area">
      <el-radio-group v-model="radio">
        <el-radio :label="1">近一天</el-radio>
        <el-radio :label="2">近一周</el-radio>
        <el-radio :label="3">自定义</el-radio>
      </el-radio-group>
      <div v-if="radio == 3" style="flex: 1; margin-left: 24px">
        <el-date-picker v-model="range" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
      </div>
      <el-radio-group v-model="mode">
        <el-radio-button :label="1">图</el-radio-button>
        <el-radio-button :label="2">表</el-radio-button>
      </el-radio-group>
    </div>
    <div class="chart_data_area">
      <div class="chart_area" :style="{ visibility: mode == 2 ? 'hidden' : '' }">
        <div class="chart_box">
          <WaterLevelLine ref="waterLevelLine" v-if="dialogVisible && stationType === '1'" />
          <RainfallData ref="rainfallData" v-if="dialogVisible && stationType === '2'" />
        </div>
        <div class="extra_box">
          <div class="item">
            <span class="label">最高水位：</span>
            <span class="value">{{ 6.23 }}m</span>
            <span class="time">({{ '03月22日 01:45' }})</span>
          </div>
          <div class="item">
            <span class="label">最低水位：</span>
            <span class="value">{{ 5.15 }}m</span>
            <span class="time">({{ '03月22日 01:45' }})</span>
          </div>
        </div>
      </div>
      <div class="data_area" :style="{ visibility: mode == 1 ? 'hidden' : '' }"></div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import WaterLevelLine from '@/components/chart/WaterLevelLine.vue'
import RainfallData from '@/components/chart/RainfallData.vue'
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
const range = ref()
const mode = ref(1)
const waterLevelLine = ref()
const rainfallData = ref()
watch(
  () => dialogVisible.value,
  (val) => {
    if (val)
      nextTick(() => {
        if (stationType.value === '1') {
          waterLevelLine.value.initChart()
        } else {
          rainfallData.value.initChart()
        }
      })
  }
)

const stationId = ref('1')
const stationType = ref('1')
const stationList = ref([
  { id: '1', type: '1', name: '这是一个水位站名称', water: '128.34', state: '1' },
  { id: '2', type: '1', name: '这是一个水位站名称', water: '128.34', state: '2' },
  { id: '3', type: '2', name: '这是一个雨量站名称', rain: '1.3', state: '1' },
  { id: '4', type: '2', name: '这是一个雨量站名称', rain: '1.3', state: '2' }
])
const changeStation = (station) => {
  stationType.value = station.type
  stationId.value = station.id
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
  }
}
</style>
