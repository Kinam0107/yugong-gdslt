<template>
  <div class="table_pagination">
    <div class="extra_data">
      <div class="total_data">共{{ props.total }}条数据</div>
      <div class="other_data">
        <slot></slot>
      </div>
    </div>
    <el-pagination
      v-model:current-page="currentPage_"
      v-model:page-size="pageSize_"
      :page-sizes="props.pageSizes"
      :small="props.small"
      :disabled="props.disabled"
      :background="true"
      :layout="layout"
      :total="props.total"
      :pager-count="props.pagerCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  small: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  pagerCount: {
    type: Number,
    default: 5
  }
})

const emits = defineEmits(['update:currentPage', 'update:pageSize', 'change'])

const currentPage_ = computed({
  get() {
    return props.currentPage
  },
  set(value) {
    emits('update:currentPage', value)
  }
})

const pageSize_ = computed({
  get() {
    return props.pageSize
  },
  set(value) {
    emits('update:pageSize', value)
  }
})

const layout = computed(() => {
  return props.total / props.pageSize <= props.pagerCount ? 'prev, pager, next, sizes' : 'prev, pager, next, sizes, jumper'
})

const handleSizeChange = (val) => {
  const maxPage = Math.ceil(props.total / val)
  console.log(currentPage_.value, maxPage)
  if (currentPage_.value > maxPage) {
    emits('update:currentPage', maxPage)
  }
  emits('change')
}
const handleCurrentChange = () => {
  emits('change')
}
</script>

<style scoped lang="scss">
.table_pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  .extra_data {
    display: flex;
    gap: 2 * $baseDistance;
    flex: 1;
    .total_data {
      color: $color-prompttext;
      font-size: 14px;
    }
  }
  ::v-deep(.el-pagination.is-background) {
    .btn-prev,
    .btn-next {
      box-shadow: 0 0 0 1px $color-border inset;
      &:hover:not([disabled]) {
        box-shadow: 0 0 0 1px $color-primary inset;
      }
    }
    .el-pager > .number:not(.is-active) {
      box-shadow: 0 0 0 1px $color-border inset;
      &:hover:not(.is-disabled) {
        box-shadow: 0 0 0 1px $color-primary inset;
      }
    }
  }
}
</style>
