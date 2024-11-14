<template>
  <div class="rainfall_data" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  color: {
    type: Array,
    default: () => [['35, 227, 251', '35, 157, 239'], '27, 242, 233']
  },
  xAxisValue: {
    type: Array,
    default: () => [
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00',
      '03-21 11:00'
    ]
  },
  yAxisUnit0: {
    type: String,
    default: 'mm'
  },
  yAxisUnit1: {
    type: String,
    default: 'mm'
  },
  barData: {
    type: Object,
    default: () => {
      return {
        雨量: [13, 4, 13, 4, 18, 4, 13, 4, 13, 4, 13, 4, 13, 4, 13, 4, 13, 4]
      }
    }
  },
  lineData: {
    type: Object,
    default: () => {
      return {
        累积雨量: [13, 17, 30, 34, 52, 56, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 120]
      }
    }
  },
  isStack: {
    type: Boolean,
    default: false
  }
})

const chart = ref()
let myChart = null

onMounted(() => {
  nextTick(() => {
    initChart()
  })
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
    legend: {
      left: 'center',
      bottom: 12,
      itemGap: 24,
      itemWidth: 24,
      itemHeight: 12,
      textStyle: {
        color: '#ffffff',
        fontSize: 16,
        padding: [0, 0, 0, 8]
      },
      data: [
        ...Object.entries(props.barData).map((item, index) => {
          return {
            icon: 'rect',
            name: item[0],
            itemStyle: {
              color: getColor(props.color[index])
            }
          }
        }),
        ...Object.entries(props.lineData).map((item, index) => {
          return {
            name: item[0],
            itemStyle: {
              color: `rgb(${props.color[Object.keys(props.barData).length + index]})`
            }
          }
        })
      ]
    },
    grid: {
      left: 0,
      top: 48,
      right: 0,
      bottom: 48,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisValue,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 19,
        formatter: (value) => {
          return value.replace(' ', '\n')
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        inverse: true,
        name: '降雨量 ' + props.yAxisUnit0,
        nameLocation: 'start',
        nameTextStyle: {
          color: '#ffffff',
          fontSize: 16,
          lineHeight: 19,
          align: 'left'
        },
        minInterval: 5,
        axisLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: '#ffffff',
          fontSize: 16,
          lineHeight: 19
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      {
        type: 'value',
        name: '累计降雨量  ' + props.yAxisUnit1,
        nameTextStyle: {
          color: '#ffffff',
          fontSize: 16,
          lineHeight: 19,
          align: 'right'
        },
        minInterval: 5,
        axisLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: '#ffffff',
          fontSize: 16,
          lineHeight: 19
        },
        splitLine: { show: false }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      ...Object.entries(props.barData).map((item, index) => {
        const obj = {
          yAxisIndex: 0,
          name: item[0],
          type: 'bar',
          barMaxWidth: 22,
          data: item[1],
          itemStyle: {
            color: getColor(props.color[index])
          },
          tooltip: {
            valueFormatter: (value) => value + props.yAxisUnit0
          }
        }
        if (props.isStack) {
          obj.stack = 'total'
        } else {
          obj.barGap = 0.5
        }
        return obj
      }),
      ...Object.entries(props.lineData).map((item, index) => {
        const obj = {
          yAxisIndex: 1,
          name: item[0],
          type: 'line',
          data: item[1],
          itemStyle: {
            color: `rgb(${props.color[Object.keys(props.barData).length + index]})`
          },
          lineStyle: {
            width: 4,
            type: 'dotted'
          },
          symbol: 'none',
          smooth: true,
          smoothMonotone: 'x',
          tooltip: {
            valueFormatter: (value) => value + props.yAxisUnit1
          }
        }
        return obj
      })
    ]
  }
  myChart.setOption(option)
}

const getColor = (color) => {
  if (Array.isArray(color)) {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(${color[0]}, 1)`
        },
        {
          offset: 1,
          color: `rgba(${color[1]}, 1)`
        }
      ]
    }
  } else {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(${color}, 1)`
        },
        {
          offset: 0.5,
          color: `rgba(${color}, 0.4)`
        },
        {
          offset: 1,
          color: `rgba(${color}, 0.1)`
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.rainfall_data {
  width: 100%;
  height: 100%;
}
</style>
