<template>
  <TypefacePlane>
    <div class="adaptive_aging_page_first_level_title">页面一级标题 / medium / 32px</div>
    <div class="adaptive_aging_page_first_level_title tip">用于页面的一级标题，行高40：@include fontCategory(1, true)</div>
    <div class="adaptive_aging_page_second_level_title">页面二级标题 / medium / 28px</div>
    <div class="adaptive_aging_page_second_level_title tip">用于页面的二级标题，行高36：@include fontCategory(2, true)</div>
    <div class="adaptive_aging_table_first_level_title">表格一级标题 / medium / 24px</div>
    <div class="adaptive_aging_table_first_level_title tip">用于表格的二级标题，行高32：@include fontCategory(3, true)</div>
    <div class="adaptive_aging_main_text">正文文字/ regular / 20px</div>
    <div class="adaptive_aging_main_text tip">用于常规字体（左侧导航文字、大按钮文字 、大输入框文字、常规正文、表格文字、列表内容），行高28：@include fontCategory(4, true)</div>
    <div class="adaptive_aging_explain_text">说明文字/ regular / 16px</div>
    <div class="adaptive_aging_explain_text tip">用于辅助文字（面包屑、小按钮文字、小输入框文字、补充说明、数据图表的辅助文字），行高24：@include fontCategory(5, true)</div>
  </TypefacePlane>
</template>

<script setup>
import TypefacePlane from './cpns/TypefacePlane.vue'
</script>

<style scoped lang="scss">
.adaptive_aging_page_first_level_title {
  @include fontCategory(1, true);
  font-weight: 500;
}
.adaptive_aging_page_second_level_title {
  @include fontCategory(2, true);
  font-weight: 500;
}
.adaptive_aging_table_first_level_title {
  @include fontCategory(3, true);
  font-weight: 500;
}
.adaptive_aging_main_text {
  @include fontCategory(4, true);
  font-weight: 500;
}
.adaptive_aging_explain_text {
  @include fontCategory(5, true);
  font-weight: 500;
}
.tip {
  color: $color-explaintext;
  font-weight: 400;
  margin-top: 2 * $baseDistance;
  margin-bottom: 3 * $baseDistance;
}
</style>
