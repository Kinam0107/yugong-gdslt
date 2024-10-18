<template>
  <div class="screen-mode">
    <Index isScreen />
  </div>
</template>

<script setup>
import Index from './Index.vue'
</script>

<style lang="scss" scoped>
.screen-mode {
  width: 100%;
  height: 100%;
  background-color: #182436;
  :deep(.main--wrapper) {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: rgba(0, 23, 61, 0.5);
    border: 1px solid rgba(0, 193, 255, 0.5);
    box-shadow: inset 0px 4px 32px 0px rgba(39, 194, 255, 0.6);
    min-width: 400px;
    .main--inner {
      width: auto;
      top: 26px;
      right: 16px;
      bottom: 9px;
      left: 16px;
      padding: 0;
    }
    .mian_title {
      display: none;
    }
    .tip {
      display: none;
    }
    .prompt--wrapper {
      margin-bottom: 22px;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .prompt--inner {
      display: none;
      background: transparent;
      border: none;
      padding: 0;
      &.is_dialogue {
        display: flex;
        backdrop-filter: none;
      }
    }
    .chat_item {
      .dialogue .dialogue_item {
        .role {
          color: #eeeeee;
        }
        .content {
          border-radius: 4px;
          background: rgba(0, 193, 255, 0.2);
          border: 1px solid #00c1ff;
          color: #ffffff;
        }
        .other {
          display: none;
        }
      }
      .self.dialogue .dialogue_item {
        .content {
          background: linear-gradient(90deg, rgba(0, 193, 255, 0.44) 0%, rgba(0, 193, 255, 0) 100%);
        }
      }
    }
    .input--wrapper {
      border-radius: 4px;
      background: rgba(0, 193, 255, 0.1);
      border: 1px solid #00c1ff;
      backdrop-filter: none;
    }
    .toolbar .toolbar_item > span {
      color: #ffffff;
    }
    .toolbar .retract > span {
      color: #ffffff;
    }
    .input--inner {
      height: 56px;
      border-color: #1c5271;
      .el-textarea .el-textarea__inner::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
      .send_btn {
        right: 12px;
        bottom: 8px;
      }
    }
    ul.common_use_tab > li {
      color: #ffffff;
      &.active {
        background: linear-gradient(270deg, #0058ff 0%, #1fdfe5 100%);
        border: none;
        font-weight: 500;
        line-height: 32px;
      }
    }
    ul.commoon_use_list,
    ul.history_list {
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      > li {
        background: linear-gradient(90deg, rgba(0, 193, 255, 0.44) 0%, rgba(0, 193, 255, 0) 100%);
        line-height: 30px;
        color: #ffffff;
        border: 1px solid #00c1ff;
        &::before {
          background: #1cd4e7;
        }
      }
    }
    ul.history_list > li {
      .name {
        line-height: 30px;
        color: #ffffff;
      }
      .time {
        line-height: 30px;
        color: #ffffff;
      }
    }
    .history_filter {
      .el-input__wrapper {
        background: transparent;
      }
      .el-input__inner::placeholder {
        color: #f0f0f0;
      }
    }
  }
}
</style>
