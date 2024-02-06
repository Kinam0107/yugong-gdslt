<template>
  <div class="alert_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <AlertPlane desc="当某个页面需要向用户显示警告的信息时。非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。" />
      </AnchorItem>
      <AnchorItem label="基础样式">
        <div class="item">
          <div class="label">默认</div>
          <div class="message info" @click="info">
            <el-icon><InfoFilled /></el-icon>
            <span class="text">这是一段很长的信息说明提示文案</span>
            <el-icon class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">成功</div>
          <div class="message success" @click="success">
            <el-icon><SuccessFilled /></el-icon>
            <span class="text">这是一段很长的信息说明提示文案</span>
            <el-icon class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">警告</div>
          <div class="message warning" @click="warning">
            <el-icon><WarningFilled /></el-icon>
            <span class="text">这是一段很长的信息说明提示文案</span>
            <el-icon class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">失败</div>
          <div class="message error" @click="error">
            <el-icon><CircleCloseFilled /></el-icon>
            <span class="text">这是一段很长的信息说明提示文案</span>
            <el-icon class="close"><Close /></el-icon>
          </div>
        </div>
      </AnchorItem>
      <AnchorItem label="带按钮样式">
        <div class="item">
          <div class="label">默认</div>
          <div class="message info" @click="infoDetail">
            <el-icon><InfoFilled /></el-icon>
            <span class="text">这是一段很长的信息说明提示文案</span>
            <span>查看详情</span>
          </div>
        </div>
      </AnchorItem>
      <AnchorItem label="带详情样式">
        <div class="item">
          <div class="label">默认</div>
          <div class="message info" style="height: 108px; align-items: flex-start" @click="infoDesc">
            <el-icon style="margin-top: 5px"><InfoFilled /></el-icon>
            <div class="text">
              <p class="title">这是一个信息提示的标题</p>
              <p class="content">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</p>
            </div>
            <el-icon style="margin-top: 5px" class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">成功</div>
          <div class="message success" style="height: 108px; align-items: flex-start" @click="successDesc">
            <el-icon style="margin-top: 5px"><SuccessFilled /></el-icon>
            <div class="text">
              <p class="title">这是一个信息提示的标题</p>
              <p class="content">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</p>
            </div>
            <el-icon style="margin-top: 5px" class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">警告</div>
          <div class="message warning" style="height: 108px; align-items: flex-start" @click="warningDesc">
            <el-icon style="margin-top: 5px"><WarningFilled /></el-icon>
            <div class="text">
              <p class="title">这是一个信息提示的标题</p>
              <p class="content">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</p>
            </div>
            <el-icon style="margin-top: 5px" class="close"><Close /></el-icon>
          </div>
        </div>
        <div class="item">
          <div class="label">失败</div>
          <div class="message error" style="height: 108px; align-items: flex-start" @click="errorDesc">
            <el-icon style="margin-top: 5px"><CircleCloseFilled /></el-icon>
            <div class="text">
              <p class="title">这是一个信息提示的标题</p>
              <p class="content">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</p>
            </div>
            <el-icon style="margin-top: 5px" class="close"><Close /></el-icon>
          </div>
        </div>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import AlertPlane from './cpns/AlertPlane.vue'
import { InfoFilled, SuccessFilled, WarningFilled, CircleCloseFilled, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

const info = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    message: '这是一段很长的信息说明提示文案'
  })
}
const success = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    message: '这是一段很长的信息说明提示文案',
    type: 'success'
  })
}
const warning = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    message: '这是一段很长的信息说明提示文案',
    type: 'warning'
  })
}
const error = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    message: '这是一段很长的信息说明提示文案',
    type: 'error'
  })
}
const infoDetail = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    message: '这是一段很长的信息说明提示文案',
    customClass: 'close_btn_replace_view_details',
    onClose: viewDetail
  })
  nextTick(() => {
    const doms = document.getElementsByClassName('close_btn_replace_view_details')
    for (let i = 0; i < doms.length; i++) {
      const dom = doms[i].getElementsByClassName('el-message__closeBtn')[0]
      dom.innerHTML = '查看详情'
      dom.style.width = '56px'
      dom.style.fontSize = '14px'
      dom.style.fontStyle = 'normal'
      doms[i].getElementsByClassName('el-message__content')[0].style.paddingRight = '80px'
    }
  })
}
const viewDetail = () => {
  alert('查看详情')
}
const infoDesc = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    dangerouslyUseHTMLString: true,
    message:
      '<div style="font-size: 16px; font-weight: 500; line-height: 24px; margin-bottom: 8px;">这是一个信息提示的标题</div>' +
      '<div style="font-size: 14px; font-weight: 400; line-height: 22px;">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</div>'
  })
}
const successDesc = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    type: 'success',
    dangerouslyUseHTMLString: true,
    message:
      '<div style="font-size: 16px; font-weight: 500; line-height: 24px; margin-bottom: 8px;">这是一个信息提示的标题</div>' +
      '<div style="font-size: 14px; font-weight: 400; line-height: 22px;">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</div>'
  })
}
const warningDesc = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    type: 'warning',
    dangerouslyUseHTMLString: true,
    message:
      '<div style="font-size: 16px; font-weight: 500; line-height: 24px; margin-bottom: 8px;">这是一个信息提示的标题</div>' +
      '<div style="font-size: 14px; font-weight: 400; line-height: 22px;">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</div>'
  })
}
const errorDesc = () => {
  ElMessage({
    showClose: true,
    duration: 0,
    type: 'error',
    dangerouslyUseHTMLString: true,
    message:
      '<div style="font-size: 16px; font-weight: 500; line-height: 24px; margin-bottom: 8px;">这是一个信息提示的标题</div>' +
      '<div style="font-size: 14px; font-weight: 400; line-height: 22px;">这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述</div>'
  })
}
</script>

<style scoped lang="scss">
.alert_view {
  @include mainContentContainer(100%);
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 3 * $baseDistance;
  .label {
    @include fontCategory(3);
    color: $color-prompttext;
    margin-right: 6 * $baseDistance;
  }
  .message {
    display: flex;
    align-items: center;
    gap: 0.5 * $baseDistance;
    width: 80 * $baseDistance;
    height: 5 * $baseDistance;
    padding: $baseDistance 2 * $baseDistance;
    border-radius: 0.5 * $baseDistance;
    @include fontCategory();
    cursor: pointer;
    &.info {
      color: $color-primary;
      border: 1px solid $color-primary;
      background-color: transparentize($color-primary, 0.9);
    }
    &.success {
      color: $color-success;
      border: 1px solid $color-success;
      background-color: transparentize($color-success, 0.9);
    }
    &.warning {
      color: $color-warning;
      border: 1px solid $color-warning;
      background-color: transparentize($color-warning, 0.9);
    }
    &.error {
      color: $color-error;
      border: 1px solid $color-error;
      background-color: transparentize($color-error, 0.9);
    }
    .text {
      flex: 1;
      color: $color-titletext;
      .title {
        @include fontCategory(3);
        color: $color-titletext;
        margin-bottom: $baseDistance;
      }
      .content {
        @include fontCategory(4);
        color: $color-explaintext;
      }
    }
    .close {
      color: $color-prompttext;
    }
  }
}
</style>
