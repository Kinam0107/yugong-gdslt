<template>
  <div class="ring_chart" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: '总数'
  },
  unit: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: () => {
      return [
        { value: 6, name: '中型', color: '#46FDFF' },
        { value: 18, name: '小（1）型', color: '#419EFF' },
        { value: 77, name: '小（2）型', color: '#FF9936' }
      ]
    }
  }
})

const chart = ref()
let myChart = null

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (myChart) {
    echarts.dispose(myChart)
    myChart = null
  }
})

const total = computed(() => props.data.map((e) => e.value).sum())
const initChart = () => {
  myChart = echarts.init(chart.value)
  const option = {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['65%', '85%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: props.data
      },
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '-50%',
        detail: {
          offsetCenter: [0, -12],
          fontSize: 20,
          fonwWeight: 700,
          fontFamily: 'PangMenZhengDao',
          color: '#FFFFFF'
        },
        pointer: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [
          {
            value: total.value,
            name: `${props.title || '总数'}${props.unit ? ' (' + props.unit + ')' : ''}`,
            title: {
              show: true,
              fontSize: 16,
              color: '#FFFFFF',
              offsetCenter: [0, 12]
            }
          }
        ]
      }
    ],
    color: props.data.map((e) => e.color)
  }
  myChart.setOption(option)
}
</script>

<style scoped lang="scss">
.ring_chart {
  width: 100%;
  height: 100%;
}
</style>
