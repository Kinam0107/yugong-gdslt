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

const emits = defineEmits(['back'])

const formView = ref()
const formState = localData.get('waterWorksBasicInformation')
const save = () => {
  localData.set('waterWorksBasicInformation', formView.value.form)
  emits('back')
}
const commit = () => {
  localData.remove('waterWorksBasicInformation')
  emits('back')
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
