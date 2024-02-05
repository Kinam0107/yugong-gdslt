<template>
  <MenuPlane>
    <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all>
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <template v-if="data.status === 'success'">
            <el-icon class="success_filled">
              <SuccessFilled />
            </el-icon>
          </template>
          <template v-else-if="data.status === 'warning'">
            <el-icon class="warning_filled">
              <WarningFilled />
            </el-icon>
          </template>
        </span>
      </template>
    </el-tree>
  </MenuPlane>
</template>

<script setup>
import { SuccessFilled, WarningFilled } from '@element-plus/icons-vue'
import MenuPlane from './cpns/MenuPlane.vue'

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            status: 'success',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            status: 'warning',
            label: 'Level three 2-1-1'
          }
        ]
      },
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
</script>

<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-right: 3 * $baseDistance;
}
.success_filled {
  font-size: 16px;
  color: $color-success;
}
.warning_filled {
  font-size: 16px;
  color: $color-warning;
}
.el-tree--highlight-current {
  ::v-deep(.el-tree-node.is-current > .el-tree-node__content) {
    border-right: 0.5 * $baseDistance solid $color-primary;
    .custom-tree-node {
      padding-right: 2.5 * $baseDistance;
    }
  }
}
</style>
