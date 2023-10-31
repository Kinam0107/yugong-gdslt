<!-- 侧边导航栏 -->
<template>
  <div :class="[{ is_dark: dark }, 'side_nav']">
    <div class="menu">
      <SideMenu :hiddenIcon="props.hiddenIcon" :collapse="collapse" :dark="props.dark" />
    </div>
    <div class="foot_menu" @click="collapse = !collapse" :class="[!collapse ? 'expand' : 'flod']">
      <el-icon :size="16" class="icon">
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import SideMenu from '../menu/SideMenu.vue'

const props = defineProps({
  hiddenIcon: {
    type: Boolean,
    default: false
  },
  expandFlag: {
    type: Boolean,
    default: true
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const collapse = ref(!props.expandFlag)
</script>

<style scoped lang="scss">
.side_nav {
  height: 100%;
  .menu {
    overflow: auto;
    height: calc(100% - 40px);
  }
  .foot_menu {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-top: 1px solid $color-separator;
    cursor: pointer;
    .icon {
      color: $color-titletext;
    }
    &.expand i {
      margin-left: 3 * $baseDistance;
    }
    &.flod {
      justify-content: center;
    }
  }
}
.side_nav.is_dark {
  background-color: $color-titletext;
  .foot_menu {
    border-top: 1px solid #464646;
    cursor: pointer;
    .icon {
      color: white;
    }
    &.expand i {
      margin-left: 3 * $baseDistance;
    }
    &.flod {
      justify-content: center;
    }
  }
}
</style>
