<template>
  <ButtonPlane>
    <table>
      <tr class="title">
        <td>类型</td>
        <td>大</td>
        <td>中</td>
        <td>小</td>
      </tr>
      <tr>
        <td class="type">不带图标</td>
        <td><MainButtonLarge /></td>
        <td><MainButton /></td>
        <td><MainButtonSmall /></td>
        <td></td>
      </tr>
      <tr>
        <td class="type">带图标</td>
        <td><MainButtonWithIconLarge /></td>
        <td><MainButtonWithIcon /></td>
        <td><MainButtonWithIconSmall /></td>
        <td></td>
      </tr>
      <tr>
        <td class="type">组合间距</td>
        <td>
          <MainButtonLarge />
          <MainButtonLarge />
        </td>
        <td>
          <MainButton />
          <MainButton />
        </td>
        <td>
          <MainButtonSmall />
          <MainButtonSmall />
        </td>
        <td></td>
      </tr>
    </table>
  </ButtonPlane>
</template>

<script setup>
import ButtonPlane from './cpns/ButtonPlane.vue'

import MainButtonLarge from './cpns/MainButtonLarge.vue'
import MainButton from './cpns/MainButton.vue'
import MainButtonSmall from './cpns/MainButtonSmall.vue'

import MainButtonWithIconLarge from './cpns/MainButtonWithIconLarge.vue'
import MainButtonWithIcon from './cpns/MainButtonWithIcon.vue'
import MainButtonWithIconSmall from './cpns/MainButtonWithIconSmall.vue'
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
