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
      <span>河道水系</span>
    </el-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'

const props = defineProps({
  map: {
    required: true
  }
})

const isIndeterminate = ref(false)
const sqsxChecked = ref(false)
const sqsxCheckedChange = (val) => {
  if (val) {
    czkfbjChecked.value = true
    stbhhxChecked.value = true
    yjjbntbhhxChecked.value = true
    czkfbjCheckedChange(true)
    stbhhxCheckedChange(true)
    yjjbntbhhxCheckedChange(true)
  } else {
    czkfbjChecked.value = false
    stbhhxChecked.value = false
    yjjbntbhhxChecked.value = false
    czkfbjCheckedChange(false)
    stbhhxCheckedChange(false)
    yjjbntbhhxCheckedChange(false)
  }
}

let czkfbjLayer
const czkfbjChecked = ref(false)
const czkfbjCheckedChange = (val) => {
  if (val) {
    if (yjjbntbhhxChecked.value && stbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    if (czkfbjLayer) props.map.removeLayer(czkfbjLayer)
    fetch('/geoJson/CZKFBJ.json')
      .then((response) => response.json())
      .then((res) => {
        czkfbjLayer = new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(res)
          }),
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: '#06D862', width: 1 })
          })
        })
        props.map.addLayer(czkfbjLayer)
      })
  } else {
    if (!yjjbntbhhxChecked.value && !stbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    props.map.removeLayer(czkfbjLayer)
    czkfbjLayer = null
  }
}

let yjjbntbhhxLayer
const yjjbntbhhxChecked = ref(false)
const yjjbntbhhxCheckedChange = (val) => {
  if (val) {
    if (czkfbjChecked.value && stbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    if (yjjbntbhhxLayer) props.map.removeLayer(yjjbntbhhxLayer)
    fetch('/geoJson/YJJBNTBHTB.json')
      .then((response) => response.json())
      .then((res) => {
        yjjbntbhhxLayer = new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(res)
          }),
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: '#FF784A', width: 1 })
          })
        })
        props.map.addLayer(yjjbntbhhxLayer)
      })
  } else {
    if (!czkfbjChecked.value && !stbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    props.map.removeLayer(yjjbntbhhxLayer)
    yjjbntbhhxLayer = null
  }
}

let stbhhxLayer
const stbhhxChecked = ref(false)
const stbhhxCheckedChange = (val) => {
  if (val) {
    if (czkfbjChecked.value && yjjbntbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    if (stbhhxLayer) props.map.removeLayer(stbhhxLayer)
    fetch('/geoJson/STBHHX.json')
      .then((response) => response.json())
      .then((res) => {
        stbhhxLayer = new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(res)
          }),
          style: new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color: '#FF0000', width: 1 })
          })
        })
        props.map.addLayer(stbhhxLayer)
      })
  } else {
    if (!czkfbjChecked.value && !yjjbntbhhxChecked.value) {
      isIndeterminate.value = false
    } else {
      isIndeterminate.value = true
    }
    props.map.removeLayer(stbhhxLayer)
    stbhhxLayer = null
  }
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
