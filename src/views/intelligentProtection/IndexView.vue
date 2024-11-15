<template>
  <ScreenLayout hiddenRight>
    <OlMap :baseMapMode="mapMode" :adaptPadding="mapPadding" @initFinished="mapInitFinished" @mouseMove="mapMouseMove" @singleClick="mapSingleClick">
      <el-input v-model="keyword" style="width: 216px; margin-bottom: 12px" size="large" placeholder="请输入水库名称搜索" clearable @change="getReservoirPoints">
        <template #suffix>
          <el-icon style="cursor: pointer" @change="getReservoirPoints"><Search /></el-icon>
        </template>
      </el-input>
      <br />
      <el-radio-group v-model="mapMode" style="width: 216px" size="large">
        <el-radio-button label="影像图" value="影像图" />
        <el-radio-button label="水利图" value="水利图" />
      </el-radio-group>
      <div ref="featureFloating">
        <template v-if="showFeatureFloating">
          <div class="reservoir_name">{{ floatingPointData.NAME }}</div>
        </template>
      </div>
      <template #legend>
        <LengedBox>
          <el-checkbox-group v-model="scaleArr" @change="drawReservoirPoints">
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
    <template #left>
      <div class="equi_title">
        <img src="@/assets/images/icons/equiTian.png" />
        <span>天</span>
      </div>
      <div class="equi_row">
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_ygyx.png" />
          <div class="label">遥感影像</div>
          <div class="data">
            <span class="value">{{ equiData.ygyxNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_qxwx.png" />
          <div class="label">气象卫星</div>
          <div class="data">
            <span class="value">{{ equiData.qxwxNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="equi_title">
        <img src="@/assets/images/icons/equiKong.png" />
        <span>空</span>
      </div>
      <div class="equi_row">
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_wrj.png" />
          <div class="label">无人机</div>
          <div class="data">
            <span class="value">{{ equiData.wrjNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_cyld.png" />
          <div class="label">测雨雷达</div>
          <div class="data">
            <span class="value">{{ equiData.cyldNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="equi_title">
        <img src="@/assets/images/icons/equiDi.png" />
        <span>地</span>
      </div>
      <div class="equi_row">
        <div class="equi_cell" :class="{ active: equiType === '视频' }" @click="changeEquiType('视频')">
          <img src="@/assets/images/icons/equi_sp.png" />
          <div class="label">视频</div>
          <div class="data">
            <span class="value">{{ equiData.spNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_znxj.png" />
          <div class="label">智能巡检</div>
          <div class="data">
            <span class="value">{{ equiData.xjNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell" :class="{ active: equiType === '雨水情' }" @click="changeEquiType('雨水情')">
          <img src="@/assets/images/icons/equi_ysq.png" />
          <div class="label">雨水情</div>
          <div class="data">
            <span class="value">{{ equiData.ysqNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="equi_row">
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_aqjc.png" />
          <div class="label">安全监测</div>
          <div class="data">
            <span class="value">{{ equiData.aqjcNum }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_wrc.png" />
          <div class="label">无人船</div>
          <div class="data">
            <span class="value">{{ '-' }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell" style="visibility: hidden"></div>
      </div>
      <div class="res_list_box" ref="listBox">
        <el-table :data="reservoirPoints" style="width: 100%" :height="listHeight" size="default" stripe @row-click="onRowClick">
          <el-table-column type="index" label="序号" width="55" align="center" />
          <template v-if="equiType === '视频'">
            <el-table-column prop="NAME" label="水库名称" min-width="100" align="center" />
            <el-table-column prop="spNum" label="视频(个)" width="80" align="center" />
            <el-table-column prop="todo" label="在线(个)" width="80" align="center" />
            <el-table-column prop="todo" label="离线(个)" width="80" align="center" />
          </template>
          <template v-else-if="equiType === '雨水情'">
            <el-table-column prop="NAME" label="水库名称" min-width="100" align="center" />
            <el-table-column prop="todo" label="雨量站" width="80" align="center" />
            <el-table-column prop="todo" label="水位站" width="80" align="center" />
          </template>
        </el-table>
      </div>
    </template>
    <template #cover>
      <VideoPopup v-model="videoVisible" :name="project_name" :prcd="project_prcd" />
    </template>
    <RainwaterSituation v-model="rainwaterVisible" :title="projectName" :prcd="projectPrcd" />
  </ScreenLayout>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import LengedBox from '@/components/map/LengedBox.vue'
import AuxiliaryInfo from '@/components/map/AuxiliaryInfo.vue'
import axios from '@/api/axios'
import { renderPoint, renderOverlay, removeLayer } from '@/utils/map'
import RainwaterSituation from '@/components/station/RainwaterSituation.vue'

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
const equiType = ref('视频')
const changeEquiType = (type) => {
  keyword.value = ''
  scaleArr.value = ['3', '4', '5']
  equiType.value = type
  getReservoirPoints()
  videoVisible.value = false
}
const reservoirPoints = ref([])
const getReservoirPoints = () => {
  let url = '/mgt/bm/reservoirMatrix/fourPower',
    params = { adcd: '330782000000' }
  if (equiType.value === '视频') {
    params.moduleType = '43'
    params.pointType = '45'
  } else if (equiType.value === '雨水情') {
    params.moduleType = '43'
    params.pointType = '47'
  }
  axios
    .rscp({
      url: url,
      method: 'post',
      data: params
    })
    .then((res) => {
      reservoirPoints.value = res.data || []
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
      .filter((e) => e.NAME.includes(keyword.value) && scaleArr.value.includes(e.project_scale))
      .map((e) => {
        e.longitude = e.LGTD
        e.latitude = e.LTTD
        e.dotStyleConf = {
          src: resScaleIcon[e.project_scale]
        }
        return e
      })
  )
}

/* 鼠标悬浮落点上是显示工程名称 */
const featureFloating = ref()
const floatingPointData = ref({})
const showFeatureFloating = ref(false)
const mapMouseMove = (e) => {
  if (e.featureData && e.featureData.layerName === '水库落点') {
    floatingPointData.value = e.featureData
    showFeatureFloating.value = true
    renderOverlay(map, '落点名称浮窗', e.featureData, featureFloating.value)
  } else {
    showFeatureFloating.value = false
    floatingPointData.value = {}
    removeLayer(map, '落点名称浮窗')
  }
}

/* 落点点击时跳转至单库详情大屏，单库落点点击时打开详情浮窗 */
const mapSingleClick = (e) => {
  console.log(e)
  if (e.featureData && e.featureData.layerName === '水库落点') {
    if (equiType.value === '视频') {
      openVideoPopup(e.featureData.NAME, e.featureData.PRCD)
    } else if (equiType.value === '雨水情') {
      openRainwaterDetail(e.featureData.NAME, e.featureData.PRCD)
    }
  }
}

/* 动态设置表格高度 */
const listBox = ref()
const listHeight = ref()
const getListHeight = () => {
  listHeight.value = listBox.value.clientHeight
}
onMounted(() => {
  getListHeight()
  window.addEventListener('resize', getListHeight)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', getListHeight)
})

/* 表格行点击打开对应窗口 */
const onRowClick = (row) => {
  if (equiType.value === '视频') {
    openVideoPopup(row.NAME, row.PRCD)
  } else if (equiType.value === '雨水情') {
    openRainwaterDetail(row.NAME, row.PRCD)
  }
}

/* 设备统计数据 */
const equiData = ref({})
const getEquiData = () => {
  axios
    .rscp({
      url: '/mgt/bm/reservoirMatrix/fourPower',
      method: 'post',
      data: {
        adcd: '330782000000',
        moduleType: '42'
      }
    })
    .then((res) => {
      equiData.value = res.data || {}
    })
    .catch(() => {
      equiData.value = {}
    })
}
onBeforeMount(() => {
  getEquiData()
})

/* 打开视频弹窗 */
const project_name = ref('')
const project_prcd = ref('')
const videoVisible = ref(false)
const openVideoPopup = (name, prcd) => {
  project_name.value = name
  project_prcd.value = prcd
  videoVisible.value = true
}

/* 打开水雨情弹窗 */
const projectName = ref('')
const projectPrcd = ref('')
const rainwaterVisible = ref(false)
const openRainwaterDetail = (name, prcd) => {
  projectName.value = name
  projectPrcd.value = prcd
  rainwaterVisible.value = true
}
</script>

<style scoped lang="scss">
:deep(.slot-wrapper.default) {
  top: 88px;
  right: 16px;
  @include mapOperate();
}
:deep(.slot-wrapper.legend) {
  right: 16px;
  bottom: 16px;
}
:deep(.slot-wrapper.toolbox) {
  left: 488px;
  bottom: 16px;
}
.equi_title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 172px;
  height: 30px;
  background-image: url(@/assets/images/equiTitleBg.png);
  margin: auto;
  > span {
    font-size: 16px;
    font-weight: 500;
  }
  &:nth-child(1) {
    margin-top: 13px;
  }
  + .equi_row {
    margin-top: 12px;
  }
}
.equi_row {
  display: flex;
  gap: 16px;
  padding: 0 15px;
  + .equi_title {
    margin-top: 20px;
  }
  + .equi_row {
    margin-top: 12px;
  }
  &:last-of-type {
    margin-bottom: 24px;
  }
}
.equi_cell {
  position: relative;
  flex: 1;
  height: 72px;
  border: 1px solid #419eff;
  cursor: pointer;
  &.active {
    background: linear-gradient(180deg, rgba(0, 140, 255, 0) 0%, rgba(0, 140, 255, 0.8) 100%);
  }
  > img {
    position: absolute;
    top: 17px;
    right: 12px;
  }
  .label {
    position: absolute;
    top: 10px;
    left: 12px;
    font-size: 16px;
    line-height: 24px;
  }
  .data {
    position: absolute;
    top: 36px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    .value {
      font-family: PangMenZhengDao;
      font-size: 20px;
      line-height: 24px;
      color: $color-primary;
    }
    .unit {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
.res_list_box {
  width: calc(100% - 30px);
  height: calc(100% - 515px);
  margin: 20px 15px 15px 15px;
}
.reservoir_name {
  height: 26px;
  padding: 0 8px;
  border-radius: 4px;
  background: #ffffff;
  font-size: 16px;
  line-height: 26px;
  color: #333333;
}
</style>
