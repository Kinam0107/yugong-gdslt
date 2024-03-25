<template>
  <div class="other_view">
    <AnchorBox active-label="标签">
      <AnchorItem label="标签">
        <OtherPlane desc="用于标记事物的属性和维度，进行分类。">
          <div style="display: flex; gap: 8px">
            <el-tag>标签名称</el-tag>
            <el-tag type="warning">标签名称</el-tag>
            <el-tag type="success">标签名称</el-tag>
            <el-tag type="danger">标签名称</el-tag>
            <el-tag type="info" closable>可删除的标签</el-tag>
          </div>
        </OtherPlane>
      </AnchorItem>
      <AnchorItem label="角标">
        <OtherPlane desc="一般出现在按钮、卡片或者标题栏右上角位置，通过醒目的视觉形式提示状态信息。">
          <div style="display: flex; gap: 16px">
            <div class="coner_mark_wrapper">
              <ConerMark type="success">已审核</ConerMark>
            </div>
            <div class="coner_mark_wrapper">
              <ConerMark type="warning">待审核</ConerMark>
            </div>
            <div class="coner_mark_wrapper">
              <ConerMark type="danger">被退回</ConerMark>
            </div>
          </div>
        </OtherPlane>
      </AnchorItem>
      <AnchorItem label="徽标数">
        <OtherPlane desc="一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。">
          <div style="display: flex; gap: 32px">
            <el-badge is-dot class="item"><div class="badge_number_wrapper"></div></el-badge>
            <el-badge :value="8" class="item"><div class="badge_number_wrapper"></div></el-badge>
            <el-badge :value="16" class="item"><div class="badge_number_wrapper"></div></el-badge>
            <el-badge :value="200" :max="99" class="item"><div class="badge_number_wrapper"></div></el-badge>
          </div>
        </OtherPlane>
      </AnchorItem>
      <AnchorItem label="走马灯">
        <OtherPlane desc="常用于一组图片或卡片轮播，当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。">
          <el-carousel height="320px" style="width: 640px">
            <el-carousel-item v-for="item in 4" :key="item">
              <div style="height: 100%; background-color: var(--el-color-primary); color: #fff; text-align: center; line-height: 320px">{{ item }}</div>
            </el-carousel-item>
          </el-carousel>
        </OtherPlane>
      </AnchorItem>
      <AnchorItem label="固钉">
        <OtherPlane desc="当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。">
          <div class="gd_page">
            <SvgIcon style="position: absolute; right: 40px; bottom: 40px; cursor: pointer;font-size: 48px;" icon="backtop-fill" />
          </div>
        </OtherPlane>
      </AnchorItem>
      <AnchorItem label="特殊状态页">
        <OtherPlane desc="用于反馈当前页面特殊状态，如遇到页面异常或暂无数据时可清晰告知用户。">
          <div class="yc_page">
            <ExceptionPageLayout title="404" sub-title="这是一段很长的信息说明提示文案">
              <el-button type="primary">重新加载</el-button>
            </ExceptionPageLayout>
          </div>
          <div class="zwsj_page">
            <ExceptionPageLayout icon="noData" title="暂无数据" sub-title="这是一段很长的信息说明提示文案">
              <el-button type="primary">立即新增</el-button>
            </ExceptionPageLayout>
          </div>
        </OtherPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import OtherPlane from './cpns/OtherPlane.vue'
import ConerMark from '@/components/mark/ConerMark.vue'
import ExceptionPageLayout from '@/components/layout/ExceptionPageLayout.vue'
</script>

<style scoped lang="scss">
.other_view {
  @include mainContentContainer(100%);
}
.coner_mark_wrapper {
  position: relative;
  width: 100px;
  height: 40px;
  background-color: $color-graybg;
}
.badge_number_wrapper {
  width: 48px;
  height: 48px;
  border-radius: $baseDistance;
  background-color: $color-graybg;
}
.gd_page {
  position: relative;
  height: 600px;
  background-color: #f8f9fb;
}
.yc_page {
  width: 640px;
  height: 414px;
  border-radius: 4px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  margin-left: 16px;
}
.zwsj_page {
  width: 640px;
  height: 294px;
  border-radius: 4px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  margin-left: 16px;
  margin-top: 16px;
}
</style>
