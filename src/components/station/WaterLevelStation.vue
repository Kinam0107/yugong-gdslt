<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200" append-to-body>
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
          <WaterLevelLine ref="waterLevelLine" v-if="dialogVisible" />
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
    default: '水位站'
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
watch(
  () => dialogVisible.value,
  (val) => {
    if (val)
      nextTick(() => {
        waterLevelLine.value.initChart()
      })
  }
)
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
  }
}
</style>
