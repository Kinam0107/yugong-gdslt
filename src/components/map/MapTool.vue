<template>
  <div class="toolbox" :class="{ active: toolboxSelection }" @click.self="toolboxSelection = !toolboxSelection" v-click-outside="closeToolbox">
    <div v-for="i in 4" :key="i" class="inner_cube" @click.self="toolboxSelection = !toolboxSelection"></div>
    <div class="first_menu" v-if="toolboxSelection">
      <div
        v-for="item in [
          { label: '定位', img: locationIcon },
          { label: '工具', img: toolIcon },
          { label: '底图', img: baseMapIcon },
          { label: '专题', img: specialIcon }
        ]"
        :key="item.label"
        :class="['first_item', { first_active: firstMenuSelection === item.label }]"
        @click="changeFirstMenuSelection(item.label)">
        <img :src="item.img" />
        {{ item.label }}
      </div>
      <div class="second_menu" v-if="firstMenuSelection">
        <template v-if="firstMenuSelection === '定位'">
          <div class="second_item" @click="initialMapPerspective">
            <SvgIcon :size="16" icon="sight-bead" />
            地图初始视角
          </div>
          <div class="second_item">
            <SvgIcon :size="18" icon="compass" />
            <admn-select style="width: 180px" v-model="adcd" placeholder="广东省" size="small" clearable @change="changeAdcd" @visibleChange="visibleChange" />
          </div>
          <div class="second_item">
            <SvgIcon :size="18" icon="whole-world" />
            <div>
              <el-input style="width: 112px" v-model="longitude" placeholder="经度" size="small"></el-input>
              <br />
              <el-input style="width: 112px; margin-top: 4px" v-model="latitude" placeholder="纬度" size="small"></el-input>
            </div>
            <el-button type="primary" size="small" @click="positioning">定位</el-button>
          </div>
        </template>
        <template v-else-if="firstMenuSelection === '工具'">
          <div class="second_item" :class="{ second_active: secondMenuSelection === '距离测量' }" @click="measureDistance">
            <SvgIcon :size="16" icon="ruler" />
            距离测量
          </div>
          <div class="second_item" :class="{ second_active: secondMenuSelection === '面积测量' }" @click="measureArea">
            <SvgIcon :size="16" icon="polygon" />
            面积测量
          </div>
          <div class="second_item" @click="cleanUp">
            <SvgIcon :size="16" icon="clear" />
            清除
          </div>
        </template>
        <template v-else-if="firstMenuSelection === '底图'">
          <div class="base_map_wrapper">
            <div
              v-for="item in [
                { label: '矢量底图', img: vec_c },
                { label: '影像底图', img: img_c },
                { label: '地形晕渲', img: ter_c },
                { label: '影像注记', img: cia_c }
              ]"
              :key="item.label"
              :class="['base_map_item', { active: baseMapSelection === item.label }]"
              @click="_changeBaseMap(item.label)">
              <img :src="item.img" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>
        <template v-else-if="firstMenuSelection === '专题'">
          <div class="second_item">专题功能开发中...</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import globalConfig from '@/config.js'
import GeoJSON from 'ol/format/GeoJSON'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Fill } from 'ol/style'
import { changeBaseMap, draw, removeLayer } from '@/utils/map.js'
import locationIcon from './mapToolIcon/location.png'
import toolIcon from './mapToolIcon/tool.png'
import baseMapIcon from './mapToolIcon/base-map.png'
import specialIcon from './mapToolIcon/special.png'
import vec_c from './mapToolIcon/vec_c.png'
import img_c from './mapToolIcon/img_c.png'
import ter_c from './mapToolIcon/ter_c.png'
import cia_c from './mapToolIcon/cia_c.png'

const props = defineProps({
  map: {
    required: true
  },
  viewAdaptBoundary: {
    type: Boolean,
    default: false
  },
  adaptPadding: {
    type: Array,
    default: () => [0, 0, 0, 0]
  }
})

const toolboxSelection = ref(false)
const closeToolbox = () => {
  if (!panelVisible.value && !['', '距离测量', '面积测量'].includes(secondMenuSelection.value)) toolboxSelection.value = false
}
watch(
  () => toolboxSelection.value,
  (val) => {
    if (!val) changeFirstMenuSelection()
  }
)

const firstMenuSelection = ref()
const changeFirstMenuSelection = (val) => {
  firstMenuSelection.value = firstMenuSelection.value === val ? null : val
}
watch(
  () => firstMenuSelection.value,
  (val) => {
    changeSecondMenuSelection()
    if (!val) console.log(val)
  }
)

const secondMenuSelection = ref()
const changeSecondMenuSelection = (val) => {
  secondMenuSelection.value = val
}
watch(
  () => secondMenuSelection.value,
  (val) => {
    if (!val) console.log(val)
  }
)

const initialMapPerspective = () => {
  changeSecondMenuSelection('地图初始视角')
  if (props.viewAdaptBoundary) {
    props.map.getView().fit(new GeoJSON().readFeatures(globalConfig.map.provinceLevelBoundary)[0].getGeometry(), { padding: props.adaptPadding, duration: 300 })
  } else {
    props.map.getView().animate({
      center: globalConfig.map.center,
      zoom: globalConfig.map.defaultZoom,
      duration: 300
    })
  }
}

const adcd = ref('')
const selectedAdmnLayer = ref()
const changeAdcd = (adcd, level) => {
  changeSecondMenuSelection('行政区划定位')
  if (selectedAdmnLayer.value) props.map.removeLayer(selectedAdmnLayer.value)
  if (!adcd) {
    initialMapPerspective()
  } else if (level == 1) {
    addSelectedAdmnLayer(new GeoJSON().readFeatures(globalConfig.map.provinceLevelBoundary)[0])
  } else if (level == 2) {
    addSelectedAdmnLayer(new GeoJSON().readFeatures(globalConfig.map.cityLevelBoundary).find((e) => e.values_.code == adcd))
  } else if (level == 3) {
    addSelectedAdmnLayer(new GeoJSON().readFeatures(globalConfig.map.villageLevelBoundary).find((e) => e.values_.code == adcd + '000000'))
  }
  function addSelectedAdmnLayer(feature) {
    selectedAdmnLayer.value = new VectorLayer({
      source: new VectorSource({
        features: [feature]
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(54, 178, 158, 0.5)'
        })
      })
    })
    props.map.addLayer(selectedAdmnLayer.value)
    props.map.getView().fit(feature.getGeometry(), { padding: props.adaptPadding, duration: 300 })
  }
}
const panelVisible = ref(false)
const visibleChange = (val) => {
  panelVisible.value = val
}

const longitude = ref('')
const latitude = ref('')
const positioning = () => {
  changeSecondMenuSelection('经纬度定位')
  if (longitude.value && latitude.value) {
    props.map.getView().animate({
      center: [longitude.value, latitude.value],
      duration: 300
    })
  }
}

const measureDistance = () => {
  changeSecondMenuSelection('距离测量')
  draw(props.map, '距离测量', 'LineString', true, () => {
    changeSecondMenuSelection('')
  })
}

const measureArea = () => {
  changeSecondMenuSelection('面积测量')
  draw(props.map, '面积测量', 'Polygon', true, () => {
    changeSecondMenuSelection('')
  })
}

const cleanUp = () => {
  changeSecondMenuSelection('清除')
  removeLayer(props.map, '距离测量')
  removeLayer(props.map, '面积测量')
}

const baseMapSelection = ref('')
const _changeBaseMap = (val) => {
  changeSecondMenuSelection('切换底图')
  baseMapSelection.value = val
  changeBaseMap(props.map, val)
}
</script>

<style scoped lang="scss">
.toolbox {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background: linear-gradient(180deg, #eeeeee 0%, #ffffff 100%);
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(21, 24, 29, 0.3);
  cursor: pointer;
  .inner_cube {
    width: 35%;
    height: 35%;
    border-radius: 3px;
    &:nth-child(1),
    &:nth-child(4) {
      background: #dcdcdc;
    }
    &:nth-child(2),
    &:nth-child(3) {
      background: #c5c5c5;
    }
    &:nth-child(2) {
      transform: rotate(30deg);
    }
  }
  &:hover {
    background: linear-gradient(180deg, #d3eaff 0%, #ffffff 100%);
  }
  &:hover,
  &.active {
    .inner_cube {
      &:nth-child(1),
      &:nth-child(4) {
        background: rgba(62, 160, 254, 0.8);
      }
      &:nth-child(2),
      &:nth-child(3) {
        background: linear-gradient(180deg, #39affd 0%, #477fff 100%);
      }
    }
  }
}
.first_menu {
  position: absolute;
  left: 0px;
  bottom: calc(100% + 20px);
  border-radius: 2px;
  background: linear-gradient(180deg, #eeeeee 0%, #ffffff 100%);
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(21, 24, 29, 0.3);
  padding: 12px 0;
  cursor: auto;
  .first_item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 4px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0px;
    text-wrap: nowrap;
    color: #999999;
    padding: 0 12px;
    cursor: pointer;
    > img {
      width: 20px;
      height: 20px;
    }
    + .first_item {
      margin-top: 12px;
    }
    &:hover {
      color: #1890ff;
    }
    &.first_active {
      position: relative;
      color: #1890ff;
      font-weight: bold;
      background: #e7e7e7;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -2px;
        height: 2px;
        background: #e7e7e7;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 2px;
        background: #e7e7e7;
      }
    }
  }
}
.second_menu {
  position: absolute;
  bottom: -0.5px;
  left: calc(100% + 4px);
  border-radius: 2px;
  background: linear-gradient(180deg, #eeeeee 0%, #ffffff 100%);
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(21, 24, 29, 0.3);
  padding: 12px 0;
  cursor: auto;
  .second_item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0px;
    text-wrap: nowrap;
    color: #999999;
    padding: 0 12px;
    cursor: pointer;
    + .second_item {
      margin-top: 12px;
    }
    .svg-icon {
      color: #999999;
    }
    &:hover {
      color: #1890ff;
      .svg-icon {
        color: #1890ff;
      }
    }
    &.second_active {
      position: relative;
      color: #1890ff;
      background: #e7e7e7;
      > svg {
        color: #1890ff;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -2px;
        height: 2px;
        background: #e7e7e7;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 2px;
        background: #e7e7e7;
      }
    }
  }
  .base_map_wrapper {
    display: flex;
    gap: 12px;
    padding: 0 12px;
    .base_map_item {
      position: relative;
      width: 120px;
      height: 120px;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
      }
      > span {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 24px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0px;
        color: #ffffff;
      }
      &:hover {
        > span {
          background: rgba(24, 144, 255, 0.5);
        }
      }
      &.active {
        border: 2px solid #1890ff;
        > span {
          background: rgba(24, 144, 255, 0.5);
        }
      }
    }
  }
}
</style>
