<template>
  <div class="stacked_bar_chart" ref="chart"></div>
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
  yAxisValue: {
    type: Array,
    default: () => ['1月', '2月', '3月', '4月', '5月']
  },
  unit: {
    type: String,
    default: '万'
  },
  data: {
    type: Object,
    default: () => {
      return {
        成功数: [3000, 4400, 5800, 4400, 4400],
        失败数: [2000, 2000, 2000, 2000, 2000]
      }
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

const initChart = () => {
  let max = 0
  Object.keys(props.data).forEach((e) => {
    max += props.data[e].max()
  })
  const maxArr = props.yAxisValue.map(() => max)
  myChart = echarts.init(chart.value)
  const option = {
    legend: {
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
      left: 24,
      top: 24,
      right: 24,
      bottom: 48,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: props.yAxisValue,
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        inside: true,
        color: '#262626',
        fontFamily: 'PingFang SC',
        fontSize: 14,
        lineHeight: 22,
        verticalAlign: 'bottom',
        padding: [0, 0, 4, -8]
      }
    },
    tooltip: {
      show: false
    },
    series: [
      {
        type: 'bar',
        barWidth: 8,
        barGap: '-100%',
        emphasis: {
          disabled: true
        },
        data: maxArr,
        itemStyle: {
          color: 'rgba(38, 38, 38, 0.1)'
        },
        label: {
          show: true,
          color: '#262626',
          offset: [4, -2],
          formatter: (params) => {
            let val = 0
            Object.entries(props.data).forEach((e) => {
              val += e[1][params.dataIndex]
            })
            return `{value|${val}}{unit|${props.unit}}`
          },
          rich: {
            value: {
              fontFamily: 'DINAlternate',
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 22
            },
            unit: {
              fontFamily: 'PingFang SC',
              fontSize: 10,
              lineHeight: 14
            }
          },
          position: 'insideBottomRight'
        }
      },
      ...Object.entries(props.data).map((item, index) => {
        return {
          name: item[0],
          type: 'bar',
          stack: 'total',
          barWidth: 8,
          emphasis: {
            disabled: true
          },
          data: item[1],
          itemStyle: {
            color: getColor(props.color[index])
          }
        }
      })
    ]
  }
  myChart.setOption(option)
}

const getColor = (color) => {
  return {
    type: 'linear',
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: `rgba(${color}, 1)`
      },
      {
        offset: 0.75,
        color: `rgba(${color}, 0.4)`
      },
      {
        offset: 1,
        color: `rgba(${color}, 0.2)`
      }
    ]
  }
}
</script>

<style scoped lang="scss">
.stacked_bar_chart {
  width: 100%;
  height: 100%;
}
</style>
