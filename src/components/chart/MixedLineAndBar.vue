<template>
  <div class="mixed_line_and_bar" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  color: {
    type: Array,
    default: () => [
      '54, 163, 217',
      '41, 204, 204',
      '83, 166, 124',
      '129, 184, 74',
      '232, 232, 0',
      '255, 192, 65',
      '242, 145, 48',
      '242, 97, 97',
      '255, 128, 191',
      '218, 98, 242',
      '173, 115, 231',
      '116, 116, 229'
    ]
  },
  xAxisValue: {
    type: Array,
    default: () => ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxisUnit0: {
    type: String,
    default: ''
  },
  yAxisUnit1: {
    type: String,
    default: '%'
  },
  yAxisMax1: {
    type: Number,
    default: 100
  },
  barData: {
    type: Object,
    default: () => {
      return {
        类型一: [4050, 5800, 8800, 5800, 4050, 5800]
      }
    }
  },
  lineData: {
    type: Object,
    default: () => {
      return {
        类型二: [18, 22, 20, 38, 24, 22]
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
    legend: {
      left: 24,
      bottom: 24,
      itemGap: 24,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: '#8C8C8C',
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 20
      },
      data: [
        ...Object.entries(props.barData).map((item, index) => {
          return {
            icon: 'rect',
            name: item[0],
            itemStyle: {
              color: `rgb(${props.color[index]})`
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
      left: 24,
      top: 48,
      right: 24,
      bottom: 56,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisValue,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D9D9D9'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#262626',
        fontFamily: 'PingFang SC',
        fontSize: 12,
        lineHeight: 20
      }
    },
    yAxis: [
      {
        type: 'value',
        name: props.yAxisUnit0,
        nameTextStyle: {
          color: '#a3a3a3',
          fontFamily: 'PingFang SC',
          fontSize: 10,
          lineHeight: 14,
          align: 'left',
          padding: [0, 0, 0, -40]
        },
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
          align: 'left',
          verticalAlign: 'bottom',
          padding: [0, 0, 0, -32]
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#F0F0F0'
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
      ...Object.entries(props.barData).map((item, index) => {
        const obj = {
          yAxisIndex: 0,
          name: item[0],
          type: 'bar',
          barWidth: 8,
          emphasis: {
            focus: 'series'
          },
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
          emphasis: {
            focus: 'series'
          },
          data: item[1],
          itemStyle: {
            color: `rgb(${props.color[Object.keys(props.barData).length + index]})`
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
</script>

<style scoped lang="scss">
.mixed_line_and_bar {
  width: 100%;
  height: 100%;
}
</style>
