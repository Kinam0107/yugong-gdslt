<template>
  <div class="auxiliary_info">
    <el-checkbox v-model="sqsxChecked" label="三区三线" @change="sqsxCheckedChange" />
    <br />
    <el-checkbox v-model="sthxChecked" label="生态红线" />
    <br />
    <el-checkbox v-model="hdsxChecked" label="河道水系" />
    <br />
    <el-checkbox v-model="hsfxChecked" label="洪水风险图" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vector as VectorLayer, Group as GroupLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'
import sqsx1 from '@/assets/geoJson/CZKFBJ.json'
import sqsx2 from '@/assets/geoJson/STBHHX.json'
import sqsx3 from '@/assets/geoJson/YJJBNTBHTB.json'

const props = defineProps({
  map: {
    required: true
  }
})

const sqsxChecked = ref(false)
const sthxChecked = ref(false)
const hdsxChecked = ref(false)
const hsfxChecked = ref(false)

let sqsxLayer = new GroupLayer({
  layers: [
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(sqsx1)
      }),
      style: new Style({
        fill: new Fill({ color: 'transparent' }),
        stroke: new Stroke({ color: 'red', width: 1 })
      })
    }),
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(sqsx2)
      }),
      style: new Style({
        fill: new Fill({ color: 'transparent' }),
        stroke: new Stroke({ color: 'yellow', width: 1 })
      })
    }),
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(sqsx3)
      }),
      style: new Style({
        fill: new Fill({ color: 'transparent' }),
        stroke: new Stroke({ color: 'blue', width: 1 })
      })
    })
  ]
})
const sqsxCheckedChange = (val) => {
  if (val) {
    props.map.addLayer(sqsxLayer)
  } else {
    props.map.removeLayer(sqsxLayer)
  }
}
</script>

<style scoped lang="scss">
.auxiliary_info {
  padding: 12px;
  border-radius: 2px;
  background: rgba(0, 15, 29, 0.6);
  border: 1px solid rgba(133, 243, 255, 0.3);
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
}
:deep(.el-checkbox__label) {
  font-size: 16px;
}
:deep(.el-checkbox__inner) {
  background-color: transparent;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: $color-primary;
  &::after {
    border-color: #0431a0;
    border-width: 2px;
  }
}
</style>
