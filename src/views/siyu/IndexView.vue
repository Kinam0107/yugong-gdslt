<template>
  <div class="siyu">
    <div :class="['card', { active: activeTab === '精准预报' }]">
      <span class="name" @click="changeActive('精准预报', '', '')">精准预报</span>
      <TabBar class="defense_line" modelValue="三道防线" :tabs="['三道防线']" type="title" />
      <div class="external_link">
        <div class="item" @click="jumpTarget('https://smart.zj121.com/tqwpagesnew/weather/zj72xsjslyb.html')">
          <img src="@/assets/images/rain.png" alt="" />
          <span class="label">降雨预报</span>
        </div>
        <div class="item" @click="jumpTarget('https://slt.zj.gov.cn/col/col1513112/index.html')">
          <img src="@/assets/images/cloudy.png" alt="" />
          <span class="label">气象云图</span>
        </div>
        <div class="item" @click="jumpTarget('https://typhoon.slt.zj.gov.cn/')">
          <img src="@/assets/images/typhoon.png" alt="" />
          <span class="label">台风路径</span>
        </div>
      </div>
      <TabBar class="yc-name" v-model="forecastCategroy" :tabs="['洪水预报', '纳蓄能力']" type="title" @change="(e) => changeActive('精准预报', e, '')" />
      <template v-if="forecastCategroy === '洪水预报'">
        <div class="rainfall_selection">
          <span class="label">假定雨量：</span>
          <div class="item" :class="{ active: rainTab === 1 }" @click="changeRainTab(1)">50mm</div>
          <div class="item" :class="{ active: rainTab === 2 }" @click="changeRainTab(2)">100mm</div>
          <div class="item" :class="{ active: rainTab === 3 }" @click="changeRainTab(3)">150mm</div>
          <div class="item" :class="{ active: rainTab === 4 }" @click="changeRainTab(4)">自定义</div>
          <el-input v-if="rainTab === 4" v-model="rainfall" @change="getForecastData" />
        </div>
        <div class="water_level">
          <div class="item">
            <img src="@/assets/images/circleCameraOrange.png" alt="" />
            <div class="info">
              <div class="label">超限制水位</div>
              <div class="data">
                <span class="value" style="color: #ff9936">{{ forecastData.cxzsw }}</span>
                <span class="unit">座</span>
              </div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/circleRouteRed.png" alt="" />
            <div class="info">
              <div class="label">超设计水位</div>
              <div class="data">
                <span class="value" style="color: #f5402a">{{ forecastData.csjsw }}</span>
                <span class="unit">座</span>
              </div>
            </div>
          </div>
        </div>
        <div class="achievement">
          <div class="item">
            <div class="info">
              <div class="label">预报成果</div>
              <div class="data">
                <span class="value">{{ forecastData.ybcg }}</span>
                <span class="unit">份</span>
              </div>
            </div>
            <img src="@/assets/images/achievement.png" alt="" />
          </div>
          <div class="item">
            <div class="info">
              <div class="label">有效期内预报</div>
              <div class="tip">未来24小时内</div>
              <div class="data">
                <span class="value">{{ forecastData.yxqnyb }}</span>
                <span class="unit">份</span>
              </div>
            </div>
            <img src="@/assets/images/achievement.png" alt="" />
          </div>
        </div>
      </template>
      <template v-else-if="forecastCategroy === '纳蓄能力'">
        <div class="filters-wrap">
          <div class="item" :class="{ active: typeTab === 1 }" @click="changeTypeTab(1)">现状实况</div>
          <div class="item" :class="{ active: typeTab === 2 }" @click="changeTypeTab(2)">假定雨量</div>
          <template v-if="typeTab === 2">
            <el-radio-group v-model="assumeRainTab" @change="changeAssumeRainTab">
              <el-radio label="1">50mm</el-radio>
              <el-radio label="2">100mm</el-radio>
            </el-radio-group>
            <el-input v-model="assumeRainfallInput" placeholder="自定义" @change="assumeRainfallInputChange" />
          </template>
        </div>
        <div class="filters-wrap">
          <div class="item" :class="{ active: descTab === 1 }" @click="changeDescTab(1)">至限制水位</div>
          <div class="item" :class="{ active: descTab === 2 }" @click="changeDescTab(2)">至正常蓄水位</div>
          <div class="item" :class="{ active: descTab === 3 }" @click="changeDescTab(3)">至设计洪水位</div>
        </div>
        <div class="retain_water-wrap">
          <div class="chart-wrap">
            <div class="data">
              <span class="label">蓄水总量</span>
              <span class="value">{{ retainWaterStatistic.total }}</span>
              <span class="unit">亿m³</span>
            </div>
          </div>
          <div class="legend-wrap">
            <div class="data">
              <span class="label">蓄水率</span>
              <span class="value">{{ retainWaterStatistic.per }}</span>
              <span class="unit">%</span>
            </div>
            <div class="legend-name">可纳雨量</div>
            <ul class="legend">
              <li>
                <i style="background: #0cbf5b"></i>
                <span>200mm以上</span>
              </li>
              <li>
                <i style="background: #276af0"></i>
                <span>100-200mm</span>
              </li>
              <li>
                <i style="background: #ffcb27"></i>
                <span>50-100mm</span>
              </li>
              <li>
                <i style="background: #ff4d4f"></i>
                <span>50mm以下</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div :class="['card', { active: activeTab === '统一预警' }]">
      <span class="name" @click="changeActive('统一预警', '', '水情预警')">统一预警</span>
      <div class="early_warning">
        <div class="item" style="cursor: pointer" :class="{ active: activeFlag('统一预警', '', '水情预警') }" @click="changeActive('统一预警', '', '水情预警')">
          <div class="info">
            <div class="label">水情预警</div>
            <div class="data">
              <span class="value">{{ warningStatistic.sqyj }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <img src="@/assets/images/regimen.png" alt="" />
        </div>
        <div class="item">
          <div class="info">
            <div class="label">工情预警</div>
            <div class="data">
              <span class="value">{{ warningStatistic.gqyj }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <img src="@/assets/images/engineeringSituation.png" alt="" />
        </div>
      </div>
      <div class="water_level-chart">
        <div class="chart-wrap">
          <RingChart ref="waterLevelChart" :color="colors" :data="waterLevelData" />
        </div>
        <ul class="legend-wrap">
          <li v-for="(item, index) in waterLevelData" :key="index" :class="{ active: activeFlag('统一预警', '', item.name) }" @click="changeActive('统一预警', '', item.name)">
            <i class="round_dot" :style="{ background: colors[index] }"></i>
            <span class="label">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">座</span>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['card']">
      <span class="name" style="cursor: auto">模拟预演</span>
      <div class="risk_total">
        <div class="row">
          <span class="label">风险总数</span>
          <span class="value">{{ riskData.total }}</span>
          <span class="unit">座 (未来24小时)</span>
        </div>
        <div class="row">计算时间：{{ riskData.time }}</div>
      </div>
      <TabBar class="syfx-name" modelValue="上游风险" :tabs="['上游风险']" type="title" />
      <div class="ymfw-wrap">
        <span class="label">淹没范围</span>
        <span class="value">{{ upstreamData.ymfw }}</span>
        <span class="unit">km²</span>
      </div>
      <div class="effect-wrap">
        <div class="item">
          <div class="label">影响耕地</div>
          <div class="data">
            <span class="value">{{ upstreamData.yxgd }}</span>
            <span class="unit">亩</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">受淹人口</div>
          <div class="data">
            <span class="value">{{ upstreamData.syrk }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">GDP损失</div>
          <div class="data">
            <span class="value">{{ upstreamData.gdpss }}</span>
            <span class="unit">万元</span>
          </div>
        </div>
      </div>
      <TabBar class="xyfx-name" modelValue="下游风险" :tabs="['下游风险']" type="title" />
      <div class="ymfw-wrap">
        <span class="label">淹没范围</span>
        <span class="value">{{ downstreamData.ymfw }}</span>
        <span class="unit">km²</span>
      </div>
      <div class="effect-wrap">
        <div class="item">
          <div class="label">影响耕地</div>
          <div class="data">
            <span class="value">{{ downstreamData.yxgd }}</span>
            <span class="unit">亩</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">受淹人口</div>
          <div class="data">
            <span class="value">{{ downstreamData.syrk }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">GDP损失</div>
          <div class="data">
            <span class="value">{{ downstreamData.gdpss }}</span>
            <span class="unit">万元</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '在线预案' }]">
      <span class="name" @click="changeActive('在线预案', '', '')">在线预案</span>
      <TabBar class="ddfa-name" modelValue="调度方案" :tabs="['调度方案']" type="title" />
      <div class="scheduling_scheme">
        <div class="item">
          <div class="data">
            <span class="value">{{ ddfa.y }}</span>
            <span class="unit">座</span>
          </div>
          <div class="label">有方案</div>
        </div>
        <div class="item">
          <div class="data">
            <span class="value">{{ ddfa.w }}</span>
            <span class="unit">座</span>
          </div>
          <div class="label">无方案</div>
        </div>
      </div>
      <TabBar class="yjya-name" modelValue="应急预案" :tabs="['应急预案']" type="title" />
      <div class="emergency_plan">
        <div class="item">
          <div class="data">
            <span class="value">{{ yjya.y }}</span>
            <span class="unit">座</span>
          </div>
          <div class="label">有方案</div>
        </div>
        <div class="item">
          <div class="data">
            <span class="value">{{ yjya.w }}</span>
            <span class="unit">座</span>
          </div>
          <div class="label">无方案</div>
        </div>
      </div>
      <TabBar class="szyl-name" modelValue="实战演练" :tabs="['实战演练']" type="title" />
      <div class="ndkz-wrap" :class="{ active: activeFlag('在线预案', '实战演练', '年度开展') }" @click="changeActive('在线预案', '实战演练', '年度开展')">
        <span class="label">年度开展</span>
        <span class="value">{{ szyl.num }}</span>
        <span class="unit">座</span>
        <span class="value">{{ szyl.times }}</span>
        <span class="unit">次</span>
      </div>
    </div>
    <div class="list">
      <div class="filter">
        <div class="item">
          <span class="label">水库名称：</span>
          <el-input v-model="name" style="width: 240px" placeholder="请输入关键字" :suffix-icon="Search" @change="search" />
        </div>
        <div class="item">
          <span class="label">工程规模：</span>
          <el-select v-model="scale" placeholder="请选择" style="width: 240px" clearable @change="search">
            <el-option v-for="item in getOptions('SKGM')" :key="'scale' + item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="item">
          <span class="label">行政区划：</span>
          <el-select v-model="adcd" placeholder="请选择" style="width: 240px" @change="search">
            <el-option v-for="item in getOptions('XZQH')" :key="'adcd' + item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="btns">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="exported">导出</el-button>
        </div>
      </div>
      <div class="tabler" ref="tabler">
        <el-table :key="activeTab + 'table'" :data="tableData" style="width: 100%" stripe :max-height="tableHeight">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column label="工程名称">
            <template #default="scope">
              <el-button v-if="scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521'" type="primary" link @click="jumpProject(scope.row.PRCD || scope.row.prcd)">
                {{ scope.row.NAME }}
              </el-button>
              <span v-else>{{ scope.row.NAME }}</span>
              <span v-if="['330782022000521', '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'].includes(scope.row.PRCD)" class="pilot-marking">试点水库</span>
            </template>
          </el-table-column>
          <el-table-column label="所在市">
            <template #default="scope">{{ scope.row.cityADNM }}</template>
          </el-table-column>
          <el-table-column label="所在县">
            <template #default="scope">{{ scope.row.countryADNM }}</template>
          </el-table-column>
          <el-table-column label="工程规模">
            <template #default="scope">{{ scope.row.scale || dataEcho('SKGM', scope.row.project_scale) }}</template>
          </el-table-column>
          <template v-if="activeTab === '精准预报'">
            <el-table-column label="限制水位(m)">
              <template #default="scope">{{ scope.row.limitWaterLevel }}</template>
            </el-table-column>
            <el-table-column label="设计洪水位(m)">
              <template #default="scope">{{ scope.row.DSFLZ }}</template>
            </el-table-column>
            <el-table-column label="洪水预报(未来72h)" align="center">
              <el-table-column label="最高水位(m)">
                <template #default="scope">{{ scope.row.fctWater }}</template>
              </el-table-column>
              <el-table-column label="出现时间">
                <template #default="scope">{{ scope.row.ftm }}</template>
              </el-table-column>
              <el-table-column label="最大下泄流量(m³/s)">
                <template #default="scope">{{ scope.row.outFlow }}</template>
              </el-table-column>
              <el-table-column label="出现时间">
                <template #default="scope">{{ scope.row.wtm }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="总库容(万m³)">
              <template #default="scope">{{ scope.row.tcp }}</template>
            </el-table-column>
            <el-table-column label="当前库容(万m³)">
              <template #default="scope">{{ scope.row.currenty }}</template>
            </el-table-column>
            <el-table-column label="可纳雨量(mm)" align="center">
              <el-table-column label="至限制水位">
                <template #default="scope">{{ scope.row.limitRainfall }}</template>
              </el-table-column>
              <el-table-column label="至正常蓄水位">
                <template #default="scope">{{ scope.row.cscRainfall }}</template>
              </el-table-column>
              <el-table-column label="至设计洪水位">
                <template #default="scope">{{ scope.row.desRainfall }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '统一预警'"></template>
          <template v-else-if="activeTab === '在线预案'">
            <el-table-column label="调度方案">
              <template #default="scope">{{ scope.row.ddfa }}</template>
            </el-table-column>
            <el-table-column label="应急预案">
              <template #default="scope">{{ scope.row.yjya }}</template>
            </el-table-column>
            <el-table-column label="实战演练（本年度）/次">
              <template #default="scope">{{ scope.row.szylNum }}</template>
            </el-table-column>
          </template>
          <el-table-column label="操作" width="60">
            <template #default="scope">
              <img
                :style="{
                  cursor: scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521' ? 'pointer' : 'not-allowed',
                  filter: scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521' ? 'none' : 'grayscale(1)'
                }"
                src="@/assets/images/screenIcon.png"
                @click="jumpScreen(scope.row.PRCD || scope.row.prcd)"
                alt="" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import RingChart from '@/components/chart/RingChart.vue'
import { dataEcho, getOptions } from '@/utils/enum'
import axios from '@/api/axios'

const colors = ['#276AF0', '#FFCB27', '#FF4D4F']
const activeTab = ref('精准预报')
const activeType = ref('')
const activeItem = ref('')
const activeFlag = (tab, type, item) => {
  return activeTab.value === tab && activeType.value === type && activeItem.value === item
}
const changeActive = (tab, type, item) => {
  activeTab.value = tab
  activeType.value = type
  activeItem.value = activeItem.value === item ? '' : item
  search()
}

const forecastCategroy = ref('洪水预报')
const rainfall = ref('50')
const rainTab = ref(1)
const changeRainTab = (tab) => {
  rainTab.value = tab
  if (tab === 1) {
    rainfall.value = '50'
    getForecastData()
  } else if (tab === 2) {
    rainfall.value = '100'
    getForecastData()
  } else if (tab === 3) {
    rainfall.value = '150'
    getForecastData()
  } else if (tab === 4) {
    rainfall.value = ''
  }
}
const forecastData = reactive({
  cxzsw: 0,
  csjsw: 0,
  ybcg: 0,
  yxqnyb: 0
})
const getForecastData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 29,
      rain: rainfall.value
    }
  })
    .then((res) => {
      forecastData.cxzsw = res.data?.cxzNum ?? '-'
      forecastData.csjsw = res.data?.csjNum ?? '-'
      forecastData.ybcg = res.data?.num ?? '-'
      forecastData.yxqnyb = res.data?.yxqNum ?? '-'
    })
    .catch(() => {
      forecastData.cxzsw = '-'
      forecastData.csjsw = '-'
      forecastData.ybcg = '-'
      forecastData.yxqnyb = '-'
    })
}
onBeforeMount(() => {
  getForecastData()
})

const typeTab = ref(1)
const changeTypeTab = (tab) => {
  typeTab.value = tab
  getRetainWater()
}
const descTab = ref(1)
const changeDescTab = (tab) => {
  descTab.value = tab
  getRetainWater()
}
const assumeRainfall = ref('50')
const assumeRainfallInput = ref('')
const assumeRainTab = ref('1')
const changeAssumeRainTab = (val) => {
  assumeRainfallInput.value = ''
  if (val === '1') {
    assumeRainfall.value = '50'
  } else if (val === '2') {
    assumeRainfall.value = '100'
  }
  getRetainWater()
}
const assumeRainfallInputChange = (val) => {
  assumeRainTab.value = ''
  assumeRainfall.value = val
  getRetainWater()
}
const retainWaterStatistic = reactive({
  total: 0,
  per: 0
})
const retainWaterData = ref([0, 0, 0, 0])
const getRetainWater = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 55,
      rain: typeTab.value === 1 ? undefined : assumeRainfall.value
    }
  })
    .then((res) => {
      retainWaterStatistic.total = res.data?.currenty ?? '-'
      if (descTab.value === 1) {
        retainWaterStatistic.per = res.data?.limitStoragePerc ?? '-'
        retainWaterData.value = [res.data?.limitRain50, res.data?.limitRain100, res.data?.limitRain200, res.data?.limitRainOver200]
      } else if (descTab.value === 2) {
        retainWaterStatistic.per = res.data?.zcStoragePerc ?? '-'
        retainWaterData.value = [res.data?.zcRain50, res.data?.zcRain100, res.data?.zcRain200, res.data?.zcRainOver200]
      } else if (descTab.value === 3) {
        retainWaterStatistic.per = res.data?.sjStoragePerc ?? '-'
        retainWaterData.value = [res.data?.sjRain50, res.data?.sjRain100, res.data?.sjRain200, res.data?.sjRainOver200]
      }
    })
    .catch(() => {
      retainWaterStatistic.total = '-'
      retainWaterStatistic.per = '-'
      retainWaterData.value = [0, 0, 0, 0]
    })
}
onBeforeMount(() => {
  getRetainWater()
})

const warningStatistic = reactive({
  sqyj: 0,
  gqyj: 0
})
const waterLevelData = ref([
  { value: 0, name: '超限制水位' },
  { value: 0, name: '超正常蓄水位' },
  { value: 0, name: '超设计水位' }
])
const waterLevelChart = ref()
const getWarningData = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 4
    }
  })
    .then((res) => {
      warningStatistic.sqyj = res.data?.overTotal ?? '-'
      warningStatistic.gqyj = res.data?.overLimit3Num ?? '-'
      waterLevelData.value.map((e) => {
        if (e.name === '超限制水位') {
          e.value = res.data?.overLimitNum ?? 0
        } else if (e.name === '超正常蓄水位') {
          e.value = res.data?.overNwNum ?? 0
        } else if (e.name === '超设计水位') {
          e.value = res.data?.overDesignNum ?? 0
        }
        return e
      })
    })
    .catch(() => {
      warningStatistic.sqyj = '-'
      warningStatistic.gqyj = '-'
      waterLevelData.value.map((e) => {
        e.value = 0
        return e
      })
    })
    .finally(() => {
      waterLevelChart.value.initChart()
    })
}
onBeforeMount(() => {
  getWarningData()
})

const riskData = reactive({
  total: 0,
  time: ''
})
const getRiskData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 30
    }
  })
    .then((res) => {
      riskData.total = res.data?.num ?? '-'
      riskData.time = res.data?.tm ?? '-'
    })
    .catch(() => {
      riskData.total = '-'
      riskData.time = '-'
    })
}
onBeforeMount(() => {
  getRiskData()
})

const upstreamData = reactive({
  ymfw: 0,
  yxgd: 0,
  syrk: 0,
  gdpss: 0
})
const getUpstreamData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 32
    }
  })
    .then((res) => {
      upstreamData.ymfw = res.data?.radiusArea ?? '-'
      upstreamData.yxgd = res.data?.infCult ?? '-'
      upstreamData.syrk = res.data?.inundPop ?? '-'
      upstreamData.gdpss = res.data?.gdp ?? '-'
    })
    .catch(() => {
      upstreamData.ymfw = '-'
      upstreamData.yxgd = '-'
      upstreamData.syrk = '-'
      upstreamData.gdpss = '-'
    })
}
onBeforeMount(() => {
  getUpstreamData()
})

const downstreamData = reactive({
  ymfw: 0,
  yxgd: 0,
  syrk: 0,
  gdpss: 0
})
const getDownstreamData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 33
    }
  })
    .then((res) => {
      downstreamData.ymfw = res.data?.radiusArea ?? '-'
      downstreamData.yxgd = res.data?.infCult ?? '-'
      downstreamData.syrk = res.data?.inundPop ?? '-'
      downstreamData.gdpss = res.data?.gdp ?? '-'
    })
    .catch(() => {
      downstreamData.ymfw = '-'
      downstreamData.yxgd = '-'
      downstreamData.syrk = '-'
      downstreamData.gdpss = '-'
    })
}
onBeforeMount(() => {
  getDownstreamData()
})

const ddfa = reactive({
  y: 0,
  w: 0
})
const getDdfa = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 21
    }
  })
    .then((res) => {
      ddfa.y = res.data?.yfa ?? '-'
      ddfa.w = res.data?.num && res.data?.yfa ? res.data.num - res.data.yfa : '-'
    })
    .catch(() => {
      ddfa.y = '-'
      ddfa.w = '-'
    })
}
onBeforeMount(() => {
  getDdfa()
})

const yjya = reactive({
  y: 0,
  w: 0
})
const getYjya = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 22
    }
  })
    .then((res) => {
      yjya.y = res.data?.yfa ?? '-'
      yjya.w = res.data?.num && res.data?.yfa ? res.data.num - res.data.yfa : '-'
    })
    .catch(() => {
      yjya.y = '-'
      yjya.w = '-'
    })
}
onBeforeMount(() => {
  getYjya()
})

const szyl = reactive({
  num: 0,
  times: 0
})
const getSzyl = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPre',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 53
    }
  })
    .then((res) => {
      szyl.num = res.data?.zsNum ?? '-'
      szyl.times = res.data?.csNum ?? '-'
    })
    .catch(() => {
      szyl.num = '-'
      szyl.times = '-'
    })
}
onBeforeMount(() => {
  getSzyl()
})

const name = ref('')
const scale = ref('')
const adcd = ref('330782000000')
const tableData = ref([])
const search = () => {
  if (activeTab.value === '精准预报') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPre',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 102
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '统一预警') {
    if (activeType.value === '' && activeItem.value === '水情预警') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 5,
          pointType: 5
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '超限制水位') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 5,
          pointType: 1
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '超正常蓄水位') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 5,
          pointType: 4
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '超设计水位') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 5,
          pointType: 2
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '在线预案') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPre',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 104
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '实战演练' && activeItem.value === '年度开展') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPre',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 54
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  }
}
const reset = () => {
  name.value = ''
  scale.value = ''
  adcd.value = '330782000000'
  search()
}
onBeforeMount(() => {
  search()
})
const tabler = ref()
const tableHeight = ref(0)
const getTableHeight = () => {
  tableHeight.value = tabler.value.clientHeight - 40
}
onMounted(() => {
  getTableHeight()
  window.addEventListener('resize', getTableHeight)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', getTableHeight)
})

const jumpTarget = (web) => {
  window.open(web)
}
const jumpProject = (prcd) => {
  console.log('jumpProject', prcd)
  window.open('http://192.168.2.173:1008')
}
const jumpScreen = (prcd) => {
  console.log('jumpScreen', prcd)
}

const exported = () => {
  console.log('导出')
}
</script>

<style lang="scss" scoped>
.siyu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  padding: 20px;
}
.card {
  flex: 1;
  height: 420px;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow:
    4px 4px 20px 0px rgba(55, 99, 170, 0.05),
    -4px -4px 20px 0px rgba(55, 99, 170, 0.05);
  padding: 18px;
  &.active {
    border-color: $color-primary;
  }
  .name {
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: #16181a;
    margin-bottom: 2 * $baseDistance;
    cursor: pointer;
  }
}
.defense_line {
  margin-bottom: $baseDistance;
}
.external_link {
  display: flex;
  gap: 2 * $baseDistance;
  margin-bottom: 2 * $baseDistance;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 11px;
    flex: 1;
    height: 48px;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
}
.yc-name {
  margin-bottom: 2 * $baseDistance;
}
.rainfall_selection {
  display: flex;
  align-items: center;
  margin-bottom: 2.5 * $baseDistance;
  .label {
    font-size: 14px;
    line-height: 22px;
    color: #181818;
  }
  .item {
    width: 60px;
    height: 20px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(155, 166, 183, 0.4);
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: $color-titletext;
    cursor: pointer;
    + .item {
      margin-left: $baseDistance;
    }
    &.active {
      color: $color-primary;
      border-color: $color-primary;
    }
  }
  .el-input {
    width: 60px;
    height: 20px;
    margin-left: $baseDistance;
    line-height: 18px;
  }
}
.water_level {
  display: flex;
  gap: 12 * $baseDistance;
  margin-bottom: 2.25 * $baseDistance;
  .item {
    display: flex;
    gap: 1.5 * $baseDistance;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-titletext;
      }
      .data {
        display: flex;
        align-items: center;
        gap: $baseDistance;
        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          line-height: 16px;
        }
        .unit {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          line-height: 16px;
          color: $color-titletext;
        }
      }
    }
  }
}
.achievement {
  display: flex;
  gap: 2 * $baseDistance;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    padding: 0 $baseDistance 0 2 * $baseDistance;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      padding: $baseDistance 0;
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-titletext;
      }
      .tip {
        font-family: Source Han Sans;
        font-size: 12px;
        line-height: 16px;
        color: $color-titletext;
      }
      .data {
        display: flex;
        align-items: center;
        gap: 0.5 * $baseDistance;
        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          line-height: 16px;
          color: $color-primary;
        }
        .unit {
          font-family: Source Han Sans;
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
          color: $color-titletext;
        }
      }
    }
  }
}
.filters-wrap {
  display: flex;
  margin-bottom: $baseDistance;
  .item {
    height: 20px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(155, 166, 183, 0.4);
    padding: 0 5px;
    font-size: 14px;
    font-weight: normal;
    line-height: 18px;
    color: $color-titletext;
    cursor: pointer;
    + .item {
      margin-left: $baseDistance;
    }
    &.active {
      border-color: $color-primary;
      color: $color-primary;
    }
  }
  .el-radio-group {
    margin-left: $baseDistance;
    :deep(.el-radio) {
      margin-right: $baseDistance;
      height: 20px;
    }
  }
  .el-input {
    width: 70px;
    height: 20px;
    line-height: 18px;
  }
}
.retain_water-wrap {
  display: flex;
  height: calc(100% - 232px);
  .chart-wrap,
  .legend-wrap {
    height: 100%;
    .data {
      display: flex;
      align-items: center;
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }
      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-titletext;
        margin: 0 5px;
      }
      .unit {
        font-family: Source Han Sans;
        font-size: 14px;
        font-weight: 500;
        color: $color-titletext;
      }
    }
  }
  .chart-wrap {
    width: 55%;
  }
  .legend-wrap {
    width: 45%;
    .legend-name {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
      margin-top: 10px;
    }
    ul.legend {
      li {
        display: flex;
        align-items: center;
        > i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: $baseDistance;
        }
        > span {
          font-size: 16px;
          line-height: 24px;
          color: $color-titletext;
        }
      }
    }
  }
}
.early_warning {
  display: flex;
  gap: 2 * $baseDistance;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100px;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    padding: 0 $baseDistance 0 2 * $baseDistance;
    &.active {
      border-color: $color-primary;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      padding: $baseDistance 0;
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-titletext;
      }
      .tip {
        font-family: Source Han Sans;
        font-size: 12px;
        line-height: 16px;
        color: $color-titletext;
      }
      .data {
        display: flex;
        align-items: center;
        gap: 0.5 * $baseDistance;
        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          line-height: 16px;
          color: $color-warning;
        }
        .unit {
          font-family: Source Han Sans;
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
          color: $color-titletext;
        }
      }
    }
  }
}
.water_level-chart {
  display: flex;
  width: 100%;
  height: calc(100% - 140px);
  .chart-wrap {
    width: 50%;
    height: 100%;
  }
  .legend-wrap {
    width: 50%;
    height: 100%;
    padding: 10 * $baseDistance 3 * $baseDistance 9 * $baseDistance $baseDistance;
    li {
      display: flex;
      align-items: center;
      color: $color-titletext;
      cursor: pointer;
      &.active {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: -$baseDistance;
          right: -$baseDistance;
          top: 0;
          bottom: 0;
          border: 1px solid $color-primary;
          background: transparentize($color-primary, 0.9);
        }
      }
      + li {
        margin-top: $baseDistance;
      }
      .round_dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: $baseDistance;
      }
      .label {
        font-size: 16px;
        line-height: 24px;
      }
      .value {
        flex: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        line-height: 26px;
        text-align: right;
      }
      .unit {
        font-size: 16px;
        line-height: 24px;
        margin-left: $baseDistance;
      }
    }
  }
}
.risk_total {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 62px;
  border-radius: 2px;
  background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
  border: 2px solid #ffffff;
  box-shadow:
    8px 8px 20px 0px rgba(55, 99, 170, 0.1),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
  margin-bottom: $baseDistance;
  .row {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 16px;
    color: #999999;
    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: $color-titletext;
    }
    .value {
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      line-height: 16px;
      color: #0052d9;
      margin: 0 0.5 * $baseDistance 0 $baseDistance;
    }
    .unit {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      color: $color-titletext;
    }
  }
}
.syfx-name {
  margin-bottom: $baseDistance;
}
.xyfx-name {
  margin-bottom: $baseDistance;
}
.ymfw-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
  border: 2px solid #ffffff;
  box-shadow:
    8px 8px 20px 0px rgba(55, 99, 170, 0.1),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
  margin-bottom: $baseDistance;
  .label {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: $color-titletext;
  }
  .value {
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    line-height: 16px;
    color: $color-primary;
    margin: 0 5px 0 7px;
  }
  .unit {
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: $color-titletext;
  }
}
.effect-wrap {
  display: flex;
  width: 100%;
  height: 56px;
  margin-bottom: $baseDistance;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
    }
    .data {
      display: flex;
      align-items: center;
      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-titletext;
      }
      .unit {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
        margin-left: $baseDistance;
      }
    }
  }
  .line {
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
  }
}
.ddfa-name {
  margin-bottom: 2 * $baseDistance;
}
.scheduling_scheme {
  display: flex;
  gap: 3 * $baseDistance;
  margin-bottom: 5 * $baseDistance;
  .item {
    position: relative;
    flex: 1;
    height: 54px;
    background-size: 100% 100%;
    &:nth-child(1) {
      background-image: url('@/assets/images/schedulingSchemeBg.png');
      .data .value {
        color: $color-primary;
      }
    }
    &:nth-child(2) {
      background-image: url('@/assets/images/schedulingSchemeOrangeBg.png');
      .data .value {
        color: $color-warning;
      }
    }
    .data {
      display: flex;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-100%);
      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        margin-right: 0.5 * $baseDistance;
      }
      .unit {
        font-size: 14px;
      }
    }
    .label {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
.yjya-name {
  margin-bottom: 2 * $baseDistance;
}
.emergency_plan {
  display: flex;
  gap: 3 * $baseDistance;
  margin-bottom: 5 * $baseDistance;
  .item {
    position: relative;
    flex: 1;
    height: 54px;
    background-size: 100% 100%;
    &:nth-child(1) {
      background-image: url('@/assets/images/emergencyPlanBg.png');
      .data .value {
        color: $color-primary;
      }
    }
    &:nth-child(2) {
      background-image: url('@/assets/images/emergencyPlanOrangeBg.png');
      .data .value {
        color: $color-warning;
      }
    }
    .data {
      display: flex;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-100%);
      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        margin-right: 0.5 * $baseDistance;
      }
      .unit {
        font-size: 14px;
      }
    }
    .label {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
.szyl-name {
  margin-bottom: $baseDistance;
}
.ndkz-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
  border: 2px solid #ffffff;
  box-shadow:
    8px 8px 20px 0px rgba(55, 99, 170, 0.1),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &.active {
    border-color: $color-primary;
  }
  .label {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    color: $color-titletext;
  }
  .value {
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: $color-primary;
    margin: 0 5px 0 8px;
  }
  .unit {
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: 500;
    color: $color-titletext;
  }
}
.list {
  width: 100%;
  height: calc(100% - 440px);
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow:
    4px 4px 20px 0px rgba(55, 99, 170, 0.05),
    -4px -4px 20px 0px rgba(55, 99, 170, 0.05);
  .filter {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #d7dbe0;
    .item {
      display: flex;
      align-items: center;
      margin-right: 4 * $baseDistance;
      .label {
        font-size: 14px;
        color: $color-titletext;
      }
    }
    .btns {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
  .tabler {
    width: 100%;
    height: calc(100% - 73px);
    padding: 20px;
  }
}
.pilot-marking {
  display: inline-block;
  height: 20px;
  background: linear-gradient(62deg, #0060ff 31%, #00e7ff 94%);
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: #ffffff;
  border-radius: 2px;
  padding: 0 4px;
}
</style>
