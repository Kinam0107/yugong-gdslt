<template>
  <el-upload
    v-model:file-list="fileList"
    class="image_upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    list-type="picture">
    <el-button :icon="Upload">上传附件</el-button>
    <template #tip>
      <span class="upload_tip">支持png/jpg/pdf/word/excel文件等，不超过100M</span>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([
  {
    name: '某某某某系统截图.png',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: '某某某某系统截图.png',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: '某某某某系统截图.png',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: '某某某某系统截图.png',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview = (file) => {
  console.log(file)
}
</script>

<style scoped lang="scss">
.image_upload {
  .upload_tip {
    margin-left: $baseDistance;
    color: $color-prompttext;
  }
  ::v-deep .el-upload-list {
    display: flex;
    gap: $baseDistance;
    flex-wrap: wrap;
    .el-upload-list__item {
      width: calc((100% - 2 * $baseDistance) / 3);
      border: none;
      background-color: #f8f9fb;
      margin: 0;
    }
  }
}
</style>
