<template>
  <div class="input_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <InputPlane desc="通过鼠标或键盘输入内容，是最基础的表单域的组件，一般场景下采用中型32px高的输入框为标准尺寸。" />
      </AnchorItem>
      <AnchorItem label="基本样式">
        <InputPlane>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 30%">
              <BaseInput />
            </div>
            <div style="width: 30%">
              <BaseNumberInput />
            </div>
            <div style="width: 30%"></div>
          </div>
        </InputPlane>
      </AnchorItem>
      <AnchorItem label="基础尺寸">
        <InputPlane desc="大40px/中32px/小24px">
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <div style="width: 30%">
              <BaseLargeInput />
            </div>
            <div style="width: 30%">
              <BaseLargeInputed />
            </div>
            <div style="width: 30%">
              <BaseLargeReadOnly />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px">
            <div style="width: 30%">
              <BaseInput />
            </div>
            <div style="width: 30%">
              <BaseInputed />
            </div>
            <div style="width: 30%">
              <BaseReadOnly />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 30%">
              <BaseSmallInput />
            </div>
            <div style="width: 30%">
              <BaseSmallInputed />
            </div>
            <div style="width: 30%">
              <BaseSmallReadOnly />
            </div>
          </div>
        </InputPlane>
      </AnchorItem>
      <AnchorItem label="校验提示">
        <InputPlane>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 30%">
              <SuccessInput />
            </div>
            <div style="width: 30%">
              <ErrorInput />
            </div>
            <div style="width: 30%">
              <WarnInput />
            </div>
          </div>
        </InputPlane>
      </AnchorItem>
      <AnchorItem label="搜索样式">
        <InputPlane>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 30%">
              <InputWithSearchFill />
            </div>
            <div style="width: 30%">
              <InputWithSearchNoFill />
            </div>
            <div style="width: 30%">
              <InputWithFilter />
            </div>
          </div>
        </InputPlane>
      </AnchorItem>
      <AnchorItem label="带前缀后缀样式">
        <InputPlane>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 30%">
              <InputWithSuffix />
            </div>
            <div style="width: 30%">
              <InputWithPrefix />
            </div>
            <div style="width: 30%">
              <InputWithPrefixSuffix />
            </div>
          </div>
        </InputPlane>
      </AnchorItem>
      <AnchorItem label="文本框样式">
        <InputPlane>
          <div style="margin-bottom: 24px">
            <TextareaWordLimit />
          </div>
          <div style="margin-bottom: 24px">
            <TextareaWordLimitInputed />
          </div>
          <div style="margin-bottom: 24px">
            <TextareaChangeSize />
          </div>
          <div style="margin-bottom: 24px">
            <TextareaChangeSizeInputed />
          </div>
          <TextEditor />
        </InputPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import InputPlane from './cpns/InputPlane.vue'
import BaseInput from './BaseInput.vue'
import BaseNumberInput from './BaseNumberInput.vue'
import BaseLargeInput from './BaseLargeInput.vue'
import BaseLargeInputed from './BaseLargeInputed.vue'
import BaseLargeReadOnly from './BaseLargeReadOnly.vue'
import BaseInputed from './BaseInputed.vue'
import BaseReadOnly from './BaseReadOnly.vue'
import BaseSmallInput from './BaseSmallInput.vue'
import BaseSmallInputed from './BaseSmallInputed.vue'
import BaseSmallReadOnly from './BaseSmallReadOnly.vue'
import SuccessInput from './SuccessInput.vue'
import ErrorInput from './ErrorInput.vue'
import WarnInput from './WarnInput.vue'
import InputWithSearchFill from './InputWithSearchFill.vue'
import InputWithSearchNoFill from './InputWithSearchNoFill.vue'
import InputWithFilter from './InputWithFilter.vue'
import InputWithSuffix from './InputWithSuffix.vue'
import InputWithPrefix from './InputWithPrefix.vue'
import InputWithPrefixSuffix from './InputWithPrefixSuffix.vue'
import TextareaWordLimit from './TextareaWordLimit.vue'
import TextareaWordLimitInputed from './TextareaWordLimitInputed.vue'
import TextareaChangeSize from './TextareaChangeSize.vue'
import TextareaChangeSizeInputed from './TextareaChangeSizeInputed.vue'
import TextEditor from './TextEditor.vue'
</script>

<style scoped lang="scss">
.input_view {
  @include mainContentContainer(100%);
}
</style>
