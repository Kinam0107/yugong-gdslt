<template>
  <ScreenLayout :hiddenLeft="isProjectDetail" :hiddenRight="isProjectDetail">
    <OlMap :class="{ project_detail: isProjectDetail }" :baseMapMode="mapMode" :adaptPadding="mapPadding" @initFinished="mapInitFinished" @mouseMove="mapMouseMove" @singleClick="mapSingleClick">
      <el-input v-show="!isProjectDetail" v-model="keyword" style="width: 216px; margin-bottom: 12px" size="large" placeholder="请输入水库名称搜索" clearable @change="getReservoirPoints">
        <template #suffix>
          <el-icon style="cursor: pointer" @click="getReservoirPoints"><Search /></el-icon>
        </template>
      </el-input>
      <br v-show="!isProjectDetail" />
      <el-radio-group v-model="mapMode" style="width: 216px" size="large">
        <el-radio-button label="影像图" value="影像图" />
        <el-radio-button label="水利图" value="水利图" />
      </el-radio-group>
      <div ref="featureFloating">
        <template v-if="showFeatureFloating">
          <div class="reservoir_name">{{ floatingPointData.name }}</div>
        </template>
      </div>
      <div ref="featureOverlay">
        <template v-if="showFeatureOverlay">
          <PopupBox :title="overlayPointData.layerName === '水库落点' ? overlayPointData.name : ''" @close="closeFeatureOverlay">
            <template v-if="overlayPointData.layerName === '水库落点'">
              <div class="item">
                <span class="label">工程规模：</span>
                <span class="value">{{ overlayPointData.scale }}</span>
              </div>
              <div class="item">
                <span class="label">所在乡镇：</span>
                <span class="value">{{ overlayPointData.adcdnm }}</span>
              </div>
            </template>
            <template v-else-if="overlayPointData.layerName === '水位站'">
              <div class="item">
                <span class="label">{{ overlayPointData.name }}</span>
                <span class="detail" @click="openWaterLevelDetail(overlayPointData.id, overlayPointData.name)">详情</span>
              </div>
              <div class="item">
                <span class="label">当前水位：</span>
                <span class="value">{{ 128.34 }}m</span>
              </div>
              <div class="item">
                <span class="label">更新时间：</span>
                <span class="value">{{ new Date().format('yyyy-MM-dd HH:mm:ss') }}</span>
              </div>
            </template>
            <template v-else-if="overlayPointData.layerName === '雨量站'">
              <div class="item">
                <span class="label">{{ overlayPointData.name }}</span>
                <span class="detail" @click="openRainfallDetail(overlayPointData.id, overlayPointData.name)">详情</span>
              </div>
              <div class="item">
                <span class="label">累积雨量：</span>
                <span class="value">{{ 128.34 }}mm</span>
              </div>
              <div class="item">
                <span class="label">更新时间：</span>
                <span class="value">{{ new Date().format('yyyy-MM-dd HH:mm:ss') }}</span>
              </div>
            </template>
            <template v-else-if="overlayPointData.layerName === '视频站'">
              <div class="item">
                <span class="label">{{ overlayPointData.name }}</span>
                <span class="detail" @click="openMonitorPopup(overlayPointData.name, overlayPointData.cameraCode)">详情</span>
              </div>
              <div class="item">
                <span class="label">状态：</span>
                <span class="value">{{ overlayPointData.state == 1 ? '在线' : '离线' }}</span>
              </div>
            </template>
            <template v-else-if="overlayPointData.layerName === '安全监测'">
              <div class="item">
                <span class="label">{{ overlayPointData.name }}</span>
                <span class="detail" @click="openSafetyDetail(overlayPointData.id, overlayPointData.name)">详情</span>
              </div>
              <div class="item">
                <span class="label">观测值：</span>
                <span class="value">{{ 128.34 }}mm</span>
              </div>
              <div class="item">
                <span class="label">观测时间：</span>
                <span class="value">{{ new Date().format('yyyy-MM-dd HH:mm:ss') }}</span>
              </div>
              <div class="item">
                <span class="label">观测人员：</span>
                <span class="value">{{ '-' }}</span>
              </div>
            </template>
            <template v-else-if="overlayPointData.layerName === '重要设施' || overlayPointData.layerName === '重点对象'">
              <div class="item">
                <span class="label">{{ overlayPointData.name }}</span>
                <span class="detail" @click="openElementDetail(overlayPointData)">详情</span>
              </div>
              <div class="item">
                <span class="label">{{ overlayPointData.layerName }}：</span>
                <span class="value">{{ overlayPointData.facType }}</span>
              </div>
              <div class="item">
                <span class="label">位置：</span>
                <span class="value">{{ overlayPointData.facLoca == 1 ? '上游' : '下游' }}</span>
              </div>
              <div class="item">
                <span class="label">所在位置：</span>
                <span class="value">{{ overlayPointData.loc }}</span>
              </div>
            </template>
          </PopupBox>
        </template>
      </div>
      <template #back>
        <ExitSingleMode v-show="isProjectDetail" @quit="initPage" />
      </template>
      <template #legend>
        <LengedBox>
          <template v-if="!isProjectDetail">
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
          </template>
          <template v-else>
            <ProjectLegend />
          </template>
        </LengedBox>
      </template>
      <template #toolbox>
        <AuxiliaryInfo v-if="map" :map="map" />
      </template>
    </OlMap>
    <template #left>
      <div class="section_title">水库总览</div>
      <div class="pilot_reservoir qiao_xi" @click="enterReservoirDetail('330782022000521')">
        <div class="label">巧溪水库</div>
        <div class="tag">矩阵试点</div>
        <div class="scale">中型</div>
        <div class="address">苏溪镇</div>
      </div>
      <div class="pilot_reservoir long_men_jiao" @click="enterReservoirDetail('33d473fd-1c7b-11ea-8760-6c92bf66b1485e')">
        <div class="label">龙门脚水库</div>
        <div class="tag">矩阵试点</div>
        <div class="scale">小(1)型</div>
        <div class="address">大陈镇</div>
      </div>
      <div class="type_statistic">
        <div class="type_chart">
          <RingChart :data="typeStatistic" />
        </div>
        <div class="type_legend">
          <div v-for="(e, i) in typeStatistic" class="item" :key="i">
            <i :style="{ background: e.color }"></i>
            <span class="name">{{ e.name }}</span>
            <span class="value" :style="{ color: e.color }">{{ e.value }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="important_res_title">
        <CategoryTitle modelValue="重要水库" />
      </div>
      <div class="important_res_list">
        <div v-for="e in importantResList" :key="e.id" class="item" @click="openVideoPopup(e.name, e.prcd)">
          <el-image class="thumbnail" :src="e.projectSampleUri" />
          <div class="name">{{ e.name }}</div>
          <div class="scale">
            <SvgIcon :size="16" icon="reservoir" color="#46fdff" />
            <span>{{ e.scale }}</span>
          </div>
          <div class="desc">所在乡镇：{{ e.adcdnm || '-' }}</div>
          <div class="desc">总库容：{{ e.tatolStorage || '-' }}万m³</div>
        </div>
      </div>
    </template>
    <template #right>
      <div class="section_title">全要素掌握</div>
      <el-select class="res_select" v-model="prcd" filterable size="large">
        <el-option v-for="item in resOptions" :key="item.prcd" :label="item.name" :value="item.prcd" />
      </el-select>
      <div class="res_element">
        <div class="module_title" style="margin-bottom: 10px">库区要素</div>
        <CategoryTitle v-model="waterLevelType" :tabs="['正常蓄水位', '设计洪水位', '校核洪水位']" style="margin-bottom: 9px" />
        <div class="fence_style" style="margin-bottom: 10px">
          <div class="row" v-for="i in 2" :key="i">
            <template v-for="(item, index) in waterLevelInfluence.slice((i - 1) * 3, i * 3)" :key="item.label">
              <div class="col">
                <div class="label">{{ item.label }}</div>
                <div class="data">
                  <span class="value">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="spl" v-if="index < 2"></div>
            </template>
          </div>
        </div>
        <CategoryTitle modelValue="重要设施" style="margin-bottom: 3px" />
        <div class="desktop_style" style="margin-bottom: 10px">
          <div class="item" v-for="item in waterLevelImportantFacilities" :key="item.label">
            <img class="icon" :src="item.icon" />
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
        <CategoryTitle modelValue="重点对象" style="margin-bottom: 3px" />
        <div class="desktop_style" style="margin-bottom: 22px">
          <div class="item" v-for="item in waterLevelImportantObjects" :key="item.label">
            <img class="icon" :src="item.icon" />
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
        <div class="module_title" style="margin-bottom: 15px">下游要素</div>
        <div class="fence_style" style="margin-bottom: 10px">
          <div class="row" v-for="i in 2" :key="i">
            <template v-for="(item, index) in downstreamInfluence.slice((i - 1) * 3, i * 3)" :key="item.label">
              <div class="col">
                <div class="label">{{ item.label }}</div>
                <div class="data">
                  <span class="value">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="spl" v-if="index < 2"></div>
            </template>
          </div>
        </div>
        <CategoryTitle modelValue="重要设施" style="margin-bottom: 3px" />
        <div class="desktop_style" style="margin-bottom: 10px">
          <div class="item" v-for="item in downstreamImportantFacilities" :key="item.label">
            <img class="icon" :src="item.icon" />
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
        <CategoryTitle modelValue="重点对象" style="margin-bottom: 3px" />
        <div class="desktop_style">
          <div class="item" v-for="item in downstreamImportantObjects" :key="item.label">
            <img class="icon" :src="item.icon" />
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #cover>
      <VideoPopup v-model="videoVisible" :name="project_name" :prcd="project_prcd" :code="camera_code" />
    </template>
    <WaterLevelStation v-model="waterLevelStationVisible" :id="waterLevelStationId" :title="waterLevelStationName" />
    <RainfallStation v-model="rainfallStationVisible" :id="rainfallStationId" :title="rainfallStationName" />
    <SafetyStation v-model="safetyStationVisible" :id="safetyStationId" :title="safetyStationName" />
    <ElementPoint v-model="elementPointVisible" :info="elementPointInfo" />
  </ScreenLayout>
</template>

<script setup>
import { ref, onBeforeMount, watch, computed } from 'vue'
import RingChart from '@/components/chart/RingChart.vue'
import LengedBox from '@/components/map/LengedBox.vue'
import AuxiliaryInfo from '@/components/map/AuxiliaryInfo.vue'
import ExitSingleMode from '@/components/button/ExitSingleMode.vue'
import axios from '@/api/axios'
import { renderPoint, renderOverlay, removeLayer, gotoPoint, renderPolygon } from '@/utils/map.js'
import { useProjectStore } from '@/stores/projectStore.js'
import globalConfig from '@/config.js'
import GeoJSON from 'ol/format/GeoJSON'
import ProjectLegend from '@/components/map/ProjectLegend.vue'
import PopupBox from '@/components/map/PopupBox.vue'
import WaterLevelStation from '@/components/station/WaterLevelStation.vue'
import RainfallStation from '@/components/station/RainfallStation.vue'
import SafetyStation from '@/components/station/SafetyStation.vue'
import ElementPoint from '@/components/station/ElementPoint.vue'

/* 地图初始化后取得地图对象 */
const mapMode = ref('影像图')
const mapPadding = ref([120, 500, 40, 500])
let map = null
const mapInitFinished = (e) => {
  map = e
  initPage(true)
}
const initPage = (isFirst) => {
  if (isProjectDetail.value) {
    enterReservoirDetail(useProjectStore().prcd)
  } else {
    if (isFirst) {
      getReservoirPoints()
    } else {
      map.getView().fit(new GeoJSON().readFeatures(globalConfig.map.ywBoundary)[0].getGeometry(), { padding: mapPadding.value, duration: 100 })
      drawReservoirPoints()
      removeLayer(map, '管理范围线')
      removeLayer(map, '保护范围线')
      removeLayer(map, '水位站')
      removeLayer(map, '雨量站')
      removeLayer(map, '视频站')
      removeLayer(map, '安全监测')
      removeLayer(map, '重要设施')
      removeLayer(map, '重点对象')
      closeFeatureOverlay()
    }
  }
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

/* 鼠标悬浮落点上是显示工程名称 */
const featureFloating = ref()
const floatingPointData = ref({})
const showFeatureFloating = ref(false)
const mapMouseMove = (e) => {
  if (e.featureData && ['水库落点', '水位站', '雨量站', '视频站', '安全监测', '重要设施', '重点对象'].includes(e.featureData.layerName) && overlayPointData.value.name !== e.featureData.name) {
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
const featureOverlay = ref()
const overlayPointData = ref({})
const showFeatureOverlay = ref(false)
const mapSingleClick = (e) => {
  console.log(e)
  if (!isProjectDetail.value) {
    if (e.featureData && e.featureData.layerName === '水库落点') {
      enterReservoirDetail(e.featureData.prcd)
      openFeatureOverlay(e)
    }
  } else {
    if (e.featureData && ['水库落点', '水位站', '雨量站', '视频站', '安全监测', '重要设施', '重点对象'].includes(e.featureData.layerName)) {
      openFeatureOverlay(e)
    } else {
      closeFeatureOverlay()
    }
  }
}
const openFeatureOverlay = (e) => {
  overlayPointData.value = e.featureData
  showFeatureOverlay.value = true
  removeLayer(map, '落点名称浮窗')
  renderOverlay(map, '落点详情浮窗', e.featureData, featureOverlay.value)
}
const closeFeatureOverlay = () => {
  overlayPointData.value = {}
  showFeatureOverlay.value = false
  removeLayer(map, '落点详情浮窗')
}

/* 进入单库大屏 */
const isProjectDetail = computed(() => !!useProjectStore().prcd)
const enterReservoirDetail = async (prcd) => {
  if (!useProjectStore().prcd) {
    await useProjectStore().getDetail(prcd)
  }
  const point = useProjectStore().detail
  point.longitude = point.lgtd
  point.latitude = point.lttd
  point.dotStyleConf = {
    src: resScaleIcon[point.projectScale]
  }
  renderPoint(map, '水库落点', point)
  gotoPoint(map, {
    center: [Number(point.longitude), Number(point.latitude)],
    zoom: point.zoom || 17
  })
  axios
    .yw({
      url: '/rscpData/getRmsrLine',
      method: 'post',
      data: {
        prcd: prcd
      }
    })
    .then((res) => {
      const lineData = res.data.rows || []
      const bhx = lineData.find((e) => e.dictName === '保护范围线')?.coorpot || ''
      const glx = lineData.find((e) => e.dictName === '管理范围线')?.coorpot || ''
      renderPolygon(map, '保护范围线', {
        coordinates: eval('[' + bhx.replace('"', '') + ']'),
        polygonStyleConf: { fillColor: 'transparent', strokeColor: '#58C056', strokeWidth: 3 }
      })
      renderPolygon(map, '管理范围线', {
        coordinates: eval('[' + glx.replace('"', '') + ']'),
        polygonStyleConf: { fillColor: 'transparent', strokeColor: '#F5402A', strokeWidth: 3 }
      })
    })
  renderPoint(map, '水位站', [
    { name: 'XXX水位站', longitude: 120.188557, latitude: 29.420767, dotStyleConf: { src: new URL('@/assets/images/points/waterLevel.png', import.meta.url).href } },
    { name: 'YYY水位站', longitude: 120.190381, latitude: 29.423543, dotStyleConf: { src: new URL('@/assets/images/points/waterLevelWarn.png', import.meta.url).href } }
  ])
  renderPoint(map, '雨量站', [
    { name: 'XXX雨量站', longitude: 120.185986, latitude: 29.42744, dotStyleConf: { src: new URL('@/assets/images/points/rainfall0.png', import.meta.url).href } },
    { name: 'YYY雨量站', longitude: 120.178288, latitude: 29.426185, dotStyleConf: { src: new URL('@/assets/images/points/rainfall0_10.png', import.meta.url).href } }
  ])
  axios
    .yw({
      url: '/camera/page',
      method: 'get',
      params: {
        prcd: prcd,
        current: 1,
        size: 10000
      }
    })
    .then((res) => {
      renderPoint(
        map,
        '视频站',
        (res.data.records || []).map((e) => {
          e.name = e.cameraName
          e.longitude = e.lng
          e.latitude = e.lat
          e.dotStyleConf = {
            src: e.state == 1 ? new URL('@/assets/images/points/video.png', import.meta.url).href : new URL('@/assets/images/points/videoWarn.png', import.meta.url).href
          }
          return e
        })
      )
    })
  renderPoint(map, '安全监测', [
    { name: 'XXX安全监测', longitude: 120.196446, latitude: 29.423889, dotStyleConf: { src: new URL('@/assets/images/points/station.png', import.meta.url).href } },
    { name: 'YYY安全监测', longitude: 120.198616, latitude: 29.426541, dotStyleConf: { src: new URL('@/assets/images/points/stationWarn.png', import.meta.url).href } }
  ])
  axios
    .yw({
      url: '/bus-essential-factor-ext/page',
      method: 'get',
      params: {
        prcd: prcd,
        type: '1',
        current: 1,
        size: 10000
      }
    })
    .then((res) => {
      renderPoint(
        map,
        '重要设施',
        (res.data.records || []).map((e) => {
          e.name = e.facName
          e.longitude = e.lng
          e.latitude = e.lat
          e.dotStyleConf = {
            src: eleTypeIcon[e.facType]
          }
          return e
        })
      )
    })
  axios
    .yw({
      url: '/bus-essential-factor-ext/page',
      method: 'get',
      params: {
        prcd: prcd,
        type: '2',
        current: 1,
        size: 10000
      }
    })
    .then((res) => {
      renderPoint(
        map,
        '重点对象',
        (res.data.records || []).map((e) => {
          e.name = e.facName
          e.longitude = e.lng
          e.latitude = e.lat
          e.dotStyleConf = {
            src: eleTypeIcon[e.facType]
          }
          return e
        })
      )
    })
}
const eleTypeIcon = {
  铁路: new URL('@/assets/images/points/railway.png', import.meta.url).href,
  高速公路: new URL('@/assets/images/points/expressway.png', import.meta.url).href,
  公路桥: new URL('@/assets/images/points/highwayBridge.png', import.meta.url).href,
  其他: new URL('@/assets/images/points/other.png', import.meta.url).href,
  学校: new URL('@/assets/images/points/school.png', import.meta.url).href,
  医院: new URL('@/assets/images/points/hospital.png', import.meta.url).href,
  居民区: new URL('@/assets/images/points/residentialArea.png', import.meta.url).href,
  重要敏感点: new URL('@/assets/images/points/sensitivePoint.png', import.meta.url).href,
  政府机构及事业单位: new URL('@/assets/images/points/governmentOrgan.png', import.meta.url).href
}

/* 水库按规模统计 */
const typeStatistic = ref([
  { value: 6, name: '中型', color: '#46FDFF' },
  { value: 18, name: '小（1）型', color: '#419EFF' },
  { value: 77, name: '小（2）型', color: '#FF9936' }
])

/* 重要水库（6个中型水库） */
const importantResList = ref([])
const getImportantResList = () => {
  axios
    .rscp({
      url: '/mgt/ml/waterdirectory/listJson',
      method: 'post',
      data: {
        type: '水库',
        adcd: '330782000000',
        scale: '3',
        page: 1,
        rows: 10
      }
    })
    .then((res) => {
      importantResList.value = res.rows || []
    })
    .catch(() => {
      importantResList.value = []
    })
}
onBeforeMount(() => {
  getImportantResList()
})

/* 打开水位站弹窗 */
const waterLevelStationId = ref('')
const waterLevelStationName = ref('')
const waterLevelStationVisible = ref(false)
const openWaterLevelDetail = (id, name) => {
  waterLevelStationId.value = id
  waterLevelStationName.value = name
  waterLevelStationVisible.value = true
}

/* 打开水位站弹窗 */
const rainfallStationId = ref('')
const rainfallStationName = ref('')
const rainfallStationVisible = ref(false)
const openRainfallDetail = (id, name) => {
  rainfallStationId.value = id
  rainfallStationName.value = name
  rainfallStationVisible.value = true
}

/* 打开视频弹窗 */
const project_name = ref('')
const project_prcd = ref('')
const camera_code = ref('')
const videoVisible = ref(false)
const openVideoPopup = (name, prcd) => {
  project_name.value = name
  project_prcd.value = prcd
  camera_code.value = ''
  videoVisible.value = true
}
const openMonitorPopup = (name, code) => {
  project_name.value = name
  project_prcd.value = ''
  camera_code.value = code
  videoVisible.value = true
}
watch(
  () => videoVisible.value,
  (val) => {
    if (!val) {
      project_name.value = ''
      project_prcd.value = ''
    }
  }
)

/* 打开安全监测弹窗 */
const safetyStationId = ref('')
const safetyStationName = ref('')
const safetyStationVisible = ref(false)
const openSafetyDetail = (id, name) => {
  safetyStationId.value = id
  safetyStationName.value = name
  safetyStationVisible.value = true
}

/* 打开重要设施&重点对象弹窗 */
const elementPointInfo = ref({})
const elementPointVisible = ref(false)
const openElementDetail = (info) => {
  elementPointInfo.value = info
  elementPointVisible.value = true
}

const prcd = ref('')
const resOptions = ref([])
onBeforeMount(() => {
  resOptions.value = [
    { prcd: '330782022000521', name: '巧溪水库' },
    { prcd: '33d473fd-1c7b-11ea-8760-6c92bf66b1485e', name: '龙门脚水库' }
  ]
  prcd.value = resOptions.value.length ? resOptions.value[0].prcd : ''
})

const waterLevelType = ref('正常蓄水位')
const waterLevelInfluence = ref([
  { label: '淹没范围', value: '755.9', unit: 'km²' },
  { label: '影响人口', value: '25.1', unit: '万人' },
  { label: '道路', value: '36.1', unit: '条' },
  { label: '基础设施', value: '27', unit: '个' },
  { label: '城(集)镇', value: '29', unit: '个' },
  { label: '耕(园)地', value: '55.75', unit: '万亩' }
])
const waterLevelImportantFacilities = ref([
  { label: '铁路', value: '17', unit: '个', icon: new URL('@/assets/images/icons/railway.png', import.meta.url).href },
  { label: '高速公路', value: '23', unit: '个', icon: new URL('@/assets/images/icons/expressway.png', import.meta.url).href },
  { label: '公路桥', value: '37', unit: '个', icon: new URL('@/assets/images/icons/highwayBridge.png', import.meta.url).href },
  { label: '其他', value: '9', unit: '个', icon: new URL('@/assets/images/icons/other.png', import.meta.url).href }
])
const waterLevelImportantObjects = ref([
  { label: '学校', value: '45', unit: '个', icon: new URL('@/assets/images/icons/school.png', import.meta.url).href },
  { label: '医院', value: '9', unit: '个', icon: new URL('@/assets/images/icons/hospital.png', import.meta.url).href },
  { label: '居民区', value: '80', unit: '个', icon: new URL('@/assets/images/icons/residentialArea.png', import.meta.url).href },
  { label: '重要敏感点', value: '6', unit: '个', icon: new URL('@/assets/images/icons/sensitivePoint.png', import.meta.url).href },
  { label: '政府机构及事业单位', value: '23', unit: '个', icon: new URL('@/assets/images/icons/governmentOrgan.png', import.meta.url).href }
])
const downstreamInfluence = ref([
  { label: '淹没范围', value: '68.48', unit: 'km²' },
  { label: '影响人口', value: '95.19', unit: '万人' },
  { label: '道路', value: '14', unit: '条' },
  { label: '基础设施', value: '78', unit: '个' },
  { label: '城(集)镇', value: '22', unit: '个' },
  { label: '耕(园)地', value: '221679', unit: '万亩' }
])
const downstreamImportantFacilities = ref([
  { label: '铁路', value: '18', unit: '个', icon: new URL('@/assets/images/icons/railway.png', import.meta.url).href },
  { label: '高速公路', value: '39', unit: '个', icon: new URL('@/assets/images/icons/expressway.png', import.meta.url).href },
  { label: '公路桥', value: '45', unit: '个', icon: new URL('@/assets/images/icons/highwayBridge.png', import.meta.url).href },
  { label: '其他', value: '17', unit: '个', icon: new URL('@/assets/images/icons/other.png', import.meta.url).href }
])
const downstreamImportantObjects = ref([
  { label: '学校', value: '60', unit: '个', icon: new URL('@/assets/images/icons/school.png', import.meta.url).href },
  { label: '医院', value: '27', unit: '个', icon: new URL('@/assets/images/icons/hospital.png', import.meta.url).href },
  { label: '居民区', value: '23', unit: '个', icon: new URL('@/assets/images/icons/residentialArea.png', import.meta.url).href },
  { label: '重要敏感点', value: '7', unit: '个', icon: new URL('@/assets/images/icons/sensitivePoint.png', import.meta.url).href },
  { label: '政府机构及事业单位', value: '12', unit: '个', icon: new URL('@/assets/images/icons/governmentOrgan.png', import.meta.url).href }
])
</script>

<style scoped lang="scss">
:deep(.slot-wrapper.back) {
  top: 88px;
  left: 488px;
}
:deep(.slot-wrapper.default) {
  top: 88px;
  right: 488px;
  @include mapOperate();
}
:deep(.slot-wrapper.legend) {
  right: 488px;
  bottom: 16px;
}
:deep(.slot-wrapper.toolbox) {
  left: 488px;
  bottom: 16px;
}
.project_detail {
  :deep(.slot-wrapper.back) {
    left: 16px;
  }
  :deep(.slot-wrapper.default) {
    right: 16px;
  }
  :deep(.slot-wrapper.legend) {
    right: 16px;
  }
  :deep(.slot-wrapper.toolbox) {
    left: 16px;
  }
}
.pilot_reservoir {
  position: absolute;
  top: 55px;
  width: calc((100% - 47px) / 2);
  height: 88px;
  border: 1px solid rgba(65, 158, 255, 0.8);
  cursor: pointer;
  &.qiao_xi {
    left: 15px;
  }
  &.long_men_jiao {
    right: 15px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 3px;
    height: 24px;
    background-image: url(@/assets/images/fivePoint.png);
  }
  .label {
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  }
  .tag {
    position: absolute;
    top: 18px;
    right: 16px;
    width: 56px;
    height: 20px;
    border-radius: 2px;
    background: linear-gradient(62deg, #0060ff 31%, #00e7ff 94%);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
  }
  .scale,
  .address {
    position: absolute;
    top: 52px;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: $color-primary;
  }
  .scale {
    left: 16px;
  }
  .address {
    left: 72px;
  }
}
.type_statistic {
  position: absolute;
  top: 143px;
  right: 15px;
  left: 15px;
  height: 204px;
  .type_chart {
    position: absolute;
    left: 0;
    top: 5px;
    width: 190px;
    height: 190px;
  }
  .type_legend {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-left: 30px;
    padding-right: 34px;
    .item {
      display: flex;
      align-items: center;
      > i {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      .name {
        font-size: 16px;
        line-height: 19px;
      }
      .value {
        flex: 1;
        font-family: PangMenZhengDao;
        font-size: 20px;
        line-height: 20px;
        text-align: right;
      }
      .unit {
        font-size: 16px;
        line-height: 19px;
        margin-left: 6px;
      }
    }
  }
}
.important_res_title {
  position: absolute;
  top: 347px;
  right: 15px;
  left: 15px;
}
.important_res_list {
  overflow: auto;
  position: absolute;
  top: 391px;
  right: 15px;
  left: 15px;
  bottom: 15px;
  .item {
    position: relative;
    height: 100px;
    padding-left: 152px;
    cursor: pointer;
    + .item {
      margin-top: 24px;
    }
    .thumbnail {
      position: absolute;
      left: 0;
      width: 140px;
      height: 100px;
      border-radius: 4px;
    }
    .name {
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      padding-top: 6px;
      padding-bottom: 14px;
    }
    .scale {
      display: flex;
      align-items: center;
      gap: 4px;
      position: absolute;
      top: 9px;
      right: 0;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: $color-primary;
    }
    .desc {
      font-size: 16px;
      line-height: 19px;
      + .desc {
        margin-top: 12px;
      }
    }
  }
}
.res_select {
  width: calc(100% - 30px);
  margin: 12px 15px 10px 15px;
}
.res_element {
  overflow: auto;
  width: 100%;
  height: calc(100% - 101px);
  padding: 0 15px 15px;
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
