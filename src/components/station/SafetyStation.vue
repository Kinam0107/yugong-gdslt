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
        <SafetyLine ref="safetyLine" v-if="dialogVisible" />
      </div>
      <div class="data_area" :style="{ visibility: mode == 1 ? 'hidden' : '' }"></div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import SafetyLine from '@/components/chart/SafetyLine.vue'
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
const range = ref()
const mode = ref(1)
const safetyLine = ref()
watch(
  () => dialogVisible.value,
  (val) => {
    if (val)
      nextTick(() => {
        safetyLine.value.initChart()
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
  }
  .data_area {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
