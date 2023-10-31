<template>
  <div class="color_view">
    <div class="design_title">颜色介绍</div>
    <div class="design_description">颜色是指UI界面设计中使用的色彩体系，我们定义了：主题色、辅助色、中性色三部分色彩，以及衍生出的UI调色板。可用于创建反应您的品牌或风格的颜色主题。</div>
    <div class="design_title">主题色</div>
    <div class="design_description">延续“河长制”LOGO配色，使用单色和渐变色，应用于主题背景、按钮、图标、可点击文字、强调信息等元素。</div>
    <div class="design_example">
      <div class="color_block_wrapper">
        <div class="color_block single_color"></div>
        <div class="color_description">
          <div class="color_name">单色</div>
          <div class="color_value">#36B29E</div>
          <div class="color_value">$color-primary</div>
        </div>
      </div>
      <div class="color_block_wrapper" style="width: 50%">
        <div class="color_block gradient_color"></div>
        <div class="color_description">
          <div class="color_name">渐变色</div>
          <div class="color_value">#83B26B/3D9CCC</div>
          <div class="color_value">$color-gradient</div>
        </div>
      </div>
    </div>
    <div class="design_title">辅助色</div>
    <div class="design_description">辅助色包含了绿、红、橙三种，分别代表了成功、失败和警告的状态，提高用户对场景状态的阅读理解。</div>
    <div class="design_example">
      <div class="color_block_wrapper">
        <div class="color_block success_color"></div>
        <div class="color_description">
          <div class="color_name">成功状态</div>
          <div class="color_value">#28CE8E</div>
          <div class="color_value">$color-success</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block fail_color"></div>
        <div class="color_description">
          <div class="color_name">失败状态</div>
          <div class="color_value">#F13939</div>
          <div class="color_value">$color-error</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block warn_color"></div>
        <div class="color_description">
          <div class="color_name">警告状态</div>
          <div class="color_value">#FAAD10</div>
          <div class="color_value">$color-warning</div>
        </div>
      </div>
    </div>
    <div class="design_title">中性色</div>
    <div class="design_description">中性色包含了黑、白、灰，有层次的灰阶色调可以帮助用户提升阅读体验。</div>
    <div class="design_example">
      <div class="color_block_wrapper">
        <div class="color_block text_color"></div>
        <div class="color_description">
          <div class="color_name">标题正文</div>
          <div class="color_value">#262626</div>
          <div class="color_value">$color-titletext</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block explain_color"></div>
        <div class="color_description">
          <div class="color_name">说明文字</div>
          <div class="color_value">#595959</div>
          <div class="color_value">$color-explaintext</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block prompt_color"></div>
        <div class="color_description">
          <div class="color_name">提示文字</div>
          <div class="color_value">#8C8C8C</div>
          <div class="color_value">$color-prompttext</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block disable_color"></div>
        <div class="color_description">
          <div class="color_name">提示或禁用</div>
          <div class="color_value">#BFBFBF</div>
          <div class="color_value">$color-placeholdertext</div>
          <div class="color_value">$color-disabletext</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block border_color"></div>
        <div class="color_description">
          <div class="color_name">边框</div>
          <div class="color_value">#D9D9D9</div>
          <div class="color_value">$color-border</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block separator_color"></div>
        <div class="color_description">
          <div class="color_name">分隔线</div>
          <div class="color_value">#F0F0F0</div>
          <div class="color_value">$color-separator</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block gray_color"></div>
        <div class="color_description">
          <div class="color_name">浅灰背景</div>
          <div class="color_value">#F4F9F7</div>
          <div class="color_value">$color-garybg</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block white_color"></div>
        <div class="color_description">
          <div class="color_name">纯白背景</div>
          <div class="color_value">#FFFFFF</div>
          <div class="color_value">$color-whitebg</div>
        </div>
      </div>
    </div>
    <div class="design_title">适老化色彩选择</div>
    <div class="design_description">画面采用多种饱和度较高的颜色，而不是单色；颜色的丰富程度决定了画面的视觉表达，色彩越丰富，画面表现越好；</div>
    <div class="design_example">
      <div class="color_block_wrapper">
        <div class="color_block" style="background-color: #165dff"></div>
        <div class="color_description">
          <div class="color_name">蓝色</div>
          <div class="color_value">#165DFF</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block" style="background-color: #28ce8e"></div>
        <div class="color_description">
          <div class="color_name">绿色</div>
          <div class="color_value">#28CE8E</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block" style="background-color: #f86220"></div>
        <div class="color_description">
          <div class="color_name">橙红色</div>
          <div class="color_value">#F86220</div>
        </div>
      </div>
      <div class="color_block_wrapper">
        <div class="color_block" style="background-color: #ffab00"></div>
        <div class="color_description">
          <div class="color_name">黄色</div>
          <div class="color_value">#FFAB00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.single_color {
  background-color: $color-primary;
}
.gradient_color {
  background-image: $color-gradient;
}
.success_color {
  background-color: $color-success;
}
.fail_color {
  background-color: $color-error;
}
.warn_color {
  background-color: $color-warning;
}
.text_color {
  background-color: $color-titletext;
}
.explain_color {
  background-color: $color-explaintext;
}
.prompt_color {
  background-color: $color-prompttext;
}
.disable_color {
  background-color: $color-disabletext;
}
.border_color {
  background-color: $color-border;
}
.separator_color {
  background-color: $color-separator;
}
.gray_color {
  background-color: $color-garybg;
}
.white_color {
  background-color: $color-whitebg;
  border: 1px solid $color-border;
}
.color_view {
  @include designMainContentContainer();
}
.design_example {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
  margin-bottom: 108px;
  .color_block_wrapper {
    display: flex;
    gap: 16px;
    width: 300px;
    .color_block {
      width: 96px;
      height: 96px;
      border-radius: 48px;
    }
    .color_description {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 96px;
      .color_name {
        color: #000;
        font-size: 24px;
        font-weight: 400;
      }
      .color_value {
        color: $color-explaintext;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
</style>
