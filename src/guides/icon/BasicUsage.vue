<template>
  <IconPlane desc="点击图标可复制组件代码">
    <div class="design_icon_box">
      <SvgIcon icon="locate" @click="copy" />
      <SvgIcon icon="safe-run" @click="copy" />
      <SvgIcon icon="basic" @click="copy" />
      <SvgIcon icon="operation" @click="copy" />
      <SvgIcon icon="security" @click="copy" />
      <SvgIcon icon="examine" @click="copy" />
      <SvgIcon icon="water-drop" @click="copy" />
      <SvgIcon icon="note" @click="copy" />
      <SvgIcon icon="electricity" @click="copy" />
      <SvgIcon icon="arrow" @click="copy" />
      <SvgIcon icon="edit" @click="copy" />
      <SvgIcon icon="pdf-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="mail" @click="copy" />
      <SvgIcon icon="time-circle" @click="copy" />
      <SvgIcon icon="trash-can" @click="copy" />
      <SvgIcon icon="app-store" @click="copy" />
      <SvgIcon icon="trumpet" @click="copy" />
      <SvgIcon icon="horn" @click="copy" />
      <SvgIcon icon="sad" @click="copy" />
      <SvgIcon icon="calm" @click="copy" />
      <SvgIcon icon="happy" @click="copy" />
      <SvgIcon icon="male" @click="copy" />
      <SvgIcon icon="female" @click="copy" />
      <SvgIcon icon="compass" @click="copy" />
      <SvgIcon icon="sight-bead" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="mail-fill" @click="copy" />
      <SvgIcon icon="time-circle-fill" @click="copy" />
      <SvgIcon icon="trash-can-fill" @click="copy" />
      <SvgIcon icon="app-store-fill" @click="copy" />
      <SvgIcon icon="trumpet-fill" @click="copy" />
      <SvgIcon icon="horn-fill" @click="copy" />
      <SvgIcon icon="sad-fill" @click="copy" />
      <SvgIcon icon="calm-fill" @click="copy" />
      <SvgIcon icon="happy-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="picture" @click="copy" />
      <SvgIcon icon="plus-circle" @click="copy" />
      <SvgIcon icon="calling-card" @click="copy" />
      <SvgIcon icon="document-box" @click="copy" />
      <SvgIcon icon="file-pocket" @click="copy" />
      <SvgIcon icon="schedule" @click="copy" />
      <SvgIcon icon="schedule-check" @click="copy" />
      <SvgIcon icon="schedule-multiple-check" @click="copy" />
      <SvgIcon icon="schedule-person" @click="copy" />
      <SvgIcon icon="schedule-money" @click="copy" />
      <SvgIcon icon="notebook" @click="copy" />
      <SvgIcon icon="paper" @click="copy" />
      <SvgIcon icon="document-shelf" @click="copy" />
      <SvgIcon icon="bookshelf" @click="copy" />
      <SvgIcon icon="book-open" @click="copy" />
      <SvgIcon icon="tag" @click="copy" />
      <SvgIcon icon="tags" @click="copy" />
      <SvgIcon icon="detach" @click="copy" />
      <SvgIcon icon="pause" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="picture-fill" @click="copy" />
      <SvgIcon icon="plus-circle-fill" @click="copy" />
      <SvgIcon icon="calling-card-fill" @click="copy" />
      <SvgIcon icon="document-box-fill" @click="copy" />
      <SvgIcon icon="file-pocket-fill" @click="copy" />
      <SvgIcon icon="schedule-fill" @click="copy" />
      <SvgIcon icon="schedule-check-fill" @click="copy" />
      <SvgIcon icon="schedule-multiple-check-fill" @click="copy" />
      <SvgIcon icon="schedule-person-fill" @click="copy" />
      <SvgIcon icon="schedule-money-fill" @click="copy" />
      <SvgIcon icon="notebook-fill" @click="copy" />
      <SvgIcon icon="paper-fill" @click="copy" />
      <SvgIcon icon="document-shelf-fill" @click="copy" />
      <SvgIcon icon="bookshelf-fill" @click="copy" />
      <SvgIcon icon="book-open-fill" @click="copy" />
      <SvgIcon icon="tag-fill" @click="copy" />
      <SvgIcon icon="tags-fill" @click="copy" />
      <SvgIcon icon="detach-fill" @click="copy" />
      <SvgIcon icon="pause-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="user" @click="copy" />
      <SvgIcon icon="user-batch" @click="copy" />
      <SvgIcon icon="user-switch" @click="copy" />
      <SvgIcon icon="user-add" @click="copy" />
      <SvgIcon icon="user-remove" @click="copy" />
      <SvgIcon icon="user-batch-add" @click="copy" />
      <SvgIcon icon="user-batch-remove" @click="copy" />
      <SvgIcon icon="grid" @click="copy" />
      <SvgIcon icon="grid-bottom" @click="copy" />
      <SvgIcon icon="grid-top" @click="copy" />
      <SvgIcon icon="grid-left" @click="copy" />
      <SvgIcon icon="grid-right" @click="copy" />
      <SvgIcon icon="whole-world" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="security-shield" @click="copy" />
      <SvgIcon icon="secure-payment" @click="copy" />
      <SvgIcon icon="secure-search" @click="copy" />
      <SvgIcon icon="control-board" @click="copy" />
      <SvgIcon icon="wallet" @click="copy" />
      <SvgIcon icon="storage-card" @click="copy" />
      <SvgIcon icon="storage-card-extract" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="security-shield-fill" @click="copy" />
      <SvgIcon icon="secure-payment-fill" @click="copy" />
      <SvgIcon icon="secure-search-fill" @click="copy" />
      <SvgIcon icon="control-board-fill" @click="copy" />
      <SvgIcon icon="wallet-fill" @click="copy" />
      <SvgIcon icon="storage-card-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="lock-open" @click="copy" />
      <SvgIcon icon="lock" @click="copy" />
      <SvgIcon icon="headset" @click="copy" />
      <SvgIcon icon="lightning" @click="copy" />
      <SvgIcon icon="fire" @click="copy" />
      <SvgIcon icon="cloud" @click="copy" />
      <SvgIcon icon="cloud-storage" @click="copy" />
      <SvgIcon icon="cloud-upload" @click="copy" />
      <SvgIcon icon="cloud-download" @click="copy" />
      <SvgIcon icon="cloud-refresh" @click="copy" />
      <SvgIcon icon="data-review" @click="copy" />
      <SvgIcon icon="data-pass" @click="copy" />
      <SvgIcon icon="data-warn" @click="copy" />
      <SvgIcon icon="data-refresh" @click="copy" />
      <SvgIcon icon="data-search" @click="copy" />
      <SvgIcon icon="data-materials" @click="copy" />
      <SvgIcon icon="data-security" @click="copy" />
      <SvgIcon icon="data-expiration" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="lock-open-fill" @click="copy" />
      <SvgIcon icon="lock-fill" @click="copy" />
      <SvgIcon icon="headset-fill" @click="copy" />
      <SvgIcon icon="lightning-fill" @click="copy" />
      <SvgIcon icon="fire-fill" @click="copy" />
      <SvgIcon icon="cloud-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="house" @click="copy" />
      <SvgIcon icon="trophy" @click="copy" />
      <SvgIcon icon="usb" @click="copy" />
      <SvgIcon icon="printer" @click="copy" />
      <SvgIcon icon="camera" @click="copy" />
      <SvgIcon icon="phone" @click="copy" />
      <SvgIcon icon="rocket" @click="copy" />
      <SvgIcon icon="bag" @click="copy" />
      <SvgIcon icon="gift" @click="copy" />
      <SvgIcon icon="t-shirt" @click="copy" />
      <SvgIcon icon="car" @click="copy" />
      <SvgIcon icon="bottle" @click="copy" />
      <SvgIcon icon="crown" @click="copy" />
      <SvgIcon icon="flag" @click="copy" />
      <SvgIcon icon="mobile-phone" @click="copy" />
      <SvgIcon icon="mobile-phone-big" @click="copy" />
      <SvgIcon icon="video-recorder" @click="copy" />
      <SvgIcon icon="video-recorder-add" @click="copy" />
      <SvgIcon icon="screen" @click="copy" />
      <SvgIcon icon="laptop" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="house-fill" @click="copy" />
      <SvgIcon icon="trophy-fill" @click="copy" />
      <SvgIcon icon="usb-fill" @click="copy" />
      <SvgIcon icon="printer-fill" @click="copy" />
      <SvgIcon icon="camera-fill" @click="copy" />
      <SvgIcon icon="phone-fill" @click="copy" />
      <SvgIcon icon="rocket-fill" @click="copy" />
      <SvgIcon icon="bag-fill" @click="copy" />
      <SvgIcon icon="gift-fill" @click="copy" />
      <SvgIcon icon="t-shirt-fill" @click="copy" />
      <SvgIcon icon="car-fill" @click="copy" />
      <SvgIcon icon="bottle-fill" @click="copy" />
      <SvgIcon icon="crown-fill" @click="copy" />
      <SvgIcon icon="flag-fill" @click="copy" />
      <SvgIcon icon="mobile-phone-fill" @click="copy" />
      <SvgIcon icon="mobile-phone-big-fill" @click="copy" />
      <SvgIcon icon="video-recorder-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="warning-light" @click="copy" />
      <SvgIcon icon="wrench" @click="copy" />
      <SvgIcon icon="painting" @click="copy" />
      <SvgIcon icon="robot" @click="copy" />
      <SvgIcon icon="bug" @click="copy" />
      <SvgIcon icon="heap" @click="copy" />
      <SvgIcon icon="home" @click="copy" />
      <SvgIcon icon="key" @click="copy" />
      <SvgIcon icon="brush" @click="copy" />
      <SvgIcon icon="bar-code" @click="copy" />
      <SvgIcon icon="overlap" @click="copy" />
      <SvgIcon icon="diagrams" @click="copy" />
      <SvgIcon icon="analysis" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="warning-light-fill" @click="copy" />
      <SvgIcon icon="wrench-fill" @click="copy" />
      <SvgIcon icon="painting-fill" @click="copy" />
      <SvgIcon icon="robot-fill" @click="copy" />
      <SvgIcon icon="bug-fill" @click="copy" />
      <SvgIcon icon="heap-fill" @click="copy" />
      <SvgIcon icon="home-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="tetris" @click="copy" />
      <SvgIcon icon="plug-socket" @click="copy" />
      <SvgIcon icon="command" @click="copy" />
      <SvgIcon icon="component" @click="copy" />
      <SvgIcon icon="tree-structure-vertical" @click="copy" />
      <SvgIcon icon="tree-structure-horizontal" @click="copy" />
      <SvgIcon icon="four-corners" @click="copy" />
      <SvgIcon icon="sql" @click="copy" />
      <SvgIcon icon="route" @click="copy" />
      <SvgIcon icon="add-branch" @click="copy" />
      <SvgIcon icon="add-node" @click="copy" />
      <SvgIcon icon="branch-left" @click="copy" />
      <SvgIcon icon="branch-top" @click="copy" />
      <SvgIcon icon="crossroads" @click="copy" />
      <SvgIcon icon="node-shif-left" @click="copy" />
      <SvgIcon icon="node-shif-right" @click="copy" />
      <SvgIcon icon="enter-code" @click="copy" />
      <SvgIcon icon="line-chart" @click="copy" />
      <SvgIcon icon="delineation" @click="copy" />
      <SvgIcon icon="anchoring" @click="copy" />
      <SvgIcon icon="wifi" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="tetris-fill" @click="copy" />
      <SvgIcon icon="plug-socket-fill" @click="copy" />
      <SvgIcon icon="command-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="node-divergence" @click="copy" />
      <SvgIcon icon="node-movement" @click="copy" />
      <SvgIcon icon="node-side" @click="copy" />
      <SvgIcon icon="node-binary" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="abstract" @click="copy" />
      <SvgIcon icon="copy" @click="copy" />
      <SvgIcon icon="folder" @click="copy" />
      <SvgIcon icon="folder-open" @click="copy" />
      <SvgIcon icon="folder-add" @click="copy" />
      <SvgIcon icon="folder-view" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="abstract-fill" @click="copy" />
      <SvgIcon icon="copy-fill" @click="copy" />
      <SvgIcon icon="folder-fill" @click="copy" />
      <SvgIcon icon="folder-open-fill" @click="copy" />
      <SvgIcon icon="folder-add-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="memo" @click="copy" />
      <SvgIcon icon="calculator" @click="copy" />
      <SvgIcon icon="transform" @click="copy" />
      <SvgIcon icon="bar-chart" @click="copy" />
      <SvgIcon icon="dashboard" @click="copy" />
      <SvgIcon icon="time" @click="copy" />
      <SvgIcon icon="dialog-box" @click="copy" />
      <SvgIcon icon="wechat" @click="copy" />
      <SvgIcon icon="Incoming-call" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="memo-fill" @click="copy" />
      <SvgIcon icon="calculator-fill" @click="copy" />
      <SvgIcon icon="transform-fill" @click="copy" />
      <SvgIcon icon="bar-chart-fill" @click="copy" />
      <SvgIcon icon="dashboard-fill" @click="copy" />
      <SvgIcon icon="time-fill" @click="copy" />
      <SvgIcon icon="dialog-box-fill" @click="copy" />
    </div>
  </IconPlane>
</template>

<script setup>
import IconPlane from './cpns/IconPlane.vue'
import { ElMessage } from 'element-plus'

function copy(e) {
  let name = e.target.getAttribute('xlink:href') || e.target.children[0].getAttribute('xlink:href')
  name = name.replace('#icon-', '')
  navigator.clipboard.writeText(`<SvgIcon icon="${name}" />`)
  ElMessage.success('已复制: ' + `<SvgIcon icon="${name}" />`)
}
</script>

<style scoped lang="scss">
.design_icon_box {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  > svg {
    flex: none;
    cursor: pointer;
  }
}
</style>
