<template>
  <div class="edit_form--layout">
    <div class="head--container">
      <PageHeader crumb title back @back="emits('back')">
        <template #crumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="cursor: pointer" @click="emits('back')">供水工程</el-breadcrumb-item>
            <el-breadcrumb-item>编辑{{ formState?.engineerName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        编辑{{ formState?.engineerName }}
        <template #btn>
          <el-button plain @click="emits('back')">取消</el-button>
          <el-button type="primary" @click="commit()">提交</el-button>
        </template>
      </PageHeader>
    </div>
    <div class="body--container">
      <div class="form_content">
        <FormView ref="formView" mode="edit" :formState="formState" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FormView from './FormView.vue'

const props = defineProps({
  id: String
})
const emits = defineEmits(['back'])

const formState = ref()
onMounted(() => {
  console.log('get formState by id: ', props.id)
  setTimeout(() => {
    formState.value = {
      engineerName: '白云区城市供水管网延伸工程',
      engineerCode: '440111000032',
      adcd: '440103',
      position: '位置',
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
    }
  }, 500)
})

const formView = ref()
const commit = () => {
  emits('back')
}
</script>

<style scoped lang="scss">
.edit_form--layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .head--container {
    background-color: #fff;
  }
  .body--container {
    overflow: auto;
    flex: 1;
    .form_content {
      @include mainContentContainer(auto);
    }
  }
}
</style>
