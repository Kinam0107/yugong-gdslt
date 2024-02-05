<template>
  <div class="design_description" v-if="desc">
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
  margin-bottom: 5 * $baseDistance;
}
</style>
