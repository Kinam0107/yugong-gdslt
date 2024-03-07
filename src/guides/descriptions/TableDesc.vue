<template>
  <el-descriptions :column="3" border>
    <el-descriptions-item label="固定宽度标题" :span="3">这是一个较长的单行标题这是一个较长的单行标题这是一个较长的单行标题</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较少单元格选择填充内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较多的单元格自动布局的上下模式选择适应内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较少单元格选择填充内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较少单元格选择填充内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较多的单元格自动布局的上下模式选择适应内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题">内容较少单元格选择填充内容</el-descriptions-item>
    <el-descriptions-item label="固定宽度标题" :span="3">
      中共广东省委办公厅、广东省人民政府办公厅《关于全域推进农村人居环境整治建设生态宜居美丽乡村的实施方案》（粤办发【2018】21号），省委实施乡村振兴战略领导小组关于印发《广东省关于深入推进“千村示范、万村整治”工程的行动方案》（粤乡振组【2019】4号），《中共广东省委、广东省人民政府关于加强乡村振兴重点工作决胜全面建成小康社会的实施意见》（粤发【2020】4号），《广东省人民政府关于全面推进农房管控和乡村风貌提升的指导意见》
    </el-descriptions-item>
    <el-descriptions-item label="固定宽度标题" :span="3">
      中共广东省委办公厅、广东省人民政府办公厅《关于全域推进农村人居环境整治建设生态宜居美丽乡村的实施方案》（粤办发【2018】21号），省委实施乡村振兴战略领导小组关于印发《广东省关于深入推进“千村示范、万村整治”工程的行动方案》（粤乡振组【2019】4号），《中共广东省委、广东省人民政府关于加强乡村振兴重点工作决胜全面建成小康社会的实施意见》（粤发【2020】4号），《广东省人民政府关于全面推进农房管控和乡村风貌提升的指导意见》
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped lang="scss">
.el-descriptions {
  :deep(.el-descriptions__body) {
    .el-descriptions__label {
      width: 120px;
      text-align: center;
    }
  }
}
</style>
