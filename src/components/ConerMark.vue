<template>
  <div class="coner_mark" :class="[props.position, props.type]" :style="{ backgroundColor: props.color }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  position: {
    type: String,
    default: 'ur',
    validator: (val) => ['ur', 'ul', 'lr', 'll'].includes(val)
  },
  type: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
  },
  color: {
    type: String
  }
})
</script>

<style scoped lang="scss">
.coner_mark {
  position: absolute;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #ffffff;
  padding: 2px $baseDistance;
}
.ur {
  top: 0;
  right: 0;
  border-bottom-left-radius: $baseDistance;
}
.ul {
  top: 0;
  left: 0;
  border-bottom-right-radius: $baseDistance;
}
.lr {
  bottom: 0;
  right: 0;
  border-top-left-radius: $baseDistance;
}
.ll {
  bottom: 0;
  left: 0;
  border-top-right-radius: $baseDistance;
}
.primary {
  background-color: $color-primary;
}
.success {
  background-color: $color-success;
}
.warning {
  background-color: $color-warning;
}
.danger {
  background-color: $color-danger;
}
.info {
  background-color: $color-info;
}
</style>
