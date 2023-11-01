<template>
  <ButtonPlane>
    <table>
      <tr class="title">
        <td>状态</td>
        <td>主按钮</td>
        <td>次按钮</td>
        <td>虚线按钮</td>
        <td>危险按钮</td>
      </tr>
      <tr class="desc">
        <td></td>
        <td>一级操作，色值为主色，常规状态下同一个页面中不能超过两个主按钮</td>
        <td>次要操作，常规状态下同一个页面中可以多个次按钮</td>
        <td>用于上传图片，表格内新增</td>
        <td>强烈强调的作用，谨慎使用</td>
      </tr>
      <tr>
        <td class="type">默认</td>
        <td><MainButton /></td>
        <td><SecondaryButton /></td>
        <td><DashedButton /></td>
        <td><DangerButton /></td>
      </tr>
      <tr>
        <td class="type">禁用</td>
        <td><MainButtonDisabled /></td>
        <td><SecondaryButtonDisabled /></td>
        <td><DashedButtonDisabled /></td>
        <td><DangerButtonDisabled /></td>
      </tr>
      <tr>
        <td class="type">加载中</td>
        <td><MainButtonLoading /></td>
        <td><SecondaryButtonLoading /></td>
        <td><DashedButtonLoading /></td>
        <td><DangerButtonLoading /></td>
      </tr>
      <tr class="title">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr class="title">
        <td></td>
        <td>带图标主按钮</td>
        <td>次按钮</td>
        <td>文字按钮</td>
        <td>危险按钮</td>
      </tr>
      <tr class="desc">
        <td></td>
        <td>一级操作，色值为主色，常规状态下同一个页面中不能超过两个主按钮</td>
        <td>次要操作，常规状态下同一个页面中可以多个次按钮</td>
        <td>文字按钮有纯文字，文字加图标样式</td>
        <td>强烈强调的作用，谨慎使用</td>
      </tr>
      <tr>
        <td class="type">默认</td>
        <td><MainButtonWithIcon /></td>
        <td><SecondaryButtonWithIcon /></td>
        <td><TextButton /></td>
        <td><DangerButtonOnlyIcon /></td>
      </tr>
      <tr>
        <td class="type">禁用</td>
        <td><MainButtonWithIconDisabled /></td>
        <td><SecondaryButtonWithIconDisabled /></td>
        <td><TextButtonDisabled /></td>
        <td><DangerButtonOnlyIconDisabled /></td>
      </tr>
      <tr>
        <td class="type">加载中</td>
        <td><MainButtonWithIconLoading /></td>
        <td><SecondaryButtonWithIconLoading /></td>
        <td><TextButtonLoading /></td>
        <td><DangerButtonOnlyIconLoading /></td>
      </tr>
      <tr class="title">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr class="title">
        <td></td>
        <td>幽灵按钮</td>
        <td>下拉按钮</td>
        <td>板块按钮</td>
        <td></td>
      </tr>
      <tr class="desc">
        <td></td>
        <td>用于颜色背景中</td>
        <td>可进行下拉操作</td>
        <td>将按钮宽度调整为其父宽度，文字居中。</td>
        <td></td>
      </tr>
      <tr>
        <td class="type">默认</td>
        <td class="has_bg"><GhostButton /></td>
        <td><DropdownButton /></td>
        <td><SectionButton /></td>
        <td></td>
      </tr>
      <tr>
        <td class="type">禁用</td>
        <td class="has_bg"><GhostButtonDisabled /></td>
        <td><DropdownButtonDisabled /></td>
        <td><SectionButtonDisabled /></td>
        <td></td>
      </tr>
      <tr>
        <td class="type">加载中</td>
        <td class="has_bg"><GhostButtonLoading /></td>
        <td><DropdownButtonLoading /></td>
        <td><SectionButtonLoading /></td>
        <td></td>
      </tr>
    </table>
  </ButtonPlane>
</template>

<script setup>
import ButtonPlane from './cpns/ButtonPlane.vue'

import MainButton from './cpns/MainButton.vue'
import SecondaryButton from './cpns/SecondaryButton.vue'
import DashedButton from './cpns/DashedButton.vue'
import DangerButton from './cpns/DangerButton.vue'

import MainButtonDisabled from './cpns/MainButtonDisabled.vue'
import SecondaryButtonDisabled from './cpns/SecondaryButtonDisabled.vue'
import DashedButtonDisabled from './cpns/DashedButtonDisabled.vue'
import DangerButtonDisabled from './cpns/DangerButtonDisabled.vue'

import MainButtonLoading from './cpns/MainButtonLoading.vue'
import SecondaryButtonLoading from './cpns/SecondaryButtonLoading.vue'
import DashedButtonLoading from './cpns/DashedButtonLoading.vue'
import DangerButtonLoading from './cpns/DangerButtonLoading.vue'

import MainButtonWithIcon from './cpns/MainButtonWithIcon.vue'
import SecondaryButtonWithIcon from './cpns/SecondaryButtonWithIcon.vue'
import TextButton from './cpns/TextButton.vue'
import DangerButtonOnlyIcon from './cpns/DangerButtonOnlyIcon.vue'

import MainButtonWithIconDisabled from './cpns/MainButtonWithIconDisabled.vue'
import SecondaryButtonWithIconDisabled from './cpns/SecondaryButtonWithIconDisabled.vue'
import TextButtonDisabled from './cpns/TextButtonDisabled.vue'
import DangerButtonOnlyIconDisabled from './cpns/DangerButtonOnlyIconDisabled.vue'

import MainButtonWithIconLoading from './cpns/MainButtonWithIconLoading.vue'
import SecondaryButtonWithIconLoading from './cpns/SecondaryButtonWithIconLoading.vue'
import TextButtonLoading from './cpns/TextButtonLoading.vue'
import DangerButtonOnlyIconLoading from './cpns/DangerButtonOnlyIconLoading.vue'

import GhostButton from './cpns/GhostButton.vue'
import DropdownButton from './cpns/DropdownButton.vue'
import SectionButton from './cpns/SectionButton.vue'

import GhostButtonDisabled from './cpns/GhostButtonDisabled.vue'
import DropdownButtonDisabled from './cpns/DropdownButtonDisabled.vue'
import SectionButtonDisabled from './cpns/SectionButtonDisabled.vue'

import GhostButtonLoading from './cpns/GhostButtonLoading.vue'
import DropdownButtonLoading from './cpns/DropdownButtonLoading.vue'
import SectionButtonLoading from './cpns/SectionButtonLoading.vue'
</script>

<style scoped lang="scss">
table {
  width: 100%;
  td {
    width: 20%;
    padding: $baseDistance;
  }
  tr.title td {
    @include fontCategory(2);
    font-weight: 500;
  }
  tr.desc td {
    @include fontCategory();
    font-weight: 400;
  }
  tr td:first-child {
    text-align: center;
  }
  td.type {
    @include fontCategory(2);
    color: $color-prompttext;
  }
  td.has_bg {
    background-color: $color-primary;
  }
}
</style>
