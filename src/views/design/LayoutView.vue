<template>
  <div class="layout_view">
    <div class="design_title">左右布局</div>
    <div class="design_description">
      <p class="design_subtitle">栅格设置：</p>
      <p>· 设计团队统一的画板尺寸为1440；</p>
      <p>· 左侧导航宽度为200 + 8n；顶部导航高为8n（48px＜8n＜88px）；核心内容区域为1136；左侧及顶部导航固定，不随页面滚动；</p>
      <p>· 使用响应式布局，采用12栅格，网格基数为8，卡片宽度及间距等为8*n；</p>
      <br />
      <p class="design_subtitle">布局案例：</p>
      <p>· 总宽：1136px； 偏移：280px； 列数：12列； 装订线宽度：16px； 列宽：80px；</p>
    </div>
    <div class="design_example left_right" style="margin-bottom: 80px">
      <div class="top"></div>
      <div class="left"></div>
      <div class="right">
        <div v-for="i in 12" :key="i"></div>
      </div>
    </div>
    <div class="design_title">上下布局</div>
    <div class="design_description">
      <p class="design_subtitle">栅格设置：</p>
      <p>· 设计团队统一的画板尺寸为1440；</p>
      <p>· 左侧导航宽度为256；顶部导航高为56；核心内容区域为1136；左侧及顶部导航固定，不随页面滚动；</p>
      <p>· 使用响应式布局，采用12栅格，网格基数为8，卡片宽度及间距等为8*n；</p>
      <br />
      <p class="design_subtitle">布局案例：</p>
      <p>· 总宽：1136px； 偏移：152px； 列数：12列； 装订线宽度：16px； 列宽：80px；</p>
    </div>
    <div class="design_example top_bottom">
      <div class="top"></div>
      <div class="bottom">
        <div v-for="i in 12" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_view {
  @include designMainContentContainer();
  .design_subtitle {
    font-weight: 500;
  }
  .design_example {
    max-width: 1440px;
    height: 800px;
    margin: 0 auto;
    background-color: #eff8f5;
  }
}
.left_right {
  position: relative;
  display: flex;
  .top {
    position: absolute;
    width: 100%;
    height: 7 * $baseDistance;
    opacity: 0.1;
    background: #59b295;
    z-index: 1;
  }
  .left {
    width: 32 * $baseDistance;
    height: 100%;
    opacity: 0.1;
    background: #59b295;
    z-index: 0;
  }
  .right {
    display: flex;
    justify-content: center;
    gap: 2 * $baseDistance;
    flex: 1;
    height: 100%;
    padding: 0 3 * $baseDistance;
    z-index: 0;
    > div {
      flex: 1;
      height: 100%;
      opacity: 0.1;
      background: #59b295;
    }
  }
}
.top_bottom {
  position: relative;
  display: flex;
  .top {
    position: absolute;
    width: 100%;
    height: 7 * $baseDistance;
    opacity: 0.1;
    background: #59b295;
    z-index: 1;
  }
  .bottom {
    display: flex;
    justify-content: center;
    gap: 2 * $baseDistance;
    width: 1200px;
    height: 100%;
    margin: auto;
    padding: 0 3 * $baseDistance;
    z-index: 0;
    > div {
      flex: 1;
      height: 100%;
      opacity: 0.1;
      background: #59b295;
    }
  }
}
</style>
