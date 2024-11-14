<template>
  <div class="category_title">
    <img class="icon" src="@/assets/images/categoryTitleIcon.png" />
    <ul v-if="tabs.length">
      <li class="tab" v-for="tab in tabs" :key="tab" :class="{ active: props.modelValue === tab }" @click="changeTab(tab)">
        {{ tab }}
      </li>
    </ul>
    <span class="tab active" v-else>{{ props.modelValue }}</span>
    <i class="line"></i>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['update:modelValue', 'change'])

const changeTab = (val) => {
  emits('update:modelValue', val)
  emits('change', val)
}
</script>

<style scoped lang="scss">
.category_title {
  display: flex;
  align-items: center;
  .icon {
    width: 13px;
    height: 22px;
    margin-right: 10px;
  }
  ul {
    display: flex;
    gap: 16px;
    li {
      cursor: pointer;
    }
  }
  .tab {
    font-family: PangMenZhengDao;
    font-size: 16px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.6);
    &.active {
      font-size: 20px;
      color: #ffffff;
    }
  }
  .line {
    margin-left: 16px;
    flex: 1;
    height: 1px;
    background-color: #4dafff;
  }
}
</style>
