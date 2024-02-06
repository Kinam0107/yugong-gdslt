<template>
  <el-timeline>
    <el-timeline-item v-for="(activity, index) in activities" :key="index" hide-timestamp color="#36b29e">
      <div class="node">{{ activity.node }}</div>
      <div class="info">
        <span>{{ activity.person }}</span>
        <span>{{ activity.timestamp }}</span>
      </div>
      <div class="content">{{ activity.content }}</div>
      <div class="file" v-if="activity.file">
        <SvgIcon style="font-size: 16px; color: #f13939" icon="pdf-fill" />
        {{ activity.file }}
        <el-icon style="cursor: pointer; color: #36b29e"><Download /></el-icon>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
const activities = [
  {
    node: '审核',
    person: '张小明（省某某某厅某某处-经办人）',
    timestamp: '2020-03-12 11:10:22',
    content: '这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述'
  },
  {
    node: '签发',
    person: '林小芳（省某某某厅某某处-经办人）',
    timestamp: '2020-03-10 11:10:22',
    content: '这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述'
  },
  {
    node: '转办',
    person: '黄小峰（省某某某厅某某处-经办人）',
    timestamp: '2020-03-09 11:10:22',
    content: '这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述',
    file: '省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目说明书.pdf'
  }
]
</script>

<style scoped lang="scss">
.node {
  @include fontCategory();
  color: $color-titletext;
  font-weight: 500;
}
.info {
  display: flex;
  justify-content: space-between;
  @include fontCategory(5);
  color: $color-explaintext;
  margin: $baseDistance 0;
}
.content {
  padding: $baseDistance 2 * $baseDistance;
  @include fontCategory(5);
  color: $color-titletext;
  background-color: #f8f9fb;
}
.file {
  display: flex;
  align-items: center;
  gap: $baseDistance;
  margin-top: $baseDistance;
  padding: $baseDistance 2 * $baseDistance;
  @include fontCategory(5);
  color: $color-explaintext;
  background-color: #f8f9fb;
}
</style>
