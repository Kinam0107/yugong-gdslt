<template>
  <div>
    <div class="label">树选择</div>
    <el-select ref="select" v-model="value" placeholder="请选择" style="width: 100%">
      <template #empty>
        <el-tree style="padding: 6px 0" :data="data" :props="defaultProps" highlight-current default-expand-all @node-click="nodeClick" />
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('选项二')
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
const nodeClick = (node) => {
  value.value = node[defaultProps.label]
  select.value.blur()
}
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.el-tree--highlight-current {
  ::v-deep(.el-tree-node.is-current > .el-tree-node__content) {
    font-weight: bold;
    color: $color-primary;
  }
}
</style>
