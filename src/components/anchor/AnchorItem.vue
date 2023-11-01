<template>
  <div class="anchor_item" :id="props.label" :level="props.level">
    <div :class="['anchor_item_label', 'level_' + props.level]">{{ props.label }}</div>
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
  padding: 0;
  margin: 0;
}
.anchor_item_label {
  padding: $baseDistance 0;
  margin-bottom: $baseDistance;
}
.level_1 {
  @include fontCategory(1);
}
.level_2 {
  @include fontCategory(2);
}
.level_3 {
  @include fontCategory(3);
}
.level_4 {
  @include fontCategory(4);
}
.level_5 {
  @include fontCategory(5);
}
</style>
