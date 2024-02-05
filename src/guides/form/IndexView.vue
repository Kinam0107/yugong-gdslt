<template>
  <div class="form_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <FormPlane desc="表单布局、校验、数据提交时候用到"></FormPlane>
      </AnchorItem>
      <AnchorItem label="竖向布局">
        <FormPlane>
          <el-form label-position="top" :model="form" :rules="rules">
            <el-row :gutter="16">
              <el-col :span="8">
                <div class="form_view_label">必填项输入样式</div>
                <el-form-item label="必填的字段名称" prop="item1">
                  <el-input v-model="form.item1" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">选填项输入样式</div>
                <el-form-item label="选填的字段名称">
                  <el-input v-model="form.item2" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">带注释输入样式</div>
                <el-form-item prop="item3">
                  <el-input v-model="form.item3" clearable />
                  <template #label>
                    必填的字段名称
                    <el-icon class="info_filled"><InfoFilled /></el-icon>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">单选样式</div>
                <el-form-item label="必填的字段名称" prop="item4">
                  <el-select v-model="form.item4" style="width: 100%" clearable>
                    <el-option label="已完成选择" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">日期选择样式</div>
                <el-form-item label="必填的字段名称" prop="item5">
                  <el-date-picker v-model="form.item5" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">日期区间选择样式</div>
                <el-form-item label="必填的字段名称" prop="item6">
                  <el-date-picker v-model="form.item6" type="daterange" value-format="YYYY-MM-DD" range-separator="→" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">时间选择样式</div>
                <el-form-item label="必填的字段名称" prop="item7">
                  <el-time-picker v-model="form.item7" value-format="HH:mm:ss" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">带金额单位输入样式</div>
                <el-form-item label="必填的字段名称" prop="item8">
                  <el-input v-model="form.item8" clearable>
                    <template #append>万元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="form_view_label">带网站输入样式</div>
                <el-form-item label="必填的字段名称" prop="item9">
                  <el-input v-model="form.item9" clearable>
                    <template #prepend>http://</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="form_view_label">带筛选项输入样式</div>
                <el-form-item label="必填的字段名称" prop="item11">
                  <el-input v-model="form.item11" clearable>
                    <template #prepend>
                      <el-select style="width: 240px" v-model="form.item10">
                        <el-option label="广东省/广州市/越秀区" value="1" />
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="form_view_label">选择器多选样式</div>
                <el-form-item label="必填的字段名称" prop="item12">
                  <el-select v-model="form.item12" style="width: 100%" multiple clearable>
                    <el-option label="选项一" value="1" />
                    <el-option label="选项二" value="2" />
                    <el-option label="选项三" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="form_view_label">多选框样式</div>
                <el-form-item label="必填的字段名称" prop="item13">
                  <el-checkbox-group v-model="form.item13">
                    <el-checkbox label="1">已选中项状态</el-checkbox>
                    <el-checkbox label="2">已选中项状态</el-checkbox>
                    <el-checkbox label="3" disabled>不可编辑</el-checkbox>
                    <el-checkbox label="4">未选中项状态</el-checkbox>
                    <el-checkbox label="5">未选中项状态</el-checkbox>
                    <el-checkbox label="6">未选中项状态</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="form_view_label">单选框样式</div>
                <el-form-item label="必填的字段名称" prop="item14">
                  <el-radio-group v-model="form.item14">
                    <el-radio label="1">已选中项状态</el-radio>
                    <el-radio label="2">未选中项状态</el-radio>
                    <el-radio label="3">未选中项状态</el-radio>
                    <el-radio label="4">未选中项状态</el-radio>
                    <el-radio label="5">未选中项状态</el-radio>
                    <el-radio label="6">未选中项状态</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="form_view_label">文本框样式</div>
                <el-form-item label="必填的字段名称" prop="item15">
                  <el-input type="textarea" v-model="form.item15" clearable show-word-limit :maxlength="300" :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </FormPlane>
      </AnchorItem>
      <AnchorItem label="横向布局">
        <FormPlane>
          <el-form :model="form" :rules="rules" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="必填的字段名称" prop="item1">
                  <el-input v-model="form.item1" clearable />
                </el-form-item>
                <el-form-item label="选填的字段名称">
                  <el-input v-model="form.item2" clearable />
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item4">
                  <el-select v-model="form.item4" style="width: 100%" clearable>
                    <el-option label="已完成选择" value="1" />
                  </el-select>
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item5">
                  <el-date-picker v-model="form.item5" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item8">
                  <el-input v-model="form.item8" clearable>
                    <template #append>万元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item11">
                  <el-input v-model="form.item11" clearable>
                    <template #prepend>
                      <el-select style="width: 170px" v-model="form.item10">
                        <el-option label="广东省广州市越秀区" value="1" />
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item12">
                  <el-select v-model="form.item12" style="width: 100%" multiple clearable>
                    <el-option label="选项一" value="1" />
                    <el-option label="选项二" value="2" />
                    <el-option label="选项三" value="3" />
                  </el-select>
                </el-form-item>
                <el-form-item label="必填的字段名称" prop="item15">
                  <el-input type="textarea" v-model="form.item15" clearable show-word-limit :maxlength="300" :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </FormPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import FormPlane from './cpns/FormPlane.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const form = reactive({
  item1: '已输入完成',
  item2: '已输入完成',
  item3: '已输入完成',
  item4: '1',
  item5: '2021-05-20',
  item6: ['2021-05-20', '2021-06-08'],
  item7: '16:24:50',
  item8: '1800',
  item9: 'www.dgtest.com',
  item10: '1',
  item11: '洪桥街道东风中路颐德中心9楼',
  item12: ['1', '2', '3'],
  item13: ['1', '2', '3'],
  item14: '1',
  item15:
    '这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述'
})
const rules = reactive({
  item1: [{ required: true, message: '必填', trigger: 'blur' }],
  item3: [{ required: true, message: '必填', trigger: 'blur' }],
  item4: [{ required: true, message: '必填', trigger: 'change' }],
  item5: [{ required: true, message: '必填', trigger: 'change' }],
  item6: [{ required: true, message: '必填', trigger: 'change' }],
  item7: [{ required: true, message: '必填', trigger: 'change' }],
  item8: [{ required: true, message: '必填', trigger: 'blur' }],
  item9: [{ required: true, message: '必填', trigger: 'blur' }],
  item11: [{ required: true, message: '必填', trigger: 'blur' }],
  item12: [{ required: true, message: '必填', trigger: 'change' }],
  item13: [{ required: true, message: '必填', trigger: 'change' }],
  item14: [{ required: true, message: '必填', trigger: 'change' }],
  item15: [{ required: true, message: '必填', trigger: 'blur' }]
})
</script>

<style scoped lang="scss">
.form_view {
  @include mainContentContainer(100%);
}
.form_view_label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.info_filled {
  vertical-align: text-bottom;
  color: $color-placeholdertext;
  cursor: pointer;
}
</style>
