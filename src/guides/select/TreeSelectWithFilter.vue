<template>
  <div>
    <div class="label">树选择单选（带搜索）</div>
    <el-select ref="select" v-model="value" placeholder="请选择" style="width: 100%">
      <template #empty>
        <el-input class="no-fill" v-model="input" placeholder="请输入关键字">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-tree ref="tree" style="padding: 6px 0" :data="data" :props="defaultProps" highlight-current default-expand-all :filter-node-method="filterNode" @node-click="nodeClick" />
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const value = ref('选项二')
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
const nodeClick = (node) => {
  value.value = node[defaultProps.label]
  select.value.blur()
  input.value = ''
}
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.el-tree--highlight-current {
  :deep(.el-tree-node.is-current > .el-tree-node__content) {
    font-weight: bold;
    color: $color-primary;
  }
}
.no-fill {
  padding: 8px 12px;
  :deep(.el-input-group__append) {
    background-color: transparent;
  }
}
</style>
