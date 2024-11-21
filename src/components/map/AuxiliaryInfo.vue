<template>
  <div class="auxiliary_info">
    <el-checkbox v-model="sqsxChecked" :indeterminate="isIndeterminate" label="三区三线" @change="sqsxCheckedChange" />
    <br />
    <el-checkbox v-model="czkfbjChecked" @change="czkfbjCheckedChange" style="margin-left: 22px">
      <i class="line" style="background-color: #06d862"></i>
      <span>城镇开发边界</span>
    </el-checkbox>
    <br />
    <el-checkbox v-model="yjjbntbhhxChecked" @change="yjjbntbhhxCheckedChange" style="margin-left: 22px">
      <i class="line" style="background-color: #ff784a"></i>
      <span>永久基本农田保护红线</span>
    </el-checkbox>
    <br />
    <el-checkbox v-model="stbhhxChecked" @change="stbhhxCheckedChange" style="margin-left: 22px">
      <i class="line" style="background-color: #ff0000"></i>
      <span>生态保护红线</span>
    </el-checkbox>
    <br />
    <el-checkbox v-model="hdsxChecked">
      <i class="line" style="background-color: #00c6ff"></i>
      <span>河道水系</span>
    </el-checkbox>
    <br />
    <!-- <el-checkbox v-model="hsfxChecked" label="洪水风险图">
      <i class="cube" style="background-image: linear-gradient(180deg, #0453de 0%, #fffe39 27%, #ff9e24 59%, #fc0106 100%)"></i>
      <span>洪水风险图</span>
    </el-checkbox> -->
    <div ref="featureOverlay">
      <template v-if="showFeatureOverlay">
        <PopupBox @close="closeFeatureOverlay">
          <template v-if="featureOverlayData.GHFQMC">
            <div class="item">
              <span class="label">规划分区：</span>
              <span class="value">{{ featureOverlayData.GHFQMC || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">面积：</span>
              <span class="value">{{ featureOverlayData.MJ || '-' }}m²</span>
            </div>
          </template>
          <template v-else-if="featureOverlayData.DLMC">
            <div class="item">
              <span class="label">地类：</span>
              <span class="value">{{ featureOverlayData.DLMC || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">权属单位：</span>
              <span class="value">{{ featureOverlayData.QSDWMC || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">永久基本农田图斑面积：</span>
              <span class="value">{{ featureOverlayData.YJJBNTTBMJ || '-' }}m²</span>
            </div>
            <div class="item">
              <span class="label">扣除面积：</span>
              <span class="value">{{ featureOverlayData.KCMJ || '-' }}m²</span>
            </div>
            <div class="item">
              <span class="label">永久基本农田面积：</span>
              <span class="value">{{ featureOverlayData.YJJBNTMJ || '-' }}m²</span>
            </div>
            <div class="item">
              <span class="label">耕地类型：</span>
              <span class="value">{{ featureOverlayData.GDLX === 'TT' ? '梯田' : featureOverlayData.GDLX === 'PD' ? '坡地' : featureOverlayData.GDLX || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">种植属性：</span>
              <span class="value">{{ featureOverlayData.ZZSXMC || '-' }}</span>
            </div>
          </template>
          <template v-else-if="featureOverlayData.HXMC">
            <div class="item">
              <span class="value">{{ featureOverlayData.HXMC || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">红线类型：</span>
              <span class="value">{{ featureOverlayData.HXLX || '-' }}</span>
            </div>
            <div class="item">
              <span class="label">面积：</span>
              <span class="value">{{ featureOverlayData.MJ || '-' }}m²</span>
            </div>
          </template>
        </PopupBox>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Image from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import PopupBox from '@/components/map/PopupBox.vue'
import { renderPositionOverlay, removeLayer } from '@/utils/map'

const props = defineProps({
  map: {
    required: true
  }
})

const featureOverlay = ref()
const showFeatureOverlay = ref(false)
const featureOverlayData = ref({})
const openFeatureOverlay = (data, coordinate) => {
  featureOverlayData.value = data
  showFeatureOverlay.value = true
  renderPositionOverlay(props.map, '区域信息', { coordinate }, featureOverlay.value)
}
const closeFeatureOverlay = () => {
  featureOverlayData.value = {}
  showFeatureOverlay.value = false
  removeLayer(props.map, '区域信息')
}
onMounted(() => {
  props.map.on('singleclick', (event) => {
    const feature = props.map.forEachFeatureAtPixel(event.pixel, (feat, layer) => {
      if (layer?.get('layerName')) {
        return feat
      } else if (layer?.get('clusterLayerName') && feat.get('features').length == 1) {
        return feat.get('features')[0]
      }
    })
    if (feature) {
      closeFeatureOverlay()
      return
    }
    const viewResolution = props.map.getView().getResolution()
    const url = sqsxLayer.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:4326', { INFO_FORMAT: 'application/geojson' })
    if (url) {
      axios.get(url).then((res) => {
        const properties = res.data?.features?.[0]?.properties
        if (properties) {
          openFeatureOverlay(properties, event.coordinate)
        } else {
          closeFeatureOverlay()
        }
      })
    }
  })
})

// 加载三区三线图层
let sqsxSource
let sqsxLayer
const renderSqsxLayer = () => {
  const LAYERS = []
  if (yjjbntbhhxChecked.value) LAYERS.push('0')
  if (stbhhxChecked.value) LAYERS.push('1')
  if (czkfbjChecked.value) LAYERS.push('2')
  if (!sqsxLayer) {
    sqsxSource = new ImageWMS({
      url: 'https://webgis.ygwjg.com/arcgis/services/yiwu/sqsx/MapServer/WmsServer?',
      params: {
        FORMAT: 'image/png',
        LAYERS: LAYERS.join()
      },
      crossOrigin: 'anonymous'
    })
    sqsxLayer = new Image({
      source: sqsxSource
    })
    props.map.addLayer(sqsxLayer)
  } else {
    if (LAYERS.length) {
      sqsxSource.updateParams({
        LAYERS: LAYERS.join()
      })
    } else {
      props.map.removeLayer(sqsxLayer)
      sqsxLayer = null
      sqsxSource = null
    }
  }
}

const isIndeterminate = ref(false)
const sqsxChecked = ref(false)
const sqsxCheckedChange = (val) => {
  if (val) {
    czkfbjChecked.value = true
    stbhhxChecked.value = true
    yjjbntbhhxChecked.value = true
    isIndeterminate.value = false
  } else {
    czkfbjChecked.value = false
    stbhhxChecked.value = false
    yjjbntbhhxChecked.value = false
    isIndeterminate.value = false
  }
  renderSqsxLayer()
}

const czkfbjChecked = ref(false)
const czkfbjCheckedChange = (val) => {
  if (val) {
    if (yjjbntbhhxChecked.value && stbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = true
    } else {
      isIndeterminate.value = true
    }
  } else {
    if (!yjjbntbhhxChecked.value && !stbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = false
    } else {
      isIndeterminate.value = true
    }
  }
  renderSqsxLayer()
}

const yjjbntbhhxChecked = ref(false)
const yjjbntbhhxCheckedChange = (val) => {
  if (val) {
    if (czkfbjChecked.value && stbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = true
    } else {
      isIndeterminate.value = true
    }
  } else {
    if (!czkfbjChecked.value && !stbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = false
    } else {
      isIndeterminate.value = true
    }
  }
  renderSqsxLayer()
}

const stbhhxChecked = ref()
const stbhhxCheckedChange = (val) => {
  if (val) {
    if (czkfbjChecked.value && yjjbntbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = true
    } else {
      isIndeterminate.value = true
    }
  } else {
    if (!czkfbjChecked.value && !yjjbntbhhxChecked.value) {
      isIndeterminate.value = false
      sqsxChecked.value = false
    } else {
      isIndeterminate.value = true
    }
  }
  renderSqsxLayer()
}

const hdsxChecked = ref(false)
// const hsfxChecked = ref(false)
</script>

<style scoped lang="scss">
.auxiliary_info {
  padding: 12px;
  border-radius: 2px;
  background: rgba(0, 15, 29, 0.6);
  border: 1px solid rgba(133, 243, 255, 0.3);
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
  :deep(.el-checkbox) {
    margin-right: 0;
  }
  :deep(.el-checkbox__label) {
    display: flex;
    align-items: center;
    > i {
      display: inline-block;
      width: 12px;
      margin-right: 8px;
      &.line {
        height: 4px;
      }
      &.cube {
        height: 12px;
      }
    }
    > span {
      font-size: 16px;
    }
  }
}
</style>
