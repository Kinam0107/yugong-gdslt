<template>
  <div class="piecemeal_wrapper" ref="piecemealWrapper">
    <div class="item_wrapper filter_box" :class="{ sticky: isSticky }">
      <label>年度</label>
      <el-date-picker style="width: 160px" v-model="params.year" type="year" placeholder="全部" format="YYYY" value-format="YYYY" @change="searchAll()" />
      <label>行政区划</label>
      <admn-select style="width: 180px" v-model="params.adcd" placeholder="全部" clearable @change="searchAll()" />
    </div>
    <div class="item_wrapper adcd_box">
      <div class="title">
        行政区划统计
        <span class="total">
          总数
          <span class="num">{{ total }}</span>
          个
        </span>
      </div>
      <div class="statistic">
        <BasicColumnChart ref="adcdChart" :xAxisValue="xAxisAdcd" yAxisUnit="宗" :data="dataAdcd" :grid="[32, 0, 0, 0]" />
      </div>
    </div>
    <div class="item_wrapper transverse_box">
      <div class="scale_box">
        <div class="title">工程规模</div>
        <div class="statistic">
          <StackedHorizontalBar ref="scaleChart" :yAxisValue="yAxisScale" unit="宗" :data="dataScale" :grid="[12, 0, 0, 0]" />
        </div>
      </div>
      <div class="water_box">
        <div class="title">供水情况</div>
        <div class="statistic">
          <div class="item first">
            <div class="label">覆盖自然村(个)</div>
            <div class="count">{{ waterSupplySituation.villageNum?.toLocaleString() }}</div>
          </div>
          <div class="item second">
            <div class="label">供水人口(人)</div>
            <div class="count">{{ waterSupplySituation.personNum?.toLocaleString() }}</div>
          </div>
          <div class="item third">
            <div class="label">供水户数(户)</div>
            <div class="count">{{ waterSupplySituation.houseNum?.toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item_wrapper base_box">
      <div class="title">供水工程基本数据统计</div>
      <BasicDataStatistics class="statistic" :year="params.year" :adcd="params.adcd" />
    </div>
    <div class="item_wrapper wuhua_box">
      <div class="title">
        五化指标
        <span v-if="deadline" class="deadline">截止至 {{ deadline }}</span>
      </div>
      <div class="statistic">
        <div class="item">
          <div class="label">规模化覆盖人口</div>
          <div class="value">
            {{ dataWuhua.scalePersonNum?.toLocaleString() }}
            <span>人</span>
          </div>
          <div class="value">
            {{ (dataWuhua.scalePersonRate || 0) * 100 }}
            <span>%</span>
          </div>
        </div>
        <div class="item">
          <div class="label">标准化建设工程</div>
          <div class="value">
            {{ dataWuhua.standardProjectNum?.toLocaleString() }}
            <span>宗</span>
          </div>
          <div class="value">
            {{ (dataWuhua.standardProjectRate || 0) * 100 }}
            <span>%</span>
          </div>
        </div>
        <div class="item">
          <div class="label">县域统管覆盖人口</div>
          <div class="value">
            {{ dataWuhua.countyPersonNum?.toLocaleString() }}
            <span>人</span>
          </div>
          <div class="value">
            {{ (dataWuhua.countyPersonRate || 0) * 100 }}
            <span>%</span>
          </div>
        </div>
        <div class="item">
          <div class="label">专业化管理工程</div>
          <div class="value">
            {{ dataWuhua.majorProjectNum?.toLocaleString() }}
            <span>宗</span>
          </div>
          <div class="value">
            {{ (dataWuhua.majorProjectRate || 0) * 100 }}
            <span>%</span>
          </div>
        </div>
        <div class="item">
          <div class="label">智慧化服务人口</div>
          <div class="value">
            {{ dataWuhua.wisdomPersonNum?.toLocaleString() }}
            <span>人</span>
          </div>
          <div class="value">
            {{ (dataWuhua.wisdomPersonRate || 0) * 100 }}
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item_wrapper proxy_box">
      <div class="title">供水工程五化指标数据统计</div>
      <IndicatorDataStatistics class="statistic" :year="params.year" :adcd="params.adcd" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import BasicColumnChart from '@/components/chart/BasicColumnChart.vue'
import StackedHorizontalBar from '@/components/chart/StackedHorizontalBar.vue'
import BasicDataStatistics from './BasicDataStatistics.vue'
import IndicatorDataStatistics from './IndicatorDataStatistics.vue'
import axios from '@/api/axios'

const isSticky = ref(false)
const piecemealWrapper = ref()
onMounted(() =>
  piecemealWrapper.value.addEventListener('scroll', (event) => {
    isSticky.value = event.target.scrollTop >= 24
  })
)

const params = reactive({
  year: new Date().format('yyyy'),
  adcd: undefined
})
const searchAll = () => {
  searchAdcd()
  searchScale()
  searchWater()
  searchWuhua()
}
onMounted(() => {
  searchAll()
})

const total = ref(0)
const xAxisAdcd = ref([])
const dataAdcd = ref([])
const adcdChart = ref()
const searchAdcd = () => {
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/adcdAnalysis',
    method: 'get',
    params: params
  }).then((res) => {
    let totalTemp = 0
    let xAxisAdcdTemp = []
    let dataAdcdTemp = []
    let data = res.data || []
    data.forEach((e) => {
      totalTemp += e.num
      xAxisAdcdTemp.push(e.adnm)
      dataAdcdTemp.push(e.num)
    })
    total.value = totalTemp
    xAxisAdcd.value = xAxisAdcdTemp
    dataAdcd.value = dataAdcdTemp
    nextTick(() => {
      adcdChart.value.initChart()
    })
  })
}

const yAxisScale = ref([])
const dataScale = ref([])
const scaleChart = ref()
const searchScale = () => {
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/scaleAnalysis',
    method: 'get',
    params: params
  }).then((res) => {
    let yAxisScaleTemp = []
    let dataScaleTemp = []
    let data = res.data || []
    data.forEach((e) => {
      yAxisScaleTemp.push(e.type)
      dataScaleTemp.push(e.num)
    })
    yAxisScale.value = yAxisScaleTemp
    dataScale.value = dataScaleTemp
    nextTick(() => {
      scaleChart.value.initChart()
    })
  })
}

const waterSupplySituation = ref({})
const searchWater = () => {
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/waterSupplyCondition',
    method: 'get',
    params: params
  }).then((res) => {
    waterSupplySituation.value = res.data || {}
  })
}

const deadline = ref('')
const dataWuhua = ref({})
const searchWuhua = () => {
  axios({
    url: '/agricultural-water-center/waterSupplyAnalysis/fiveModernizations',
    method: 'get',
    params: params
  }).then((res) => {
    dataWuhua.value = res.data || {}
  })
}
</script>

<style scoped lang="scss">
.piecemeal_wrapper {
  position: relative;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  height: 100%;
  .item_wrapper {
    @include mainContentContainer();
    padding-top: 2 * $baseDistance;
    padding-bottom: 2 * $baseDistance;
    float: left;
    + .item_wrapper {
      margin-top: 0;
    }
    .title {
      @include fontCategory(3);
      font-weight: 500;
    }
    .total {
      @include fontCategory();
      margin-left: 3 * $baseDistance;
      font-weight: normal;
      .num {
        @include fontCategory(2);
        font-weight: normal;
        color: $color-primary;
        font-family: DINAlternate;
      }
    }
    .deadline {
      @include fontCategory(5);
      margin-left: 3 * $baseDistance;
      font-weight: normal;
    }
  }
  .filter_box {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 9;
    &.sticky {
      margin-left: 0;
      margin-right: 0;
      border-radius: 0;
      border-bottom: 1px solid $color-separator;
    }
    label {
      @include fontCategory(3);
      font-weight: 500;
      flex-shrink: 0;
      margin-right: 2 * $baseDistance;
      &:not(:first-child) {
        margin-left: 2 * $baseDistance;
      }
    }
  }
  .adcd_box {
    width: 100%;
    .statistic {
      width: 100%;
      height: 200px;
    }
  }
  .transverse_box {
    display: flex;
    gap: 3 * $baseDistance;
    width: 100%;
    background-color: transparent;
    padding: 0;
  }
  .scale_box,
  .water_box {
    @include mainContentContainer();
    padding-top: 2 * $baseDistance;
    padding-bottom: 2 * $baseDistance;
    margin: 0;
    flex: 1;
    .statistic {
      height: 160px;
    }
  }
  .water_box .statistic {
    display: flex;
    flex-wrap: wrap;
    gap: 2 * $baseDistance;
    padding-top: 2 * $baseDistance;
    .item {
      border-radius: 0.5 * $baseDistance;
      padding: 0 2 * $baseDistance;
      &.first {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 42px;
        background-image: linear-gradient(180deg, #cff3f6, rgba(207, 243, 246, 0.3));
        .count {
          color: $color-primary;
        }
      }
      &.second {
        display: flex;
        flex-direction: column;
        gap: $baseDistance;
        justify-content: center;
        flex: 1;
        height: calc(100% - 42px - 2 * $baseDistance);
        background-image: linear-gradient(180deg, #c7f3e3, rgba(199, 243, 227, 0.3));
        .count {
          color: $color-primary;
        }
      }
      &.third {
        display: flex;
        flex-direction: column;
        gap: $baseDistance;
        justify-content: center;
        flex: 1;
        height: calc(100% - 42px - 2 * $baseDistance);
        background-image: linear-gradient(180deg, #ffe4d2, rgba(255, 228, 210, 0.3));
        .count {
          color: $color-warning;
        }
      }
      .label {
        @include fontCategory();
      }
      .count {
        @include fontCategory(2);
        font-weight: normal;
        font-family: DINAlternate;
      }
    }
  }
  .base_box {
    width: 100%;
    .statistic {
      padding-top: 2 * $baseDistance;
    }
  }
  .wuhua_box {
    width: 100%;
    .statistic {
      padding-top: 2 * $baseDistance;
      display: flex;
      gap: 2 * $baseDistance;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        height: 150px;
        border-radius: 0.5 * $baseDistance;
        padding: 2 * $baseDistance 3 * $baseDistance;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          background-image: linear-gradient(180deg, #c7f3e3, rgba(199, 243, 227, 0.3));
          .value {
            color: $color-primary;
          }
        }
        &:nth-child(4),
        &:nth-child(5) {
          background-image: linear-gradient(180deg, #d1f1ff, rgba(214, 227, 255, 0.2));
          .value {
            color: #36a3d9;
          }
        }
        .label {
          @include fontCategory();
        }
        .value {
          font-size: 40px;
          font-weight: 700;
          font-family: DINAlternate;
          white-space: nowrap;
          > span {
            @include fontCategory();
            font-weight: normal;
          }
        }
      }
    }
  }
  .proxy_box {
    width: 100%;
    .statistic {
      padding-top: 2 * $baseDistance;
    }
  }
}
</style>
