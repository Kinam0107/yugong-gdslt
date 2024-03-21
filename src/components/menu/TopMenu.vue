<!-- 顶部菜单 -->
<template>
  <ul class="top_menu">
    <RouterLink v-for="item in menuList" :key="item.name" :to="{ name: item.name }" custom v-slot="{ isActive, navigate }">
      <li :class="[{ active: isActive }, props.selectedStyle]" @click="navigate" role="link">{{ item.title }}</li>
    </RouterLink>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const props = defineProps({
  selectedStyle: {
    type: String,
    default: 'default'
  }
})

const router = useRouter()
const menuList = reactive(
  router
    .getRoutes()
    .find((e) => e.name === 'root')
    .children.filter((e) => !e.meta.nonMenu)
    .map((e) => {
      return {
        name: e.name,
        title: e.meta.title || '-'
      }
    })
)
</script>

<style scoped lang="scss">
.top_menu {
  display: flex;
  gap: 6 * $baseDistance;
  height: 100%;
  padding: 0 7 * $baseDistance;
  li {
    height: 100%;
    line-height: 7 * $baseDistance;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    vertical-align: middle;
    text-decoration: none;
    cursor: pointer;
    &.active {
      color: #fff;
      border-bottom: 4px solid #fff;
      &.deepbackground {
        position: relative;
        border: none;
        background: rgba(0, 0, 0, 0.2);
        &::before {
          content: '';
          position: absolute;
          right: 100%;
          width: 3 * $baseDistance;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }
        &::after {
          content: '';
          position: absolute;
          left: 100%;
          width: 3 * $baseDistance;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
