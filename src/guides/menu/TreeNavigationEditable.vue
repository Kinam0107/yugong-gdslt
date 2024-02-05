<template>
  <MenuPlane>
    <el-tree :data="data" :props="defaultProps" highlight-current default-expand-all>
      <template #default="{ node, data }">
        <span :class="{ 'custom-tree-node-hastips': data.tips }">
          <span class="node-content">
            <span>{{ node.label }}</span>
            <span class="tips">{{ data.tips }}</span>
          </span>
          <template v-if="data.tips">
            <SvgIcon :size="16" icon="edit" />
          </template>
        </span>
      </template>
    </el-tree>
  </MenuPlane>
</template>

<script setup>
import MenuPlane from './cpns/MenuPlane.vue'

const data = [
  {
    label: 'Level one 1',
    children: [{ label: 'Level two 1-1', children: [{ label: 'Level three 1-1-1' }] }]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            tips: '0000000000000',
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
.el-tree {
  ::v-deep(.el-tree-node > .el-tree-node__content) {
    height: auto;
    padding: 4px 0;
  }
}
.el-tree--highlight-current {
  ::v-deep(.el-tree-node.is-current > .el-tree-node__content) {
    border-right: 0.5 * $baseDistance solid $color-primary;
    .custom-tree-node-hastips {
      padding-right: 2.5 * $baseDistance;
    }
  }
}
.custom-tree-node-hastips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-right: 3 * $baseDistance;
  height: 52px;
  .node-content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    .tips {
      color: $color-prompttext;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
