<template>
  <div class="map-container-wrapper">
    <div ref="olMap" class="map-container"></div>
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
import { ref, onMounted, nextTick } from 'vue'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { Vector as VectorLayer, Group as GroupLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { getVectorContext } from 'ol/render'
import { Style, Fill, Stroke, Text } from 'ol/style'
import { defaults as defaultControls } from 'ol/control'
import { defaults as defaultInteractions } from 'ol/interaction'
import 'ol/ol.css'
import globalConfig from '@/config.js'

const props = defineProps({
  baseMapMode: {
    type: String,
    default: '影像底图',
    validator: (val) => ['地形晕渲', '影像底图', '矢量底图', '影像注记'].includes(val)
  },
  hideMapOutsideBoundary: {
    type: Boolean,
    default: false
  },
  hideProvinceBoundary: {
    type: Boolean,
    default: false
  },
  hideCityBoundary: {
    type: Boolean,
    default: false
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

const emits = defineEmits(['initFinished', 'singleClick', 'doubleClick', 'mouseMove', 'moveEnd'])

let map
const olMap = ref()

onMounted(() => {
  initMap()
})

const initMap = () => {
  const baseUrl = {
    地形晕渲: 'https://t3.tianditu.gov.cn/DataServer?T=ter_c&X={x}&Y={y}&L={z}&tk=',
    影像底图: 'https://t0.tianditu.gov.cn/DataServer?T=img_c&X={x}&Y={y}&L={z}&tk=',
    矢量底图: 'https://t0.tianditu.gov.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}&tk=',
    影像注记: 'https://t3.tianditu.gov.cn/DataServer?T=cia_c&X={x}&Y={y}&L={z}&tk='
  }
  const baseLayer = new TileLayer({
    source: new XYZ({
      url: baseUrl[props.baseMapMode] + globalConfig.map.secretKey,
      projection: 'EPSG:4326'
    })
  })
  if (props.hideMapOutsideBoundary) handleHideMapOutsideBoundary(baseLayer)
  map = new Map({
    target: olMap.value,
    layers: [baseLayer],
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
  if (!props.hideCityBoundary) drawCityLevelBoundary()
  if (!props.hideProvinceBoundary) drawProvinceLevelBoundary()
  if (props.viewAdaptBoundary) map.getView().fit(new GeoJSON().readFeatures(globalConfig.map.provinceLevelBoundary)[0].getGeometry(), { padding: props.adaptPadding, duration: 300 })
  map.on('singleclick', mapSingleClick)
  map.on('dblclick', mapDoubleClick)
  map.on('pointermove', mapPointerMove)
  map.on('moveend', mapMoveEnd)
  nextTick(() => {
    emits('initFinished', map)
  })
}

const handleHideMapOutsideBoundary = (baseLayer) => {
  const clipLayer = new VectorLayer({
    projection: 'EPSG:4326',
    source: new VectorSource({
      features: new GeoJSON().readFeatures(globalConfig.map.provinceLevelBoundary),
      featureProjection: 'EPSG:4326'
    })
  })
  baseLayer.on('postrender', function (e) {
    e.context.globalCompositeOperation = 'destination-in'
    clipLayer.getSource().forEachFeature(function (feature) {
      getVectorContext(e).drawFeature(feature, new Style({ fill: new Fill({ color: '#000' }) }))
    })
    e.context.globalCompositeOperation = 'source-over'
  })
}

const drawProvinceLevelBoundary = () => {
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(globalConfig.map.provinceLevelBoundary)
  })
  map.addLayer(
    new GroupLayer({
      layers: [
        new VectorLayer({
          id: 'provinceLevelBoundary1',
          source: vectorSource,
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: 'rgba(0, 73, 255, 0.2)', width: 7 })
          })
        }),
        new VectorLayer({
          id: 'provinceLevelBoundary2',
          source: vectorSource,
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: 'rgba(0, 126, 255, 0.4)', width: 3 })
          })
        }),
        new VectorLayer({
          id: 'provinceLevelBoundary3',
          source: vectorSource,
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: 'rgba(0, 213, 255, 1)', width: 2, lineDash: [4, 8, 0, 8] })
          })
        })
      ]
    })
  )
}

const drawCityLevelBoundary = () => {
  const cityLevelBoundaryLayer = new VectorLayer({
    id: 'cityLevelBoundary',
    source: new VectorSource({
      features: new GeoJSON().readFeatures(globalConfig.map.cityLevelBoundary)
    }),
    style: (feature) => {
      return new Style({
        fill: new Fill({ color: 'transparent' }),
        stroke: new Stroke({ color: '#00BAFF', width: 1 }),
        text: new Text({
          text: feature.values_['地名'],
          font: 'normal 14px 微软雅黑',
          fill: new Fill({ color: '#94E8FF' }),
          padding: [1, 2, 1, 2]
        })
      })
    }
  })
  cityLevelBoundaryLayer.on('prerender', (evt) => {
    evt.context.shadowBlur = 1
    evt.context.shadowOffsetY = 2
    evt.context.shadowColor = 'rgba(0, 4, 114, 1)'
  })
  cityLevelBoundaryLayer.on('postrender', (evt) => {
    evt.context.shadowBlur = 0
    evt.context.shadowOffsetY = 0
    evt.context.shadowColor = 'rgba(0, 4, 114, 1)'
  })
  map.addLayer(cityLevelBoundaryLayer)
}

const mapSingleClick = (evt) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer.get('layerName')) {
      return feat
    } else if (layer.get('clusterLayerName') && feat.get('features').length == 1) {
      return feat.get('features')[0]
    }
  })
  const cityFeature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer.get('id') === 'cityLevelBoundary') {
      return feat
    }
  })
  emits('singleClick', {
    coordinate: evt.coordinate,
    featData: feature?.get('data'),
    cityFeature: cityFeature
  })
}

const mapDoubleClick = (evt) => {
  emits('doubleClick', {
    coordinate: evt.coordinate
  })
}

const mapPointerMove = (evt) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer.get('layerName')) {
      return feat
    } else if (layer.get('clusterLayerName') && feat.get('features').length == 1) {
      return feat.get('features')[0]
    }
  })
  const cityFeature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
    if (layer.get('id') === 'cityLevelBoundary') {
      return feat
    }
  })
  emits('mouseMove', {
    coordinate: evt.coordinate,
    featData: feature?.get('data'),
    cityFeature: cityFeature
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
  &.default {
    top: 0;
    left: 0;
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
