<!-- 顶部菜单 -->
<template>
  <ul class="top_menu">
    <RouterLink v-for="item in menuList" :key="item.name" :to="{ name: item.name }" custom v-slot="{ isActive, navigate }">
      <li :class="[{ active: isActive || manualSetupActive === item.name }, props.selectedStyle]" @click="navigate" role="link">
        {{ item.title }}
      </li>
    </RouterLink>
  </ul>
</template>

<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useMaintainMenuSelection } from '@/composables/togglePage'
const router = useRouter()

const props = defineProps({
  selectedStyle: {
    type: String,
    default: 'default'
  }
})

const manualSetupActive = ref()
const setActive = () => {
  const { getActive } = useMaintainMenuSelection()
  manualSetupActive.value = getActive()
}
watch(
  () => router.currentRoute.value,
  () => {
    nextTick(() => {
      setActive()
    })
  },
  { immediate: true }
)

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
  justify-content: flex-end;
  gap: 4 * $baseDistance;
  height: 100%;
  padding: 0 14.5 * $baseDistance;
  li {
    flex-shrink: 0;
    height: 100%;
    padding: 0 2 * $baseDistance;
    line-height: 10 * $baseDistance;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    vertical-align: middle;
    text-decoration: none;
    cursor: pointer;
    &.active {
      color: #fff;
      border-bottom: 4px solid #fff;
      &.deepbackground {
        position: relative;
        border: none;
        background: rgba(0, 82, 192, 0.5);
        &::after {
          content: '';
          position: absolute;
          left: 2 * $baseDistance;
          right: 2 * $baseDistance;
          bottom: 0.5 * $baseDistance;
          height: 3px;
          border-radius: 1.5px;
          background: #ffffff;
        }
      }
    }
  }
}
</style>
