<template>
  <el-upload class="drag_drop_upload" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
    <img :src="cloudUploadImg" />
    <div class="upload_text">
      将文件拖到此处上传，或
      <span>点击上传</span>
      <div class="tip">支持png/jpg/pdf/word/excel文件等，不超过100M</div>
    </div>
  </el-upload>
</template>

<script setup>
import cloudUploadImg from '@/assets/images/cloud-upload.png'
</script>

<style scoped lang="scss">
.upload_text {
  @include fontCategory();
  span {
    color: $color-primary;
  }
  .tip {
    @include fontCategory(5);
    color: $color-prompttext;
    margin-top: $baseDistance;
  }
}
</style>
