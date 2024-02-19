<template>
  <div class="exception_page">
    <slot name="icon">
      <img v-if="props.icon === 'exception'" class="exception_icon" :src="imgPageException" />
      <img v-if="props.icon === 'noData'" class="no_data_icon" :src="imgNoData" />
    </slot>
    <slot name="title">
      <div class="exception_title">{{ props.title }}</div>
    </slot>
    <slot name="sub-title">
      <div class="exception_sub_title">{{ props.subTitle }}</div>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup>
import imgPageException from '@/assets/images/error/page-exception.png'
import imgNoData from '@/assets/images/empty/no-data.png'

const props = defineProps({
  icon: {
    type: String,
    default: 'exception',
    validator: (val) => ['exception', 'noData'].includes(val)
  },
  title: {
    type: String
  },
  subTitle: {
    type: String
  }
})
</script>

<style scoped lang="scss">
.exception_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.exception_icon {
  width: 200px;
  height: 200px;
  margin-bottom: 2 * $baseDistance;
}
.no_data_icon {
  width: 80px;
  height: 80px;
  margin-bottom: 2 * $baseDistance;
}
.exception_title {
  @include fontCategory(3);
  font-weight: 500;
  margin-bottom: $baseDistance;
}
.exception_sub_title {
  @include fontCategory();
  margin-bottom: 2 * $baseDistance;
}
</style>
