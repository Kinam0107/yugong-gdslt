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
    <el-checkbox v-model="hsfxChecked" label="洪水风险图">
      <i class="cube" style="background-image: linear-gradient(180deg, #0453de 0%, #fffe39 27%, #ff9e24 59%, #fc0106 100%)"></i>
      <span>洪水风险图</span>
    </el-checkbox>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Image from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'

const props = defineProps({
  map: {
    required: true
  }
})

onMounted(() => {
  props.map.on('singleclick', (event) => {
    const viewResolution = props.map.getView().getResolution()
    const url = sqsxLayer.getSource().getFeatureInfoUrl(
      event.coordinate,
      viewResolution,
      'EPSG:4326',
      { INFO_FORMAT: 'application/geojson' } // 或者 'text/html' 或 'text/plain'
    )
    if (url) {
      axios.get(url).then((res) => {
        const properties = res.data?.features?.[0]?.properties
        console.log(properties)
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
const hsfxChecked = ref(false)
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
