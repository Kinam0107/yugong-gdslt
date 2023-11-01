<template>
  <el-popover placement="bottom" :width="200" trigger="click" @before-enter="flag = false" @after-leave="flag = true">
    <template #reference>
      <el-button disabled @click="flag = !flag">
        按钮
        <el-icon style="margin-left: 8px">
          <ArrowUp v-if="!flag" />
          <ArrowDown v-else />
        </el-icon>
      </el-button>
    </template>
    <div>下拉内容</div>
  </el-popover>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
const flag = ref(true)
</script>
