<template>
  <div class="popup_box">
    <img v-if="props.title" src="@/assets/images/popupTitleBg.png" class="top_bg" />
    <div v-if="props.title" class="top_area">
      <img src="@/assets/images/popupTitleIcon.png" />
      <span class="title">{{ props.title }}</span>
      <span class="detail" @click="detail">详情</span>
    </div>
    <el-icon class="close" :class="{ move_up: !!title }" size="16" @click="close"><CloseBold /></el-icon>
    <slot></slot>
    <div v-if="props.title" class="left_border"></div>
    <div v-if="props.title" class="right_border"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
</script>

<style scoped lang="scss">
.popup_box {
  position: relative;
  padding: 16px 46px 14px 16px;
  background: linear-gradient(180deg, rgba(0, 97, 128, 0.85) 1%, rgba(0, 30, 70, 0.85) 99%);
  border: 1px solid;
  border-image: linear-gradient(180deg, #002328 -6%, #00baff 100%) 1;
  box-shadow: inset 0px 4px 30px 0px rgba(35, 81, 239, 0.25);
  min-width: 220px;
  margin-bottom: 8px;
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid #00baff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0;
    height: 0;
    border-top: 7px solid #001e46;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  .top_bg {
    position: absolute;
    left: 0;
    bottom: calc(100% + 2px);
  }
  .top_area {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 32px;
    background: rgba(1, 51, 112, 0.8);
    padding: 0 10px;
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .detail {
      font-size: 16px;
      font-weight: 500;
      color: #46fdff;
      margin-left: 16px;
      cursor: pointer;
    }
  }
  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: pointer;
    &.move_up {
      top: -24px;
    }
  }
  :deep(.item) {
    display: flex;
    align-items: center;
    + .item {
      margin-top: 12px;
    }
    .label {
      font-size: 16px;
      line-height: 19px;
    }
    .value {
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
    }
    .detail {
      font-size: 16px;
      font-weight: 500;
      color: #46fdff;
      margin-left: 16px;
      cursor: pointer;
    }
  }
  .left_border {
    position: absolute;
    left: -1px;
    bottom: -1px;
    width: 21px;
    height: 24px;
    border-left: 2px solid #0975ff;
    border-bottom: 2px solid #0975ff;
  }
  .right_border {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 21px;
    height: 24px;
    border-right: 2px solid #0975ff;
    border-bottom: 2px solid #0975ff;
  }
}
</style>
