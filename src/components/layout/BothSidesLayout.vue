<template>
  <div class="both_sides left_side--container">
    <slot name="left"></slot>
  </div>
  <div class="both_sides right_side--container">
    <slot name="right"></slot>
  </div>
</template>

<style scoped lang="scss">
.both_sides {
  overflow: auto;
  position: absolute;
  height: 100%;
  width: 488px;
  background: linear-gradient(270deg, rgba(37, 74, 129, 0.7) 0%, rgba(10, 29, 56, 0.7) 100%);
}
.left_side--container {
  left: 0;
}
.right_side--container {
  right: 0;
}
</style>
