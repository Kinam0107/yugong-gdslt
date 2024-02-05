<template>
  <div>
    <div class="label">树选择（带搜索）</div>
    <el-select ref="select" multiple v-model="value" placeholder="请选择" style="width: 100%">
      <template #empty>
        <el-input class="no-fill" v-model="input" placeholder="请输入关键字">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-tree ref="tree" style="padding: 6px 0" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" show-checkbox @check="check" />
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

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
</style>
