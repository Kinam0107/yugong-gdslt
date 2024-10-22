<template>
  <Index class="mobile-mode" />
</template>

<script setup>
import Index from './Index.vue'
</script>

<style lang="scss">
* {
  font-size: 20px;
}
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
      font-size: 20px;
    }
  }
  .prompt_item {
    width: 100%;
    .content {
      .label {
        font-size: 28px;
      }
      .desc {
        font-size: 20px;
      }
    }
  }
  .chat_item {
    width: calc(100% - 56px);
    .dialogue {
      .dialogue_item {
        .role {
          font-size: 24px;
          font-weight: 500;
          line-height: 28px;
        }
        .content {
          font-size: 20px;
          line-height: 22px;
        }
        .other {
          font-size: 20px;
          line-height: 22px;
        }
      }
    }
  }
  .toolbar {
    .toolbar_item {
      > span {
        font-size: 20px;
        color: #758198;
      }
    }
    .retract {
      > span {
        font-size: 20px;
      }
    }
  }
  ul.common_use_tab {
    > li {
      font-size: 20px;
    }
  }
  ul.commoon_use_list,
  ul.history_list {
    > li {
      font-size: 20px;
      line-height: 32px;
    }
  }
  ul.history_list > li {
    .name {
      font-size: 20px;
    }
    .time {
      font-size: 20px;
    }
  }
  .input--inner {
    .el-textarea {
      :deep(.el-textarea__inner) {
        &::placeholder {
          font-size: 20px;
          color: #758198;
        }
      }
    }
  }
}
</style>
