<template>
  <div class="pagination_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <PaginationPlane desc="当加载/渲染所有数据将花费很多时间时使用，可切换页码浏览数据。" :hasExp="false" />
      </AnchorItem>
      <AnchorItem label="基础样式"></AnchorItem>
      <AnchorItem label="少于5页" :level="2">
        <PaginationPlane>
          <TablePagination v-model:currentPage="currentPage1" v-model:pageSize="pageSize1" :total="total1" @change="pageChange" />
        </PaginationPlane>
      </AnchorItem>
      <AnchorItem label="大于5页" :level="2">
        <PaginationPlane>
          <TablePagination v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2" @change="pageChange" />
        </PaginationPlane>
      </AnchorItem>
      <AnchorItem label="禁用" :level="2">
        <PaginationPlane>
          <TablePagination disabled v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2" @change="pageChange" />
        </PaginationPlane>
      </AnchorItem>
      <AnchorItem label="迷你版（常用于弹窗）" :level="2">
        <PaginationPlane>
          <TablePagination small v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2" @change="pageChange">
            <span class="span">
              已选
              <em class="em">5条</em>
              数据
            </span>
          </TablePagination>
        </PaginationPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import PaginationPlane from './cpns/PaginationPlane.vue'
import { ref } from 'vue'

const currentPage1 = ref(1)
const pageSize1 = ref(10)
const total1 = ref(50)

const pageChange = () => {
  console.log(currentPage1.value, pageSize1.value)
}

const currentPage2 = ref(1)
const pageSize2 = ref(10)
const total2 = ref(100)
</script>

<style scoped lang="scss">
.pagination_view {
  @include mainContentContainer(100%);
  .span {
    color: $color-prompttext;
  }
  .em {
    color: $color-primary;
  }
}
</style>
