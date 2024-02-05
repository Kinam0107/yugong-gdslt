<template>
  <div class="design_description" v-if="desc">
    {{ desc }}
  </div>
  <div class="design_example" v-if="hasExp">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  desc: String,
  hasExp: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
.design_description {
  @include fontCategory(4);
  margin-bottom: 3 * $baseDistance;
}
.design_example {
  padding: 3 * $baseDistance;
  margin-bottom: 5 * $baseDistance;
  background-color: #f8f9fb;
  .inner {
    padding: 2 * $baseDistance;
    background-color: #fff;
  }
}
</style>
