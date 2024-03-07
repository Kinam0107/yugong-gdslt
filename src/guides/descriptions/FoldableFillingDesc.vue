<template>
  <el-collapse model-value="1" accordion>
    <el-collapse-item title="省某某厅局应用平台开发项目" name="1">
      <el-form label-position="top" :model="form" :rules="rules">
        <el-row :gutter="48">
          <el-col :span="24">
            <el-form-item label="必填的字段名称" prop="item1">
              <el-input v-model="form.item1" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="必填的字段名称" prop="item2">
              <el-select v-model="form.item2" style="width: 100%" clearable>
                <el-option label="已完成选择" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="必填的字段名称" prop="item3">
              <el-date-picker v-model="form.item3" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="必填的字段名称" prop="item4">
              <el-date-picker v-model="form.item4" type="daterange" value-format="YYYY-MM-DD" range-separator="→" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="必填的字段名称" prop="item5">
              <el-input type="textarea" v-model="form.item5" clearable show-word-limit :maxlength="300" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="省某某厅局应用平台开发项目" name="2"></el-collapse-item>
    <el-collapse-item title="省某某厅局应用平台开发项目" name="3"></el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  item1: '已完成输入',
  item2: '1',
  item3: '2021-05-20',
  item4: ['2021-05-20', '2021-06-08'],
  item5:
    '这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述'
})

const rules = reactive({
  item1: [{ required: true, message: '必填', trigger: 'blur' }],
  item2: [{ required: true, message: '必填', trigger: 'change' }],
  item3: [{ required: true, message: '必填', trigger: 'change' }],
  item4: [{ required: true, message: '必填', trigger: 'change' }],
  item5: [{ required: true, message: '必填', trigger: 'blur' }]
})
</script>

<style scoped lang="scss">
.el-collapse {
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  :deep(.el-collapse-item) {
    .el-collapse-item__header {
      padding-left: $baseDistance;
      background-color: #f8f9fb;
      &.is-active {
        border-bottom: 1px solid #ebeef5;
      }
    }
    .el-collapse-item__content {
      padding: $baseDistance;
    }
  }
}
</style>
