<template>
  <slot></slot>
  <div class="top-side--wrapper"></div>
  <div class="bottom-side--wrapper"></div>
  <div v-if="!props.hiddenLeft" class="left-side--wrapper">
    <div class="left-side--inner">
      <slot name="left"></slot>
    </div>
  </div>
  <div v-if="!props.hiddenRight" class="right-side--wrapper">
    <div class="right-side--inner">
      <slot name="right"></slot>
    </div>
  </div>
  <slot name="cover"></slot>
</template>

<script setup>
const props = defineProps({
  hiddenLeft: {
    type: Boolean,
    default: false
  },
  hiddenRight: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.top-side--wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 160px;
  background-image: linear-gradient(0deg, rgba(0, 15, 31, 0) 0%, #000f1f 99%, #000f1f 100%);
}
.bottom-side--wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  background-image: linear-gradient(180deg, rgba(0, 15, 31, 0) 0%, #000f1f 99%, #000f1f 100%);
}
.left-side--wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 500px;
  background-image: linear-gradient(-90deg, rgba(0, 15, 31, 0) 0%, rgba(0, 15, 31, 0.5) 10%, #000f1f 100%);
}
.left-side--inner {
  position: absolute;
  top: 88px;
  right: 27px;
  bottom: 16px;
  left: 17px;
  border: 1px solid rgba(133, 243, 255, 0.3);
  border-radius: 2px;
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
}
.right-side--wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  background-image: linear-gradient(90deg, rgba(0, 15, 31, 0) 0%, rgba(0, 15, 31, 0.5) 10%, #000f1f 100%);
}
.right-side--inner {
  position: absolute;
  top: 88px;
  right: 17px;
  bottom: 16px;
  left: 27px;
  border: 1px solid rgba(133, 243, 255, 0.3);
  border-radius: 2px;
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
}
:deep(> .section_title) {
  margin-right: -1px;
  margin-left: -1px;
  height: 40px;
  padding: 5px 0 0 40px;
  background-image: url(@/assets/images/sectionTitleBg.png);
  font-family: PangMenZhengDao;
  font-size: 20px;
  line-height: 24px;
  &:first-child {
    margin-top: -1px;
  }
}
</style>
