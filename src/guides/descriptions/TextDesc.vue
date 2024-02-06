<template>
  <el-descriptions :column="3">
    <el-descriptions-item label="项目名称：" :span="3">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目</el-descriptions-item>
    <el-descriptions-item label="项目编号：">2020081458</el-descriptions-item>
    <el-descriptions-item label="申报单位：">省某某厅局</el-descriptions-item>
    <el-descriptions-item label="批复金额：">3888.00万元</el-descriptions-item>
    <el-descriptions-item label="批复时间：">2020-03-25</el-descriptions-item>
    <el-descriptions-item label="项目类型：">基础设施服务；软件开发服务</el-descriptions-item>
    <el-descriptions-item label="管理方式：">审批制</el-descriptions-item>
    <el-descriptions-item label="负责人：">张三</el-descriptions-item>
    <el-descriptions-item label="实施单位：">广州市某某信息服务有限公司</el-descriptions-item>
    <el-descriptions-item label="实施周期：">12个月</el-descriptions-item>
    <el-descriptions-item label="立项依据：" :span="3">
      中共广东省委办公厅、广东省人民政府办公厅《关于全域推进农村人居环境整治建设生态宜居美丽乡村的实施方案》（粤办发【2018】21号），省委实施乡村振兴战略领导小组关于印发《广东省关于深入推进“千村示范、万村整治”工程的行动方案》（粤乡振组【2019】4号），《中共广东省委、广东省人民政府关于加强乡村振兴重点工作决胜全面建成小康社会的实施意见》（粤发【2020】4号），《广东省人民政府关于全面推进农房管控和乡村风貌提升的指导意见》
    </el-descriptions-item>
    <el-descriptions-item label="项目附件：" :span="3">
      <ul class="file_list">
        <li>
          <SvgIcon class="icon" icon="pdf-fill" />
          <div class="name">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目说明书.pdf</div>
          <el-icon class="download"><Download /></el-icon>
        </li>
        <li>
          <SvgIcon class="icon" icon="pdf-fill" />
          <div class="name">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目立项方案.pdf</div>
          <el-icon class="download"><Download /></el-icon>
        </li>
        <li>
          <SvgIcon class="icon" icon="pdf-fill" />
          <div class="name">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目专家评审意见.pdf</div>
          <el-icon class="download"><Download /></el-icon>
        </li>
      </ul>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
ul.file_list {
  width: calc(100% - 80px);
  li {
    display: flex;
    align-items: center;
    .icon {
      font-size: 16px;
      color: #f13939;
    }
    .name {
      padding: 0 2 * $baseDistance 0 0.5 * $baseDistance;
      @include fontCategory();
      color: $color-explaintext;
    }
    .download {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>
