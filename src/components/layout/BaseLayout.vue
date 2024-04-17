<!-- 基础布局 -->
<template>
  <div class="base--layout" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="head--contanier">
      <HeadLine>
        <div class="head_title">
          {{ title }}
          <span class="extra">{{ dataEcho('SKGCGM', scale) }}</span>
        </div>
      </HeadLine>
    </div>
    <div class="body--container">
      <RouterView />
      <ul class="navigation">
        <li :class="{ active: active === '四全' }">
          <span @click="active = '四全'">四全</span>
        </li>
        <li :class="{ active: active === '四制' }">
          <span @click="active = '四制'">四制</span>
        </li>
        <li :class="{ active: active === '四预' }">
          <span @click="active = '四预'">四预</span>
        </li>
        <li :class="{ active: active === '四管' }">
          <span @click="active = '四管'">四管</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import HeadLine from '@/components/title/HeadLine.vue'
import { dataEcho } from '@/utils/enum'
import tempImg from '@/assets/images/reservoir-image-temp.jpg'

const router = useRouter()

const title = ref('横棉水库')
const scale = ref('2')
const bgImg = ref(tempImg)
const active = ref('四全')
watch(
  () => active.value,
  (val) => {
    if (val === '四全') {
      router.replace('/siquan')
    } else if (val === '四制') {
      router.replace('/sizhi')
    } else if (val === '四预') {
      router.replace('/siyu')
    } else if (val === '四管') {
      router.replace('/siguan')
    }
  }
)
</script>

<style scoped lang="scss">
$headHight: 108px;
.base--layout {
  height: 100%;
  background-size: cover;
}
.head--contanier {
  height: $headHight;
}
.body--container {
  position: relative;
  overflow: auto;
  height: calc(100% - $headHight);
}
.head_title {
  position: relative;
  font-family: YouSheBiaoTiHei;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: 3px;
  color: #ffffff;
  .extra {
    position: absolute;
    left: calc(100% + 12.5px);
    bottom: 11px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: 3px;
    color: #ffffff;
    text-wrap: nowrap;
  }
}
ul.navigation {
  position: absolute;
  display: flex;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  > li {
    width: 169px;
    height: 75px;
    background-image: url('../../assets/images/nav-item-bg.png');
    padding-top: 15px;
    opacity: 0.57;
    + li {
      margin-left: 20px;
    }
    &.active {
      opacity: 1;
    }
    > span {
      display: inline-block;
      width: 100%;
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
