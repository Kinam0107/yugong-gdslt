<template>
  <Index class="mobile-mode" />
</template>

<script setup>
import Index from './Index.vue'
</script>

<style lang="scss">
.mobile-mode {
  &.main--wrapper {
    min-width: auto;
  }
  .main--inner {
    width: 81.6%;
  }
  .mian_title {
    > h1 {
      font-size: 40px;
    }
  }
  .tip {
    font-size: 20px;
  }
  .prompt--inner {
    .hint {
      font-size: 18px;
    }
  }
  .prompt_item {
    width: 100%;
    .content {
      .label {
        font-size: 22px;
      }
      .desc {
        font-size: 18px;
      }
    }
  }
  .chat_item {
    width: calc(100% - 56px);
  }
}
</style>
