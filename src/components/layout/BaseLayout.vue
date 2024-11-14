<!-- 基础布局 -->
<template>
  <div class="base--layout" id="screen">
    <div class="head--contanier">
      <div class="locate">
        <SvgIcon :size="24" icon="locate" />
        <span>义乌市</span>
      </div>
      <div class="title">义乌市现代化水库运管矩阵</div>
      <div class="user">
        <img class="avatar" src="@/assets/images/avatar.png" />
        <span>管理员</span>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
    <div class="navigation left">
      <div class="nav_item" :class="{ active: activeNav === '要素管控' }" @click="switchScreen('/elementControl')">要素管控</div>
      <div class="nav_item" :class="{ active: activeNav === '水库智护' }" @click="switchScreen('/intelligentProtection')">水库智护</div>
    </div>
    <div class="navigation right">
      <div class="nav_item" :class="{ active: activeNav === '协同管控' }" @click="switchScreen('/collaborativeControl')">协同管控</div>
      <div class="nav_item" :class="{ active: activeNav === '预报预警' }" @click="switchScreen('/forecastWarning')">预报预警</div>
    </div>
    <div class="body--container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import globalConfig from '@/config.js'

const width = globalConfig.designDraftWidth
const height = globalConfig.designDraftHeight
const _width = computed(() => width + 'px')
const _height = computed(() => height + 'px')
const handleScreenAuto = () => {
  document.querySelector('#screen').style.transform = `scale(${
    document.documentElement.clientWidth / document.documentElement.clientHeight < width / height ? document.documentElement.clientWidth / width : document.documentElement.clientHeight / height
  }) translate(-50%, -50%)`
}
onMounted(() => {
  handleScreenAuto()
  window.onresize = () => handleScreenAuto()
})
onUnmounted(() => {
  window.onresize = null
})

const route = useRoute()
const router = useRouter()
const activeNav = computed(() => {
  return route.meta.title
})
const switchScreen = (path) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
.base--layout {
  position: absolute;
  display: inline-block;
  width: v-bind(_width);
  height: v-bind(_height);
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
}
.head--contanier {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100px;
  background-image: url(@/assets/images/topBg.png);
  z-index: 1;
  .locate {
    position: absolute;
    top: 16px;
    left: 32px;
    display: flex;
    align-items: center;
    gap: 8px;
    > span {
      font-size: 20px;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: PangMenZhengDao;
    font-size: 48px;
    line-height: 66px;
    text-shadow: 0px 3px 0px #3258a6;
  }
  .user {
    position: absolute;
    top: 10px;
    right: 32px;
    display: flex;
    align-items: center;
    gap: 8px;
    .avatar {
      width: 36px;
      height: 36px;
    }
    > span {
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 1.5px;
    }
  }
}
.navigation {
  position: absolute;
  top: 8px;
  display: flex;
  gap: 4px;
  z-index: 1;
  .nav_item {
    width: 138px;
    height: 40px;
    background-size: 100% 100%;
    font-family: YouSheBiaoTiHei;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 1.37px;
    cursor: pointer;
    &.active {
      color: #ffcb27;
    }
  }
  &.left {
    left: 200px;
    .nav_item {
      background-image: url(@/assets/images/navBg.png);
    }
    &.active {
      background-image: url(@/assets/images/navActiveBg.png);
    }
  }
  &.right {
    right: 200px;
    .nav_item {
      background-image: url(@/assets/images/navBg2.png);
    }
    &.active {
      background-image: url(@/assets/images/navActiveBg2.png);
    }
  }
}
.body--container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
