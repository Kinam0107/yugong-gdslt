<template>
  <IconPlane>
    <p>绘制尺寸：画板1024*1024；线宽72px，外框圆角8px；（特殊情况时可按8的倍数延伸）</p>
    <p>导出上传尺寸：32*32px</p>
    <p>设计常用尺寸：</p>
    <p>12*12px（常用于小箭头，小按钮，小输入框，小选择器等组件）</p>
    <p>14*14px（常用于箭头，大按钮，大输入框，大选择器，表单等组件）</p>
    <p>16*16px（常用于导航，表格等组件）</p>
    <p>24*24px（常用于评分等组件）</p>
    <p>24*24px（常用于用户头像，固钉等组件）</p>
    <p>48*48px（常用于步骤条，对话框提示icon等组件）</p>
    <p>48*48px（常用于进度圈，弹窗警示图标等组件）</p>
  </IconPlane>
</template>

<script setup>
import IconPlane from './cpns/IconPlane.vue'
</script>

<style scoped lang="scss">
p {
  @include fontCategory();
}
</style>
