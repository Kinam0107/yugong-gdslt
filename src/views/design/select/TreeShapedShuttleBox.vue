<template>
  <div>
    <div class="label">树状穿梭框</div>
    <el-select ref="select" multiple v-model="value" placeholder="请选择" style="width: 100%">
      <template #empty>
        <div style="display: flex">
          <div class="left_tree_panel">
            <el-input class="no-fill" v-model="input" placeholder="请输入关键字">
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <el-tree ref="tree" style="padding: 6px 0" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" show-checkbox @check="check" />
          </div>
          <div class="divider"></div>
          <div class="right_selected">
            <div class="number">已选择{{ value.length }}项</div>
            <ul class="selected_items">
              <li class="selected_item" v-for="item in value" :key="item">
                <span class="selected_content">
                  <span class="selected_label">{{ item }}</span>
                  <el-icon class="remove_icon" @click="remove(item)"><CircleCloseFilled /></el-icon>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search, CircleCloseFilled } from '@element-plus/icons-vue'

const value = ref(['选项二', '选项三'])
const input = ref('')
const data = [
  {
    label: '一级目录',
    children: [{ label: '选项一' }, { label: '选项二' }, { label: '选项三' }]
  },
  { label: '二级目录' },
  { label: '三级目录' },
  { label: '四级目录' }
]
const defaultProps = {
  children: 'children',
  label: 'label'
}
const select = ref(null)
const tree = ref(null)
watch(input, (val) => {
  tree.value?.filter(val)
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
const check = () => {
  value.value = tree.value.getCheckedNodes().map((e) => e.label)
}
const remove = (item) => {
  value.value = value.value.filter((e) => item !== e)
}
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.no-fill {
  padding: 8px 12px;
  ::v-deep(.el-input-group__append) {
    background-color: transparent;
  }
}
.left_tree_panel {
  width: 50%;
}
.divider {
  position: absolute;
  top: 8px;
  bottom: 8px;
  width: 1px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $color-separator;
}
.right_selected {
  width: 50%;
  padding: 8px 12px;
  .number {
    color: $color-titletext;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 8px;
  }
  .selected_items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .selected_item {
    display: flex;
  }
  .selected_content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding: 1px 8px;
    background: rgba(54, 178, 158, 0.1);
    border-radius: 4px;
  }
  .remove_icon {
    color: #bfbfbf;
    cursor: pointer;
  }
}
</style>
