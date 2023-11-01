<template>
  <TypefacePlane>
    <div class="page_first_level_title">页面一级标题 / medium / 24px</div>
    <div class="page_first_level_title tip">用于页面的一级标题，行高32：@include fontCategory(1)</div>
    <div class="page_second_level_title">页面二级标题 / medium / 20px</div>
    <div class="page_second_level_title tip">用于页面的二级标题，行高28：@include fontCategory(2)</div>
    <div class="table_first_level_title">表格一级标题 / medium / 16px</div>
    <div class="table_first_level_title tip">用于表格的二级标题，行高24：@include fontCategory(3)</div>
    <div class="main_text">正文文字/ regular / 14px</div>
    <div class="main_text tip">用于常规字体（左侧导航文字、大按钮文字 、大输入框文字、常规正文、表格文字、列表内容），行高22：@include fontCategory(4)/@include fontCategory()</div>
    <div class="explain_text">说明文字/ regular / 12px</div>
    <div class="explain_text tip">用于辅助文字（面包屑、小按钮文字、小输入框文字、补充说明、数据图表的辅助文字），行高20：@include fontCategory(5)</div>
  </TypefacePlane>
</template>

<script setup>
import TypefacePlane from './cpns/TypefacePlane.vue'
</script>

<style scoped lang="scss">
.page_first_level_title {
  @include fontCategory(1);
  font-weight: 500;
}
.page_second_level_title {
  @include fontCategory(2);
  font-weight: 500;
}
.table_first_level_title {
  @include fontCategory(3);
  font-weight: 500;
}
.main_text {
  @include fontCategory(4);
  font-weight: 500;
}
.explain_text {
  @include fontCategory(5);
  font-weight: 500;
}
.tip {
  color: $color-explaintext;
  font-weight: 400;
  margin-top: $baseDistance;
  margin-bottom: 2 * $baseDistance;
}
</style>
