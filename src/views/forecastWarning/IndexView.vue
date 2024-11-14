<template>
  <ScreenLayout hiddenRight>
    <OlMap :baseMapMode="mapMode" :adaptPadding="mapPadding" @initFinished="mapInitFinished">
      <el-input v-model="keyword" style="width: 216px; margin-bottom: 12px" size="large" placeholder="请输入水库名称搜索" clearable>
        <template #suffix>
          <el-icon style="cursor: pointer"><Search /></el-icon>
        </template>
      </el-input>
      <br />
      <el-radio-group v-model="mapMode" style="width: 216px" size="large">
        <el-radio-button label="影像图" value="影像图" />
        <el-radio-button label="水利图" value="水利图" />
      </el-radio-group>
      <template #legend>
        <LengedBox>
          <el-checkbox-group v-model="scaleArr">
            <el-checkbox label="3">
              <img src="@/assets/images/points/res3.png" />
              <span>中型</span>
            </el-checkbox>
            <el-checkbox label="4">
              <img src="@/assets/images/points/res4.png" />
              <span>小（1）型</span>
            </el-checkbox>
            <el-checkbox label="5">
              <img src="@/assets/images/points/res5.png" />
              <span>小（2）型</span>
            </el-checkbox>
          </el-checkbox-group>
        </LengedBox>
      </template>
      <template #toolbox>
        <AuxiliaryInfo v-if="map" :map="map" />
      </template>
    </OlMap>
  </ScreenLayout>
</template>

<script setup>
import { ref } from 'vue'
import LengedBox from '@/components/map/LengedBox.vue'
import AuxiliaryInfo from '@/components/map/AuxiliaryInfo.vue'
import axios from '@/api/axios'
import { renderPoint } from '@/utils/map'

/* 地图初始化后取得地图对象 */
const mapMode = ref('影像图')
const mapPadding = ref([120, 200, 40, 500])
let map = null
const mapInitFinished = (e) => {
  map = e
  getReservoirPoints()
}

/* 获取水库落点并在地图中绘制 */
const keyword = ref('')
const scaleArr = ref(['3', '4', '5'])
const reservoirPoints = ref([])
const getReservoirPoints = () => {
  axios
    .rscp({
      url: '/mgt/ml/waterdirectory/listJson',
      method: 'post',
      data: {
        type: '水库',
        adcd: '330782000000',
        queryStr: keyword.value,
        fetchAll: true
      }
    })
    .then((res) => {
      reservoirPoints.value = res.rows || []
    })
    .catch(() => {
      reservoirPoints.value = []
    })
    .finally(() => {
      drawReservoirPoints()
    })
}
const resScaleIcon = {
  3: new URL('@/assets/images/points/res3_large.png', import.meta.url).href,
  4: new URL('@/assets/images/points/res4.png', import.meta.url).href,
  5: new URL('@/assets/images/points/res5.png', import.meta.url).href
}
const drawReservoirPoints = () => {
  renderPoint(
    map,
    '水库落点',
    reservoirPoints.value
      .filter((e) => scaleArr.value.includes(e.projectScale))
      .map((e) => {
        e.longitude = e.lgtd
        e.latitude = e.lttd
        e.dotStyleConf = {
          src: resScaleIcon[e.projectScale]
        }
        return e
      })
  )
}
</script>

<style scoped lang="scss">
:deep(.slot-wrapper.default) {
  top: 88px;
  right: 16px;
  .el-input__wrapper {
    background: rgba(0, 15, 29, 0.6);
    border: 1px solid rgba(133, 243, 255, 0.3);
    box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
  }
  .el-radio-button {
    flex: 1;
    .el-radio-button__inner {
      width: 100%;
      background: rgba(0, 15, 29, 0.6);
      border: 1px solid rgba(133, 243, 255, 0.3);
      box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
      color: #ffffff;
    }
    &.is-active .el-radio-button__inner {
      background: linear-gradient(66deg, #0060ff 32%, #00e7ff 94%);
      border: none;
    }
  }
}
:deep(.slot-wrapper.legend) {
  right: 16px;
  bottom: 16px;
}
:deep(.slot-wrapper.toolbox) {
  left: 488px;
  bottom: 16px;
}
</style>
