<template>
  <div class="anchor_item" :id="props.label" :level="props.level">
    <h4 v-if="level == 1">{{ props.label }}</h4>
    <h5 v-else>{{ props.label }}</h5>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  }
})
</script>

<style scoped lang="scss">
.anchor_item {
  overflow: visible;
  padding: 0;
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
  }
}
.anchor_item--title1 {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #000;
  margin-bottom: 16px;
}
.anchor_item--title2 {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #000;
  margin-bottom: 16px;
}
.anchor_item {
  &:first-child {
    h4 {
      margin-top: 0;
    }
  }
  h4 {
    margin-top: 32px;
    margin-right: 16px;
  }
  h5 {
    margin-top: 24px;
    margin-right: 16px;
  }
}
</style>
