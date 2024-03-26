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
      </div>
    </div>
    <div class="item_wrapper base_box">
      <div class="title">供水工程基本数据统计</div>
    </div>
    <div class="item_wrapper wuhua_box">
      <div class="title">五化指标</div>
    </div>
    <div class="item_wrapper proxy_box">
      <div class="title">供水工程五化指标数据统计</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import BasicColumnChart from '@/components/chart/BasicColumnChart.vue'
import StackedHorizontalBar from '@/components/chart/StackedHorizontalBar.vue'
import axios from '@/api/axios/base'

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
  }
  .filter_box {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
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
      width: 100%;
      height: 160px;
    }
  }
  .base_box {
    width: 100%;
  }
  .wuhua_box {
    width: 100%;
  }
  .proxy_box {
    width: 100%;
  }
}
</style>
