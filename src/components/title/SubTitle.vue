<template>
  <div class="subtitle">
    <img :src="subtitleIcon" />
    <span>{{ title }}</span>
    <div class="line"></div>
    <div class="extra">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import subtitleIcon from '@/assets/images/subtitle-icon.png'
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.subtitle {
  display: flex;
  align-items: center;
  width: 100%;
  > img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  > span {
    margin-right: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .line {
    flex: 1;
    height: 1px;
    background-color: #546f9f;
  }
  .extra {
    display: flex;
    gap: 12px;
  }
}
</style>
