<template>
  <div class="mixed_line_and_bar" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  color: {
    type: Array,
    default: () => ['#0052D9', '#FF9936']
  },
  xAxisValue: {
    type: Array,
    default: () => ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxisUnit: {
    type: String,
    default: ''
  },
  barData: {
    type: Array,
    default: () => [18, 22, 20, 38, 24, 22]
  },
  lineData: {
    type: Array,
    default: () => [18, 40, 60, 98, 122, 144]
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

const initChart = () => {
  myChart = echarts.init(chart.value)
  const option = {
    grid: {
      left: 20,
      top: 40,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisValue,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3A5052',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#333333',
        fontFamily: 'Source Han Sans',
        fontSize: 14,
        lineHeight: 11
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：' + props.yAxisUnit,
        nameTextStyle: {
          color: '#333333',
          fontFamily: 'Source Han Sans',
          fontSize: 14,
          lineHeight: 11
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#333333',
          fontFamily: 'Source Han Sans',
          fontSize: 14,
          lineHeight: 11
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#3A5052',
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        max: props.yAxisMax1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: true,
          length: 40,
          lineStyle: {
            color: '#F0F0F0'
          }
        },
        axisLabel: {
          color: '#a3a3a3',
          fontFamily: 'PingFang SC',
          fontSize: 10,
          lineHeight: 14,
          align: 'right',
          verticalAlign: 'bottom',
          padding: [0, -32, 0, 0],
          formatter: `{value} ${props.yAxisUnit1}`
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#F0F0F0'
          }
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 13,
        emphasis: {
          focus: 'series'
        },
        data: props.barData,
        itemStyle: {
          color: props.color[0]
        }
      },
      {
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        data: props.lineData,
        itemStyle: {
          color: props.color[1]
        },
        symbol: 'none',
        smooth: true,
        smoothMonotone: 'x'
      }
    ]
  }
  myChart.setOption(option)
}

defineExpose({
  initChart
})
</script>

<style scoped lang="scss">
.mixed_line_and_bar {
  width: 100%;
  height: 100%;
}
</style>
