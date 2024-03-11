<template>
  <div class="add_form--layout">
    <div class="head--container">
      <PageHeader crumb title back @back="emits('back')">
        <template #crumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="cursor: pointer" @click="emits('back')">供水工程</el-breadcrumb-item>
            <el-breadcrumb-item>新增供水工程信息</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        新增供水工程信息
        <template #btn>
          <el-button plain @click="emits('back')">取消</el-button>
          <el-button plain @click="save()">保存</el-button>
          <el-button type="primary" @click="commit()">提交</el-button>
        </template>
      </PageHeader>
    </div>
    <div class="body--container">
      <div class="form_content">
        <FormView ref="formView" mode="add" :formState="formState" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormView from './FormView.vue'
import { localData } from '@/utils/storage'
import axios from '@/api/axios/base'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['back'])

const formView = ref()
const formState = localData.get('waterWorksBasicInformation')
const save = () => {
  localData.set('waterWorksBasicInformation', formView.value.form)
  emits('back')
}
const commit = () => {
  formView.value.formValidate(() => {
    axios({
      url: '/agricultural-water-center/water-supply-engineer-base-info/save',
      method: 'post',
      data: formView.value.form
    })
      .then(() => {
        ElMessage.success('新增成功')
        emits('back')
        emits('success')
      })
      .catch(() => {
        ElMessage.error('新增失败')
      })
  })
}
</script>

<style scoped lang="scss">
.add_form--layout {
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
