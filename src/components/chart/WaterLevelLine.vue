<template>
  <div class="water_level_line" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  color: {
    type: Array,
    default: () => ['39, 106, 240', '255, 160, 30']
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
      '03-21 11:00'
    ]
  },
  yAxisUnit: {
    type: String,
    default: 'm'
  },
  data: {
    type: Object,
    default: () => {
      return {
        实时水位: [6, 7, 11, 14, 13, 12, 11, 10, 9, 8, 11, 7, 6, 4, 9],
        汛限水位: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
      }
    }
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
      icon: 'circle',
      textStyle: {
        color: '#ffffff',
        fontSize: 16
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
      }
    },
    yAxis: {
      type: 'value',
      name: '水位 ' + props.yAxisUnit,
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 19,
        align: 'left'
      },
      minInterval: 5,
      axisLine: { show: false },
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: Object.entries(props.data).map((item, index) => {
      if (item[0] != '汛限水位') {
        return {
          name: item[0],
          type: 'line',
          data: item[1],
          itemStyle: {
            color: `rgb(${props.color[index]})`
          },
          symbolSize: 6,
          symbol: 'emptyCircle',
          smooth: true,
          smoothMonotone: 'x',
          areaStyle: {
            color: getColor(props.color[index])
          },
          tooltip: {
            valueFormatter: (value) => value + props.yAxisUnit
          },
          markPoint: {
            symbolSize: 16,
            label: { show: false },
            data: [
              { type: 'min', symbol: `image://${new URL('@/assets/images/icons/valueMin.png', import.meta.url).href}` },
              { type: 'max', symbol: `image://${new URL('@/assets/images/icons/valueMax.png', import.meta.url).href}` }
            ]
          }
        }
      } else {
        return {
          name: item[0],
          type: 'line',
          data: item[1],
          itemStyle: {
            color: `rgb(${props.color[index]})`
          },
          lineStyle: {
            type: 'dashed'
          },
          symbol: 'none',
          tooltip: {
            valueFormatter: (value) => value + props.yAxisUnit
          },
          endLabel: {
            show: true,
            formatter: '{a}',
            color: `rgb(${props.color[index]})`,
            align: 'right',
            verticalAlign: 'bottom',
            fontSize: 14,
            offset: [4, -8]
          }
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

defineExpose({ initChart })
</script>

<style scoped lang="scss">
.water_level_line {
  width: 100%;
  height: 100%;
}
</style>
