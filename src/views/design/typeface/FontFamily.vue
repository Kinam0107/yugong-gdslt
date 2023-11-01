<template>
  <TypefacePlane
    desc="有购买版权字体的优先考虑购买的字体库或者免费的字体间进行选择使用。使用免费字体前根据系统区分Mac or Windows，如果用户使用的是Mac系统可以优先使用Mac默认字体渲染；如果使用的是Win，字体兼容性选择顺序：">
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
  </TypefacePlane>
</template>

<script setup>
import TypefacePlane from './cpns/TypefacePlane.vue'
</script>

<style scoped lang="scss">
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
</style>
