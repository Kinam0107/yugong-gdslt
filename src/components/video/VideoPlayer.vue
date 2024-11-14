<template>
  <div v-show="!failure" :id="props.playerId" class="video_player"></div>
  <div v-show="failure" class="video_player empty">
    <img src="@/assets/images/empty/camera.png" />
    <span>视频已离线</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import axios from '@/api/axios'
const props = defineProps({
  playerId: {
    type: String,
    default: 'VideoPlayer'
  },
  code: {
    type: String,
    default: '',
    required: true
  }
})

watch(
  () => props.code,
  (val) => {
    if (val) {
      failure.value = false
      getPreviewStreamUrl()
    }
  }
)
onMounted(() => {
  if (props.code) {
    getPreviewStreamUrl()
  }
})
const getPreviewStreamUrl = (times, code) => {
  axios
    .yw({
      url: '/haikang/getCameraPreviewUrl',
      method: 'get',
      params: {
        cameraIndexCode: code || props.code,
        protocol: 'ws'
      }
    })
    .then((res) => {
      if (res.code == 1) {
        play(res.data, times)
      } else {
        ElMessage.error(res.message)
      }
    })
}

let loading = null
let player = null
let mode = 0 // 解码类型：0=mse(flv); 1=jsdecoder
let urls = ''
let times = 0
const errorCode = {
  '0x12f900001': '接口调用参数错误',
  '0x12f900002': '不在播放状态',
  '0x12f900003': '仅回放支持该功能',
  '0x12f900004': '普通模式不支持该功能',
  '0x12f900005': '高级模式不支持该功能',
  '0x12f900006': '高级模式的解码库加载失败',
  '0x12f910000': 'websocket连接失败，请检查网络是否通畅，URL是否正确',
  '0x12f910010': '取流失败',
  '0x12f910011': '流中断，电脑配置过低，程序卡主线程都可能导致流中断',
  '0x12f910014': '没有音频数据',
  '0x12f910015': '找不到对应websocket，取流套接字被动关闭',
  '0x12f910016': 'websocket不在连接状态',
  '0x12f910017': '不支持智能信息展示',
  '0x12f910018': 'websocket长时间未收到message',
  '0x12f910019': 'wss连接失败，原因：端口尚未开通、证书未安装、证书不安全',
  '0x12f910020': '单帧回放不能暂停',
  '0x12f910021': '已是最大倍速',
  '0x12f910022': '已是最小倍速',
  '0x12f910023': 'ws/wss连接超时，网络异常',
  '0x12f920000': '存储空间配额失败',
  '0x12f920001': '请求文件系统失败',
  '0x12f920002': '获取文件失败',
  '0x12f920003': '创建writer失败',
  '0x12f920004': '写数据失败',
  '0x12f930000': '内存不足',
  '0x12f950000': '采集音频失败',
  '0x12f950001': '对讲不支持该音频编码格式',
  '0x0190003e': '取流失败，详情根据错误码在运管后台进行查询'
}

const play = (urls_, times_) => {
  if (player) {
    stopPlay()
  }
  times = times_ || 0
  urls = urls_
  if (!window.JSPlugin) {
    loadScript('../../../h5player/h5player.min.js').then(() => {
      init()
      createPlayer()
      realplay()
    })
  } else {
    init()
    createPlayer()
    realplay()
  }
}

const loadScript = (src) => {
  return new Promise((resolve) => {
    let scriptEl = document.createElement('script')
    scriptEl.type = 'text/javascript'
    scriptEl.src = src
    scriptEl.onload = () => {
      resolve()
    }
    document.body.appendChild(scriptEl)
  })
}

const init = () => {
  // 设置播放容器的宽高并监听窗口大小变化
  window.addEventListener('resize', () => {
    player.JS_Resize()
  })
}

const createPlayer = () => {
  player = new window.JSPlugin({
    szId: props.playerId, // 节点ID
    szBasePath: '../../../h5player/', // 获取资源路径的运行路径
    iMaxSplit: 4,
    iCurrentSplit: 1, // 当前分屏
    openDebug: false,
    oStyle: {
      borderSelect: 'transparent'
    }
  })
}

/* 预览 */
const failure = ref(false)
const realplay = () => {
  let index = 0 || player.currentWindowIndex
  let playURL = urls
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  player.JS_Play(playURL, { playURL, mode }, index).then(
    () => {
      console.log('播放成功')
      failure.value = false
      loading.close()
    },
    (e) => {
      console.log('播放失败：', e)
      failure.value = true
      ElMessage.error(
        times != 0 ? '二次播放失败，请联系摄像头管理员检查摄像头状态！' : '播放失败：' + (typeof errorCode[e] == 'undefined' ? '取流失败，详情根据错误码在运管后台进行查询' : errorCode[e])
      )
      loading.close()
    }
  )
}

/* 停止预览 */
const stopPlay = () => {
  if (player) {
    player.JS_Stop().then(
      () => {
        console.log('停止播放')
        player = null
      },
      (e) => {
        console.log('停止失败：' + e)
      }
    )
  }
}

onBeforeUnmount(() => {
  stopPlay()
})

defineExpose({ play })
</script>

<style scoped lang="scss">
.video_player {
  width: 100%;
  height: 100%;
  &.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
