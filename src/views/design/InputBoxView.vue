<template>
  <div class="input_box_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">通过鼠标或键盘输入内容，是最基础的表单域的组件，一般场景下采用中型32px高的输入框为标准尺寸。</div>
    <div class="design_title">基本样式</div>
    <div class="design_example">
      <el-input style="width: 320px" v-model="input1" placeholder="请输入" clearable></el-input>
      <el-input-number style="margin-left: 64px" v-model="input2"></el-input-number>
    </div>
    <div class="design_title">基础尺寸：大40px/中32px/小24px</div>
    <div class="design_example">
      <div style="margin-bottom: 24px">
        <el-input style="width: 320px" size="large" v-model="input3" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" size="large" v-model="input4" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" size="large" disabled v-model="input5" placeholder="请输入"></el-input>
      </div>
      <div style="margin-bottom: 24px">
        <el-input style="width: 320px" v-model="input3" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" v-model="input4" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" disabled v-model="input5" placeholder="请输入"></el-input>
      </div>
      <div style="margin-bottom: 24px">
        <el-input style="width: 320px" size="small" v-model="input3" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" size="small" v-model="input4" placeholder="请输入"></el-input>
        <el-input style="width: 320px; margin-left: 64px" size="small" disabled v-model="input5" placeholder="请输入"></el-input>
      </div>
    </div>
    <div class="design_title">校验提示</div>
    <div class="design_example">
      <div style="display: flex; margin-bottom: 24px">
        <span style="width: 320px; color: #8c8c8c; font-size: 18px">输入正确提示</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">输入错误提示</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">输入提示</span>
      </div>
      <div style="display: flex; margin-bottom: 24px">
        <el-form-item label-width="0">
          <el-input style="width: 320px" v-model="input6" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 64px" validate-status="error" error="输入错误时出现，并说明错误原因" label-width="0">
          <el-input style="width: 320px" v-model="input7" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 64px" label-width="0">
          <el-input style="width: 320px" v-model="input8" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="design_title">搜索样式</div>
    <div class="design_example">
      <div style="display: flex; margin-bottom: 24px">
        <span style="width: 320px; color: #8c8c8c; font-size: 18px">搜索填充</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">搜索无填充</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">带筛选项搜索</span>
      </div>
      <div style="margin-bottom: 24px">
        <el-input class="fill" style="width: 320px" v-model="input9" placeholder="请输入关键词">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-input class="no-fill" style="width: 320px; margin-left: 64px" v-model="input9" placeholder="请输入关键词">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-input class="fill" style="width: 320px; margin-left: 64px" v-model="input9" placeholder="请输入关键词">
          <template #prepend>
            <el-select style="width: 80px" v-model="select" placeholder="筛选">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="design_title">带前缀后缀样式</div>
    <div class="design_example">
      <div style="display: flex; margin-bottom: 24px">
        <span style="width: 320px; color: #8c8c8c; font-size: 18px">带金额单位后缀</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">带网站前缀</span>
        <span style="width: 320px; color: #8c8c8c; font-size: 18px; margin-left: 64px">带网站前/后缀</span>
      </div>
      <div style="margin-bottom: 24px">
        <el-input style="width: 320px" v-model="input10" placeholder="请输入">
          <template #append>万元</template>
        </el-input>
        <el-input style="width: 320px; margin-left: 64px" v-model="input10" placeholder="请输入">
          <template #prepend>http://</template>
        </el-input>
        <el-input style="width: 320px; margin-left: 64px" v-model="input10" placeholder="请输入">
          <template #prepend>http://</template>
          <template #append>.com</template>
        </el-input>
      </div>
    </div>
    <div class="design_title">文本框样式</div>
    <div class="design_example">
      <div style="color: #8c8c8c; font-size: 18px; margin-bottom: 24px">字数限制提示</div>
      <el-input style="margin-bottom: 48px" v-model="input11" type="textarea" placeholder="请输入" show-word-limit :maxlength="100" :rows="5" resize="none"></el-input>
      <div style="color: #8c8c8c; font-size: 18px; margin-bottom: 24px">字数限制提示（已输入）</div>
      <el-input style="margin-bottom: 48px" v-model="input12" type="textarea" placeholder="请输入" show-word-limit :maxlength="100" :rows="5" resize="none"></el-input>
      <div style="color: #8c8c8c; font-size: 18px; margin-bottom: 24px">输入区域可调整</div>
      <el-input style="margin-bottom: 48px" v-model="input11" type="textarea" placeholder="请输入" show-word-limit :rows="5"></el-input>
      <div style="color: #8c8c8c; font-size: 18px; margin-bottom: 24px">输入区域可调整（已输入）</div>
      <el-input style="margin-bottom: 48px" v-model="input12" type="textarea" placeholder="请输入" show-word-limit :rows="5"></el-input>
      <!-- <div style="color: #8c8c8c; font-size: 18px; margin-bottom: 24px">文本编辑器</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const input2 = ref(0)
const input3 = ref('')
const input4 = ref('已完成输入')
const input5 = ref('只读文本')
const input6 = ref('已完成输入')
const input7 = ref('已完成输入')
const input8 = ref('')
const input9 = ref('')
const input10 = ref('')
const input11 = ref('')
const input12 = ref('这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述')
const select = ref('')
</script>

<style scoped lang="scss">
.input_box_view {
  @include designMainContentContainer();
}
.design_example {
  margin-bottom: 80px;
}
.fill {
  ::v-deep(.el-input-group__append) {
    background-color: $color-primary;
    color: #ffffff;
    box-shadow: none;
  }
}
.no-fill {
  ::v-deep(.el-input-group__append) {
    background-color: transparent;
  }
}
</style>
