<template>
  <el-popover popper-class="export_popper" placement="top" trigger="manual" :visible="visible" :width="165">
    <span v-if="status == 'pending'">
      <i class="export_icon loading_icon"></i>
      数据正在导出中…
    </span>
    <span v-else-if="status == 'success'">
      <i class="export_icon success_icon"></i>
      导出成功
      <span class="time">{{ spend ? `(${spend}s)` : '' }}</span>
    </span>
    <template #reference>
      <slot :disabled="visible" :exported="exported"></slot>
    </template>
  </el-popover>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '@/api/axios'
import { ElMessage } from 'element-plus'
import { downloadBlob } from '@/utils/util'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  params: Object,
  name: String,
  largeAmount: {
    // 大批量数据导出
    type: Boolean,
    default: false
  }
})

const status = ref('finish')
const spend = ref()
const visible = computed(() => status.value !== 'finish')

let intervaler = null

const exported = () => {
  if (props.largeAmount) {
    status.value = 'pending'
    spend.value = 3
  }
  axios({
    method: 'get',
    url: props.url,
    params: props.params,
    responseType: 'blob'
  })
    .then((res) => {
      downloadBlob(res, props.name)
      if (props.largeAmount) {
        status.value = 'success'
        intervaler = setInterval(() => {
          if (spend.value > 1) {
            spend.value -= 1
          } else {
            status.value = 'finish'
            clearInterval(intervaler)
          }
        }, 1000)
      }
    })
    .catch(() => {
      if (props.largeAmount) status.value = 'finish'
      ElMessage.error('导出失败')
    })
}

defineExpose({
  exported
})
</script>

<style lang="scss">
.el-popover.export_popper {
  @include fontCategory(4);
  text-align: center;
  .export_icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 0.5 * $baseDistance;
    &.loading_icon {
      background-image: url('@/assets/images/loading-export.png');
      background-size: 100% 100%;
      animation: rotation 1.5s linear infinite;
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    &.success_icon {
      background-image: url('@/assets/images/success-export.png');
      background-size: 100% 100%;
    }
  }
  .time {
    color: $color-primary;
  }
}
</style>
