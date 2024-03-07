<template>
  <div class="view_form--layout">
    <div class="head--container">
      <PageHeader crumb title back @back="emits('back')">
        <template #crumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="cursor: pointer" @click="emits('back')">供水工程</el-breadcrumb-item>
            <el-breadcrumb-item>{{ formState?.engineerName }}详情</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        {{ formState?.engineerName }}详情
        <span v-if="formState?.engineerCode">工程编码: {{ formState?.engineerCode }}</span>
        <template #btn>
          <el-button plain @click="emits('back')">取消</el-button>
          <el-button type="primary" @click="emits('edit', props.id)">编辑</el-button>
        </template>
      </PageHeader>
    </div>
    <div class="body--container">
      <div class="form_content">
        <FormView mode="desc" :formState="formState" />
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
const emits = defineEmits(['back', 'edit'])

const formState = ref()
onMounted(() => {
  console.log('get formState by id: ', props.id)
  setTimeout(() => {
    formState.value = {
      engineerName: '白云区城市供水管网延伸工程',
      engineerCode: '440111000032',
      adcd: '440103',
      position: '位置1',
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
      longitude: '112.826645',
      latitude: '23.573422'
    }
  }, 500)
})
</script>

<style scoped lang="scss">
.view_form--layout {
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
      @include mainContentContainer(100%);
    }
  }
}
</style>
