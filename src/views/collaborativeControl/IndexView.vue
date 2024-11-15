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
          <template v-if="legendType === '安全鉴定'">
            <el-radio-group v-model="appraisalType">
              <el-radio label="三类坝">
                <img src="@/assets/images/points/damRed.png" />
                <span>三类坝</span>
              </el-radio>
              <el-radio label="二类坝">
                <img src="@/assets/images/points/damYellow.png" />
                <span>二类坝</span>
              </el-radio>
              <el-radio label="近一年到期">
                <img src="@/assets/images/points/damBlue.png" />
                <span>近一年到期</span>
              </el-radio>
            </el-radio-group>
          </template>
          <el-checkbox-group v-else v-model="scaleArr">
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
      <div class="section_title">安全管控</div>
      <div class="security_control_box">
        <CategoryTitle modelValue="安全鉴定" style="margin-bottom: 11px">
          <img class="clickable" :src="noteIcon" />
        </CategoryTitle>
        <div class="fence_style" style="margin-bottom: 19px">
          <div class="row">
            <template v-for="(item, index) in safetyAppraisement" :key="item.label">
              <div class="col clickable" :class="{ active: appraisalType === item.label }" @click="changeAppraisalType(item.label)">
                <div class="label">{{ item.label }}</div>
                <div class="data">
                  <span class="value">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="spl" v-if="index < safetyAppraisement.length - 1"></div>
            </template>
          </div>
        </div>
        <CategoryTitle modelValue="除险加固" style="margin-bottom: 14px">
          <img class="clickable" :src="noteIcon" />
        </CategoryTitle>
        <div class="reinforcement_box" style="margin-bottom: 20px">
          <div class="reinforcement_item" v-for="item in reinforcementData" :key="item.label">
            <div class="desktop_style">
              <div class="item_single">
                <img class="icon" src="@/assets/images/icons/folder.png" />
                <span class="label">{{ item.label }}</span>
              </div>
            </div>
            <div class="subitem">
              <span class="label">二类坝</span>
              <span class="value">{{ item.elb }}</span>
              <span class="unit">座</span>
            </div>
            <div class="subitem">
              <span class="label">三类坝</span>
              <span class="value">{{ item.slb }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
        <CategoryTitle modelValue="问题处置" style="margin-bottom: 11px">
          <img class="clickable" :src="noteIcon" />
        </CategoryTitle>
        <div class="problem_handle_box" style="margin-bottom: 12px">
          <div class="item" v-for="item in problemHandle" :key="item.label" :style="{ background: `url(${item.bgi})` }">
            <div class="data">
              <span class="value">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
            <div class="label">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="section_title">工程维护</div>
      <div class="project_maintenance_box">
        <CategoryTitle modelValue="物业管理" style="margin-bottom: 10px" />
        <div class="desktop_style" style="margin-bottom: 12px">
          <div class="item_single">
            <img class="icon" src="@/assets/images/icons/property.png" />
            <span class="label" style="margin-right: 24px">委托物业化</span>
            <span class="value">{{ 93 }}</span>
            <span class="unit" style="margin-right: 10px">座</span>
            <span class="value">{{ 92.1 }}</span>
            <span class="unit">%</span>
          </div>
        </div>
        <div class="fence_style" style="margin-bottom: 15px">
          <div class="row">
            <template v-for="(item, index) in propertyContract" :key="item.label">
              <div class="col">
                <div class="label">{{ item.label }}</div>
                <div class="data">
                  <span class="value">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="spl" v-if="index < propertyContract.length - 1"></div>
            </template>
          </div>
        </div>
        <CategoryTitle modelValue="经费保障" style="margin-bottom: 10px">
          <img class="clickable" :src="noteIcon" />
        </CategoryTitle>
        <div class="funding_guarantee_box" style="margin-bottom: 22px">
          <div class="implement_box">
            <div class="row">
              <img class="icon" src="@/assets/images/icons/accounting.png" />
              <span class="title">本年度经费落实情况</span>
            </div>
            <div class="row">
              <div class="col">
                <span class="label">已落实</span>
                <span class="value" style="color: #47f5a7">15</span>
              </div>
              <div class="col">
                <span class="value" style="color: #efc30a">86</span>
                <span class="label">未落实</span>
              </div>
            </div>
            <div class="row">
              <span class="percentage" :style="{ background: '#47f5a7', width: (15 / (15 + 86)) * 100 + '%' }"></span>
              <span class="percentage" style="background: #efc30a; flex: 1"></span>
            </div>
          </div>
          <div class="line"></div>
          <div class="funding_box row_data">
            <div class="row">
              <span class="label">管理经费</span>
              <span class="value">1624</span>
              <span class="unit">万元</span>
            </div>
            <div class="row">
              <span class="label">维养经费</span>
              <span class="value">391</span>
              <span class="unit">万元</span>
            </div>
          </div>
        </div>
        <CategoryTitle modelValue="村级水务员资金支撑" style="margin-bottom: 12px">
          <img class="clickable" :src="noteIcon" />
        </CategoryTitle>
        <div class="financial_support_box">
          <div class="financial_support_item row_data">
            <div class="row">
              <span class="label">村级水务员</span>
              <span class="value">97</span>
              <span class="unit">人</span>
            </div>
            <div class="row">
              <span class="label">每年费用</span>
              <span class="value">523.8</span>
              <span class="unit">万元</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="financial_support_item row_data">
            <div class="row">
              <span class="label">市级支持</span>
              <span class="value">314.28</span>
              <span class="unit">万元</span>
            </div>
            <div class="row">
              <span class="label">乡镇街道</span>
              <span class="value">209.52</span>
              <span class="unit">万元</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <div class="section_title">巡查履职</div>
      <div class="inspection_duties_box">
        <CategoryTitle v-model="patrolMode" :tabs="['记分值', '巡查率']" />
        <template v-if="patrolMode == '记分值'">
          <div class="top_three">
            <div class="title">Top 3</div>
            <ul class="ranking">
              <li class="item">
                <img class="sort" src="@/assets/images/No1.png" />
                <span class="name">义乌江流域水利工程管理有限公司</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
              <li class="item">
                <img class="sort" src="@/assets/images/No2.png" />
                <span class="name">上溪镇人民政府</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
              <li class="item">
                <img class="sort" src="@/assets/images/No3.png" />
                <span class="name">稠城街道办事处</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
            </ul>
          </div>
          <div class="tail_three">
            <div class="title">Lost 3</div>
            <ul class="ranking">
              <li class="item">
                <span class="sort">No.15</span>
                <span class="name">义西分公司</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
              <li class="item">
                <span class="sort">No.16</span>
                <span class="name">上溪镇人民政府</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
              <li class="item">
                <span class="sort">No.17</span>
                <span class="name">稠城街道办事处</span>
                <span class="score">12</span>
                <span class="unit">分</span>
              </li>
            </ul>
          </div>
          <CategoryTitle modelValue="高低分巡查员" />
          <div class="inspector_data_box">
            <div class="inspector_data">
              <div class="inspector_item">
                <div class="label">优秀巡查员</div>
                <div class="data">
                  <span class="value" style="color: #47f5a7">101</span>
                  <span class="unit">人</span>
                </div>
              </div>
              <div class="inspector_item">
                <div class="label">良好巡查员</div>
                <div class="data">
                  <span class="value" style="color: #46fcff">0</span>
                  <span class="unit">人</span>
                </div>
              </div>
              <div class="inspector_item">
                <div class="label">合格巡查员</div>
                <div class="data">
                  <span class="value" style="color: #efc30a">0</span>
                  <span class="unit">人</span>
                </div>
              </div>
              <div class="inspector_item">
                <div class="label">不合格巡查员</div>
                <div class="data">
                  <span class="value" style="color: #ff0000">0</span>
                  <span class="unit">人</span>
                </div>
              </div>
            </div>
            <img src="@/assets/images/inspector.png" />
          </div>
        </template>
        <template v-else-if="patrolMode == '巡查率'">
          <div class="tail_three" style="margin-top: 18px">
            <div class="title">Lost 3</div>
            <ul class="ranking">
              <li class="item">
                <span class="sort">No.101</span>
                <span class="name">XXXX水库</span>
                <span class="score">0.00</span>
                <span class="unit">%</span>
              </li>
              <li class="item">
                <span class="sort">No.100</span>
                <span class="name">XXXX水库</span>
                <span class="score">0.00</span>
                <span class="unit">%</span>
              </li>
              <li class="item">
                <span class="sort">No.99</span>
                <span class="name">XXXX水库</span>
                <span class="score">0.00</span>
                <span class="unit">%</span>
              </li>
            </ul>
          </div>
          <el-table :data="inspectionRateList" style="width: 100%; margin-top: 16px" :height="397" size="default" stripe @row-click="onRowClick">
            <el-table-column type="index" label="排名" width="60" align="center" />
            <el-table-column prop="name" label="水库名称" min-width="100" align="center" />
            <el-table-column prop="todo" label="乡镇街道" min-width="90" align="center" />
            <el-table-column prop="todo" label="巡查率" min-width="80" align="center" />
          </el-table>
        </template>
      </div>
      <div class="section_title">事件协同</div>
      <div class="event_collaboration_box">
        <div class="handle_event">
          <div class="item">
            <img src="@/assets/images/fileGreen.png" />
            <div class="data">
              <div class="value" style="color: #47f5a7">
                <span class="count">34</span>
                <span class="unit">个</span>
              </div>
              <div class="label">已处理</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/fileYellow.png" />
            <div class="data">
              <div class="value" style="color: #fcee27">
                <span class="count">22</span>
                <span class="unit">个</span>
              </div>
              <div class="label">未处理</div>
            </div>
          </div>
        </div>
        <div class="event_statistic">
          <div class="event_chart">
            <RingChart :data="eventStatistic" />
          </div>
          <div class="event_legend">
            <div v-for="(e, i) in eventStatistic" class="item" :key="i">
              <i :style="{ background: e.color }"></i>
              <span class="name">{{ e.name }}</span>
              <span class="value" :style="{ color: e.color }">{{ e.value }}</span>
              <span class="unit">个</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ScreenLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import LengedBox from '@/components/map/LengedBox.vue'
import AuxiliaryInfo from '@/components/map/AuxiliaryInfo.vue'
import axios from '@/api/axios'
import { renderPoint } from '@/utils/map'
import noteIcon from '@/assets/images/icons/note.png'
import RingChart from '@/components/chart/RingChart.vue'

/* 地图初始化后取得地图对象 */
const legendType = ref('')
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

const appraisalType = ref('')
const changeAppraisalType = (type) => {
  if (type === appraisalType.value) {
    legendType.value = ''
    appraisalType.value = ''
  } else {
    legendType.value = '安全鉴定'
    appraisalType.value = type
  }
}
const safetyAppraisement = ref([
  { label: '三类坝', value: '0', unit: '座' },
  { label: '二类坝', value: '2', unit: '座' },
  { label: '近一年到期', value: '6', unit: '座' }
])
const reinforcementData = ref([
  { label: '总数', elb: '2', slb: '0' },
  { label: '未开工', elb: '0', slb: '0' },
  { label: '已开工', elb: '2', slb: '0' }
])
const problemHandle = ref([
  { label: '检查总量', value: '39', unit: '座次', bgi: new URL('@/assets/images/problemHandle_jczl.png', import.meta.url).href },
  { label: '发现问题', value: '1', unit: '项', bgi: new URL('@/assets/images/problemHandle_fxwt.png', import.meta.url).href },
  { label: '处置中', value: '1', unit: '项', bgi: new URL('@/assets/images/problemHandle_czz.png', import.meta.url).href },
  { label: '已处置', value: '0', unit: '项', bgi: new URL('@/assets/images/problemHandle_ycz.png', import.meta.url).href }
])
const propertyContract = ref([
  { label: '物业合同', value: '428', unit: '个' },
  { label: '委托合同', value: '667', unit: '份' },
  { label: '合同金额', value: '3258.5', unit: '亿元' }
])

const patrolMode = ref('记分值')

const eventStatistic = ref([
  { value: 23, name: '基础治理平台', color: '#46FDFF' },
  { value: 13, name: '12345', color: '#419EFF' },
  { value: 6, name: '日常巡查', color: '#FCEE27' },
  { value: 4, name: '定期检查', color: '#47F5A7' },
  { value: 10, name: '设备感知', color: '#F8861C' }
])

const inspectionRateList = computed(() => {
  return reservoirPoints.value
})
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
.security_control_box {
  padding: 10px 15px 20px 15px;
}
.project_maintenance_box {
  padding: 10px 15px 15px 15px;
}
.reinforcement_box {
  display: flex;
  gap: 14px;
  .reinforcement_item {
    flex: 1;
    .desktop_style {
      margin-bottom: 7px;
    }
  }
  .subitem {
    display: flex;
    align-items: center;
    padding: 0 10px;
    + .subitem {
      margin-top: 4px;
    }
    .label {
      flex: 1;
      font-size: 16px;
      line-height: 24px;
    }
    .value {
      font-family: PangMenZhengDao;
      font-size: 20px;
      line-height: 24px;
      color: $color-primary;
    }
    .unit {
      font-size: 14px;
      line-height: 24px;
      margin-left: 5px;
    }
  }
}
.problem_handle_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  .item {
    position: relative;
    width: 196px;
    height: 64px;
    background-size: 100% 100%;
    .data {
      position: absolute;
      top: 6px;
      left: 49%;
      .value {
        font-family: PangMenZhengDao;
        font-size: 24px;
        line-height: 32px;
        color: $color-primary;
      }
      .unit {
        vertical-align: baseline;
        font-size: 16px;
        line-height: 24px;
        margin-left: 8px;
      }
    }
    .label {
      position: absolute;
      top: 34px;
      left: 49%;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
.funding_guarantee_box {
  display: flex;
  gap: 24px;
  .implement_box {
    flex: 1;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 6px;
      }
      .icon {
        margin-right: 6px;
      }
      .title {
        flex: 1;
        font-size: 16px;
        line-height: 24px;
      }
      .col {
        display: flex;
        align-items: center;
        gap: 4px;
        .label {
          font-size: 16px;
          line-height: 24px;
        }
        .value {
          font-family: PangMenZhengDao;
          font-size: 18px;
          line-height: 26px;
        }
      }
      .percentage {
        height: 6px;
      }
    }
  }
  .line {
    @include fenceDividingLine(72px);
  }
  .funding_box {
    flex: 1;
  }
}
.financial_support_box {
  display: flex;
  gap: 24px;
  .financial_support_item {
    flex: 1;
  }
  .line {
    @include fenceDividingLine(56px);
  }
}
.row_data {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .row {
    display: flex;
    align-items: center;
    .label {
      font-size: 16px;
      line-height: 24px;
      margin-right: 8px;
    }
    .value {
      font-family: PangMenZhengDao;
      font-size: 20px;
      line-height: 24px;
      color: $color-primary;
    }
    .unit {
      font-size: 16px;
      line-height: 24px;
      margin-left: 8px;
    }
  }
}
.inspection_duties_box {
  padding: 10px 15px 13px 15px;
}
.top_three,
.tail_three {
  position: relative;
  width: 100%;
  border: 1px solid;
  .title {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 92px;
    height: 36px;
    font-family: PangMenZhengDao;
    font-size: 16px;
    line-height: 36px;
    text-align: center;
  }
  .ranking {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .item {
      display: flex;
      align-items: center;
      img.sort {
        margin-right: 12px;
      }
      span.sort {
        width: 58px;
        height: 20px;
        display: inline-block;
        background-image: url(@/assets/images/NoBg.png);
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #b6e0ff;
        margin-right: 4px;
      }
      .name {
        flex: 1;
        font-size: 16px;
        line-height: 16px;
        margin-right: 8px;
      }
      .score {
        font-family: PangMenZhengDao;
        font-size: 24px;
        line-height: 32px;
        color: $color-primary;
      }
      .unit {
        font-size: 14px;
        line-height: 16px;
        margin-left: 8px;
      }
    }
  }
}
.top_three {
  height: 186px;
  margin-top: 18px;
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 237, 176, 0.5) 100%) 1;
  .title {
    background-image: url(@/assets/images/topThreeBg.png);
  }
  .ranking {
    padding: 23px 25px 17px 20px;
  }
}
.tail_three {
  height: 150px;
  margin-top: 32px;
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(176, 217, 255, 0.5) 100%) 1;
  margin-bottom: 16px;
  .title {
    background-image: url(@/assets/images/tailThreeBg.png);
  }
  .ranking {
    padding: 32px 25px 18px 14px;
  }
}
.inspector_data_box {
  display: flex;
  margin-top: -9px;
  .inspector_data {
    display: flex;
    flex-wrap: wrap;
    align-content: space-evenly;
    flex: 1;
    padding-top: 9px;
    .inspector_item {
      width: 50%;
      padding-left: 20px;
      .label {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 2px;
      }
      .data {
        display: flex;
        align-items: center;
        gap: 8px;
        .value {
          font-family: PangMenZhengDao;
          font-size: 24px;
          line-height: 24px;
        }
        .unit {
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }
  > img {
    width: 160px;
    height: 160px;
  }
}
.event_collaboration_box {
  padding: 8px 15px 15px 15px;
}
.handle_event {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  .item {
    display: flex;
    align-items: center;
    gap: 16px;
    .label {
      font-size: 16px;
      line-height: 19px;
    }
    .value {
      display: flex;
      align-items: center;
      gap: 4px;
      .count {
        font-family: PangMenZhengDao;
        font-size: 20px;
        line-height: 28px;
      }
      .unit {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
}
.event_statistic {
  position: relative;
  width: 100%;
  height: 164px;
  .event_chart {
    position: absolute;
    left: 12;
    width: 164px;
    height: 164px;
  }
  .event_legend {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 172px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-left: 30px;
    padding-right: 12px;
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
</style>
