<template>
  <div class="steps_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <StepsPlane desc="当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。" />
      </AnchorItem>
      <AnchorItem label="基础样式"></AnchorItem>
      <AnchorItem label="横向步骤条" :level="2">
        <StepsPlane>
          <StepBar :active="2">
            <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
          </StepBar>
        </StepsPlane>
        <StepsPlane>
          <StepBar :active="2" finish-status="error">
            <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="2" title="步骤名称（错误状态）" description="当前步骤的相关操作说明" />
            <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
          </StepBar>
        </StepsPlane>
        <StepsPlane>
          <StepBar :active="0">
            <StepItem :index="0" title="步骤名称" />
            <StepItem :index="1" title="步骤名称" />
            <StepItem :index="2" title="步骤名称" />
            <StepItem :index="3" title="步骤名称" />
          </StepBar>
        </StepsPlane>
        <StepsPlane>
          <StepBar :active="1" type="titleBelow">
            <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
          </StepBar>
        </StepsPlane>
        <StepsPlane>
          <StepBar :active="0" type="titleBelow">
            <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
          </StepBar>
        </StepsPlane>
        <StepsPlane>
          <StepBar :active="1" type="simple">
            <StepItem :index="0" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="1" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="2" title="步骤名称" description="当前步骤的相关操作说明" />
            <StepItem :index="3" title="步骤名称" description="当前步骤的相关操作说明" />
          </StepBar>
        </StepsPlane>
      </AnchorItem>
      <AnchorItem label="纵向步骤条" :level="2">
        <StepsPlane>
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
        </StepsPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import StepsPlane from './cpns/StepsPlane.vue'
import StepBar from '@/components/steps/StepBar.vue'
import StepItem from '@/components/steps/StepItem.vue'
</script>

<style scoped lang="scss">
.steps_view {
  @include mainContentContainer(100%);
}
</style>
