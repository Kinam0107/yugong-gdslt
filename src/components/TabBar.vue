<template>
  <ul class="tab_bar" :class="props.type">
    <li v-for="tab in props.tabs" :key="tab" :class="{ active: props.modelValue === tab, disabled: props.disabled.includes(tab) }" @click="change(tab, props.disabled.includes(tab))">
      {{ tab }}
      <el-icon v-if="enableOperation && props.tabs.length > 1" class="close_icon" @click.stop="closeTag(tab)">
        <Close />
      </el-icon>
    </li>
    <el-popover v-if="enableOperation && props.added" :visible="visible" placement="bottom-end" trigger="click" :width="300">
      <template #reference>
        <li @click="visible = true">
          <el-icon class="add_icon">
            <Plus />
          </el-icon>
        </li>
      </template>
      <el-input v-model="toBeAddedTab" size="small" class="tab_input" placeholder="请输入标签页名称"></el-input>
      <el-button size="small" plain @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="confirm">确认</el-button>
    </el-popover>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Close, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'default'
  },
  deletable: {
    type: Boolean,
    default: false
  },
  added: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue', 'update:tabs'])

const enableOperation = computed(() => {
  return props.type === 'card' && props.deletable
})

function change(tab, disabled) {
  if (!disabled) {
    emits('update:modelValue', tab)
  }
}

function closeTag(tab) {
  if (tab === props.modelValue) {
    let index = props.tabs.findIndex((e) => e === props.modelValue)
    if (index === props.tabs.length - 1) index--
    const tabs_ = props.tabs.filter((e) => e !== tab)
    const tab_ = tabs_[index]
    emits('update:tabs', tabs_)
    emits('update:modelValue', tab_)
  } else {
    const tabs_ = props.tabs.filter((e) => e !== tab)
    emits('update:tabs', tabs_)
  }
}

const visible = ref(false)
const toBeAddedTab = ref('')
function confirm() {
  if (!toBeAddedTab.value) {
    ElMessage.error('标签名不能为空！')
    return
  }
  if (props.tabs.includes(toBeAddedTab.value)) {
    ElMessage.error('标签名重复，请重新输入！')
    return
  }
  const tabs_ = props.tabs.concat(toBeAddedTab.value)
  toBeAddedTab.value = ''
  emits('update:tabs', tabs_)
  visible.value = false
}
</script>

<style scoped lang="scss">
ul.tab_bar {
  display: flex;
  gap: 4 * $baseDistance;
  li {
    color: $color-titletext;
    font-size: 14px;
    line-height: 48px;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
    &.active {
      position: relative;
      color: $color-primary;
      font-weight: 500;
      &::before {
        content: '';
        position: absolute;
        height: 3px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $color-primary;
      }
    }
    &.disabled {
      color: $color-disabletext !important;
      cursor: not-allowed !important;
    }
  }
}
ul.tab_bar.card {
  gap: $baseDistance;
  li {
    overflow: hidden;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #fff;
    padding: 0 2 * $baseDistance;
    &:hover .close_icon {
      color: $color-primary;
    }
    &:hover .add_icon {
      color: $color-primary;
    }
    &.active::before {
      height: 4px;
      top: 0;
      bottom: auto;
    }
    &.active .close_icon {
      color: $color-primary;
    }
  }
}
ul.tab_bar.fill,
ul.tab_bar.no-fill {
  gap: 0;
  li {
    line-height: 30px;
    padding: 0 2 * $baseDistance;
    border: 1px solid $color-border;
    z-index: 0;
    + li {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.active {
      border-color: $color-primary;
      z-index: 1;
      &::before {
        height: 0;
      }
    }
  }
}
ul.tab_bar.fill li.active {
  color: #fff;
  background-color: $color-primary;
}
.close_icon {
  color: $color-prompttext;
  font-size: 16px;
  margin-left: $baseDistance;
  vertical-align: middle;
}
.add_icon {
  color: $color-prompttext;
  font-size: 16px;
  vertical-align: middle;
}
.tab_input {
  width: 136px;
  margin-right: $baseDistance;
}
</style>
