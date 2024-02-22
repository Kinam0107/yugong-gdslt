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
  xAxisValue: {
    type: Array,
    default: () => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
  },
  yAxisUnit: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: () => {
      return {
        总数: [2500, 4000, 2300, 5000, 4200, 3800, 3700, 5800, 3600, 4200, 4200, 4000, 4300, 6200, 4400, 4500, 4400, 4500, 4100, 6100, 5800],
        失败数: [500, 1000, 300, 1800, 1500, 1200, 1200, 2000, 1100, 1700, 1600, 1700, 1900, 2200, 1800, 1900, 1800, 1800, 1700, 1900, 1700]
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
      top: 48,
      right: 24,
      bottom: 56,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisValue,
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D9D9D9'
        }
      },
      axisTick: {
        show: true,
        length: 2,
        lineStyle: {
          color: '#262626',
          width: 2
        }
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
    series: Object.entries(props.data).map((item, index) => {
      return {
        name: item[0],
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        data: item[1],
        itemStyle: {
          color: `rgb(${props.color[index]})`
        },
        symbol: 'none',
        smooth: true,
        smoothMonotone: 'x',
        areaStyle: {
          color: getColor(props.color[index])
        },
        tooltip: {
          valueFormatter: (value) => value + props.yAxisUnit
        }
      }
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
        color: `rgba(${color}, 0.8)`
      },
      {
        offset: 0.6,
        color: `rgba(${color}, 0.2)`
      },
      {
        offset: 0.9,
        color: `rgba(${color}, 0)`
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
