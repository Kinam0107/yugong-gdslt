<template>
  <div class="upload_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <UploadPlane desc="当需要上传一个或一些文件时，展现上传的进度。" />
      </AnchorItem>
      <AnchorItem label="自定义上传">
        <UploadPlane desc="自定义上传，采用通栏形式">
          <CustomUpload />
        </UploadPlane>
      </AnchorItem>
      <AnchorItem label="拖拽上传">
        <UploadPlane desc="可拖拽上传">
          <DragDropUpload />
        </UploadPlane>
      </AnchorItem>
      <AnchorItem label="图片类上传">
        <UploadPlane desc="图片类上传，采用通栏形式">
          <ImageUpload />
        </UploadPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import UploadPlane from './cpns/UploadPlane.vue'
import CustomUpload from './CustomUpload.vue'
import DragDropUpload from './DragDropUpload.vue'
import ImageUpload from './ImageUpload.vue'
</script>

<style scoped lang="scss">
.upload_view {
  @include mainContentContainer(100%);
}
</style>
