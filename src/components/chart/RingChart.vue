<template>
  <div class="ring_chart" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  color: {
    type: Array,
    default: () => ['#276AF0', '#5AD8E5', '#0CBF5B', '#FFCB27', '#FF4D4F']
  },
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
        { value: 1000, name: '类型一' },
        { value: 1000, name: '类型二' },
        { value: 1000, name: '类型三' }
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

const total = computed(() => {
  let total = 0
  props.data.forEach((e) => {
    total += e.value
  })
  return total
})
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
        radius: ['55%', '85%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: props.data,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 4
        }
      },
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '-50%',
        detail: {
          offsetCenter: [0, -10],
          fontSize: 32,
          fonwWeight: 'bold',
          fontFamily: 'DINAlternate',
          color: '#333333'
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
              fontFamily: 'PingFang SC',
              color: '#303133',
              offsetCenter: [0, 15]
            }
          }
        ]
      }
    ],
    color: props.color
  }
  myChart.setOption(option)
}

defineExpose({
  initChart
})
</script>

<style scoped lang="scss">
.ring_chart {
  width: 100%;
  height: 100%;
}
</style>
