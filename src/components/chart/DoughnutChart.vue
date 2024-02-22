<template>
  <div class="doughnut_chart" ref="chart"></div>
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
  title: {
    type: String,
    default: '总指标'
  },
  unit: {
    type: String,
    default: '万'
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
  const gradientColor = []
  let tempSum = 0
  props.data.forEach((e, i) => {
    gradientColor.push({
      type: 'linear',
      ...getCoordinates((tempSum / total.value) * Math.PI * 2, ((tempSum + e.value) / total.value) * Math.PI * 2),
      colorStops: [
        { offset: 0, color: `rgba(${props.color[i]}, 0.1)` },
        { offset: 1, color: `rgba(${props.color[i]}, 1)` }
      ]
    })
    tempSum += e.value
  })
  const option = {
    legend: {
      left: 'center',
      bottom: 24,
      itemGap: 16,
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
      textStyle: {
        color: '#262626',
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 24
      },
      data: props.data.map((item, index) => {
        return {
          name: item.name,
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
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `
          <span style="font-family: PingFang SC;font-size: 12px;font-weight: 400;line-height: 20px;margin-right: 8px;">${params.name}</span>
          <span style="font-family: DINAlternate;font-size: 18px;font-weight: 700;line-height: 20px;margin-right: 8px;">${params.value}<span style="font-family: PingFang SC;font-size: 12px;">${props.unit}</span></span>
          <span style="font-family: DINAlternate;font-size: 18px;font-weight: 700;line-height: 20px;">${params.percent}<span style="font-family: PingFang SC;font-size: 12px;">%</span></span>
        `
      }
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '45%'],
        radius: ['52%', '60%'],
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
        center: ['50%', '45%'],
        radius: '-50%',
        detail: {
          offsetCenter: [0, -10],
          fontSize: 18,
          fonwWeight: 700,
          fontFamily: 'DINAlternate',
          color: '#262626'
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
              fontSize: 12,
              fontFamily: 'PingFang SC',
              color: '#595959',
              offsetCenter: [0, 10]
            }
          }
        ]
      }
    ],
    color: gradientColor
  }
  myChart.setOption(option)
}

/**
 * 线性渐变起止方向的计算方法
 * @param {*} startArc 开始角度
 * @param {*} endArc 结束角度
 * @returns 四个坐标 {x,y,x2,y2}
 */
const getCoordinates = (startArc, endArc) => {
  const posi = [Math.sin(startArc), -Math.cos(startArc), Math.sin(endArc), -Math.cos(endArc)]
  const dx = posi[2] - posi[0]
  const dy = posi[3] - posi[1]
  const tanV = dx / dy
  const directSign = Math.abs(tanV) < 1
  const t = directSign ? tanV : 1 / tanV
  const sign1 = t > 0 ? 1 : -1
  const sign2 = dx > 0 ? 1 : -1
  const sign = directSign ? sign1 * sign2 : sign2
  const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2]
  const group2 = sign > 0 ? [0, 1] : [1, 0]
  const group = [...group1, ...group2]
  const keys = directSign ? ['x', 'x2', 'y', 'y2'] : ['y', 'y2', 'x', 'x2']
  let res = {}
  keys.forEach((k, idx) => {
    res[k] = group[idx]
  })
  return res
}
</script>

<style scoped lang="scss">
.doughnut_chart {
  width: 100%;
  height: 100%;
}
</style>
