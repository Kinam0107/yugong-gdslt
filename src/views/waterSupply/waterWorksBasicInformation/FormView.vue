<template>
  <AnchorBox v-if="props.mode === 'desc'" active-label="基础信息">
    <AnchorItem label="基础信息">
      <el-descriptions :column="3">
        <el-descriptions-item label="行政区划：">
          {{ form.adnm || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="所在位置：">
          {{ form.position || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </AnchorItem>
    <AnchorItem label="工程信息">
      <el-descriptions :column="3">
        <el-descriptions-item label="工程规模：">
          {{ dataEcho('GSGCGM', form.scale, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="工程性质：">
          {{ dataEcho('GSGCXZ', form.property, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="设计日供水规模：">
          {{ (form.waterSupplyScale || '-') + ' m³/D' }}
        </el-descriptions-item>
        <el-descriptions-item label="日实际供水量：">
          {{ (form.dayRealSupplyWater || '-') + ' m³/D' }}
        </el-descriptions-item>
        <el-descriptions-item label="年实际供水量：">
          {{ (form.yearRealSupplyWater || '-') + ' m³' }}
        </el-descriptions-item>
        <el-descriptions-item label="开始供水时间：">
          {{ form.waterSupplyStartTime?.substring(0, 10) || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="建成投产时间：">
          {{ form.completionCommissionTime?.substring(0, 10) || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="竣工验收工程：">
          {{ dataEcho('SF', form.whetherCompletionWorks, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="运行状态：">
          {{ form.runningState || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="水厂状态：">
          {{ dataEcho('SCZT', form.waterCompanyState, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="供水人数：">
          {{ (form.waterSupplyPersonnel || '-') + ' 人' }}
        </el-descriptions-item>
        <el-descriptions-item label="供水到户人数：">
          {{ (form.waterSupplyHouseNum || '-') + ' 人' }}
        </el-descriptions-item>
        <el-descriptions-item label="供水户数：">
          {{ (form.waterSupplyHouseholds || '-') + ' 户' }}
        </el-descriptions-item>
        <el-descriptions-item label="已取得卫生许可证：">
          {{ dataEcho('SF', form.obtainHealthPermit, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="已取得取水许可证：">
          {{ dataEcho('SF', form.obtainWaterPermit, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="纳入县域统管：">
          {{ dataEcho('SF', form.underCountyAdministration, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="已实现专业化管理：">
          {{ dataEcho('SF', form.ifProfessionalManagement, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否标准化建设工程：">
          {{ dataEcho('SF', form.ifStandardizeProject, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否有信息化管理平台：">
          {{ dataEcho('SF', form.whetherInfoManagePlatform, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="水质化验室建设：">
          {{ dataEcho('SF', form.waterQualityExperimentConst, { emptyEcho: '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否有警示标志：">
          {{ dataEcho('SF', form.warningSigns, { emptyEcho: '-' }) }}
        </el-descriptions-item>
      </el-descriptions>
    </AnchorItem>
    <AnchorItem label="工程管理信息">
      <el-descriptions :column="3">
        <el-descriptions-item label="工程管理单位：">
          {{ form.engineerManageUnit || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="单位性质：">
          {{ dataEcho('NCGSDWXZ', form.unitProperty, { emptyEcho: form.unitProperty || '-' }) }}
        </el-descriptions-item>
        <el-descriptions-item label="管理单位负责人：">
          {{ form.manageUnitPrincipal || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="管理负责人联系方式：">
          {{ form.principalPhone || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="工程专职运行管理人员数量：">
          {{ (form.projectRuningManageNum || '-') + ' 人' }}
        </el-descriptions-item>
        <el-descriptions-item label="上级水行政监管单位：">
          {{ form.waterSupervisionUnit || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="监管单位联系人：">
          {{ form.supervisionUnitPrincipal || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="监管联系人联系方式：">
          {{ form.supervisionPrincipalPhone || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="供水单位服务热线：">
          {{ form.waterSupplyPhone || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="供水维修服务电话：">
          {{ form.maintenanceServicePhone || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </AnchorItem>
    <AnchorItem label="水费水价信息">
      <el-descriptions :column="3">
        <el-descriptions-item label="全成本水价：">
          {{ (form.fullCostWaterPrice || '-') + ' 元/m³' }}
        </el-descriptions-item>
        <el-descriptions-item label="运行成本水价：">
          {{ (form.runningCostWaterPrice || '-') + ' 元/m³' }}
        </el-descriptions-item>
        <el-descriptions-item label="计费方式：">
          {{ form.chargeMode || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="居民生活执行水价：">
          {{ (form.livingWaterPrice || '-') + ' 元/m³' }}
        </el-descriptions-item>
        <el-descriptions-item label="水费回收率：">
          {{ form.waterRateRecovery || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="收支情况：">
          {{ form.incomeAndExpenditure || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </AnchorItem>
    <AnchorItem label="地图落点">
      <el-descriptions>
        <el-descriptions-item label="供水工程坐标：">
          {{ (form.longitude || '-') + ', ' + (form.latitude || '-') }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="map">
        <OlMap viewAdaptBoundary @initFinished="handleInitFinished" />
      </div>
    </AnchorItem>
  </AnchorBox>
  <el-form v-else ref="formRef" :model="form" :rules="rules" inline label-width="210px" label-suffix="：">
    <div class="title">基础信息</div>
    <el-form-item v-if="props.mode === 'add'" label="工程名称" prop="engineerName">
      <el-input v-model="form.engineerName" placeholder="请输入" />
    </el-form-item>
    <el-form-item v-if="props.mode === 'add'" label="工程编码" prop="engineerCode">
      <el-input v-model="form.engineerCode" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="行政区划" prop="adcd">
      <admn-select v-model="form.adcd" placeholder="请选择" />
    </el-form-item>
    <el-form-item label="所在位置" prop="position">
      <el-input v-model="form.position" placeholder="请输入" clearable />
    </el-form-item>
    <div class="title">工程信息</div>
    <el-form-item label="工程规模" prop="scale" style="width: 100%">
      <el-select v-model="form.scale" placeholder="" disabled>
        <el-option v-for="item in getOptions('GSGCGM')" :key="'scale' + item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="工程性质" prop="property">
      <el-select v-model="form.property" placeholder="请选择" @change="setScale">
        <el-option v-for="item in getOptions('GSGCXZ')" :key="'property' + item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="设计日供水规模" prop="waterSupplyScale" @change="setScale">
      <el-input v-model="form.waterSupplyScale" type="number" placeholder="请输入">
        <template #append>m³/D</template>
      </el-input>
    </el-form-item>
    <el-form-item label="日实际供水量" prop="dayRealSupplyWater">
      <el-input v-model="form.dayRealSupplyWater" type="number" placeholder="请输入" @change="setYearRealSupplyWater">
        <template #append>m³/D</template>
      </el-input>
    </el-form-item>
    <el-form-item label="年实际供水量" prop="yearRealSupplyWater">
      <el-input v-model="form.yearRealSupplyWater" type="number" placeholder="请输入">
        <template #append>m</template>
      </el-input>
    </el-form-item>
    <el-form-item label="开始供水时间" prop="waterSupplyStartTime">
      <el-date-picker v-model="form.waterSupplyStartTime" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :clearable="false" />
    </el-form-item>
    <el-form-item label="建成投产时间" prop="completionCommissionTime">
      <el-date-picker v-model="form.completionCommissionTime" type="date" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :clearable="false" />
    </el-form-item>
    <el-form-item label="竣工验收工程" prop="whetherCompletionWorks">
      <el-radio-group v-model="form.whetherCompletionWorks">
        <el-radio v-for="item in getOptions('SF')" :key="'whetherCompletionWorks' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运行状态" prop="runningState">
      <el-radio-group v-model="form.runningState">
        <el-radio label="正常"></el-radio>
        <el-radio label="异常"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="水厂状态" prop="waterCompanyState">
      <el-select v-model="form.waterCompanyState" placeholder="请选择">
        <el-option v-for="item in getOptions('SCZT')" :key="'waterCompanyState' + item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="供水人数" prop="waterSupplyPersonnel" @change="setScale">
      <el-input v-model="form.waterSupplyPersonnel" type="number" placeholder="请输入">
        <template #append>人</template>
      </el-input>
    </el-form-item>
    <el-form-item label="供水到户人数" prop="waterSupplyHouseNum">
      <el-input v-model="form.waterSupplyHouseNum" type="number" placeholder="请输入">
        <template #append>人</template>
      </el-input>
    </el-form-item>
    <el-form-item label="供水户数" prop="waterSupplyHouseholds">
      <el-input v-model="form.waterSupplyHouseholds" type="number" placeholder="请输入" clearable>
        <template #append>户</template>
      </el-input>
    </el-form-item>
    <el-form-item label="已取得卫生许可证" prop="obtainHealthPermit">
      <el-radio-group v-model="form.obtainHealthPermit">
        <el-radio v-for="item in getOptions('SF')" :key="'obtainHealthPermit' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="已取得取水许可证" prop="obtainWaterPermit">
      <el-radio-group v-model="form.obtainWaterPermit">
        <el-radio v-for="item in getOptions('SF')" :key="'obtainWaterPermit' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="纳入县域统管" prop="underCountyAdministration">
      <el-radio-group v-model="form.underCountyAdministration">
        <el-radio v-for="item in getOptions('SF')" :key="'underCountyAdministration' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="已实现专业化管理" prop="ifProfessionalManagement">
      <el-radio-group v-model="form.ifProfessionalManagement">
        <el-radio v-for="item in getOptions('SF')" :key="'ifProfessionalManagement' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否标准化建设工程" prop="ifStandardizeProject">
      <el-radio-group v-model="form.ifStandardizeProject">
        <el-radio v-for="item in getOptions('SF')" :key="'ifStandardizeProject' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否有信息化管理平台" prop="whetherInfoManagePlatform">
      <el-radio-group v-model="form.whetherInfoManagePlatform">
        <el-radio v-for="item in getOptions('SF')" :key="'whetherInfoManagePlatform' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="水质化验室建设" prop="waterQualityExperimentConst">
      <el-radio-group v-model="form.waterQualityExperimentConst">
        <el-radio v-for="item in getOptions('SF')" :key="'waterQualityExperimentConst' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否有警示标志" prop="warningSigns">
      <el-radio-group v-model="form.warningSigns">
        <el-radio v-for="item in getOptions('SF')" :key="'warningSigns' + item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="title">工程管理信息</div>
    <el-form-item label="工程管理单位" prop="engineerManageUnit">
      <el-input v-model="form.engineerManageUnit" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="单位性质" prop="unitProperty">
      <el-select v-model="form.unitProperty" placeholder="请选择">
        <el-option v-for="item in getOptions('NCGSDWXZ')" :key="'unitProperty' + item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="管理单位负责人" prop="manageUnitPrincipal">
      <el-input v-model="form.manageUnitPrincipal" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="管理负责人联系方式" prop="principalPhone">
      <el-input v-model="form.principalPhone" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="工程专职运行管理人员数量" prop="projectRuningManageNum">
      <el-input v-model="form.projectRuningManageNum" type="number" placeholder="请输入">
        <template #append>人</template>
      </el-input>
    </el-form-item>
    <el-form-item label="上级水行政监管单位" prop="waterSupervisionUnit">
      <el-input v-model="form.waterSupervisionUnit" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="监管单位联系人" prop="supervisionUnitPrincipal">
      <el-input v-model="form.supervisionUnitPrincipal" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="监管联系人联系方式" prop="supervisionPrincipalPhone">
      <el-input v-model="form.supervisionPrincipalPhone" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="供水单位服务热线" prop="waterSupplyPhone">
      <el-input v-model="form.waterSupplyPhone" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="供水维修服务电话" prop="maintenanceServicePhone">
      <el-input v-model="form.maintenanceServicePhone" placeholder="请输入" />
    </el-form-item>
    <div class="title">水费水价信息</div>
    <el-form-item label="全成本水价" prop="fullCostWaterPrice">
      <el-input v-model="form.fullCostWaterPrice" type="number" placeholder="请输入">
        <template #append>元/m³</template>
      </el-input>
    </el-form-item>
    <el-form-item label="运行成本水价" prop="runningCostWaterPrice">
      <el-input v-model="form.runningCostWaterPrice" type="number" placeholder="请输入">
        <template #append>元/m³</template>
      </el-input>
    </el-form-item>
    <el-form-item label="计费方式：" prop="chargeMode">
      <el-select v-model="form.chargeMode" placeholder="请选择">
        <el-option label="计量收费" value="计量收费" />
        <el-option label="按电收费" value="按电收费" />
        <el-option label="固定收费" value="固定收费" />
        <el-option label="不收费" value="不收费" />
      </el-select>
    </el-form-item>
    <el-form-item label="居民生活执行水价：" prop="livingWaterPrice">
      <el-input v-model="form.livingWaterPrice" type="number" placeholder="请输入">
        <template #append>元/m³</template>
      </el-input>
    </el-form-item>
    <el-form-item label="水费回收率：" prop="waterRateRecovery">
      <el-input v-model="form.waterRateRecovery" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="收支情况：" prop="incomeAndExpenditure">
      <el-select v-model="form.incomeAndExpenditure" placeholder="请选择">
        <el-option label="收支平衡" value="收支平衡" />
        <el-option label="收不抵支" value="收不抵支" />
        <el-option label="收大于支" value="收大于支" />
      </el-select>
    </el-form-item>
    <div class="title">地图落点</div>
    <el-form-item class="coordinate_item" label="工程坐标" required>
      <el-form-item prop="longitude">
        <el-input v-model="form.longitude" type="number" placeholder="经度" @change="coordinateChange()" />
      </el-form-item>
      <el-form-item prop="latitude">
        <el-input v-model="form.latitude" type="number" placeholder="纬度" @change="coordinateChange()" />
      </el-form-item>
      <el-button link type="primary" @click="enableMapPointSelection()">地图选点</el-button>
    </el-form-item>
    <div class="map" :class="{ active: openMapSelection }">
      <OlMap viewAdaptBoundary @initFinished="handleInitFinished" @single-click="handleSingleClick" />
    </div>
  </el-form>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import { reactive, ref, watch, onMounted, nextTick } from 'vue'
import { dataEcho, getOptions } from '@/utils/enum'
import OlMap from '@/components/map/OlMap.vue'
import { changeCursor, gotoPoint, renderPoint } from '@/utils/map.js'
import positionIcon from '@/assets/images/points/point-position-icon.png'

const props = defineProps({
  formState: {
    type: Object
  },
  mode: {
    type: String,
    validator: (val) => ['desc', 'add', 'edit'].includes(val)
  }
})

onMounted(() => {
  if (props.formState) {
    Object.keys(form).forEach((e) => (form[e] = props.formState[e]))
    nextTick(() => coordinateChange())
  }
})
watch(
  () => props.formState,
  (val) => {
    if (val) {
      Object.keys(form).forEach((e) => (form[e] = props.formState[e]))
      nextTick(() => coordinateChange())
    }
  }
)

const form = reactive({
  engineerName: '',
  engineerCode: '',
  adcd: '',
  adnm: '',
  position: '',
  scale: '',
  property: '',
  waterSupplyScale: '',
  dayRealSupplyWater: '',
  yearRealSupplyWater: '',
  waterSupplyStartTime: '',
  completionCommissionTime: '',
  whetherCompletionWorks: '',
  runningState: '',
  waterCompanyState: '',
  waterSupplyPersonnel: '',
  waterSupplyHouseNum: '',
  waterSupplyHouseholds: '',
  obtainHealthPermit: '',
  obtainWaterPermit: '',
  underCountyAdministration: '',
  ifProfessionalManagement: '',
  ifStandardizeProject: '',
  whetherInfoManagePlatform: '',
  waterQualityExperimentConst: '',
  warningSigns: '',
  engineerManageUnit: '',
  unitProperty: '',
  manageUnitPrincipal: '',
  principalPhone: '',
  projectRuningManageNum: '',
  waterSupervisionUnit: '',
  supervisionUnitPrincipal: '',
  supervisionPrincipalPhone: '',
  waterSupplyPhone: '',
  maintenanceServicePhone: '',
  fullCostWaterPrice: '',
  runningCostWaterPrice: '',
  chargeMode: '',
  livingWaterPrice: '',
  waterRateRecovery: '',
  incomeAndExpenditure: '',
  longitude: '',
  latitude: ''
})
const rules = reactive({
  engineerName: [{ required: true, message: '请输入工程名称', trigger: 'blur' }],
  engineerCode: [{ required: true, message: '请输入工程编码', trigger: 'blur' }],
  adcd: [{ required: true, message: '请选择行政区划', trigger: 'change' }],
  property: [{ required: true, message: '请选择工程性质', trigger: 'change' }],
  waterSupplyScale: [{ required: true, message: '请输入设计日供水规模', trigger: 'blur' }],
  dayRealSupplyWater: [{ required: true, message: '请输入日实际供水量', trigger: 'blur' }],
  yearRealSupplyWater: [{ required: true, message: '请输入年实际供水量', trigger: 'blur' }],
  waterSupplyStartTime: [{ required: true, message: '请选择开始供水时间', trigger: 'change' }],
  completionCommissionTime: [{ required: true, message: '请选择建成投产时间', trigger: 'change' }],
  whetherCompletionWorks: [{ required: true, message: '请选择是否是竣工验收工程', trigger: 'change' }],
  runningState: [{ required: true, message: '请选择运行状态', trigger: 'change' }],
  waterCompanyState: [{ required: true, message: '请选择水厂状态', trigger: 'change' }],
  waterSupplyPersonnel: [{ required: true, message: '请输入供水人数', trigger: 'blur' }],
  waterSupplyHouseNum: [{ required: true, message: '请输入供水到户人数', trigger: 'blur' }],
  underCountyAdministration: [{ required: true, message: '请选择是否纳入县域统管', trigger: 'change' }],
  ifProfessionalManagement: [{ required: true, message: '请选择是否已实现专业化管理', trigger: 'change' }],
  ifStandardizeProject: [{ required: true, message: '请选择是否是标准化建设工程', trigger: 'change' }],
  whetherInfoManagePlatform: [{ required: true, message: '请选择是否有信息化管理平台', trigger: 'change' }],
  warningSigns: [{ required: true, message: '请选择是否有警示标志', trigger: 'change' }],
  engineerManageUnit: [{ required: true, message: '请输入工程管理单位', trigger: 'blur' }],
  unitProperty: [{ required: true, message: '请选择单位性质', trigger: 'change' }],
  manageUnitPrincipal: [{ required: true, message: '请输入管理单位负责人', trigger: 'blur' }],
  principalPhone: [{ required: true, message: '请输入管理负责人联系方式', trigger: 'blur' }],
  projectRuningManageNum: [{ required: true, message: '请输入工程专职运行管理人员数量', trigger: 'blur' }],
  waterSupervisionUnit: [{ required: true, message: '请输入上级水行政监管单位', trigger: 'blur' }],
  waterSupplyPhone: [{ required: true, message: '请输入供水单位服务热线', trigger: 'blur' }],
  maintenanceServicePhone: [{ required: true, message: '请输入供水维修服务电话', trigger: 'blur' }],
  fullCostWaterPrice: [{ required: true, message: '请输入全成本水价', trigger: 'blur' }],
  runningCostWaterPrice: [{ required: true, message: '请输入运行成本水价', trigger: 'blur' }],
  chargeMode: [{ required: true, message: '请选择计费方式', trigger: 'change' }],
  livingWaterPrice: [{ required: true, message: '请输入居民生活执行水价', trigger: 'blur' }],
  waterRateRecovery: [{ required: true, message: '水费回收率', trigger: 'blur' }],
  incomeAndExpenditure: [{ required: true, message: '请选择收支情况', trigger: 'change' }],
  longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
  latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }]
})
const setScale = () => {
  // 1、判断【工程性质】=【城市管网延伸】，则为城市管网延伸；
  // 2、【日设计供水规模】≥1000m³/D，或 【覆盖供水人口】≥10000人（1万人），则为千吨万人工程；
  // 3、100m³/D≤【日设计供水规模】＜1000m³/D；或1000人 ≤【覆盖供水人口】＜10000人，则为千人工程。
  // 4、【覆盖供水人口】＜1000人的农村供水工程，千人以下供水工程
  // 其中，如有2个条件，满足一个即可，就高不就低，一个工程只在一个工程规模范围内，规模总数需要与工程总数相等）
  if (form.property === '3') {
    form.scale = '1'
  } else if (form.waterSupplyScale >= 1000 || form.waterSupplyPersonnel >= 10000) {
    form.scale = '2'
  } else if ((form.waterSupplyScale >= 100 && form.waterSupplyScale < 1000) || (form.waterSupplyPersonnel >= 1000 && form.waterSupplyPersonnel < 10000)) {
    form.scale = '3'
  } else {
    form.scale = '4'
  }
}
const setYearRealSupplyWater = () => {
  form.yearRealSupplyWater = (form.dayRealSupplyWater || 0) * 365
}

const openMapSelection = ref(false)
const enableMapPointSelection = () => {
  openMapSelection.value = true
}
watch(openMapSelection, (val) => {
  changeCursor(map, val ? 'crosshair' : null)
})
let map
const handleInitFinished = (e) => {
  map = e
}
const coordinateChange = () => {
  if (form.longitude && form.latitude) {
    gotoPoint(map, { center: [form.longitude, form.latitude] })
    renderPoint(map, '工程坐标', {
      longitude: form.longitude,
      latitude: form.latitude,
      dotStyleConf: { src: positionIcon, anchor: [0.5, 23], anchorYUnits: 'pixels' }
    })
  }
  openMapSelection.value = false
}
const handleSingleClick = (e) => {
  if (openMapSelection.value) {
    form.longitude = e.coordinate[0].toFixed(6)
    form.latitude = e.coordinate[1].toFixed(6)
    gotoPoint(map, { center: e.coordinate })
    renderPoint(map, '工程坐标', {
      longitude: e.coordinate[0],
      latitude: e.coordinate[1],
      dotStyleConf: { src: positionIcon, anchor: [0.5, 23], anchorYUnits: 'pixels' }
    })
    openMapSelection.value = false
  }
}

const formRef = ref()
const formValidate = (callback) => {
  formRef.value.validate((valid) => {
    if (valid) {
      callback()
    } else {
      return false
    }
  })
}

defineExpose({ form, formValidate })
</script>

<style scoped lang="scss">
.el-form-item {
  width: calc(50% - 32px);
  min-width: 450px;
}
:deep(.el-form-item__content) {
  flex-basis: 240px;
  flex-grow: 0;
  flex-shrink: 0;
  .el-select,
  .el-date-editor {
    width: 100%;
  }
}
.coordinate_item.el-form-item {
  width: 100%;
  :deep(> .el-form-item__content) {
    display: flex;
    align-items: center;
    flex-basis: 350px;
    > .el-form-item {
      display: inline-block;
      width: 132px;
      min-width: 132px;
      margin-right: 12px;
      .el-form-item__content {
        flex-basis: 132px;
      }
    }
  }
}
.title {
  @include fontCategory(2);
  padding: 4px 0;
  margin-bottom: 4px;
}
.map {
  width: 100%;
  height: 400px;
  margin-top: 16px;
  &.active {
    box-shadow: 0px 0px 3px 3px #0052d9;
  }
}
</style>
