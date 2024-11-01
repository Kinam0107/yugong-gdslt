<template>
  <div class="siguan">
    <div :class="['card', { active: activeTab === '及时除险' }]">
      <span class="name" @click="changeActive('及时除险', '除险加固', '')">及时除险</span>
      <TabBar class="tab-bar" modelValue="除险加固" :tabs="['除险加固']" type="title" />
      <div class="cxjg-wrap">
        <div class="item">
          <div class="category">
            <SvgIcon icon="flag" :size="20" color="#0052d9" />
            <span>总数</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '二类坝总数') }"
            @click="changeActive('及时除险', '除险加固', '二类坝总数')">
            <span class="label">二类坝</span>
            <span class="value">{{ dangerElimination.elbzs }}</span>
            <span class="unit">座</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '三类坝总数') }"
            @click="changeActive('及时除险', '除险加固', '三类坝总数')">
            <span class="label">三类坝</span>
            <span class="value">{{ dangerElimination.slbzs }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="item">
          <div class="category">
            <SvgIcon icon="exclamation-point" :size="20" color="#0052d9" />
            <span>未开工</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '二类坝未开工') }"
            @click="changeActive('及时除险', '除险加固', '二类坝未开工')">
            <span class="label">二类坝</span>
            <span class="value">{{ dangerElimination.elbwkg }}</span>
            <span class="unit">座</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '三类坝未开工') }"
            @click="changeActive('及时除险', '除险加固', '三类坝未开工')">
            <span class="label">三类坝</span>
            <span class="value">{{ dangerElimination.slbwkg }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="item">
          <div class="category">
            <SvgIcon icon="check-mark" :size="20" color="#0052d9" />
            <span>已开工</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '二类坝已开工') }"
            @click="changeActive('及时除险', '除险加固', '二类坝已开工')">
            <span class="label">二类坝</span>
            <span class="value">{{ dangerElimination.elbykg }}</span>
            <span class="unit">座</span>
          </div>
          <div class="data" :class="{ active: activeFlag('及时除险', '除险加固', '三类坝已开工') }"
            @click="changeActive('及时除险', '除险加固', '三类坝已开工')">
            <span class="label">三类坝</span>
            <span class="value">{{ dangerElimination.slbykg }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <TabBar class="tab-bar" modelValue="问题处置" :tabs="['问题处置']" type="title" />
      <div class="jczl-wrap">
        <span class="label">检查总量</span>
        <span class="value">{{ problemData.jczl }}</span>
        <span class="unit">座次</span>
      </div>
      <div class="wtcz-wrap">
        <div class="item">
          <div class="value">{{ problemData.fxwt }}</div>
          <div class="label">发现问题(项)</div>
          <img src="@/assets/images/fxwtIcon.png" alt="" />
        </div>
        <div class="item" style="cursor: pointer" :class="{ active: activeFlag('及时除险', '问题处置', '处置中') }"
          @click="changeActive('及时除险', '问题处置', '处置中')">
          <div class="value">{{ problemData.czz }}</div>
          <div class="label">处置中(项)</div>
          <img src="@/assets/images/czzIcon.png" alt="" />
        </div>
        <div class="item" style="cursor: pointer" :class="{ active: activeFlag('及时除险', '问题处置', '已处置') }"
          @click="changeActive('及时除险', '问题处置', '已处置')">
          <div class="value">{{ problemData.ycz }}</div>
          <div class="label">已处置(项)</div>
          <img src="@/assets/images/yczIcon.png" alt="" />
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '水库体检' }]">
      <span class="name" @click="changeActive('水库体检', '', '')">水库体检</span>
      <TabBar class="tab-bar" modelValue="风险研判" :tabs="['风险研判']" type="title" />
      <div class="fxyp-wrap">
        <div class="chart-wrap">
          <RingChart ref="riskAssessmentChart" :color="colors" :data="riskAssessmentData" />
        </div>
        <ul class="legend-wrap">
          <li v-for="(item, index) in riskAssessmentData" :key="index"
            :class="{ active: activeFlag('水库体检', '风险研判', item.name) }" @click="changeActive('水库体检', '风险研判', item.name)">
            <i class="round_dot" :style="{ background: colors[index] }"></i>
            <span class="label">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">座</span>
          </li>
        </ul>
      </div>
      <TabBar class="tab-bar" modelValue="安全鉴定" :tabs="['安全鉴定']" type="title" />
      <div class="aqjd-wrap">
        <div class="item" :class="{ active: activeFlag('水库体检', '安全鉴定', '三类坝') }"
          @click="changeActive('水库体检', '安全鉴定', '三类坝')">
          <div class="label">三类坝</div>
          <div class="data">
            <span class="value">{{ safetyAppraisement.slb }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeFlag('水库体检', '安全鉴定', '二类坝') }"
          @click="changeActive('水库体检', '安全鉴定', '二类坝')">
          <div class="label">二类坝</div>
          <div class="data">
            <span class="value">{{ safetyAppraisement.elb }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeFlag('水库体检', '安全鉴定', '近一年到期') }"
          @click="changeActive('水库体检', '安全鉴定', '近一年到期')">
          <div class="label">近一年到期</div>
          <div class="data">
            <span class="value">{{ safetyAppraisement.jyndq }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '工程维护' }]">
      <span class="name" @click="changeActive('工程维护', '', '')">工程维护</span>
      <TabBar class="tab-bar" modelValue="维养计划" :tabs="['维养计划']" type="title" />
      <div class="wyjh-wrap">
        <div class="item" :class="{ active: activeFlag('工程维护', '维养计划', '已编制') }"
          @click="changeActive('工程维护', '维养计划', '已编制')">
          <div class="info">
            <div class="label">已编制</div>
            <div class="data">
              <span class="value">{{ maintenancePlan.ybz }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <img src="@/assets/images/ybzIcon.png" alt="" />
        </div>
        <div class="item" :class="{ active: activeFlag('工程维护', '维养计划', '已落实') }"
          @click="changeActive('工程维护', '维养计划', '已落实')">
          <div class="info">
            <div class="label">已落实</div>
            <div class="data">
              <span class="value">{{ maintenancePlan.yls }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <img src="@/assets/images/ylsIcon.png" alt="" />
        </div>
      </div>
      <TabBar class="tab-bar" v-model="maintanceCategroy" :tabs="['日常维养', '白蚁防治']" type="title" />
      <template v-if="maintanceCategroy === '日常维养'">
        <div class="rcwy-wrap">
          <span class="label">日常维养</span>
          <span class="value">{{ rcwyChartData.total }}</span>
          <span class="unit">座次</span>
        </div>
        <div class="rcwy-chart">
          <BarAndLine ref="rcwyChart" :color="['#0052D9', '#FF9936']" :xAxisValue="rcwyChartData.xAxisValue"
            yAxisUnit="座次" :barData="rcwyChartData.barData" :lineData="rcwyChartData.lineData" />
        </div>
      </template>
      <template v-else-if="maintanceCategroy === '白蚁防治'">
        <div class="rcwy-wrap">
          <span class="label">已排查工程</span>
          <span class="value">{{ ypcPro }}</span>
          <span class="unit">座</span>
        </div>
        <div class="rcwy-chart">
          <div class="chart-wrap">
            <RingChart ref="byfzChart" :color="colors" :data="byfzData" />
          </div>
          <ul class="legend-wrap">
            <li v-for="(item, index) in byfzData" :key="index"
              :class="{ active: activeFlag('工程维护', '白蚁防治', item.name) }"
              @click="changeActive('工程维护', '白蚁防治', item.name)">
              <i class="round_dot" :style="{ background: colors[index] }"></i>
              <span class="label">{{ item.name }}</span>
              <span class="value">{{ item.value }}</span>
              <span class="unit">座</span>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div :class="['card', { active: activeTab === '安全管控' }]">
      <span class="name" @click="changeActive('安全管控', '', '')">安全管控</span>
      <TabBar class="tab-bar2" modelValue="标准化管理" :tabs="['标准化管理']" type="title" />
      <div class="hgl-wrap">
        <span class="label">合格率</span>
        <span class="value">{{ standardizationData.hgl }}</span>
        <span class="unit">%</span>
      </div>
      <div class="bzh-wrap">
        <div class="item" :class="{ active: activeFlag('安全管控', '标准化管理', '部级') }"
          @click="changeActive('安全管控', '标准化管理', '部级')">
          <div class="label">部级</div>
          <div class="value">{{ standardizationData.bj }}</div>
        </div>
        <div class="item" :class="{ active: activeFlag('安全管控', '标准化管理', '省级') }"
          @click="changeActive('安全管控', '标准化管理', '省级')">
          <div class="label">省级</div>
          <div class="value">{{ standardizationData.sj }}</div>
        </div>
        <div class="item" :class="{ active: activeFlag('安全管控', '标准化管理', '精品') }"
          @click="changeActive('安全管控', '标准化管理', '精品')">
          <div class="label">精品</div>
          <div class="value">{{ standardizationData.jp }}</div>
        </div>
        <div class="item" :class="{ active: activeFlag('安全管控', '标准化管理', '合格') }"
          @click="changeActive('安全管控', '标准化管理', '合格')">
          <div class="label">合格</div>
          <div class="value">{{ standardizationData.hg }}</div>
        </div>
      </div>
      <TabBar class="tab-bar2" modelValue="管保范围" :tabs="['管保范围']" type="title" />
      <div class="gbfw-wrap">
        <div class="item" :class="{ active: activeFlag('安全管控', '管保范围', '已划定') }"
          @click="changeActive('安全管控', '管保范围', '已划定')">
          <span class="label">已划定</span>
          <span class="value">{{ scopeData.yhd }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('安全管控', '管保范围', '未划定') }"
          @click="changeActive('安全管控', '管保范围', '未划定')">
          <span class="label">未划定</span>
          <span class="value">{{ scopeData.whd }}</span>
          <span class="unit">座</span>
        </div>
      </div>
      <TabBar class="tab-bar2" modelValue="六项机制" :tabs="['六项机制']" type="title" />
      <div class="lxjz-wrap">
        <div class="item">
          <span class="label">已落实</span>
          <span class="value">{{ sixMechanisms.yls }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item">
          <span class="label">未落实</span>
          <span class="value">{{ sixMechanisms.wls }}</span>
          <span class="unit">座</span>
        </div>
      </div>
      <TabBar class="tab-bar2" modelValue="物资总数" :tabs="['物资总数']" type="title" />
      <div class="wzzs-wrap">
        <span class="label">物资总数</span>
        <span class="value">{{ wzTotal }}</span>
        <span class="unit">件（套）</span>
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
            <el-option v-for="item in getOptions('SKGM')" :key="'scale' + item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="item">
          <span class="label">行政区划：</span>
          <el-select v-model="adcd" placeholder="请选择" style="width: 240px" @change="search">
            <el-option v-for="item in getOptions('XZQH')" :key="'adcd' + item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="btns">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="exported">导出</el-button>
        </div>
      </div>
      <div class="tabler" ref="tabler">
        <el-table :key="activeTab + 'table'" :data="tableDataSort" style="width: 100%" stripe :max-height="tableHeight">
          <el-table-column fixed="left" type="index" label="序号" width="60" />
          <el-table-column label="工程名称" min-width="150">
            <template #default="scope">
              <el-button type="primary" link @click="jumpProject(scope.row.PRCD || scope.row.prcd)">
                {{ scope.row.NAME || scope.row.proName }}
              </el-button>
              <span
                v-if="globalConfig.pilotReservoir.includes(scope.row.PRCD) || globalConfig.pilotReservoir.includes(scope.row.prcd)"
                class="pilot-marking">试点水库</span>
            </template>
          </el-table-column>
          <el-table-column label="所在市" min-width="80">
            <template #default="scope">{{ scope.row.cityADNM || scope.row.adcdctiy }}</template>
          </el-table-column>
          <el-table-column label="所在县" min-width="80">
            <template #default="scope">{{ scope.row.countryADNM || scope.row.adcdcountry }}</template>
          </el-table-column>
          <el-table-column label="工程规模" min-width="100">
            <template #default="scope">{{ scope.row.scale || dataEcho('SKGM', scope.row.project_scale) }}</template>
          </el-table-column>
          <template v-if="activeTab === '及时除险' && activeType === '除险加固'">
            <el-table-column label="安全管理状态" min-width="110">
              <template #default="scope">{{ scope.row.status_str || scope.row.statusw }}</template>
            </el-table-column>
            <el-table-column label="工程检查" align="center">
              <el-table-column label="发现问题" min-width="90">
                <template #default="scope">{{ scope.row.wtNum }}</template>
              </el-table-column>
              <el-table-column label="处置中" min-width="90">
                <template #default="scope">{{ scope.row.czzNum }}</template>
              </el-table-column>
              <el-table-column label="已整改" min-width="90">
                <template #default="scope">{{ scope.row.yzgNum }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-if="activeTab === '及时除险' && activeType === '问题处置'">
            <el-table-column label="检查类型" min-width="120">
              <template #default="scope">{{ scope.row.CHECKMAIN }}</template>
            </el-table-column>
            <el-table-column label="检查主体" min-width="120">
              <template #default="scope">{{ scope.row.ctype }}</template>
            </el-table-column>
            <el-table-column label="发生时间" min-width="120">
              <template #default="scope">{{ scope.row.tm }}</template>
            </el-table-column>
            <el-table-column label="问题描述" min-width="200">
              <template #default="scope">{{ scope.row.pname }}</template>
            </el-table-column>
            <el-table-column label="问题级别" min-width="90">
              <template #default="scope">{{ scope.row.lev }}</template>
            </el-table-column>
            <el-table-column label="整改进展" min-width="90">
              <template #default="scope">{{ scope.row.type }}</template>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '水库体检'">
            <el-table-column label="安全鉴定（最近一次）" align="center">
              <el-table-column label="鉴定时间" min-width="120">
                <template #default="scope">{{ scope.row.satm || scope.row.SA_APP_TM }}</template>
              </el-table-column>
              <el-table-column label="鉴定结论" min-width="120">
                <template #default="scope">{{ scope.row.saAppRst || scope.row.SA_APP_RST }}</template>
              </el-table-column>
              <el-table-column label="到期时间" min-width="120">
                <template #default="scope">{{ scope.row.dueTm || scope.row.R_REF_ST_TM }}</template>
              </el-table-column>
              <el-table-column label="安全鉴定报告" min-width="120">
                <template #default="scope">
                  <el-icon v-if="scope.row.idtret || scope.row.RECORDID">
                    <Search />
                  </el-icon>
                </template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '工程维护'">
            <el-table-column label="维养计划" align="center">
              <el-table-column label="已编制" min-width="90">
                <template #default="scope">{{ scope.row.ybz }}</template>
              </el-table-column>
              <el-table-column label="已落实" min-width="90">
                <template #default="scope">{{ scope.row.yls }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="日常维养（本地年度）/次" width="190">
              <template #default="scope">{{ scope.row.wyzc }}</template>
            </el-table-column>
            <el-table-column label="白蚁防治" align="center">
              <el-table-column label="排查情况" min-width="90">
                <template #default="scope">{{ scope.row.pcqk }}</template>
              </el-table-column>
              <el-table-column label="发现蚁患" width="90">
                <template #default="scope">{{ scope.row.fxwt }}</template>
              </el-table-column>
              <el-table-column label="治理情况" min-min-width="120">
                <template #default="scope">{{ scope.row.zlqk }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '安全管控'">
            <el-table-column label="管理评价（最高等级）" min-width="180">
              <template #default="scope">{{ scope.row.lev }}</template>
            </el-table-column>
            <el-table-column label="管保范围" min-width="90">
              <template #default="scope">{{ scope.row.delimit }}</template>
            </el-table-column>
            <el-table-column label="六项机制" min-width="90">
              <template #default="scope">{{ scope.row.lxjz }}</template>
            </el-table-column>
            <el-table-column label="物资总数" min-width="90">
              <template #default="scope">{{ scope.row.wzNum }}</template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="操作" width="60">
            <template #default="scope">
              <img src="@/assets/images/screenIcon.png" @click="jumpScreen(scope.row.PRCD || scope.row.prcd)" alt="" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import RingChart from '@/components/chart/RingChart.vue'
import BarAndLine from '@/components/chart/BarAndLine.vue'
import { dataEcho, getOptions } from '@/utils/enum'
import axios from '@/api/axios'
import globalConfig from '@/config'

const colors = ['#0CBF5B', '#FFCB27', '#FF4D4F']
const activeTab = ref('及时除险')
const activeType = ref('除险加固')
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

const dangerElimination = reactive({
  elbzs: 0,
  slbzs: 0,
  elbwkg: 0,
  slbwkg: 0,
  elbykg: 0,
  slbykg: 0
})
const getDangerElimination = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 9
    }
  })
    .then((res) => {
      dangerElimination.elbzs = res.data?.two ?? '-'
      dangerElimination.slbzs = res.data?.three ?? '-'
      dangerElimination.elbwkg = res.data?.twoWkg2 ?? '-'
      dangerElimination.slbwkg = res.data?.threeWkg2 ?? '-'
      dangerElimination.elbykg = res.data?.twoYkg ?? '-'
      dangerElimination.slbykg = res.data?.threeYkg ?? '-'

      safetyAppraisement.slb = res.data?.three ?? '-'
      safetyAppraisement.elb = res.data?.two ?? '-'
    })
    .catch(() => {
      dangerElimination.elbzs = '-'
      dangerElimination.slbzs = '-'
      dangerElimination.elbwkg = '-'
      dangerElimination.slbwkg = '-'
      dangerElimination.elbykg = '-'
      dangerElimination.slbykg = '-'

      safetyAppraisement.slb = '-'
      safetyAppraisement.elb = '-'
    })
}
onBeforeMount(() => {
  getDangerElimination()
})

const problemData = reactive({
  jczl: 0,
  fxwt: 0,
  czz: 0,
  ycz: 0
})
const getProblemData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 69
    }
  })
    .then((res) => {
      problemData.jczl = res.data?.checkNum ?? '-'
      problemData.fxwt = res.data?.problemNum ?? '-'
      problemData.czz = res.data?.czzNum ?? '-'
      problemData.ycz = res.data?.yczNum ?? '-'
    })
    .catch(() => {
      problemData.jczl = '-'
      problemData.fxwt = '-'
      problemData.czz = '-'
      problemData.ycz = '-'
    })
}
onBeforeMount(() => {
  getProblemData()
})

const riskAssessmentData = ref([
  { value: 0, name: '绿码' },
  { value: 0, name: '黄码' },
  { value: 0, name: '红码' }
])
const riskAssessmentChart = ref()
const getRiskAssessmentData = () => {
  axios({
    url: '/mgt/bm/reservoirWT/threeMalCount',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd
    }
  })
    .then((res) => {
      riskAssessmentData.value.map((e) => {
        if (e.name === '绿码') {
          e.value = res.data?.GreenCount ?? '-'
        } else if (e.name === '黄码') {
          e.value = res.data?.yellowCount ?? '-'
        } else if (e.name === '红码') {
          e.value = res.data?.RedCount ?? '-'
        }
        return e
      })
    })
    .catch(() => {
      riskAssessmentData.value.map((e) => {
        e.value = '-'
        return e
      })
    })
    .finally(() => {
      riskAssessmentChart.value.initChart()
    })
}
onBeforeMount(() => {
  getRiskAssessmentData()
})

const safetyAppraisement = reactive({
  slb: 0,
  elb: 0,
  jyndq: 0
})
const getSafetyAppraisement = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 11
    }
  })
    .then((res) => {
      safetyAppraisement.jyndq = res.data?.dueNum ?? '-'
    })
    .catch(() => {
      safetyAppraisement.jyndq = '-'
    })
}
onBeforeMount(() => {
  getSafetyAppraisement()
})

const maintenancePlan = reactive({
  ybz: 0,
  yls: 0
})
const getMaintenancePlan = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 58
    }
  })
    .then((res) => {
      maintenancePlan.ybz = res.data?.ybzNum ?? '-'
      maintenancePlan.yls = res.data?.ylsNum ?? '-'
    })
    .catch(() => {
      maintenancePlan.ybz = '-'
      maintenancePlan.yls = '-'
    })
}
onBeforeMount(() => {
  getMaintenancePlan()
})

const maintanceCategroy = ref('日常维养')
const rcwyChartData = reactive({
  total: 0,
  xAxisValue: [],
  barData: [],
  lineData: []
})
const rcwyChart = ref()
const getRcwyChartData = () => {
  rcwyChartData.xAxisValue = []
  rcwyChartData.barData = []
  rcwyChartData.lineData = []
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 25
    }
  })
    .then((res) => {
      rcwyChartData.total = res.data?.num ?? '-'
      const data = res.data?.maintenanceList || []
      let total = 0
      data.forEach((e) => {
        total += e.num
        rcwyChartData.xAxisValue.push(e.month)
        rcwyChartData.barData.push(e.num)
        rcwyChartData.lineData.push(total)
      })
    })
    .catch(() => {
      rcwyChartData.total = '-'
    })
    .finally(() => {
      rcwyChart.value.initChart()
    })
}
onBeforeMount(() => {
  getRcwyChartData()
})

const ypcPro = ref(0)
const byfzData = ref([
  { value: 0, name: '已治理' },
  { value: 0, name: '未治理' }
])
const byfzChart = ref()
const getByfzData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 56
    }
  })
    .then((res) => {
      ypcPro.value = res.data?.num ?? '-'
      byfzData.value.map((e) => {
        if (e.name === '已治理') {
          e.value = res.data?.yzlNum
        } else if (e.name === '未治理') {
          e.value = res.data?.wzlNum
        }
        return e
      })
    })
    .catch(() => {
      ypcPro.value = '-'
      byfzData.value.map((e) => {
        e.value = 0
        return e
      })
    })
    .finally(() => {
      byfzChart.value.initChart()
    })
}
onBeforeMount(() => {
  getByfzData()
})

const standardizationData = reactive({
  hgl: 0,
  bj: 0,
  sj: 0,
  jp: 0,
  hg: 0
})
const getStandardizationData = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 37
    }
  })
    .then((res) => {
      standardizationData.hgl = res.data?.hgRate ?? '-'
      standardizationData.bj = res.data?.bNum ?? '-'
      standardizationData.sj = res.data?.shenNum ?? '-'
      standardizationData.jp = res.data?.sNum ?? '-'
      standardizationData.hg = res.data?.hgNum ?? '-'
    })
    .catch(() => {
      standardizationData.hgl = '-'
      standardizationData.bj = '-'
      standardizationData.sj = '-'
      standardizationData.jp = '-'
      standardizationData.hg = '-'
    })
}
onBeforeMount(() => {
  getStandardizationData()
})

const scopeData = reactive({
  yhd: 0,
  whd: 0
})
const getScopeData = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 6
    }
  })
    .then((res) => {
      scopeData.yhd = res.data?.gbfwyhdNum ?? '-'
      scopeData.whd = res.data?.gbfwyhdNum && res.data?.num ? res.data.num - res.data.gbfwyhdNum : '-'
    })
    .catch(() => {
      scopeData.yhd = '-'
      scopeData.whd = '-'
    })
}
onBeforeMount(() => {
  getScopeData()
})

const sixMechanisms = reactive({
  yls: 0,
  wls: 0
})
const getSixMechanisms = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 64
    }
  })
    .then((res) => {
      sixMechanisms.yls = res.data?.yls ?? '-'
      sixMechanisms.wls = res.data?.yls && res.data?.num ? res.data.num - res.data.yls : '-'
    })
    .catch(() => {
      sixMechanisms.yls = '-'
      sixMechanisms.wls = '-'
    })
}
onBeforeMount(() => {
  getSixMechanisms()
})

const wzTotal = ref(0)
const getWzTotal = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourTube',
    method: 'post',
    data: {
      adcd: globalConfig.ywAdcd,
      moduleType: 26
    }
  })
    .then((res) => {
      wzTotal.value = res.data?.STOCK ?? '-'
    })
    .catch(() => {
      wzTotal.value = '-'
    })
}
onBeforeMount(() => {
  getWzTotal()
})

const name = ref('')
const scale = ref('')
const adcd = ref(globalConfig.ywAdcd)
const tableData = ref([])
const tableDataSort = computed(() => {
  globalConfig.pilotReservoir.forEach((prcd, index) => {
    const elementIndex = tableData.value.findIndex(e => prcd === e.prcd || prcd === e.PRCD)
    if (elementIndex > -1) {
      const cut = tableData.value.splice(elementIndex, 1)
      tableData.value.splice(index, 0, ...cut)
    }
  })
  return tableData.value
})
const search = () => {
  if (activeTab.value === '及时除险') {
    if (activeType.value === '除险加固' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 65
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '二类坝总数') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '6,7,8,9'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '三类坝总数') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '6,7,8,10'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '二类坝未开工') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '6,9'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '三类坝未开工') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '6,10'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '二类坝已开工') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '7,9'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '除险加固' && activeItem.value === '三类坝已开工') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '3',
          screen: '7,10'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '问题处置' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 71
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '问题处置' && activeItem.value === '处置中') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '5',
          screen: '14'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '问题处置' && activeItem.value === '已处置') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '5',
          screen: '15'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '水库体检') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 66
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '风险研判' && activeItem.value === '绿码') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '1',
          screen: '17'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '风险研判' && activeItem.value === '黄码') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '1',
          screen: '18'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '风险研判' && activeItem.value === '红码') {
      axios({
        url: '/mgt/bm/reservoirWT/generateProject',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          gpType: '1',
          screen: '19'
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '安全鉴定' && activeItem.value === '三类坝') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 10,
          pointType: 3
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '安全鉴定' && activeItem.value === '二类坝') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 10,
          pointType: 2
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '安全鉴定' && activeItem.value === '近一年到期') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 12,
          pointType: 1
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '工程维护') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 67
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '维养计划' && activeItem.value === '已编制') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 59,
          pointType: 71
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '维养计划' && activeItem.value === '已落实') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 59,
          pointType: 72
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '白蚁防治' && activeItem.value === '已治理') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 57,
          pointType: 69
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '白蚁防治' && activeItem.value === '未治理') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 57,
          pointType: 70
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '安全管控') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourTube',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 68
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '标准化管理' && activeItem.value === '部级') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 38,
          pointType: 4
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '标准化管理' && activeItem.value === '省级') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 38,
          pointType: 3
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '标准化管理' && activeItem.value === '精品') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 38,
          pointType: 2
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '标准化管理' && activeItem.value === '合格') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 38,
          pointType: 5
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管保范围' && activeItem.value === '已划定') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 8,
          pointType: 2
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管保范围' && activeItem.value === '未划定') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 8,
          pointType: 4
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
  adcd.value = globalConfig.ywAdcd
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

const jumpProject = (prcd) => {
  console.log('jumpProject', prcd)
  if (window.top !== window.self) {
    window.parent.postMessage('jumpProject:' + prcd, "*")
  } else {
    localStorage.setItem('reservoirProjectCode', prcd)
    window.location.href = '/'
  }
}
const jumpScreen = (prcd) => {
  console.log('jumpScreen', prcd)
}

const exported = () => {
  console.log('导出')
}
</script>

<style lang="scss" scoped>
.siguan {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  padding: 20px;
}

.card {
  width: calc(25% - 15px);
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

.tab-bar {
  margin-bottom: $baseDistance;
}

.tab-bar2 {
  margin-bottom: 0.5 * $baseDistance;
}

.cxjg-wrap {
  display: flex;
  gap: 14px;
  margin-bottom: 2.5 * $baseDistance;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 90px;

    .category {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 30px;
      background-image: url('@/assets/images/cxjgItemBg.png');
      background-size: 100% 50%;
      background-repeat: no-repeat;
      background-position: bottom;

      span {
        font-size: 16px;
        line-height: 24px;
        color: $color-titletext;
      }
    }

    .data {
      display: flex;
      width: 100%;
      padding: 0 8px 0 10px;
      cursor: pointer;

      &.active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border: 1px solid $color-primary;
          background: transparentize($color-primary, 0.9);
        }
      }

      .label {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: $color-titletext;
      }

      .value {
        flex: 1;
        font-family: YouSheBiaoTiHei;
        margin-right: 4px;
        font-size: 24px;
        line-height: 24px;
        text-align: right;
        color: $color-titletext;
      }

      .unit {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: $color-titletext;
      }
    }
  }
}

.jczl-wrap {
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
    margin: 0 $baseDistance;
  }

  .unit {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: $color-titletext;
  }
}

.wtcz-wrap {
  display: flex;
  justify-content: space-between;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: -$baseDistance;
        right: -$baseDistance;
        top: 0;
        bottom: -$baseDistance;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

    .value {
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      line-height: 34px;
      color: $color-titletext;
    }

    .label {
      font-size: 16px;
      font-weight: 500;
      line-height: 12px;
      color: $color-titletext;
    }
  }
}

.fxyp-wrap {
  display: flex;
  width: 100%;
  height: calc(100% - 160px);

  .chart-wrap {
    width: 50%;
    height: 100%;
  }

  .legend-wrap {
    width: 50%;
    height: 100%;
    padding: 7.5 * $baseDistance 3 * $baseDistance 9 * $baseDistance $baseDistance;

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

      +li {
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

.aqjd-wrap {
  display: flex;
  width: 100%;
  height: 56px;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1;
    height: 100%;
    cursor: pointer;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: $baseDistance;
        right: $baseDistance;
        top: -4px;
        bottom: 0;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

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

.wyjh-wrap {
  display: flex;
  gap: 2 * $baseDistance;
  margin-bottom: 2 * $baseDistance;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1px;
    height: 72px;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    padding: 0 3 * $baseDistance;
    cursor: pointer;

    &.active {
      border-color: $color-primary;
    }

    .info {
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: $color-titletext;
        margin-bottom: $baseDistance;
      }

      .data {
        display: flex;
        align-items: center;

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
          margin-left: 5px;
        }
      }
    }
  }
}

.rcwy-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
  border: 2px solid #ffffff;
  box-shadow:
    8px 8px 20px 0px rgba(55, 99, 170, 0.1),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.5);

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

.rcwy-chart {
  display: flex;
  width: 100%;
  height: calc(100% - 228px);

  .chart-wrap {
    width: 50%;
    height: 100%;
  }

  .legend-wrap {
    width: 50%;
    height: 100%;
    padding: 7 * $baseDistance 3 * $baseDistance 6 * $baseDistance $baseDistance;

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

      +li {
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

.hgl-wrap {
  margin-bottom: $baseDistance;
}

.hgl-wrap,
.wzzs-wrap {
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

  .label {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: $color-titletext;
  }

  .value {
    font-family: YouSheBiaoTiHei;
    margin: 0 5px;
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

.bzh-wrap {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5 * $baseDistance;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: -$baseDistance;
        right: -$baseDistance;
        top: -$baseDistance;
        bottom: 0;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

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
      line-height: 34px;
      color: $color-titletext;
    }
  }
}

.gbfw-wrap .item {
  cursor: pointer;
}

.gbfw-wrap,
.lxjz-wrap {
  display: flex;
  gap: 2 * $baseDistance;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 36px;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    margin-bottom: $baseDistance;

    &.active {
      border-color: $color-primary;
    }

    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: $color-titletext;
    }

    .value {
      font-family: YouSheBiaoTiHei;
      margin: 0 5px;
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
