<template>
  <div class="pagination_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">当加载/渲染所有数据将花费很多时间时使用，可切换页码浏览数据。</div>
    <div class="design_title">基础样式</div>
    <div class="desing_example">
      <div class="desing_subtitle">少于5页</div>
      <div class="pagination_box">
        <TablePagination v-model:currentPage="currentPage1" v-model:pageSize="pageSize1" :total="total1" @change="pageChange" />
      </div>
      <div class="desing_subtitle">大于5页</div>
      <div class="pagination_box">
        <TablePagination v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2" />
      </div>
      <div class="desing_subtitle">禁用</div>
      <div class="pagination_box">
        <TablePagination disabled v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2" />
      </div>
      <div class="desing_subtitle">迷你版（常用于弹窗）</div>
      <div class="pagination_box">
        <TablePagination small v-model:currentPage="currentPage2" v-model:pageSize="pageSize2" :total="total2">
          <span style="color: #8c8c8c">
            已选
            <em style="color: #36b29e">5条</em>
            数据
          </span>
        </TablePagination>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  @include designMainContentContainer();
}
.desing_example {
  background: #f8f9fb;
  padding: 40px;
}
.desing_subtitle {
  color: $color-prompttext;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 24px;
}
.pagination_box {
  background-color: #fff;
  padding: 16px 24px;
  margin-bottom: 80px;
}
</style>
