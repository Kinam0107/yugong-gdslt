<template>
  <div class="tangential_polar_bar_chart">
    <div style="width: 100%; height: 100%" ref="chart"></div>
    <div class="legend_wrapper">
      <div class="legend_item" v-for="(item, index) in props.radiusAxisValue" :key="item">
        <i :style="{ background: `rgb(${props.color[index]})` }"></i>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
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
  radiusAxisValue: {
    type: Array,
    default: () => ['类型一', '类型二']
  },
  data: {
    type: Array,
    default: () => [3000, 1000]
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
  const max = props.data.max() + props.data.max() / 5
  const option = {
    grid: {
      left: 24,
      top: 24,
      right: 24,
      bottom: 48,
      containLabel: true
    },
    tooltip: {
      show: false
    },
    polar: {
      center: ['50%', '45%'],
      radius: ['35%', '60%']
    },
    angleAxis: {
      max: max,
      startAngle: 90,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    radiusAxis: {
      type: 'category',
      inverse: true,
      data: props.radiusAxisValue,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#262626',
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 24,
        margin: 2,
        interval: 0
      }
    },
    series: {
      type: 'bar',
      barWidth: 8,
      data: props.data.map((e, i) => {
        return {
          value: e,
          itemStyle: {
            color: {
              type: 'linear',
              ...getCoordinates(0, (e / max) * Math.PI * 2),
              colorStops: [
                { offset: 0, color: `rgba(${props.color[i]}, 0.1)` },
                { offset: 1, color: `rgba(${props.color[i]}, 1)` }
              ]
            }
          }
        }
      }),
      coordinateSystem: 'polar',
      showBackground: true,
      backgroundStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: `rgba(240, 240, 240, 1)` },
            { offset: 1, color: `rgba(240, 240, 240, 0)` }
          ]
        }
      }
    }
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
.tangential_polar_bar_chart {
  position: relative;
  width: 100%;
  height: 100%;
}
.legend_wrapper {
  display: flex;
  gap: 16px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
}
.legend_item {
  i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
  }
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    color: #262626;
  }
}
</style>
