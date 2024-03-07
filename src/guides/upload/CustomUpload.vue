<template>
  <el-upload
    v-model:file-list="fileList"
    class="custom_upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed">
    <el-button :icon="Upload">上传附件</el-button>
    <template #tip>
      <span class="upload_tip">支持png/jpg/pdf/word/excel文件等，不超过100M</span>
    </template>
  </el-upload>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'

const fileList = ref([
  {
    name: '省交通运输厅建设管养平台从业企事业人员管理子系统职称申报评审子模块运维和运营项目说明书.pdf',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  },
  {
    name: '省交通运输厅综合运输平台道路运输监管子系统升级及运维项目说明书.pdf',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  }
])

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`)
}

const beforeRemove = (uploadFile) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  )
}
</script>

<style scoped lang="scss">
.custom_upload {
  .upload_tip {
    margin-left: $baseDistance;
    color: $color-prompttext;
  }
  :deep .el-upload-list {
    .el-upload-list__item {
      height: 5 * $baseDistance;
      margin-bottom: $baseDistance;
      background-color: #f8f9fb;
      .el-upload-list__item-info {
        height: 100%;
      }
    }
  }
}
</style>
