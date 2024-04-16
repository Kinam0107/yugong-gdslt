<template>
  <div class="map_view">
    <OlMap @initFinished="handleInitFinished" @single-click="handleSingleClick" @double-click="handleDoubleClick" @mouse-move="handleMouseMove" @move-end="handleMoveEnd">
      <template #default>
        <el-button type="primary" @click="setImagePoint">加载图片点位</el-button>
        <el-button type="primary" @click="setDotPoint">加载圆点点位</el-button>
        <el-button type="primary" @click="setCirclePoint">加载圆圈范围</el-button>
        <el-button type="primary" @click="setLine">加载线段</el-button>
        <br />
        <br />
        <el-button type="primary" @click="setPolygon">加载多边形</el-button>
        <el-button type="primary" @click="removeAll">移除所有图层</el-button>
        <el-button type="primary" @click="showAdmn = !showAdmn">{{ showAdmn ? '关闭' : '开启' }}行政区划悬浮窗功能</el-button>
        <br />
        <br />
        <el-button type="primary" @click="drawPoint">绘制点</el-button>
        <el-button type="primary" @click="drawLineString">绘制线</el-button>
        <el-button type="primary" @click="drawPolygon">绘制面</el-button>
        <el-button type="primary" @click="drawCircle">绘制圆形</el-button>
        <el-button type="primary" @click="drawBox">绘制矩形</el-button>
        <br />
        <br />
        <el-button type="primary" @click="switchUnderlay('地形晕渲')">地形晕渲</el-button>
        <el-button type="primary" @click="switchUnderlay('影像底图')">影像底图</el-button>
        <el-button type="primary" @click="switchUnderlay('矢量底图')">矢量底图</el-button>
        <el-button type="primary" @click="switchUnderlay('影像注记')">影像注记</el-button>
        <br />
        <br />
        <el-button type="primary" @click="coordinatePositioning()">坐标定位</el-button>
      </template>
      <template #legend>图例</template>
      <template #toolbox>
        <MapTool v-if="!mapLoading" :map="map" />
      </template>
    </OlMap>
    <div ref="featureOverlay">
      <template v-if="showFeatureOverlay">
        <div class="map_overlay">
          <div class="data_item title">
            <span>水库详情</span>
            <el-icon @click="closeMapOverlay"><Close /></el-icon>
          </div>
          <div class="data_item">水库名称：{{ pointData.name }}</div>
          <div class="data_item">水库规模：{{ pointData.scale }}</div>
        </div>
      </template>
    </div>
    <div ref="admnOverlay">
      <template v-if="showAdmnOverlay">
        <div class="map_overlay">
          <div class="data_item">地名：{{ admnData['地名'] }}</div>
          <div class="data_item">区划码：{{ admnData['区划码'] }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import OlMap from '@/components/map/OlMap.vue'
import { renderPoint, renderLine, renderPolygon, renderOverlay, renderPositionOverlay, removeLayer, changeAdmnStyle, draw, changeBaseMap, gotoPoint } from '@/utils/map.js'
import largeReservoir from '@/assets/images/points/reservoir-large.png'
import mediumReservoir from '@/assets/images/points/reservoir-medium.png'
import smallReservoir from '@/assets/images/points/reservoir-small.png'
import { ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import MapTool from '@/components/map/MapTool.vue'

let map
const mapLoading = ref(true)
const handleInitFinished = (e) => {
  map = e
  mapLoading.value = false
  setImagePoint()
}

const featureOverlay = ref()
const showFeatureOverlay = ref(false)
const pointData = ref({})
const closeMapOverlay = () => {
  pointData.value = {}
  showFeatureOverlay.value = false
  removeLayer(map, '水库落点浮窗')
}

const showAdmn = ref(false)
const admnOverlay = ref()
const showAdmnOverlay = ref(false)
const admnData = ref({})
const activeAdmn = ref()
watch(activeAdmn, (val) => {
  changeAdmnStyle(val, { fillColor: [255, 255, 255, 0.33] })
  if (val) {
    admnData.value = val.values_
    showAdmnOverlay.value = true
  } else {
    admnData.value = {}
    showAdmnOverlay.value = false
  }
})

const handleSingleClick = (e) => {
  if (e.featureData?.layerName === '大中小型水库落点测试图层') {
    pointData.value = e.featureData
    showFeatureOverlay.value = true
    renderOverlay(map, '水库落点浮窗', e.featureData, featureOverlay.value)
  } else {
    closeMapOverlay()
  }
}
const handleDoubleClick = () => {}
const handleMouseMove = (e) => {
  if (!showAdmn.value) return
  if (e.featureData) {
    activeAdmn.value = undefined
  } else {
    activeAdmn.value = e.cityFeature
  }
  if (showAdmnOverlay.value) {
    renderPositionOverlay(map, '行政区划浮窗', { coordinate: e.coordinate }, admnOverlay.value)
  } else {
    removeLayer(map, '行政区划浮窗')
  }
}
const handleMoveEnd = () => {}

const setImagePoint = () => {
  renderPoint(map, '大中小型水库落点测试图层', [
    {
      name: 'XXXXX水库',
      scale: '大型',
      longitude: 112.34907598073522,
      latitude: 23.502291842718748,
      dotStyleConf: { src: largeReservoir }
    },
    {
      name: 'YYYYY水库',
      scale: '中型',
      longitude: 114.06540370532672,
      latitude: 23.557873243492697,
      dotStyleConf: { src: mediumReservoir }
    },
    {
      name: 'ZZZZZ水库',
      scale: '小型',
      longitude: 113.13310830126525,
      latitude: 22.309716455628713,
      dotStyleConf: { src: smallReservoir }
    }
  ])
}

const setDotPoint = () => {
  renderPoint(map, '大中小型水库落点测试图层', [
    { longitude: 112.34907598073522, latitude: 23.502291842718748, dotStyleConf: { radius: 10 }, titleStyleConf: { titleText: '大型水库', titleOffsetY: -18 } },
    { longitude: 114.06540370532672, latitude: 23.557873243492697, dotStyleConf: { strokeColor: 'red' } },
    { longitude: 113.13310830126525, latitude: 22.309716455628713, dotStyleConf: { fillColor: 'blue' } }
  ])
}

const setCirclePoint = () => {
  renderPoint(map, '大中小型水库落点测试图层', [
    { longitude: 112.34907598073522, latitude: 23.502291842718748, circleStyleConf: { radius: 15000 }, titleStyleConf: { titleText: '大型水库' } },
    { longitude: 114.06540370532672, latitude: 23.557873243492697, circleStyleConf: { fillColor: 'blue' } },
    { longitude: 113.13310830126525, latitude: 22.309716455628713, circleStyleConf: { fillColor: 'blue', strokeColor: 'red' } }
  ])
}

const setLine = () => {
  renderLine(map, '水库间线段测试图层', [
    {
      coordinates: [
        [112.34907598073522, 23.502291842718748],
        [114.06540370532672, 23.557873243492697],
        [113.13310830126525, 22.309716455628713]
      ],
      lineStyleConf: { width: 2 }
    }
  ])
}

const setPolygon = () => {
  renderPolygon(map, '水库间区域测试图层', [
    {
      coordinates: [
        [112.34907598073522, 23.502291842718748],
        [114.06540370532672, 23.557873243492697],
        [113.13310830126525, 22.309716455628713]
      ],
      polygonStyleConf: {},
      titleStyleConf: { titleText: '水库间区域' }
    }
  ])
}

const removeAll = () => {
  removeLayer(map)
}

const drawPoint = () => {
  draw(map, '绘制图层', 'Point', false, (e) => {
    console.log('点投影坐标:', e.coordinate)
  })
}
const drawLineString = () => {
  draw(map, '绘制图层', 'LineString', true, (e) => {
    console.log('线段投影坐标:', e.coordinate, '; 测距距离:', e.length)
  })
}
const drawPolygon = () => {
  draw(map, '绘制图层', 'Polygon', true, (e) => {
    console.log('多边形投影坐标:', e.coordinate, '; 测面面积:', e.area)
  })
}
const drawCircle = () => {
  draw(map, '绘制图层', 'Circle', false, (e) => {
    console.log('圆心投影坐标:', e.coordinate, '; 半径:', e.radius)
  })
}
const drawBox = () => {
  draw(map, '绘制图层', 'Box', true, (e) => {
    console.log('矩形投影坐标:', e.coordinate, '; 测面面积:', e.area)
  })
}

const switchUnderlay = (mode) => {
  changeBaseMap(map, mode)
}

const coordinatePositioning = () => {
  gotoPoint(map, { center: [112.349075, 23.502291] }, (e) => {
    pointData.value = e.featureData
    showFeatureOverlay.value = true
    renderOverlay(map, '水库落点浮窗', e.featureData, featureOverlay.value)
  })
}
</script>

<style scoped lang="scss">
.map_view {
  @include mainContentContainer(100%);
  overflow: hidden;
  padding: 0;

  :deep(.slot-wrapper) {
    &.default {
      left: 16px;
      top: 8px;
    }
    &.toolbox {
      left: 16px;
      bottom: 12px;
    }
  }
}

.map_overlay {
  position: relative;
  padding: 8px 12px;
  background-color: $color-whitebg;
  border: 1px solid $color-primary;
  border-radius: 4px;
  margin-bottom: 6px;
  .data_item {
    @include fontCategory();
    &.title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $color-separator;
      > span {
        @include fontCategory(5);
      }
      > i {
        cursor: pointer;
        &:hover {
          color: $color-primary;
        }
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid $color-primary;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -1px);
    width: 0;
    height: 0;
    border-top: 6px solid $color-whitebg;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
}
</style>
