<template>
  <MenuPlane>
    <el-input v-model="input" placeholder="请输入关键字" class="no-fill" style="margin-bottom: 4px">
      <template #append>
        <el-button :icon="Search" @click="search" />
      </template>
    </el-input>
    <el-tree ref="tree" :data="data" :props="defaultProps" default-expand-all show-checkbox :filter-node-method="filterNode" />
  </MenuPlane>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import MenuPlane from './cpns/MenuPlane.vue'

const input = ref('')
const data = [
  {
    label: 'Level one 1',
    children: [{ label: 'Level two 1-1', children: [{ label: 'Level three 1-1-1' }] }]
  },
  {
    label: 'Level one 2',
    children: [
      { label: 'Level two 2-1', children: [{ label: 'Level three 2-1-1' }] },
      { label: 'Level two 2-2', children: [{ label: 'Level three 2-2-1' }] }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      { label: 'Level two 3-1', children: [{ label: 'Level three 3-1-1' }] },
      { label: 'Level two 3-2', children: [{ label: 'Level three 3-2-1' }] }
    ]
  }
]
const defaultProps = {
  children: 'children',
  label: 'label'
}
const tree = ref(null)
watch(input, (val) => {
  tree.value?.filter(val)
})
const search = () => {
  tree.value?.filter(input.value)
}
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style scoped lang="scss">
.no-fill {
  ::v-deep(.el-input-group__append) {
    background-color: transparent;
    &:hover {
      background-color: transparentize($color-primary, 0.9);
    }
  }
}
.el-tree--highlight-current {
  ::v-deep(.el-tree-node.is-current > .el-tree-node__content) {
    border-right: 0.5 * $baseDistance solid $color-primary;
  }
}
</style>
