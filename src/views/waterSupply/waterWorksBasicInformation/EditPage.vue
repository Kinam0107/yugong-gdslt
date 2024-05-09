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
import axios from '@/api/axios'
import { ElMessage } from 'element-plus'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['back'])

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

const formView = ref()
const commit = () => {
  formView.value.formValidate(() => {
    const params = formView.value.form
    params.id = props.id
    axios({
      url: '/agricultural-water-center/water-supply-engineer-base-info/update',
      method: 'post',
      data: params
    })
      .then(() => {
        ElMessage.success('编辑成功')
        emits('back')
        emits('success')
      })
      .catch(() => {
        ElMessage.error('编辑失败')
      })
  })
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
