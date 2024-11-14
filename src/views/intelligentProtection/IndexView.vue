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
            <span class="value">{{ 3 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_qxwx.png" />
          <div class="label">气象卫星</div>
          <div class="data">
            <span class="value">{{ 3 }}</span>
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
            <span class="value">{{ 2 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_cyld.png" />
          <div class="label">测雨雷达</div>
          <div class="data">
            <span class="value">{{ 3 }}</span>
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
            <span class="value">{{ 58 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_znxj.png" />
          <div class="label">智能巡检</div>
          <div class="data">
            <span class="value">{{ 2 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell" :class="{ active: equiType === '雨水情' }" @click="changeEquiType('雨水情')">
          <img src="@/assets/images/icons/equi_ysq.png" />
          <div class="label">雨水情</div>
          <div class="data">
            <span class="value">{{ 63 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="equi_row">
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_aqjc.png" />
          <div class="label">安全监测</div>
          <div class="data">
            <span class="value">{{ 59 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell">
          <img src="@/assets/images/icons/equi_wrc.png" />
          <div class="label">无人船</div>
          <div class="data">
            <span class="value">{{ 1 }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="equi_cell" style="visibility: hidden"></div>
      </div>
    </template>
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
const equiType = ref('视频')
const changeEquiType = (type) => {
  equiType.value = type
  getReservoirPoints()
}
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
</style>
