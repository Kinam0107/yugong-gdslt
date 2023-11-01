<template>
  <div class="design_description">
    {{ desc }}
  </div>
  <div class="design_example">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  desc: String
})
</script>

<style scoped lang="scss">
.design_description {
  @include fontCategory(4);
  margin-bottom: 3 * $baseDistance;
}
.design_example {
  display: flex;
  flex-wrap: wrap;
  row-gap: 3 * $baseDistance;
  margin-bottom: 5 * $baseDistance;
}
</style>
