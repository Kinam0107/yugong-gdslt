<template>
  <div class="main_title">
    <span>{{ title }}</span>
    <div class="extra">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.main_title {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  > span {
    margin-left: 32px;
    font-family: YouSheBiaoTiHei;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
    z-index: 1;
  }
  .extra {
    display: flex;
    gap: 12px;
    margin-right: 32px;
    height: 24px;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 20px;
    bottom: 0;
    left: 10px;
    right: 10px;
    background-image: linear-gradient(90deg, #205788 2%, rgba(46, 119, 184, 0.1) 96%);
    transform: skew(-45deg);
    z-index: 0;
  }
}
</style>
