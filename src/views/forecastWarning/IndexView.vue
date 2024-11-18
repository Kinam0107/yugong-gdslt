<template>
  <ScreenLayout>
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
    <template #left>
      <div class="section_title">三道防线</div>
      <div class="three_defense_lines">
        <div class="item">
          <img src="@/assets/images/icons/precipitation.png" />
          <span>降水预报</span>
        </div>
        <div class="item">
          <img src="@/assets/images/icons/nephogram.png" />
          <span>气象云图</span>
        </div>
        <div class="item">
          <img src="@/assets/images/icons/typhoon.png" />
          <span>台风路径</span>
        </div>
      </div>
      <div class="section_title">洪水预报</div>
      <div class="flood_forecast">
        <div class="item" v-for="item in floodForecastList" :key="item.name">
          <div class="name">{{ item.name }}</div>
          <div class="data">
            <div class="label">未来24小时最高水位</div>
            <div class="value">{{ item.waterLevel }}m</div>
          </div>
          <div class="data">
            <div class="label">最近预报时间</div>
            <div class="value">{{ item.time }}</div>
          </div>
        </div>
      </div>
      <div class="section_title">纳蓄能力</div>
      <div class="storage_capacity">
        <div class="storage_category">
          <div class="item" :class="{ active: storageCategory === '现状实况' }" @click="changeStorageCategory('现状实况')">现状实况</div>
          <div class="item" :class="{ active: storageCategory === '假定雨量' }" @click="changeStorageCategory('假定雨量')">假定雨量</div>
        </div>
        <div class="storage_type">
          <div class="item" :class="{ active: storageType === '至限制水位' }" @click="changeStorageType('至限制水位')">至限制水位</div>
          <div class="item" :class="{ active: storageType === '至正常蓄水位' }" @click="changeStorageType('至正常蓄水位')">至正常蓄水位</div>
          <div class="item" :class="{ active: storageType === '至设计洪水位' }" @click="changeStorageType('至设计洪水位')">至设计洪水位</div>
        </div>
        <div class="storage_data">
          <div class="item">
            <img src="@/assets/images/storageCapacityTotal.png" />
            <div class="data">
              <div class="label">蓄水总量</div>
              <div class="value">
                <span class="num">{{ 1.17 }}</span>
                <span class="unit">亿m³</span>
              </div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/storageCapacityRate.png" />
            <div class="data">
              <div class="label">蓄水率</div>
              <div class="value">
                <span class="num">{{ 58.92 }}</span>
                <span class="unit">%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="storage_chart_wrap">
          <div class="storage_chart">
            <Chart style="height: 100%" :options="chartOptions" />
          </div>
          <div class="storage_legned">
            <div class="legend_title">可纳雨量</div>
            <div class="legend_item">
              <i class="cube" style="background: #58c056"></i>
              <span>200mm以上</span>
            </div>
            <div class="legend_item">
              <i class="cube" style="background: #386ddd"></i>
              <span>100-200mm</span>
            </div>
            <div class="legend_item">
              <i class="cube" style="background: #f8861c"></i>
              <span>50-100mm</span>
            </div>
            <div class="legend_item">
              <i class="cube" style="background: #cd412c"></i>
              <span>50mm以下</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <div class="section_title">重要水库水情</div>
      <div class="important_reservoir">
        <div class="important_item" v-for="item in importantReservoir" :key="item.name" @click="openWaterLevelDetail(item.id, item.name)">
          <div class="name">{{ item.name }}</div>
          <div class="zl">
            <span class="label">涨率：</span>
            <span class="value" :style="{ color: item.state === '下降' ? '#47F5A7' : item.state === '上升' ? '#FF0000' : '' }">{{ item.zl }}</span>
          </div>
          <div class="state">
            <span :style="{ color: item.state === '下降' ? '#47F5A7' : item.state === '上升' ? '#FF0000' : '' }">{{ item.state }}</span>
            <img v-if="item.state === '下降'" src="@/assets/images/arrowDecline.png" />
            <img v-if="item.state === '上升'" src="@/assets/images/arrowAscend.png" />
          </div>
          <div class="water_level">
            <span class="label">水位：</span>
            <span class="value">{{ item.waterLevel }}</span>
            <span class="unit">m</span>
          </div>
        </div>
      </div>
      <div class="section_title">预警信息</div>
      <div class="warning_information">
        <div class="warning_statistic">
          <div class="statistic_item">
            <div class="label">水情预警</div>
            <div class="data">
              <span class="value">0</span>
              <span class="unit">座</span>
            </div>
            <img src="@/assets/images/warningWaterSituation.png" />
          </div>
          <div class="statistic_item">
            <div class="label">工情预警</div>
            <div class="data">
              <span class="value">0</span>
              <span class="unit">座</span>
            </div>
            <img src="@/assets/images/warningWorkSituation.png" />
          </div>
        </div>
        <div class="warning_chart_wrap">
          <div class="warning_chart">
            <RingChart :data="warningChartData" />
          </div>
          <div class="warning_legend">
            <div v-for="(e, i) in warningChartData" class="item" :key="i">
              <i :style="{ background: e.color }"></i>
              <span class="name">{{ e.name }}</span>
              <span class="value" :style="{ color: e.color }">{{ e.value }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <WaterLevelStation v-model="waterLevelStationVisible" :id="waterLevelStationId" :title="waterLevelStationName" />
  </ScreenLayout>
</template>

<script setup>
import { ref } from 'vue'
import LengedBox from '@/components/map/LengedBox.vue'
import AuxiliaryInfo from '@/components/map/AuxiliaryInfo.vue'
import axios from '@/api/axios'
import { renderPoint } from '@/utils/map'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
import cylinder from 'highcharts/modules/cylinder'
import funnel3d from 'highcharts/modules/funnel3d'
Highcharts3d(Highcharts)
cylinder(Highcharts)
funnel3d(Highcharts)
import RingChart from '@/components/chart/RingChart.vue'
import WaterLevelStation from '@/components/station/WaterLevelStation.vue'

/* 地图初始化后取得地图对象 */
const mapMode = ref('影像图')
const mapPadding = ref([120, 500, 40, 500])
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

const floodForecastList = ref([
  { name: '巧溪水库', waterLevel: '132.34', time: '10-31 12:00' },
  { name: '枫坑水库', waterLevel: '89.08', time: '10-31 12:00' },
  { name: '柏峰水库', waterLevel: '122.5', time: '10-31 12:00' },
  { name: '岩口水库', waterLevel: '184', time: '10-31 12:00' }
])
const storageCategory = ref('现状实况')
const changeStorageCategory = (category) => {
  storageCategory.value = category
}
const storageType = ref('至限制水位')
const changeStorageType = (type) => {
  storageType.value = type
}
const chartOptions = ref({
  chart: {
    type: 'funnel3d',
    options3d: {
      enabled: true,
      alpha: 6,
      viewDistance: 50
    },
    backgroundColor: 'transparent',
    height: 200
  },
  title: false,
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.y:,.0f}',
        allowOverlap: false,
        y: 8,
        color: '#fff',
        style: { fontSize: 14 },
        align: 'center'
      },
      neckHeight: '0%'
    }
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: '蓄水量',
      data: [
        { name: '200mm以上', y: 1012 },
        { name: '100-200mm', y: 661 },
        { name: '50-100mm', y: 606 },
        { name: '50mm以下', y: 1947 }
      ],
      colorByPoint: true,
      allowPointSelect: true,
      colors: ['rgba(91, 190, 88, 0.7)', 'rgba(56, 134, 255, 0.7)', 'rgba(247, 181, 0, 0.7)', 'rgba(250, 100, 0, 0.8)']
    }
  ]
})
const importantReservoir = ref([
  { name: '巧溪水库', zl: '0.00', state: '基本稳定', waterLevel: '175.29' },
  { name: '八都水库', zl: '-0.01', state: '下降', waterLevel: '141.20' },
  { name: '岩口水库', zl: '0.00', state: '基本稳定', waterLevel: '101.80' },
  { name: '长堰水库', zl: '+0.01', state: '上升', waterLevel: '132.15' },
  { name: '枫坑水库', zl: '0.00', state: '基本稳定', waterLevel: '173.94' },
  { name: '柏峰水库', zl: '0.00', state: '基本稳定', waterLevel: '114.54' }
])
const warningChartData = ref([
  { value: 0, name: '超限制水位', color: '#419EFF' },
  { value: 0, name: '超正常蓄水位', color: '#FFCB27' },
  { value: 0, name: '超设计水位', color: '#FF551F' }
])

/* 打开水位站弹窗 */
const waterLevelStationId = ref('')
const waterLevelStationName = ref('')
const waterLevelStationVisible = ref(false)
const openWaterLevelDetail = (id, name) => {
  waterLevelStationId.value = id
  waterLevelStationName.value = name
  waterLevelStationVisible.value = true
}
</script>

<style scoped lang="scss">
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
.three_defense_lines {
  display: flex;
  gap: 15px;
  padding: 16px 15px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    flex: 1;
    height: 52px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid rgba(65, 158, 255, 0.8);
    cursor: pointer;
  }
}
.flood_forecast {
  height: 388px;
  padding: 16px 15px 20px 15px;
  .item {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 76px;
    padding: 0 16px;
    background: linear-gradient(0deg, rgba(42, 174, 245, 0.2) 0%, rgba(9, 65, 105, 0.01) 152%);
    + .item {
      margin-top: 16px;
    }
    .name {
      flex: 1;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
    }
    .data {
      .label {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        margin-bottom: 10px;
      }
      .value {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-primary;
      }
    }
  }
}
.storage_capacity {
  height: 383px;
  padding: 12px 15px 15px 15px;
  .storage_category {
    display: flex;
    margin-bottom: 20px;
    .item {
      width: 99px;
      height: 28px;
      font-size: 16px;
      font-weight: 500;
      line-height: 28px;
      text-align: center;
      background-image: url(@/assets/images/tabBg.png);
      cursor: pointer;
      + .item {
        margin-left: 2px;
      }
      &.active {
        background-image: url(@/assets/images/tabActiveBg.png);
      }
    }
  }
  .storage_type {
    display: flex;
    margin-bottom: 20px;
    .item {
      height: 23px;
      border-radius: 2px;
      padding: 0 7px;
      font-size: 16px;
      line-height: 23px;
      text-align: center;
      cursor: pointer;
      + .item {
        margin-left: 20px;
      }
      &.active {
        padding: 0 6px;
        line-height: 21px;
        border: 1px solid #46fdff;
      }
    }
  }
  .storage_data {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    .item {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
    }
    .data {
      font-size: 16px;
      line-height: 19px;
      .value {
        display: flex;
        align-items: center;
        gap: 4px;
        .num {
          font-family: PangMenZhengDao;
          font-size: 24px;
          line-height: 24px;
          color: $color-primary;
        }
      }
    }
  }
  .storage_chart_wrap {
    display: flex;
    height: 200px;
    .storage_chart {
      width: 60%;
      height: 100%;
    }
    .storage_legned {
      width: 40%;
      height: 100%;
      padding-left: 20px;
      .legend_title {
        font-family: PangMenZhengDao;
        font-size: 20px;
        line-height: 24px;
        margin-top: 24px;
        margin-bottom: 16px;
      }
      .legend_item {
        display: flex;
        align-items: center;
        gap: 7px;
        + .legend_item {
          margin-top: 16px;
        }
        > i {
          width: 16px;
          height: 10px;
        }
        > span {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
}
.important_reservoir {
  height: 558px;
  padding: 16px 15px;
  .important_item {
    position: relative;
    height: 76px;
    background: linear-gradient(0deg, rgba(42, 174, 245, 0.2) 0%, rgba(9, 65, 105, 0.01) 152%);
    cursor: pointer;
    + .important_item {
      margin-top: 14px;
    }
    .name {
      position: absolute;
      top: 8px;
      left: 20px;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
    }
    .zl {
      position: absolute;
      top: 18px;
      right: 20px;
      .label {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
      }
      .value {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-primary;
      }
    }
    .state {
      position: absolute;
      top: 46px;
      left: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-primary;
      }
    }
    .water_level {
      position: absolute;
      top: 44px;
      right: 20px;
      display: flex;
      align-items: center;
      .label,
      .unit {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
      }
      .value {
        font-family: PangMenZhengDao;
        font-size: 20px;
        font-weight: normal;
        line-height: 20px;
        margin: 0 8px 0 3px;
      }
    }
  }
}
.warning_information {
  height: 337px;
  padding: 16px 15px 15px;
  .warning_statistic {
    display: flex;
    gap: 15px;
    .statistic_item {
      position: relative;
      display: flex;
      flex: 1;
      height: 88px;
      background: linear-gradient(0deg, rgba(255, 203, 39, 0.2) 0%, rgba(255, 203, 39, 0) 100%);
      .label {
        position: absolute;
        top: 18px;
        left: 16px;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
      }
      .data {
        position: absolute;
        top: 42px;
        left: 16px;
        display: flex;
        align-items: center;
        gap: 4px;
        .value {
          font-family: PangMenZhengDao;
          font-size: 24px;
          font-weight: normal;
          line-height: 34px;
          color: #ffcb27;
        }
        .unit {
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
        }
      }
      > img {
        position: absolute;
        top: 13px;
        right: 20px;
      }
    }
  }
  .warning_chart_wrap {
    position: relative;
    height: 217px;
    .warning_chart {
      position: absolute;
      left: 0;
      top: 15px;
      width: 190px;
      height: 190px;
    }
    .warning_legend {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 190px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding-left: 15px;
      padding-right: 13px;
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
}
</style>
