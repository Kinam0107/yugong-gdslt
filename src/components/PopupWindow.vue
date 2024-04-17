<template>
  <div v-if="modelValue" class="mongolian_layer">
    <div class="popup_wrapper" :class="{ full_screen: isFullScreen }">
      <div class="popup_border_top"></div>
      <div class="popup_border_right"></div>
      <div class="popup_border_bottom"></div>
      <div class="popup_border_left"></div>
      <div class="popup_title">
        <div class="cube_icon"></div>
        <div class="bottom_line"></div>
        <div class="background_block"></div>
        <span class="title">{{ title }}</span>
        <img class="full_screen_icon" :src="fullScreenIcon" @click="isFullScreen = !isFullScreen" />
        <img class="close_icon" :src="closeIcon" @click="close" />
      </div>
      <div class="popup_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import closeIcon from '@/assets/images/popup-close.png'
import fullScreenIcon from '@/assets/images/popup-fullscreen.png'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])

const isFullScreen = ref(false)

const close = () => {
  isFullScreen.value = false
  emits('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.mongolian_layer {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.popup_wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 32px 42px 45px;
  background: rgba(1, 40, 61, 0.9);
  &.full_screen {
    width: 100%;
    height: 100%;
    .popup_content {
      width: calc(100%);
      height: calc(100% - 37px);
    }
  }
}
.popup_border_top {
  position: absolute;
  height: 9px;
  top: 20px;
  left: 30px;
  right: 30px;
  background-image: url('@/assets/images/popup-border-horizontal.png');
  background-size: 100% 100%;
}
.popup_border_right {
  position: absolute;
  width: 10px;
  right: 20px;
  top: 29px;
  bottom: 29px;
  background-image: url('@/assets/images/popup-border-vertical.png');
  background-size: 100% 100%;
}
.popup_border_bottom {
  position: absolute;
  height: 9px;
  bottom: 20px;
  left: 30px;
  right: 30px;
  background-image: url('@/assets/images/popup-border-horizontal.png');
  background-size: 100% 100%;
}
.popup_border_left {
  position: absolute;
  width: 10px;
  left: 20px;
  top: 29px;
  bottom: 29px;
  background-image: url('@/assets/images/popup-border-vertical.png');
  background-size: 100% 100%;
}
.popup_title {
  position: relative;
  width: 100%;
  height: 37px;
  .cube_icon {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 12.5px;
    height: 10px;
    background: #00daff;
  }
  .bottom_line {
    position: absolute;
    left: 17.5px;
    right: 0;
    bottom: 0;
    height: 2px;
    opacity: 0.9898;
    background: #3390e1;
  }
  .background_block {
    position: absolute;
    left: 17.5px;
    right: 0;
    bottom: 7px;
    height: 12px;
    opacity: 0.1443;
    background: #3390e1;
  }
  .title {
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 10px;
  }
  .full_screen_icon {
    position: absolute;
    right: 33px;
    bottom: 12.5px;
    cursor: pointer;
  }
  .close_icon {
    position: absolute;
    right: 1px;
    bottom: 15px;
    cursor: pointer;
  }
}
.popup_content {
  overflow: auto;
  min-width: 500px;
  min-height: 300px;
  width: v-bind(width);
  height: v-bind(height);
}
</style>
