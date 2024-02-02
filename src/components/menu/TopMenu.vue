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
    .children.filter((e) => e.name)
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
  justify-content: flex-end;
  gap: 5 * $baseDistance;
  height: 100%;
  padding-right: 10 * $baseDistance;
  li {
    height: 100%;
    line-height: 7.5 * $baseDistance;
    font-size: 18px;
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
        background: rgba(9, 63, 153, 0.5);
        &::before {
          content: '';
          position: absolute;
          right: 100%;
          width: 2.5 * $baseDistance;
          height: 100%;
          background: rgba(9, 63, 153, 0.5);
        }
        &::after {
          content: '';
          position: absolute;
          left: 100%;
          width: 2.5 * $baseDistance;
          height: 100%;
          background: rgba(9, 63, 153, 0.5);
        }
      }
    }
  }
}
</style>
