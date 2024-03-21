<template>
  <div class="page_header" :style="{ 'padding-bottom': props.tab ? '0' : '', 'border-bottom': props.crumb && !props.title && !props.tab ? 'none' : '' }">
    <div v-if="props.crumb" class="crumb_wrapper">
      <div v-if="!props.title && props.back" class="back_btn" @click="emits('back')">
        <SvgIcon :size="16" icon="arrow" />
      </div>
      <slot name="crumb"></slot>
    </div>
    <div v-if="props.title" class="page_info_wrapper">
      <div v-if="props.back" class="back_btn" @click="emits('back')">
        <SvgIcon :size="16" icon="arrow" />
      </div>
      <div class="page_name" :class="{ small: props.small }">
        <slot></slot>
      </div>
      <div class="button_group">
        <slot name="btn"></slot>
      </div>
    </div>
    <div v-if="props.tab" class="tabs_wrapper">
      <slot name="tab"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  crumb: {
    type: Boolean,
    default: false
  },
  title: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  back: {
    type: Boolean,
    default: false
  },
  tab: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['back'])
</script>

<style scoped lang="scss">
.page_header {
  display: flex;
  flex-direction: column;
  gap: 2 * $baseDistance;
  padding: 3 * $baseDistance;
  border-bottom: 1px solid $color-separator;
}
.crumb_wrapper {
  display: flex;
  gap: 2 * $baseDistance;
  align-items: center;
  :deep(.el-breadcrumb) {
    .el-breadcrumb__item {
      > span {
        color: $color-prompttext;
        font-weight: normal;
      }
      &:last-child > span {
        color: $color-titletext;
      }
    }
  }
}
.back_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.page_info_wrapper {
  display: flex;
  gap: 2 * $baseDistance;
  .page_name {
    flex: 1;
    color: $color-titletext;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    &.small {
      font-size: 20px;
    }
  }
}
.tabs_wrapper {
  padding-top: 0.5 * $baseDistance;
}
</style>
