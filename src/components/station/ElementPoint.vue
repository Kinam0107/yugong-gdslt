<template>
  <el-dialog v-model="dialogVisible" :title="props.info.facName" width="1200" append-to-body>
    <el-descriptions :column="2">
      <el-descriptions-item label="对象名称">{{ props.info.facName }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ props.info.facType }}</el-descriptions-item>
      <el-descriptions-item label="位置">{{ props.info.facLoca == 1 ? '上游' : '下游' }}</el-descriptions-item>
      <el-descriptions-item label="经纬度">{{ props.info.lng }}, {{ props.info.lat }}</el-descriptions-item>
      <el-descriptions-item label="所在位置" :span="2">{{ props.info.loc }}</el-descriptions-item>
      <el-descriptions-item label="单位名称">{{ props.info.unit }}</el-descriptions-item>
      <el-descriptions-item label="单位简介">{{ props.info.blurb }}</el-descriptions-item>
      <el-descriptions-item label="对接人">{{ props.info.contactPerson }}</el-descriptions-item>
      <el-descriptions-item label="联系方式">{{ props.info.contact }}</el-descriptions-item>
      <el-descriptions-item label="历史事件">{{ props.info.historicalEvent }}</el-descriptions-item>
      <el-descriptions-item label="协同职责">{{ props.info.coordination }}</el-descriptions-item>
      <el-descriptions-item label="相关图片" :span="2">{{ props.info.fileId }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['update:modelValue'])
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss"></style>
