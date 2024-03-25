<template>
  <div class="basic_column_chart" ref="chart" v-echartsAdapt></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
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
    default: () => ['1月', '2月', '3月', '4月', '5月']
  },
  yAxisUnit: {
    type: String,
    default: ''
  },
  data: {
    // 只有一类数据时传数组值
    type: [Object, Array],
    default: () => {
      return {
        成功数: [3000, 4400, 5800, 4400, 4400],
        失败数: [2000, 2000, 2000, 2000, 2000]
      }
    }
  },
  isStack: {
    type: Boolean,
    default: false
  },
  grid: {
    type: Array,
    default: () => [24, 24, 24, 24]
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

const onlyOneType = computed(() => {
  return Array.isArray(props.data)
})

const initChart = () => {
  myChart = echarts.init(chart.value)
  const option = {
    legend: onlyOneType.value
      ? undefined
      : {
          left: 24,
          bottom: 24,
          itemGap: 24,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'rect',
          textStyle: {
            color: '#8C8C8C',
            fontFamily: 'PingFang SC',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 20
          },
          data: Object.entries(props.data).map((item, index) => {
            return {
              name: item[0],
              itemStyle: {
                color: `rgb(${props.color[index]})`
              }
            }
          })
        },
    grid: {
      top: props.yAxisUnit ? props.grid[0] + 32 : props.grid[0] + 24,
      right: props.grid[1],
      bottom: onlyOneType.value ? props.grid[2] : props.grid[2] + 32,
      left: props.grid[3],
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
    yAxis: {
      type: 'value',
      name: props.yAxisUnit,
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: onlyOneType.value
      ? {
          type: 'bar',
          barWidth: 8,
          emphasis: {
            focus: 'series'
          },
          data: props.data,
          itemStyle: {
            color: getColor(props.color[0])
          },
          tooltip: {
            valueFormatter: (value) => value + props.yAxisUnit
          }
        }
      : Object.entries(props.data).map((item, index) => {
          const obj = {
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
              valueFormatter: (value) => value + props.yAxisUnit
            }
          }
          if (props.isStack) {
            obj.stack = 'total'
          } else {
            obj.barGap = 0.5
          }
          return obj
        })
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
.basic_column_chart {
  width: 100%;
  height: 100%;
}
</style>
