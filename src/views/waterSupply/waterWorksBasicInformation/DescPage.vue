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
import axios from '@/api/axios/base'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['back', 'edit'])

const formState = ref()
onMounted(() => {
  axios({
    url: '/agricultural-water-center/water-supply-engineer-base-info/findById',
    method: 'get',
    params: { id: props.id }
  }).then((res) => {
    formState.value = res.data
  })
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
