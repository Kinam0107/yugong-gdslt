<template>
  <div class="typeface_view">
    <div class="design_title">字体家族</div>
    <div class="design_description">
      有购买版权字体的优先考虑购买的字体库或者免费的字体间进行选择使用。使用免费字体前根据系统区分Mac or
      Windows，如果用户使用的是Mac系统可以优先使用Mac默认字体渲染；如果使用的是Win，字体兼容性选择顺序：
    </div>
    <div class="design_example">
      <table border cellspacing="0" width="800" height="192">
        <tr bgcolor="#f8f9fb">
          <td></td>
          <td class="type">Mac</td>
          <td class="type" colspan="2">Windows</td>
        </tr>
        <tr>
          <td class="type">中文</td>
          <td>苹方</td>
          <td>思源黑体</td>
          <td>微软雅黑</td>
        </tr>
        <tr>
          <td class="type">英文</td>
          <td>苹方</td>
          <td>Arial</td>
          <td>Roboto</td>
        </tr>
      </table>
    </div>
    <div class="design_title">行宽/行长</div>
    <div class="design_description">
      行宽/行长：是指一行字的长度。计算行宽的简单方法，使用Robert
      Bringhurst的方法：行宽=字号x30。如果定义网站的基础字号为14px，那么最适宜基础行宽为：14(字号)x30=420px(行宽)。较适宜的宽度为40-70个字符。
    </div>
    <div class="design_example"></div>
    <div class="design_title">字体大小</div>
    <div class="design_example">
      <div class="page_first_level_title">页面一级标题 / medium / 24px</div>
      <div class="page_first_level_title tip">用于页面的一级标题，行高32：@include fontCategory(1)</div>
      <div class="page_second_level_title">页面二级标题 / medium / 20px</div>
      <div class="page_second_level_title tip">用于页面的二级标题，行高28：@include fontCategory(2)</div>
      <div class="table_first_level_title">表格一级标题 / medium / 16px</div>
      <div class="table_first_level_title tip">用于表格的二级标题，行高24：@include fontCategory(3)</div>
      <div class="main_text">正文文字/ regular / 14px</div>
      <div class="main_text tip">用于常规字体（左侧导航文字、大按钮文字 、大输入框文字、常规正文、表格文字、列表内容），行高22：@include fontCategory(4)/fontCategory()</div>
      <div class="explain_text">说明文字/ regular / 12px</div>
      <div class="explain_text tip">用于辅助文字（面包屑、小按钮文字、小输入框文字、补充说明、数据图表的辅助文字），行高20：@include fontCategory(5)</div>
    </div>
    <div class="design_title">字体样式</div>
    <div class="design_example">
      <div class="item">
        <div class="label">普通文字：</div>
        <div class="value normal">设计系统</div>
      </div>
      <div class="item">
        <div class="label">加粗文字：</div>
        <div class="value weight">设计系统</div>
      </div>
      <div class="item">
        <div class="label">禁用文字：</div>
        <div class="value disable">设计系统</div>
      </div>
      <div class="item">
        <div class="label">带下划线：</div>
        <div class="value underline">设计系统</div>
      </div>
      <div class="item">
        <div class="label">带删除线：</div>
        <div class="value deleteline">设计系统</div>
      </div>
      <div class="item">
        <div class="label">带颜色底：</div>
        <div class="value bgcolor">设计系统</div>
      </div>
      <div class="item">
        <div class="label">链接文字：</div>
        <div class="value link">设计系统</div>
      </div>
      <div class="item">
        <div class="label">链接文字悬浮：</div>
        <div class="value hover">设计系统</div>
      </div>
    </div>
    <div class="design_title">适老化字体大小</div>
    <div class="design_example">
      <div class="adaptive_aging_page_first_level_title">页面一级标题 / medium / 32px</div>
      <div class="adaptive_aging_page_first_level_title tip">用于页面的一级标题，行高40：@include fontCategory(1, true)</div>
      <div class="adaptive_aging_page_second_level_title">页面二级标题 / medium / 28px</div>
      <div class="adaptive_aging_page_second_level_title tip">用于页面的二级标题，行高36：@include fontCategory(2, true)</div>
      <div class="adaptive_aging_table_first_level_title">表格一级标题 / medium / 24px</div>
      <div class="adaptive_aging_table_first_level_title tip">用于表格的二级标题，行高32：@include fontCategory(3, true)</div>
      <div class="adaptive_aging_main_text">正文文字/ regular / 20px</div>
      <div class="adaptive_aging_main_text tip">
        用于常规字体（左侧导航文字、大按钮文字 、大输入框文字、常规正文、表格文字、列表内容），行高28：@include fontCategory(4, true)
      </div>
      <div class="adaptive_aging_explain_text">说明文字/ regular / 16px</div>
      <div class="adaptive_aging_explain_text tip">用于辅助文字（面包屑、小按钮文字、小输入框文字、补充说明、数据图表的辅助文字），行高24：@include fontCategory(5, true)</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typeface_view {
  @include designMainContentContainer();
}
.design_example {
  margin-bottom: 80px;
}
table {
  border-color: $color-border;
}
td {
  text-align: center;
  line-height: 64px;
  color: $color-titletext;
  font-size: 18px;
  font-weight: 400;
  &.type {
    font-weight: 500;
  }
}
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
  margin-top: 8px;
  margin-bottom: 48px;
}
.item {
  display: flex;
  gap: 32px;
  .label {
    width: 168px;
    color: $color-titletext;
    font-size: 20px;
    line-height: 40px;
  }
  .value {
    font-size: 20px;
    line-height: 40px;
    &.normal {
      font-style: normal;
    }
    &.weight {
      font-weight: 500;
    }
    &.disable {
      color: $color-disabletext;
      cursor: not-allowed;
    }
    &.underline {
      text-decoration-line: underline;
    }
    &.deleteline {
      text-decoration-line: line-through;
    }
    &.bgcolor {
      background-color: #ebf8f6;
    }
    &.link {
      color: $color-primary;
      cursor: pointer;
    }
    &.hover {
      color: $color-primary;
      text-decoration-line: underline;
      cursor: pointer;
    }
  }
}
</style>
