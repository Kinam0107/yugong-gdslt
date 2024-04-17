<template>
  <BothSidesLayout>
    <template #left>
      <div class="left_main_title_wrapper">
        <MainTitle title="全覆盖">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog('全覆盖')" />
        </MainTitle>
      </div>
      <div class="left_subtitle_wrapper">
        <SubTitle title="水库功能" />
      </div>
      <div class="left_subtitle_wrapper">
        <SubTitle title="库区上游" />
      </div>
      <div class="left_subtitle_wrapper">
        <SubTitle title="水库下游" />
      </div>
      <div class="left_main_title_wrapper">
        <MainTitle title="全要素">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog('全要素')" />
        </MainTitle>
      </div>
    </template>
    <template #right>
      <div class="right_main_title_wrapper">
        <MainTitle title="全天候">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog('全天候')" />
        </MainTitle>
      </div>
      <div class="right_subtitle_wrapper">
        <SubTitle title="水文监测" />
      </div>
      <div class="right_subtitle_wrapper">
        <SubTitle title="安全监测" />
      </div>
      <div class="right_subtitle_wrapper">
        <SubTitle title="视频监测" />
      </div>
      <div class="right_subtitle_wrapper">
        <SubTitle title="电源保障" />
      </div>
      <div class="right_main_title_wrapper">
        <MainTitle title="全周期">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog('全周期')" />
        </MainTitle>
      </div>
    </template>
  </BothSidesLayout>
  <PopupWindow v-model="visibleDialog" :title="titleDialog" width="1000px" height="600px">
    <template v-if="titleDialog === '全覆盖'">
      <AllCover />
    </template>
    <template v-if="titleDialog === '全要素'">
      <AllFeature />
    </template>
    <template v-if="titleDialog === '全天候'">
      <AllDay />
    </template>
    <template v-if="titleDialog === '全周期'">
      <AllCycle />
    </template>
  </PopupWindow>
</template>

<script setup>
import { ref } from 'vue'
import BothSidesLayout from '@/components/layout/BothSidesLayout.vue'
import MainTitle from '@/components/title/MainTitle.vue'
import expandIcon from '@/assets/images/expand-dialog.png'
import SubTitle from '@/components/title/SubTitle.vue'
import AllCover from './popup/AllCover.vue'
import AllFeature from './popup/AllFeature.vue'
import AllDay from './popup/AllDay.vue'
import AllCycle from './popup/AllCycle.vue'

const titleDialog = ref('')
const visibleDialog = ref(false)
const openDialog = (title) => {
  titleDialog.value = title
  visibleDialog.value = true
}
</script>

<style scoped lang="scss">
.left_main_title_wrapper {
  padding: 20px 16px 0 32px;
}
.right_main_title_wrapper {
  padding: 20px 32px 0 16px;
}
.left_subtitle_wrapper {
  padding: 16px 27px 0 32px;
}
.right_subtitle_wrapper {
  padding: 16px 43px 0 16px;
}
.expand_dialog_icon {
  cursor: pointer;
}
</style>
