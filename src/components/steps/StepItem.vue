<template>
  <div
    class="stype_item"
    :class="[
      stepProps.finishStatus,
      {
        finally: stepProps.active > props.index,
        active: stepProps.active == props.index
      }
    ]">
    <template v-if="stepProps.type !== 'simple'">
      <div class="order">
        <div class="circle">
          <template v-if="stepProps.active > props.index">
            <el-icon class="select"><Select /></el-icon>
          </template>
          <template v-else>
            {{ props.index + 1 }}
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="point_wrapper"
        :class="{
          first: props.index === 0,
          last: props.index === stepProps.length - 1
        }">
        <div class="point_inner"></div>
      </div>
    </template>
    <div class="split_line" v-if="stepProps.type === 'titleBelow'"></div>
    <div class="content" :class="{ simple: stepProps.type === 'simple' }">
      <div class="title">
        <span>{{ props.title }}</span>
        <div class="line" v-if="stepProps.type === ''"></div>
      </div>
      <div class="description" :class="{ vertical: stepProps.type === 'vertical' }">{{ props.description }}</div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { Select } from '@element-plus/icons-vue'

const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const stepProps = inject('stepBarProps')
</script>

<style scoped lang="scss">
.stype_item {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &.active {
    .order {
      border: 1px solid $color-primary;
      .circle {
        background-color: $color-primary;
      }
    }
    .point_wrapper {
      .point_inner {
        background-color: $color-primary;
        outline: 1px solid $color-primary;
      }
      &::before {
        background-color: $color-primary;
      }
    }
    .content {
      .title {
        color: $color-titletext;
        font-weight: 500;
        .line {
          background-color: $color-primary;
        }
      }
      .description {
        color: $color-titletext;
      }
    }
  }
  &.finally {
    .split_line::before {
      background-color: $color-primary;
    }
    .order {
      .circle {
        background-color: $color-primary;
      }
    }
    .point_wrapper {
      .point_inner {
        background-color: $color-primary;
      }
      &::before {
        background-color: $color-primary;
      }
      &::after {
        background-color: $color-primary;
      }
    }
    .content {
      .title {
        color: $color-titletext;
        .line {
          background-color: $color-primary;
        }
      }
      .description {
        &.vertical::before {
          background-color: $color-primary;
        }
      }
    }
  }
  &.active.error {
    .order {
      border: 1px solid $color-error;
      .circle {
        background-color: $color-error;
      }
    }
    .content {
      .title {
        color: $color-error;
      }
      .description {
        color: $color-error;
      }
    }
  }
}
.order {
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 4px;
  border-radius: 50%;
  .circle {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: $color-placeholdertext;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    .select {
      transform: translateY(3px);
    }
  }
}
.point_wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  .point_inner {
    width: 8px;
    height: 8px;
    background-color: $color-placeholdertext;
    border-radius: 50%;
  }
  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background-color: $color-placeholdertext;
  }
  &.first::before {
    height: 0;
  }
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: $color-placeholdertext;
  }
  &.last::after {
    height: 0;
  }
}
.split_line {
  position: relative;
  width: calc(100% - 36px);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 1px;
    transform: translateY(-50%);
    background-color: $color-placeholdertext;
  }
}
.content {
  flex: 1;
  .title {
    display: flex;
    gap: 4px;
    align-items: center;
    color: $color-placeholdertext;
    font-size: 14px;
    line-height: 22px;
    margin: 5px 0;
    .line {
      flex: 1;
      height: 1px;
      background-color: $color-placeholdertext;
    }
  }
  .description {
    color: $color-placeholdertext;
    font-size: 12px;
    line-height: 20px;
    &.vertical {
      position: relative;
      padding-bottom: 15px;
      &::before {
        content: '';
        position: absolute;
        left: -20px;
        top: 4px;
        bottom: 0;
        width: 1px;
        background-color: $color-placeholdertext;
      }
    }
  }
  &.simple {
    .title > span {
      width: 100%;
      text-align: center;
      padding: 0 4px;
    }
    .description {
      width: 100%;
      text-align: center;
      padding: 0 4px;
    }
  }
}
</style>
