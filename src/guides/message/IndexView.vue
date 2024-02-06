<template>
  <div class="message_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <MessagePlane desc="可提供成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。" />
      </AnchorItem>
      <AnchorItem label="基础样式">
        <div class="item">
          <div class="label">默认</div>
          <div class="message info" @click="info">
            <el-icon><InfoFilled /></el-icon>
            这是一条普通的提示信息
          </div>
        </div>
        <div class="item">
          <div class="label">成功</div>
          <div class="message success" @click="success">
            <el-icon><SuccessFilled /></el-icon>
            这是一条成功提示信息
          </div>
        </div>
        <div class="item">
          <div class="label">警告</div>
          <div class="message warning" @click="warning">
            <el-icon><WarningFilled /></el-icon>
            这是一条警告提示信息
          </div>
        </div>
        <div class="item">
          <div class="label">失败</div>
          <div class="message error" @click="error">
            <el-icon><CircleCloseFilled /></el-icon>
            这是一条失败提示信息
          </div>
        </div>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import MessagePlane from './cpns/MessagePlane.vue'
import { InfoFilled, SuccessFilled, WarningFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const info = () => {
  ElMessage('这是一条普通的提示信息')
}
const success = () => {
  ElMessage({
    message: '这是一条成功提示信息',
    type: 'success'
  })
}
const warning = () => {
  ElMessage({
    message: '这是一条警告提示信息',
    type: 'warning'
  })
}
const error = () => {
  ElMessage.error('这是一条失败提示信息')
}
</script>

<style scoped lang="scss">
.message_view {
  @include mainContentContainer(100%);
}
.item {
  display: flex;
  align-items: center;
  + .item {
    margin-top: 3 * $baseDistance;
  }
  .label {
    @include fontCategory(3);
    color: $color-prompttext;
    margin-right: 6 * $baseDistance;
  }
  .message {
    display: flex;
    align-items: center;
    gap: 0.5 * $baseDistance;
    height: 5 * $baseDistance;
    padding: $baseDistance 2 * $baseDistance;
    border-radius: 0.5 * $baseDistance;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    @include fontCategory();
    cursor: pointer;
    &.info {
      color: $color-primary;
    }
    &.success {
      color: $color-success;
    }
    &.warning {
      color: $color-warning;
    }
    &.error {
      color: $color-error;
    }
  }
}
</style>
