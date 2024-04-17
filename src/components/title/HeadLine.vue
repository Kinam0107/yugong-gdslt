<!-- 头部标题 -->
<template>
  <div class="headline--container">
    <img class="img_bg" :src="headlineBg" />
    <div class="headline_inner">
      <div class="headline_left">
        <slot name="left">
          <span class="time">{{ time }}</span>
        </slot>
      </div>
      <div class="headline_center">
        <slot></slot>
      </div>
      <div class="headline_right">
        <slot name="right">
          <ul class="operate_area">
            <li @click="jump('自建平台')">
              <img :src="cubeIcon" />
              自建平台
            </li>
            <li @click="jump('工程运管')">
              <img :src="cubeIcon" />
              工程运管
            </li>
          </ul>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import headlineBg from '@/assets/images/headline-bg.png'
import cubeIcon from '@/assets/images/cube-fill.png'

const time = ref(new Date().format('yyyy年MM月dd日 HH:mm:ss'))
</script>

<style scoped lang="scss">
.headline--container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(17, 41, 82, 0.7) 0%, rgba(0, 29, 79, 0) 100%);
}
.img_bg,
.headline_inner {
  position: absolute;
  width: 100%;
  height: 100%;
}
.headline_inner {
  display: flex;
  justify-content: space-between;
}
.headline_left {
  flex: 1;
  margin-top: 16px;
  margin-left: 24px;
}
.headline_center {
  margin-top: 6px;
}
.headline_right {
  flex: 1;
  margin-top: 16px;
  margin-right: 24px;
}
.time {
  font-size: 24px;
  font-weight: normal;
  line-height: 29px;
  letter-spacing: 0px;
  color: #ffffff;
}
.operate_area {
  display: flex;
  justify-content: flex-end;
  li {
    display: flex;
    align-items: center;
    height: 36px;
    border-radius: 18px;
    padding: 6px 21px;
    background: rgba(0, 207, 255, 0.2);
    border: 1px solid #00cfff;
    color: #ffffff;
    cursor: pointer;
    img {
      margin-right: 8px;
    }
    + li {
      margin-left: 16px;
    }
    &:hover {
      background: rgba(0, 207, 255, 0.3);
    }
  }
}
</style>
