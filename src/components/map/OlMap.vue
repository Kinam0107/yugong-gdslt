<template>
  <div class="map-container-wrapper">
    <div ref="olMap" class="map-container"></div>
    <div class="slot-wrapper back">
      <slot name="back"></slot>
    </div>
    <div class="slot-wrapper default">
      <slot name="default"></slot>
    </div>
    <div class="slot-wrapper legend">
      <slot name="legend"></slot>
    </div>
    <div class="slot-wrapper toolbox">
      <slot name="toolbox"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'
import { defaults as defaultControls } from 'ol/control'
import { defaults as defaultInteractions } from 'ol/interaction'
import 'ol/ol.css'
import globalConfig from '@/config.js'
import { changeBaseMap, changeCursor } from '@/utils/map.js'

const props = defineProps({
  baseMapMode: {
    type: String,
    default: '影像图',
    validator: (val) => ['影像图', '水利图'].includes(val)
  },
  hideProvinceBoundary: {
    type: Boolean,
    default: false
  },
  adaptPadding: {
    type: [Boolean, Array],
    default: false
  }
})

const emits = defineEmits(['initFinished', 'singleClick', 'doubleClick', 'mouseMove', 'moveEnd'])

let map
const olMap = ref()

watch(
  () => props.baseMapMode,
  (val) => {
    changeBaseMap(map, val)
  }
)

onMounted(() => {
  initMap()
})

const initMap = () => {
  const baseLayer_yxdt = new TileLayer({
    id: '影像图1',
    visible: props.baseMapMode === '影像图',
    source: new XYZ({
      url: 'https://t0.tianditu.gov.cn/DataServer?T=img_c&X={x}&Y={y}&L={z}&tk=' + globalConfig.map.secretKey,
      projection: 'EPSG:4326'
    })
  })
  const baseLayer_yxzj = new TileLayer({
    id: '影像图2',
    visible: props.baseMapMode === '影像图',
    source: new XYZ({
      url: 'https://t3.tianditu.gov.cn/DataServer?T=cia_c&X={x}&Y={y}&L={z}&tk=' + globalConfig.map.secretKey,
      projection: 'EPSG:4326'
    })
  })
  const baseLayer_zjwaterMap = new TileLayer({
    id: '水利图',
    visible: props.baseMapMode === '水利图',
    source: new XYZ({
      url: 'https://sldtpt.slt.zj.gov.cn/ZJSWZG/PBS/rest/services/WYX2021/MapServer/tile/{z}/{y}/{x}',
      projection: 'EPSG:4326'
    })
  })
  map = new Map({
    target: olMap.value,
    layers: [baseLayer_yxdt, baseLayer_yxzj, baseLayer_zjwaterMap],
    view: new View({
      projection: 'EPSG:4326',
      center: globalConfig.map.center,
      zoom: globalConfig.map.defaultZoom,
      maxZoom: globalConfig.map.maxZoom,
      minZoom: globalConfig.map.minZoom
    }),
    controls: defaultControls({ zoom: false }).extend([]),
    interactions: defaultInteractions({ doubleClickZoom: false })
  })
  if (!props.hideProvinceBoundary) drawywBoundary()
  if (props.adaptPadding) map.getView().fit(new GeoJSON().readFeatures(globalConfig.map.ywBoundary)[0].getGeometry(), { padding: props.adaptPadding, duration: 300 })
  map.on('singleclick', mapSingleClick)
  map.on('dblclick', mapDoubleClick)
  map.on('pointermove', mapPointerMove)
  map.on('moveend', mapMoveEnd)
  changeCursor(map)
  nextTick(() => {
    emits('initFinished', map)
  })
}

const drawywBoundary = () => {
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(globalConfig.map.ywBoundary)
  })
  map.addLayer(
    new VectorLayer({
      id: 'ywBoundary',
      source: vectorSource,
      style: new Style({
        fill: new Fill({ color: 'rgba(33, 154, 202, 0.1)' }),
        stroke: new Stroke({ color: 'rgba(33, 154, 202, 1)', width: 2 })
      })
    })
  )
}

const mapSingleClick = (evt) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer?.get('layerName')) {
      return feat
    } else if (layer?.get('clusterLayerName') && feat.get('features').length == 1) {
      return feat.get('features')[0]
    }
  })
  emits('singleClick', {
    coordinate: evt.coordinate,
    featureData: feature?.get('data')
  })
}

const mapDoubleClick = (evt) => {
  emits('doubleClick', {
    coordinate: evt.coordinate
  })
}

const mapPointerMove = (evt) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer?.get('layerName')) {
      return feat
    } else if (layer?.get('clusterLayerName') && feat.get('features').length == 1) {
      return feat.get('features')[0]
    }
  })
  emits('mouseMove', {
    coordinate: evt.coordinate,
    featureData: feature?.get('data')
  })
}

const mapMoveEnd = () => {
  emits('moveEnd', {
    zoom: map.getView().getZoom()
  })
}
</script>

<style scoped lang="scss">
.map-container-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.slot-wrapper {
  position: absolute;
  z-index: 1;
  &.back {
    top: 0;
    left: 0;
  }
  &.default {
    top: 0;
    right: 0;
  }
  &.legend {
    right: 0;
    bottom: 0;
  }
  &.toolbox {
    bottom: 0;
    left: 0;
  }
}
</style>
