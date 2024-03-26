<template>
  <div class="chart_view">
    <div class="sycj">使用场景</div>
    <div class="cjms">应用于数据统计展示，从数据转化到可视表达时不歪曲，不误导，不遗漏，忠实反映数据里包含的信息</div>
    <div class="tsyj">考虑在操作指引、交互反馈上起到强化或凸显的作用，我们基于颜色的色调、饱和度及明度，提供了12种基础色板作为参考和使用</div>
    <div class="base-colors">
      <div class="item-color" v-for="item in colorArr" :key="item" :style="{ backgroundColor: item }"></div>
    </div>
    <div class="chart_wrapper">
      <div class="stacked_bar_chart_wrapper">
        <BasicColumnChart
          isStack
          :color="['129, 184, 74', '242, 97, 97']"
          :xAxisValue="['1月', '2月', '3月', '4月', '5月']"
          yAxisUnit="万"
          :data="{
            成功数: [3000, 4400, 5800, 4400, 4400],
            失败数: [2000, 2000, 2000, 2000, 2000]
          }"
          :grid="[48, 24, 48, 24]" />
      </div>
      <div class="stacked_horizontal_bar_wrapper">
        <StackedHorizontalBar
          :color="['54, 163, 217', '129, 184, 74']"
          :yAxisValue="['类型一', '类型二', '类型三', '类型四', '类型五']"
          unit="万"
          :data="{
            总数: [2000, 1800, 1600, 1400, 1200],
            新增数: [312, 312, 312, 312, 312]
          }"
          :grid="[32, 24, 48, 24]" />
      </div>
      <div class="doughnut_chart_wrapper">
        <DoughnutChart
          :color="['54, 163, 217', '129, 184, 74', '242, 145, 48']"
          title="总指标"
          unit="万"
          :data="[
            { value: 1000, name: '类型一' },
            { value: 1000, name: '类型二' },
            { value: 1000, name: '类型三' }
          ]" />
      </div>
      <div class="smoothed_line_chart_wrapper">
        <SmoothedLineChart
          :color="['129, 184, 74', '242, 97, 97']"
          :xAxisValue="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']"
          :data="{
            总数: [2500, 4000, 2300, 5000, 4200, 3800, 3700, 5800, 3600, 4200, 4200, 4000, 4300, 6200, 4400, 4500, 4400, 4500, 4100, 6100, 5800],
            失败数: [500, 1000, 300, 1800, 1500, 1200, 1200, 2000, 1100, 1700, 1600, 1700, 1900, 2200, 1800, 1900, 1800, 1800, 1700, 1900, 1700]
          }" />
      </div>
      <div class="polar_bar_chart_wrapper">
        <TangentialPolarBarChart :color="['54, 163, 217', '129, 184, 74']" :radiusAxisValue="['类型一', '类型二']" :data="[3000, 1000]" />
      </div>
      <div class="mixed_line_and_bar_wrapper">
        <MixedLineAndBar
          :color="['129, 184, 74', '255, 185, 0']"
          :xAxisValue="['1月', '2月', '3月', '4月', '5月', '6月']"
          yAxisUnit1="%"
          :yAxisMax1="100"
          :barData="{ 类型一: [4050, 5800, 8800, 5800, 4050, 5800] }"
          :lineData="{ 类型二: [18, 22, 20, 38, 24, 22] }" />
      </div>
      <div class="scatter_column_chart_wrapper">
        <BasicColumnChart
          :color="['54, 163, 217', '129, 184, 74']"
          :xAxisValue="['1月', '2月', '3月', '4月', '5月', '6月']"
          :data="{
            类型一: [3200, 4200, 5800, 4200, 3200, 4200],
            类型二: [1600, 1600, 1600, 1600, 1600, 1600]
          }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BasicColumnChart from '@/components/chart/BasicColumnChart.vue'
import StackedHorizontalBar from '@/components/chart/StackedHorizontalBar.vue'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'
import SmoothedLineChart from '@/components/chart/SmoothedLineChart.vue'
import TangentialPolarBarChart from '@/components/chart/TangentialPolarBarChart.vue'
import MixedLineAndBar from '@/components/chart/MixedLineAndBar.vue'

const colorArr = ['#36A3D9', '#29CCCC', '#53A67C', '#81B84A', '#E8E800', '#FFC041', '#F29130', '#F26161', '#FF80BF', '#DA62F2', '#AD73E7', '#7474E5']
</script>

<style scoped lang="scss">
.chart_view {
  @include mainContentContainer(100%);
}
.sycj {
  @include fontCategory(1);
  padding: $baseDistance 0;
  margin-bottom: $baseDistance;
}
.cjms {
  @include fontCategory();
  margin-bottom: 3 * $baseDistance;
}
.tsyj {
  @include fontCategory();
  color: $color-prompttext;
  margin-bottom: 2 * $baseDistance;
}
.base-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 4 * $baseDistance;
  margin-bottom: 4 * $baseDistance;
  .item-color {
    width: 9 * $baseDistance;
    height: 9 * $baseDistance;
  }
}
.chart_wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4 * $baseDistance;
}
.stacked_bar_chart_wrapper {
  width: 336px;
  height: 332px;
  border: 1px solid $color-border;
}
.stacked_horizontal_bar_wrapper {
  width: 331px;
  height: 310px;
  border: 1px solid $color-border;
}
.doughnut_chart_wrapper {
  width: 324px;
  height: 324px;
  border: 1px solid $color-border;
}
.smoothed_line_chart_wrapper {
  width: 815px;
  height: 332px;
  border: 1px solid $color-border;
}
.polar_bar_chart_wrapper {
  width: 324px;
  height: 324px;
  border: 1px solid $color-border;
}
.mixed_line_and_bar_wrapper {
  width: 815px;
  height: 324px;
  border: 1px solid $color-border;
}
.scatter_column_chart_wrapper {
  width: 815px;
  height: 324px;
  border: 1px solid $color-border;
}
</style>
