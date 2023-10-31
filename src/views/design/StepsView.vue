<template>
  <div class="steps_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。</div>
    <div class="design_title">基础样式</div>
    <div class="design_sbutitle">横向步骤条</div>
    <StepBar :active="2">
      <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
    </StepBar>
    <br />
    <br />
    <br />
    <StepBar :active="2" finish-status="error">
      <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="2" title="步骤名称（错误状态）" description="当前步骤的相关操作说明" />
      <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
    </StepBar>
    <br />
    <br />
    <br />
    <StepBar :active="0">
      <StepItem :index="0" title="步骤名称" />
      <StepItem :index="1" title="步骤名称" />
      <StepItem :index="2" title="步骤名称" />
      <StepItem :index="3" title="步骤名称" />
    </StepBar>
    <br />
    <br />
    <br />
    <StepBar :active="1" type="titleBelow">
      <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
    </StepBar>
    <br />
    <br />
    <br />
    <StepBar :active="0" type="titleBelow">
      <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
    </StepBar>
    <br />
    <br />
    <br />
    <StepBar :active="1" type="simple">
      <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
      <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
    </StepBar>
    <br />
    <br />
    <br />
    <div class="design_sbutitle">纵向步骤条</div>
    <div style="display: flex; gap: 80px">
      <StepBar :active="1" type="vertical">
        <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
      </StepBar>
      <StepBar :active="0" type="vertical">
        <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
        <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
      </StepBar>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import StepBar from '@/components/steps/StepBar.vue'
import StepItem from '@/components/steps/StepItem.vue'
</script>

<style scoped lang="scss">
.steps_view {
  @include designMainContentContainer();
}
.design_sbutitle {
  color: $color-prompttext;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 40px;
}
</style>
