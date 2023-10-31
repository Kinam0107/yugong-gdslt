<template>
  <div class="anchor" ref="scrollWrap" @mousewheel="mousewheel">
    <div class="anchor_content clearfix" ref="anchor">
      <slot></slot>
    </div>
    <ul class="nav">
      <li v-for="nav in navData" :class="['level' + nav.level, { active: navPosi === nav.label }]" :key="nav.label" @click="jump(nav.label)">
        {{ nav.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount, nextTick, useSlots, onMounted } from 'vue'

const props = defineProps({
  activeLabel: String
})

const navPosi = ref('')
const navData = reactive([])
let scrollWrap = ref(null)
let posDataArr = []
let jumpClick = false

onMounted(() => {
  useSlots()
    .default()
    .map((item) => {
      navData.push({
        label: item.props.label,
        level: item.props.level || 1
      })
    })

  navPosi.value = props.activeLabel

  nextTick(() => {
    scrollWrap.value.addEventListener('scroll', scroll)
    navData.forEach((e) => {
      posDataArr.push({
        id: e.label,
        offsetTop: document.getElementById(e.label).offsetTop
      })
    })
    if (props.activeLabel) jump(props.activeLabel)
  })
})

function jump(target) {
  scrollWrap.value.removeEventListener('scroll', scroll)
  jumpClick = true
  navPosi.value = target
  document.getElementById(target).scrollIntoView({ behavior: 'smooth' })
}

function mousewheel() {
  if (jumpClick) {
    scrollWrap.value.addEventListener('scroll', scroll)
    jumpClick = false
  }
}

function scroll() {
  const scrollTop = scrollWrap.value.scrollTop
  posDataArr.forEach((item) => {
    if (scrollTop - item.offsetTop >= 0) {
      navPosi.value = item.id
      return
    }
  })
}

onBeforeUnmount(() => {
  scrollWrap.value.removeEventListener('scroll', scroll)
})
</script>

<style scoped lang="scss">
.anchor {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
}
.anchor_content {
  float: left;
  width: calc(100% - 20 * $baseDistance);
  padding-right: 8px;
}
ul.nav {
  float: left;
  position: sticky;
  top: 0;
  width: 20 * $baseDistance;
  border-left: 1px solid $color-border;
  li {
    position: relative;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    color: $color-titletext;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
    &.level1 {
      padding-left: 2 * $baseDistance;
    }
    &.level2 {
      padding-left: 4 * $baseDistance;
    }
    &.active {
      color: $color-primary;
    }
    &.active::before {
      content: '';
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: $color-primary;
    }
  }
}
</style>
