<template>
  <div class="select_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <SelectPlane desc="通过鼠标或键盘输入内容，是最基础的表单域的组件，一般场景下采用中型32px高的输入框为标准尺寸。" />
      </AnchorItem>
      <AnchorItem label="基本样式">
        <SelectPlane>
          <BaseSelect style="width: 30%" />
        </SelectPlane>
      </AnchorItem>
      <AnchorItem label="基础尺寸">
        <SelectPlane desc="大40px/中32px/小24px">
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <BaseLargeSelect style="width: 30%" />
            <BaseLargeSelected style="width: 30%" />
            <BaseLargeReadOnly style="width: 30%" />
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <BaseSelect style="width: 30%" />
            <BaseSelected style="width: 30%" />
            <BaseReadOnly style="width: 30%" />
          </div>
          <div style="display: flex; justify-content: space-between">
            <BaseSmallSelect style="width: 30%" />
            <BaseSmallSelected style="width: 30%" />
            <BaseSmallReadOnly style="width: 30%" />
          </div>
        </SelectPlane>
      </AnchorItem>
      <AnchorItem label="下拉样式">
        <SelectPlane>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <RadioSelect style="width: 30%" />
            <TreeSelect style="width: 30%" />
            <CascadeSelect style="width: 30%" />
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <TreeSelectWithFilter style="width: 30%" />
            <MultiSelectWithFilter style="width: 30%" />
            <TreeMultiSelectWithFilter style="width: 30%" />
          </div>
          <div style="display: flex">
            <InputSelect style="width: 30%" />
          </div>
        </SelectPlane>
      </AnchorItem>
      <AnchorItem label="穿梭样式">
        <SelectPlane>
          <MultiSelectShuttleBox style="margin-bottom: 24px" />
        </SelectPlane>
        <SelectPlane>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <TreeShapedShuttleBox style="width: 45%" />
          </div>
        </SelectPlane>
      </AnchorItem>
      <AnchorItem label="日期样式">
        <SelectPlane>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px"></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px"></div>
          <div style="display: flex; justify-content: space-between"></div>
        </SelectPlane>
        <SelectPlane>
          <div style="display: flex; justify-content: space-between"></div>
        </SelectPlane>
        <SelectPlane>
          <div style="display: flex; justify-content: space-between"></div>
        </SelectPlane>
        <SelectPlane>
          <div style="display: flex; justify-content: space-between"></div>
        </SelectPlane>
        <SelectPlane>
          <div style="display: flex; justify-content: space-between"></div>
        </SelectPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import SelectPlane from './cpns/SelectPlane.vue'
import BaseSelect from './BaseSelect.vue'
import BaseLargeSelect from './BaseLargeSelect.vue'
import BaseLargeSelected from './BaseLargeSelected.vue'
import BaseLargeReadOnly from './BaseLargeReadOnly.vue'
import BaseSelected from './BaseSelected.vue'
import BaseReadOnly from './BaseReadOnly.vue'
import BaseSmallSelect from './BaseSmallSelect.vue'
import BaseSmallSelected from './BaseSmallSelected.vue'
import BaseSmallReadOnly from './BaseSmallReadOnly.vue'
import RadioSelect from './RadioSelect.vue'
import TreeSelect from './TreeSelect.vue'
import CascadeSelect from './CascadeSelect.vue'
import TreeSelectWithFilter from './TreeSelectWithFilter.vue'
import MultiSelectWithFilter from './MultiSelectWithFilter.vue'
import TreeMultiSelectWithFilter from './TreeMultiSelectWithFilter.vue'
import InputSelect from './InputSelect.vue'
import MultiSelectShuttleBox from './MultiSelectShuttleBox.vue'
import TreeShapedShuttleBox from './TreeShapedShuttleBox.vue'
</script>

<style scoped lang="scss">
.select_view {
  @include mainContentContainer(100%);
}
</style>
