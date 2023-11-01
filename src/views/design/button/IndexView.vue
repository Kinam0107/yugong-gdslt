<template>
  <div class="button_view">
    <AnchorBox active-label="按钮样式">
      <AnchorItem label="按钮样式">
        <ButtonPlane
          desc="为提高后期工作效率，按钮做成了左右间距固定的宽度自适应组件，可从此页面中直接调用，修改文字即可，会根据文字长度自适应。因为圆角向内指向矩形的中心，这会突显矩形内的内容，这也使得当两个矩形并排时，我们更容易分清哪一条边属于哪一个矩形。因此我们的按钮采用了圆角设计，同时我们希望我们的界面的元素与政务气质相符-干练、简洁、直接，因此我们选择了4px的圆角设计而非采用过于大的圆角尺寸。" />
      </AnchorItem>
      <AnchorItem label="基础用法">
        <BasicUsage />
      </AnchorItem>
      <AnchorItem label="按钮尺寸">
        <ButtonSize />
      </AnchorItem>
      <AnchorItem label="使用原则">
        <UsagePrinciples />
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ButtonPlane from './cpns/ButtonPlane.vue'
import BasicUsage from './BasicUsage.vue'
import ButtonSize from './ButtonSize.vue'
import UsagePrinciples from './UsagePrinciples.vue'
</script>

<style scoped lang="scss">
.button_view {
  @include mainContentContainer(100%);
}
</style>
