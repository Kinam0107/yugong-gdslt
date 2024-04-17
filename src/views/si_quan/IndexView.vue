<template>
  <BothSidesLayout>
    <template #left>
      <div class="left_main_title_wrapper">
        <MainTitle title="全覆盖">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog" />
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
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog" />
        </MainTitle>
      </div>
    </template>
    <template #right>
      <div class="right_main_title_wrapper">
        <MainTitle title="全天候">
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog" />
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
          <img class="expand_dialog_icon" :src="expandIcon" @click="openDialog" />
        </MainTitle>
      </div>
    </template>
  </BothSidesLayout>
</template>

<script setup>
import BothSidesLayout from '@/components/layout/BothSidesLayout.vue'
import MainTitle from '@/components/title/MainTitle.vue'
import expandIcon from '@/assets/images/expand-dialog.png'
import SubTitle from '@/components/title/SubTitle.vue'

const openDialog = () => {
  console.log('打开弹窗')
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
