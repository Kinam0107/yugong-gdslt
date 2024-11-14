<template>
  <div v-if="props.modelValue" class="video_popup">
    <div class="top">
      <div class="name">{{ props.name }}</div>
      <div class="count">
        <template v-if="props.prcd">
          <span class="text">视频</span>
          <span class="number">{{ videoList.length }}</span>
          <span class="text">个</span>
        </template>
      </div>
      <el-icon color="#46FDFF" size="24" style="cursor: pointer" @click="close"><CloseBold /></el-icon>
    </div>
    <div class="body">
      <VideoPlayer v-if="prcd" :code="activeVideoCode" />
      <VideoPlayer v-else :code="props.code" />
    </div>
    <div class="selection" v-if="props.prcd">
      <el-icon color="#46FDFF" size="26" style="cursor: pointer" @click="scrollList(-695)"><ArrowLeftBold /></el-icon>
      <ul class="video_list" ref="refVideoList">
        <li v-for="item in videoList" :key="item.id" :class="{ active: item.cameraCode === activeVideoCode }" @click="playVideo(item.cameraCode)">
          <img class="icon" v-if="item.cameraName.includes('球机')" src="@/assets/images/icons/cameraSpherical.png" />
          <img class="icon" v-else src="@/assets/images/icons/cameraGunShaped.png" />
          <div class="name">{{ item.cameraName }}</div>
          <i class="state" :style="{ background: item.state == 1 ? '#47F5A7' : '#F7B500' }"></i>
        </li>
      </ul>
      <el-icon color="#46FDFF" size="26" style="cursor: pointer" @click="scrollList(695)"><ArrowRightBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import VideoPlayer from './VideoPlayer.vue'
import { ref, watch } from 'vue'
import axios from '@/api/axios'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  prcd: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const activeVideoCode = ref('')
const playVideo = (code) => {
  activeVideoCode.value = code
}

const videoList = ref([])
watch(
  () => props.prcd,
  (val) => {
    if (val) {
      axios
        .yw({
          url: '/camera/page',
          method: 'get',
          params: {
            prcd: val,
            current: 1,
            size: 10000
          }
        })
        .then((res) => {
          videoList.value = res.data.records || []
        })
        .catch(() => {
          videoList.value = []
        })
        .finally(() => {
          let index = videoList.value.findIndex((e) => e.state == 1)
          activeVideoCode.value = videoList.value.length ? videoList.value[index > -1 ? index : 0].cameraCode : ''
        })
    }
  }
)

const refVideoList = ref()
const scrollList = (val) => {
  let distance = refVideoList.value.scrollLeft
  distance += val
  refVideoList.value.scrollTo({
    behavior: 'smooth',
    left: distance
  })
}

const close = () => {
  activeVideoCode.value = ''
  videoList.value = []
  emits('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.video_popup {
  position: fixed;
  top: 88px;
  right: 0;
  width: 750px;
  border-radius: 2px;
  background: rgba(0, 15, 29, 0.8);
  border: 1px solid rgba(133, 243, 255, 0.3);
  box-shadow: inset 0px 0px 14px 0px rgba(0, 161, 255, 0.3);
  z-index: 1;
  .top {
    position: relative;
    display: flex;
    align-items: center;
    height: 55px;
    padding: 0 20px;
    .name {
      font-size: 20px;
      font-weight: 500;
    }
    .count {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 24px;
      .text {
        font-size: 14px;
        font-weight: 500;
      }
      .number {
        font-family: PangMenZhengDao;
        font-size: 20px;
        color: #46fdff;
        margin: 0 6px 0 8px;
      }
    }
  }
  .body {
    height: 420px;
    border: 3px solid #286378;
  }
  .selection {
    display: flex;
    align-items: center;
    height: 120px;
    padding: 0 4px;
  }
}
ul.video_list {
  overflow: auto;
  display: flex;
  flex: 1;
  li {
    position: relative;
    flex-basis: 131px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 96px;
    border: 1px solid rgba(65, 158, 255, 0.8);
    cursor: pointer;
    + li {
      margin-left: 8px;
    }
    &.active {
      background: linear-gradient(180deg, rgba(0, 140, 255, 0) 0%, rgba(0, 140, 255, 0.8) 100%);
    }
    .icon {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 32px;
    }
    .name {
      position: absolute;
      top: 48px;
      left: 50%;
      transform: translateX(-50%);
      width: 117px;
      height: 40px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      text-align: center;
      @include ellipsis(2);
    }
    i {
      position: absolute;
      top: 6px;
      right: 7px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}
</style>
