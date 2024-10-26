<template>
  <div class="sizhi">
    <div :class="['card', { active: activeTab === '体制管理' }]">
      <span class="name" @click="changeActive('体制管理', '', '')">体制管理</span>
      <div class="large-wrap">
        <div class="item" :class="{ active: activeFlag('体制管理', '', '县管') }" @click="changeActive('体制管理', '', '县管')">
          <span class="label">县管</span>
          <span class="value">{{ dzxData.xian }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('体制管理', '', '乡镇街道') }" @click="changeActive('体制管理', '', '乡镇街道')">
          <span class="label">乡镇街道</span>
          <span class="value">{{ dzxData.jiedao }}</span>
          <span class="unit">座</span>
        </div>
      </div>
      <div class="small-wrap">
        <div class="chart-wrap">
          <RingChart ref="smallChart" :color="colors" :data="departmentData" />
        </div>
        <ul class="legend-wrap">
          <li v-for="(item, index) in departmentData" :key="index" :class="{ active: activeFlag('体制管理', '', item.name) }" @click="changeActive('体制管理', '', item.name)">
            <i class="round_dot" :style="{ background: colors[index] }"></i>
            <span class="label">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">座</span>
          </li>
        </ul>
      </div>
      <TabBar class="mqcq-name" modelValue="明确产权" :tabs="['明确产权']" type="title" />
      <div class="mqcq-wrap" :class="{ active: activeFlag('体制管理', '明确产权', '完成数') }" @click="changeActive('体制管理', '明确产权', '完成数')">
        <span class="label">完成数</span>
        <span class="value">{{ completedData.num }}</span>
        <span class="unit">座</span>
        <span class="value">{{ completedData.per }}</span>
        <span class="unit">%</span>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '机制运行' }]">
      <span class="name" @click="changeActive('机制运行', '', '')">机制运行</span>
      <TabBar class="manage-name" v-model="manageCategroy" :tabs="['管护主体', '管护模式']" type="title" @change="(e) => changeActive('机制运行', e, '')" />
      <div v-if="manageCategroy === '管护主体'" class="unit-wrap">
        <div class="item" :class="{ active: activeFlag('机制运行', '管护主体', '事业单位') }" @click="changeActive('机制运行', '管护主体', '事业单位')">
          <span class="label">事业单位</span>
          <span class="value">{{ manageMain.sydw }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('机制运行', '管护主体', '国有企业') }" @click="changeActive('机制运行', '管护主体', '国有企业')">
          <span class="label">国有企业</span>
          <span class="value">{{ manageMain.gyqy }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('机制运行', '管护主体', '集体单位') }" @click="changeActive('机制运行', '管护主体', '集体单位')">
          <span class="label">集体单位</span>
          <span class="value">{{ manageMain.jtdw }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('机制运行', '管护主体', '其他') }" @click="changeActive('机制运行', '管护主体', '其他')">
          <span class="label">其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他</span>
          <span class="value">{{ manageMain.qt }}</span>
          <span class="unit">座</span>
        </div>
      </div>
      <div v-if="manageCategroy === '管护模式'" class="unit-wrap">
        <div class="item" :class="{ active: activeFlag('机制运行', '管护模式', '有管理单位') }" @click="changeActive('机制运行', '管护模式', '有管理单位')">
          <span class="label">有管理单位</span>
          <span class="value">{{ manageMode.ygldw }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item" :class="{ active: activeFlag('机制运行', '管护模式', '无管理单位') }" @click="changeActive('机制运行', '管护模式', '无管理单位')">
          <span class="label">无管理单位</span>
          <span class="value">{{ manageMode.wgldw }}</span>
          <span class="unit">座</span>
        </div>
        <div class="item hole" :class="{ active: activeFlag('机制运行', '管护模式', '委托物业化') }" @click="changeActive('机制运行', '管护模式', '委托物业化')">
          <span class="label">委托物业化</span>
          <span class="value">{{ manageMode.wtwyh_num }}</span>
          <span class="unit">座</span>
          <span class="value">{{ manageMode.wtwyh_per }}</span>
          <span class="unit">%</span>
        </div>
      </div>
      <TabBar class="jfbz-name" modelValue="经费保障" :tabs="['经费保障']" type="title" />
      <div class="jfbz-wrap">
        <div class="item">
          <div class="subtitle">
            <SvgIcon icon="account-book" :size="18" color="#0060ff" />
            <span>本年度经费落实情况</span>
          </div>
          <div class="child">
            <i class="cube" style="background-color: #00cfff"></i>
            <span class="text">已落实</span>
            <span class="num">{{ fundsData.yls }}</span>
          </div>
          <div class="child">
            <i class="cube" style="background-color: #efc30a"></i>
            <span class="text">未落实</span>
            <span class="num">{{ fundsData.wls }}</span>
          </div>
        </div>
        <div class="item">
          <span class="label">管理经费</span>
          <span class="value">{{ fundsData.manage }}</span>
          <span class="unit">万元</span>
        </div>
        <div class="item">
          <span class="label">维养经费</span>
          <span class="value">{{ fundsData.maintance }}</span>
          <span class="unit">万元</span>
        </div>
      </div>
      <TabBar class="wygl-name" modelValue="物业管理" :tabs="['物业管理']" type="title" />
      <div class="wygl-wrap">
        <div class="item">
          <div class="label">物业单位</div>
          <div class="data">
            <span class="value">{{ estateData.unit }}</span>
            <span class="unit">个</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">委托合同</div>
          <div class="data">
            <span class="value">{{ estateData.contract }}</span>
            <span class="unit">份</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">合同金额</div>
          <div class="data">
            <span class="value">{{ estateData.amount }}</span>
            <span class="unit">万元</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '法制支撑' }]">
      <span class="name" @click="changeActive('法制支撑', '', '')">法制支撑</span>
      <div class="fzzc-wrap">
        <div class="item">
          <div class="label">法规制度</div>
          <div class="data">
            <span class="value">{{ legalSystem.laws }}</span>
            <span class="unit">项</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">规章制度</div>
          <div class="data">
            <span class="value">{{ legalSystem.regulations }}</span>
            <span class="unit">项</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="label">技术标准</div>
          <div class="data">
            <span class="value">{{ legalSystem.technology }}</span>
            <span class="unit">项</span>
          </div>
        </div>
      </div>
      <TabBar class="file-name" v-model="fileCategroy" :tabs="['法规制度', '规章制度', '技术标准']" type="title" @change="getFileList" />
      <ul class="file-wrap">
        <li>
          <span>标准名称</span>
          <span>发文单位</span>
          <span>附件查看</span>
        </li>
        <li v-for="(item, index) in fileList" :key="index">
          <span>{{ item.filenm }}</span>
          <span>{{ item.unicd }}</span>
          <span style="cursor: pointer">
            <SvgIcon icon="view-file" :size="16" color="#0060ff" />
          </span>
        </li>
      </ul>
      <div class="xtzf-wrap">
        <SvgIcon icon="handshake" :size="20" color="#0052d9" />
        <span class="label">协同执法</span>
        <span class="value">{{ coordination }}</span>
        <span class="unit">座次</span>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '责任制落实' }]">
      <span class="name" @click="changeActive('责任制落实', '', '')">责任制落实</span>
      <div class="lszs-wrap" :class="{ active: activeFlag('责任制落实', '', '落实座数') }" @click="changeActive('责任制落实', '', '落实座数')">
        <span class="label">落实座数</span>
        <span class="value">{{ implementData.num }}</span>
        <span class="unit">座</span>
        <span class="value">{{ implementData.per }}</span>
        <span class="unit">%</span>
      </div>
      <div class="lszs-list">
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">政府负责人</span>
          <span class="value">{{ responsibilityData.zffzr }}</span>
          <span class="unit">人</span>
        </div>
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">水行政主管部门责任人</span>
          <span class="value">{{ responsibilityData.sxzzgbmzrr }}</span>
          <span class="unit">人</span>
        </div>
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">主管部门（产权人）责任人</span>
          <span class="value">{{ responsibilityData.zgbmcqrzrr }}</span>
          <span class="unit">人</span>
        </div>
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">管理单位责任人</span>
          <span class="value">{{ responsibilityData.gldwzrr }}</span>
          <span class="unit">人</span>
        </div>
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">技术责任人</span>
          <span class="value">{{ responsibilityData.jszrr }}</span>
          <span class="unit">人</span>
        </div>
        <div class="item">
          <span class="tag">职责</span>
          <span class="label">巡查责任人</span>
          <span class="value">{{ responsibilityData.xczrr }}</span>
          <span class="unit">人</span>
        </div>
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
        <el-table :key="activeTab + 'table'" :data="tableDataSort" style="width: 100%" stripe :max-height="tableHeight">
          <el-table-column fixed="left" type="index" label="序号" width="60" />
          <el-table-column label="工程名称" min-width="150">
            <template #default="scope">
              <template v-if="scope.row.prcd === '330782022000521' || scope.row.PRCD === '330782022000521'">
                <el-button type="primary" link @click="jumpProject(scope.row.PRCD || scope.row.prcd)">
                  {{ scope.row.NAME }}
                </el-button>
                <span class="pilot-marking">试点水库</span>
              </template>
              <template v-else-if="scope.row.prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' || scope.row.PRCD === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'">
                {{ scope.row.NAME }}
                <span class="pilot-marking">试点水库</span>
              </template>
              <template v-else>{{ scope.row.NAME }}</template>
            </template>
          </el-table-column>
          <el-table-column label="所在市" min-width="80">
            <template #default="scope">{{ scope.row.cityADNM }}</template>
          </el-table-column>
          <el-table-column label="所在县" min-width="80">
            <template #default="scope">{{ scope.row.countryADNM }}</template>
          </el-table-column>
          <el-table-column label="工程规模" min-width="100">
            <template #default="scope">{{ scope.row.scale || dataEcho('SKGM', scope.row.project_scale) }}</template>
          </el-table-column>
          <template v-if="activeTab === '体制管理'">
            <el-table-column label="管理层级" min-width="90">
              <template #default="scope">{{ scope.row.superLev }}</template>
            </el-table-column>
            <el-table-column label="所属行业部门" min-width="110">
              <template #default="scope">{{ scope.row.belong }}</template>
            </el-table-column>
            <el-table-column label="明确产权" min-width="90">
              <template #default="scope">{{ scope.row.qq }}</template>
            </el-table-column>
            <el-table-column label="证书类型" min-width="170">
              <template #default="scope">{{ scope.row.property_type }}</template>
            </el-table-column>
            <el-table-column label="颁证部门" width="140">
              <template #default="scope">{{ scope.row.certificate_unit }}</template>
            </el-table-column>
            <el-table-column label="颁证时间" min-min-width="100">
              <template #default="scope">{{ scope.row.tm }}</template>
            </el-table-column>
            <el-table-column label="证书查看" min-width="90">
              <template #default="scope">
                <el-icon v-if="scope.row.authorization_file"><Search /></el-icon>
              </template>
            </el-table-column>
          </template>
          <template v-if="activeTab === '机制运行'">
            <el-table-column label="管护主体" min-width="140">
              <template #default="scope">{{ scope.row.ghzt }}</template>
            </el-table-column>
            <el-table-column label="管理经费(万元)" min-width="140">
              <template #default="scope">{{ scope.row.gljf }}</template>
            </el-table-column>
            <el-table-column label="养护经费(万元)" min-width="140">
              <template #default="scope">{{ scope.row.wyjf }}</template>
            </el-table-column>
            <el-table-column label="物业单位(个)" min-width="140">
              <template #default="scope">{{ scope.row.wydwNum }}</template>
            </el-table-column>
            <el-table-column label="委托合同(份)" min-width="140">
              <template #default="scope">{{ scope.row.wthtNum }}</template>
            </el-table-column>
            <el-table-column label="合同金额(万元)" min-width="140">
              <template #default="scope">{{ scope.row.htje }}</template>
            </el-table-column>
          </template>
          <template v-if="activeTab === '法制支撑'">
            <el-table-column label="事件名称" min-width="200">
              <template #default="scope">{{ scope.row.event_name }}</template>
            </el-table-column>
            <el-table-column label="发生时间" min-width="120">
              <template #default="scope">{{ scope.row.occur_time }}</template>
            </el-table-column>
            <el-table-column label="事件内容" min-width="500">
              <template #default="scope">{{ scope.row.event_content }}</template>
            </el-table-column>
            <el-table-column label="相关附件" min-width="90">
              <template #default="scope">
                <el-icon v-if="scope.row.fileId"><Search /></el-icon>
              </template>
            </el-table-column>
          </template>
          <template v-if="activeTab === '责任制落实'">
            <el-table-column label="是否有管理单位" min-width="130">
              <template #default="scope">{{ scope.row.if_department }}</template>
            </el-table-column>
            <el-table-column label="行政责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.executive_gov_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.executive_gov_unit }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.executive_gov_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.executive_gov_phone }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="水行政主管单位责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.executive_water_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.executive_water_unit }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.executive_water_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.executive_water_phone }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="产权责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.executive_depart_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.executive_depart_unit }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.executive_depart_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.executive_depart_phone }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="管理单位责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.executive_manage_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.executive_manage_name }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.executive_manage_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.executive_manage_phone }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="技术责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.technical_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.techinical_unit }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.techinical_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.techinical_phone }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="巡查责任人" align="center">
              <el-table-column label="姓名" min-width="100">
                <template #default="scope">{{ scope.row.patrol_name }}</template>
              </el-table-column>
              <el-table-column label="单位" min-width="150">
                <template #default="scope">{{ scope.row.patrol_unit }}</template>
              </el-table-column>
              <el-table-column label="职务" min-width="100">
                <template #default="scope">{{ scope.row.patrol_position }}</template>
              </el-table-column>
              <el-table-column label="联系方式" min-width="120">
                <template #default="scope">{{ scope.row.patrol_phone }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="操作" width="60">
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
import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import RingChart from '@/components/chart/RingChart.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { dataEcho, getOptions } from '@/utils/enum'
import axios from '@/api/axios'

const colors = ref(['#276AF0', '#0CBF5B', '#FFCB27', '#FF4D4F'])
const activeTab = ref('体制管理')
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

const dzxData = reactive({
  xian: 0,
  jiedao: 0
})
const getDzxData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 46
    }
  })
    .then((res) => {
      dzxData.xian = res.data?.dzxXian + res.data?.xxXian ?? '-'
      dzxData.jiedao = 0
    })
    .catch(() => {
      dzxData.xian = '-'
      dzxData.jiedao = '-'
    })
}
onBeforeMount(() => {
  getDzxData()
})

const departmentData = ref([
  { value: 0, name: '水利部门' },
  { value: 0, name: '能源部门' },
  { value: 0, name: '司法部门' },
  { value: 0, name: '其他' }
])
const smallChart = ref()
const getDepartmentData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 8
    }
  })
    .then((res) => {
      departmentData.value.map((e) => {
        if (e.name === '水利部门') {
          e.value = res.data.slNum || 0
        } else if (e.name === '能源部门') {
          e.value = res.data.nyNum || 0
        } else if (e.name === '司法部门') {
          e.value = res.data.sfxzNum || 0
        } else if (e.name === '其他') {
          e.value = res.data.qthyNum || 0
        }
        return e
      })
    })
    .catch(() => {
      departmentData.value.map((e) => {
        e.value = '-'
        return e
      })
    })
    .finally(() => {
      smallChart.value.initChart()
    })
}
onBeforeMount(() => {
  getDepartmentData()
})

const completedData = reactive({
  num: 0,
  per: 0
})
const getCompletedData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 10
    }
  })
    .then((res) => {
      completedData.num = res.data?.cqmqNum ?? '-'
      completedData.per = res.data?.bfb ?? '-'
    })
    .catch(() => {
      completedData.num = '-'
      completedData.per = '-'
    })
}
onBeforeMount(() => {
  getCompletedData()
})

const manageCategroy = ref('管护主体')
const manageMain = reactive({
  sydw: 0,
  gyqy: 0,
  jtdw: 0,
  qt: 0
})
const getManageMain = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 34
    }
  })
    .then((res) => {
      manageMain.sydw = res.data?.syNum ?? '-'
      manageMain.gyqy = res.data?.gyqyNum ?? '-'
      manageMain.jtdw = res.data?.jtNum ?? '-'
      manageMain.qt = res.data?.qtNum ?? '-'
    })
    .catch(() => {
      manageMain.sydw = '-'
      manageMain.gyqy = '-'
      manageMain.jtdw = '-'
      manageMain.qt = '-'
    })
}
onBeforeMount(() => {
  getManageMain()
})
const manageMode = reactive({
  ygldw: 0,
  wgldw: 0,
  wtwyh_num: 0,
  wtwyh_per: 0
})
const getManageMode = () => {
  axios({
    url: '/mgt/resWisdom/synthesisRes',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 27
    }
  })
    .then((res) => {
      manageMode.ygldw = res.data?.ywyNum ?? '-'
      manageMode.wgldw = res.data?.wwyNum ?? '-'
      manageMode.wtwyh_num = res.data?.xwyNum + res.data?.dwyNum
      manageMode.wtwyh_per = res.data?.wyRate ?? '-'
    })
    .catch(() => {
      manageMode.ygldw = '-'
      manageMode.wgldw = '-'
      manageMode.wtwyh_num = '-'
      manageMode.wtwyh_per = '-'
    })
}
onBeforeMount(() => {
  getManageMode()
})

const fundsData = reactive({
  yls: 0,
  wls: 0,
  manage: 0,
  maintance: 0
})
const getFundsData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 12
    }
  })
    .then((res) => {
      fundsData.yls = res.data?.ylsNum ?? '-'
      fundsData.wls = res.data?.wlsNum ?? '-'
      fundsData.manage = res.data?.gljf ?? '-'
      fundsData.maintance = res.data?.wyjf ?? '-'
    })
    .catch(() => {
      fundsData.yls = '-'
      fundsData.wls = '-'
      fundsData.manage = '-'
      fundsData.maintance = '-'
    })
}
onBeforeMount(() => {
  getFundsData()
})

const estateData = reactive({
  unit: 0,
  contract: 0,
  amount: 0
})
const getEstateData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 14
    }
  })
    .then((res) => {
      estateData.unit = res.data?.wydwNum ?? '-'
      estateData.contract = res.data?.wthtNum ?? '-'
      estateData.amount = res.data?.htje ?? '-'
    })
    .catch(() => {
      estateData.unit = '-'
      estateData.contract = '-'
      estateData.amount = '-'
    })
}
onBeforeMount(() => {
  getEstateData()
})

const legalSystem = reactive({
  laws: 0,
  regulations: 0,
  technology: 0
})
const getLegalSystem = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 15
    }
  })
    .then((res) => {
      legalSystem.laws = res.data?.flfgNum ?? '-'
      legalSystem.regulations = res.data?.gzzdNum ?? '-'
      legalSystem.technology = res.data?.jsbzNum ?? '-'
    })
    .catch(() => {
      legalSystem.laws = '-'
      legalSystem.regulations = '-'
      legalSystem.technology = '-'
    })
}
onBeforeMount(() => {
  getLegalSystem()
})

const fileCategroy = ref('法规制度')
const fileList = ref([])
const getFileList = () => {
  let moduleType
  if (fileCategroy.value === '法规制度') {
    moduleType = 16
  } else if (fileCategroy.value === '规章制度') {
    moduleType = 48
  } else if (fileCategroy.value === '技术标准') {
    moduleType = 17
  }
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      fetchAll: true,
      adcd: '330782000000',
      moduleType: moduleType
    }
  })
    .then((res) => {
      fileList.value = res.data?.list || []
    })
    .catch(() => {
      fileList.value = []
    })
}
onBeforeMount(() => {
  getFileList()
})

const coordination = ref(0)
const getCoordination = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 49
    }
  })
    .then((res) => {
      coordination.value = res.data?.num ?? '-'
    })
    .catch(() => {
      coordination.value = '-'
    })
}
onBeforeMount(() => {
  getCoordination()
})

const implementData = reactive({
  num: 0,
  per: 0
})
const responsibilityData = reactive({
  zffzr: 0,
  sxzzgbmzrr: 0,
  zgbmcqrzrr: 0,
  gldwzrr: 0,
  jszrr: 0,
  xczrr: 0
})
const getImplementData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 50
    }
  })
    .then((res) => {
      implementData.num = res.data?.num ?? '-'
      implementData.per = res.data?.gxl ?? '-'
      responsibilityData.zffzr = res.data?.executiveGovNum ?? '-'
      responsibilityData.sxzzgbmzrr = res.data?.executiveWaterNum ?? '-'
      responsibilityData.zgbmcqrzrr = res.data?.executiveDepartNum ?? '-'
      responsibilityData.gldwzrr = res.data?.executiveManageNum ?? '-'
      responsibilityData.jszrr = res.data?.technicalNum ?? '-'
      responsibilityData.xczrr = res.data?.patrolNum ?? '-'
    })
    .catch(() => {
      implementData.num = '-'
      implementData.per = '-'
      responsibilityData.zffzr = '-'
      responsibilityData.sxzzgbmzrr = '-'
      responsibilityData.zgbmcqrzrr = '-'
      responsibilityData.gldwzrr = '-'
      responsibilityData.jszrr = '-'
      responsibilityData.xczrr = '-'
    })
}
onBeforeMount(() => {
  getImplementData()
})

const name = ref('')
const scale = ref('')
const adcd = ref('330782000000')
const tableData = ref([])
const tableDataSort = computed(() => {
  const item1 = tableData.value.find((item) => item.prcd === '330782022000521' || item.PRCD === '330782022000521')
  const item2 = tableData.value.find((item) => item.prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' || item.PRCD === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e')
  const tableData_ = tableData.value.filter((item) => item.prcd !== '330782022000521' && item.PRCD !== '330782022000521')
  console.log(tableData_)
  if (item2) tableData_.unshift(item2)
  if (item1) tableData_.unshift(item1)
  return tableData_
})
const search = () => {
  if (activeTab.value === '体制管理') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 52
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '县管') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 47,
          pointType: 57
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '乡镇街道') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 47,
          pointType: 58
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '水利部门') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 13
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '能源部门') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 14
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '司法部门') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 15
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '其他') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 17
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '明确产权' && activeItem.value === '完成数') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 11,
          pointType: 61
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '机制运行') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 53
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护主体' && activeItem.value === '事业单位') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 62
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护主体' && activeItem.value === '国有企业') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 63
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护主体' && activeItem.value === '集体单位') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 64
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护主体' && activeItem.value === '其他') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 66
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护模式' && activeItem.value === '有管理单位') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 28,
          pointType: 3
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护模式' && activeItem.value === '无管理单位') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 28,
          pointType: 4
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '管护模式' && activeItem.value === '委托物业化') {
      axios({
        url: '/mgt/resWisdom/synthesisRes',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 28,
          pointType: 5
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '法制支撑') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 54
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '责任制落实') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/resWisdom/oneTouchList',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 13
        }
      })
        .then((res) => {
          tableData.value = res.rows || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '' && activeItem.value === '落实座数') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 51
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
.sizhi {
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
.large-wrap {
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
      margin: 0 0.5 * $baseDistance 0 $baseDistance;
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      color: $color-primary;
    }
    .unit {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: 500;
      color: $color-titletext;
    }
  }
}
.small-wrap {
  display: flex;
  width: 100%;
  height: calc(100% - 152px);
  .chart-wrap {
    width: 50%;
    height: 100%;
  }
  .legend-wrap {
    width: 50%;
    height: 100%;
    padding: 6 * $baseDistance 3 * $baseDistance 7 * $baseDistance $baseDistance;
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
.mqcq-name {
  margin-bottom: 2 * $baseDistance;
}
.mqcq-wrap {
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
    margin: 0 0.5 * $baseDistance 0 $baseDistance;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: $color-primary;
    &:nth-of-type(4) {
      margin-left: 3 * $baseDistance;
    }
  }
  .unit {
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: 500;
    color: $color-titletext;
  }
}
.manage-name {
  margin-bottom: $baseDistance;
}
.unit-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: $baseDistance 2 * $baseDistance;
  margin-bottom: 2 * $baseDistance;
  .item {
    display: flex;
    align-items: center;
    width: calc(50% - $baseDistance);
    height: 36px;
    padding: 0 2 * $baseDistance;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    &.hole {
      width: 100%;
      justify-content: center;
      .value {
        flex: none;
        &:nth-of-type(4) {
          margin-left: $baseDistance;
        }
      }
    }
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
      flex: 1;
      margin: 0 0.5 * $baseDistance 0 $baseDistance;
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      color: $color-primary;
      text-align: right;
    }
    .unit {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: 500;
      color: $color-titletext;
    }
  }
}
.jfbz-name {
  margin-bottom: $baseDistance;
}
.jfbz-wrap {
  position: relative;
  margin-bottom: $baseDistance;
  height: 88px;
  .item {
    position: absolute;
    width: calc(50% - $baseDistance);
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    &:nth-child(1) {
      top: 0;
      bottom: 0;
      left: 0;
      padding: 0 2 * $baseDistance;
      .subtitle {
        display: flex;
        align-items: center;
        gap: 0.5 * $baseDistance;
        margin-top: 6px;
        > span {
          font-size: 14px;
          line-height: 22px;
          color: $color-titletext;
        }
      }
      .child {
        display: flex;
        align-items: center;
        .cube {
          width: 8px;
          height: 8px;
          margin-right: 5px;
        }
        .text {
          flex: 1;
          font-family: Source Han Sans;
          font-size: 14px;
          line-height: 16px;
          color: $color-titletext;
        }
        .num {
          font-family: YouSheBiaoTiHei;
          font-size: 18px;
          line-height: 26px;
          color: $color-titletext;
        }
      }
    }
    &:nth-child(2) {
      top: 0;
    }
    &:nth-child(3) {
      bottom: 0;
    }
    &:nth-child(2),
    &:nth-child(3) {
      right: 0;
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 0.5 * $baseDistance;
      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }
      .value {
        flex: 1;
        margin: 0 0.5 * $baseDistance 0 $baseDistance;
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-primary;
        text-align: right;
      }
      .unit {
        font-family: Source Han Sans;
        font-size: 14px;
        font-weight: 500;
        color: $color-titletext;
      }
    }
  }
}
.wygl-name {
  margin-bottom: $baseDistance;
}
.wygl-wrap {
  display: flex;
  width: 100%;
  height: 56px;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $baseDistance;
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
.fzzc-wrap {
  display: flex;
  width: 100%;
  height: 44px;
  margin-bottom: 2.5 * $baseDistance;
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
.file-name {
  margin-bottom: $baseDistance;
}
.file-wrap {
  overflow: auto;
  width: 100%;
  height: calc(100% - 172px);
  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    &:nth-child(even) {
      background: rgba(239, 241, 244, 0.6);
    }
    > span:nth-child(1) {
      width: 250px;
    }
    > span:nth-child(2) {
      width: calc((100% - 250px) / 2);
    }
    > span:nth-child(3) {
      width: calc((100% - 250px) / 2);
    }
    > span {
      display: block;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      color: #13161b;
      text-align: center;
      padding: 0 $baseDistance;
      @include ellipsis();
    }
  }
}
.xtzf-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $baseDistance;
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
    color: $color-titletext;
  }
  .value {
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: $color-primary;
  }
  .unit {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    color: $color-titletext;
  }
}
.lszs-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin-bottom: 3.5 * $baseDistance;
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
    margin: 0 0.5 * $baseDistance 0 $baseDistance;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: $color-primary;
    &:nth-of-type(4) {
      margin-left: 3 * $baseDistance;
    }
  }
  .unit {
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: 500;
    color: $color-titletext;
  }
}
.lszs-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 104px);
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tag {
      width: 44px;
      height: 24px;
      border-radius: 2px;
      background: transparentize($color-primary, 0.85);
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: $color-primary;
      text-align: center;
      margin-right: 10px;
    }
    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
    }
    .value {
      flex: 1;
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      text-align: right;
      color: $color-primary;
    }
    .unit {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: 500;
      color: $color-titletext;
      margin-left: $baseDistance;
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
