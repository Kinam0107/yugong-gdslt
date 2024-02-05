<template>
  <TypefacePlane>
    <div class="item">
      <div class="label">普通文字：</div>
      <div class="value normal">设计系统</div>
    </div>
    <div class="item">
      <div class="label">加粗文字：</div>
      <div class="value weight">设计系统</div>
    </div>
    <div class="item">
      <div class="label">禁用文字：</div>
      <div class="value disable">设计系统</div>
    </div>
    <div class="item">
      <div class="label">带下划线：</div>
      <div class="value underline">设计系统</div>
    </div>
    <div class="item">
      <div class="label">带删除线：</div>
      <div class="value deleteline">设计系统</div>
    </div>
    <div class="item">
      <div class="label">带颜色底：</div>
      <div class="value bgcolor">设计系统</div>
    </div>
    <div class="item">
      <div class="label">链接文字：</div>
      <div class="value link">设计系统</div>
    </div>
    <div class="item">
      <div class="label">链接文字悬浮：</div>
      <div class="value hover">设计系统</div>
    </div>
  </TypefacePlane>
</template>

<script setup>
import TypefacePlane from './cpns/TypefacePlane.vue'
</script>

<style scoped lang="scss">
.item {
  display: flex;
  gap: 4 * $baseDistance;
  .label {
    width: 100px;
    color: $color-titletext;
    @include fontCategory();
  }
  .value {
    @include fontCategory();
    &.normal {
      font-style: normal;
    }
    &.weight {
      font-weight: 500;
    }
    &.disable {
      color: $color-disabletext;
      cursor: not-allowed;
    }
    &.underline {
      text-decoration-line: underline;
    }
    &.deleteline {
      text-decoration-line: line-through;
    }
    &.bgcolor {
      background-color: #ebf8f6;
    }
    &.link {
      color: $color-primary;
      cursor: pointer;
    }
    &.hover {
      color: $color-primary;
      text-decoration-line: underline;
      cursor: pointer;
    }
  }
}
</style>
