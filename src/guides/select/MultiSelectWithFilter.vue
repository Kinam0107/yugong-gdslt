<template>
  <div>
    <div class="label">多选（带搜索）</div>
    <el-select multiple v-model="value" placeholder="请选择" style="width: 100%">
      <template #empty>
        <el-input class="no-fill" v-model="input" placeholder="请输入关键字">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-checkbox-group class="check_group" v-model="value">
          <el-checkbox v-for="item in data" :key="item" :label="item" />
        </el-checkbox-group>
      </template>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const DATA = ['选项一', '选项二', '选项三', '选项四', '选项五', '选项六', '选项七']
const value = ref(['选项二', '选项三'])
const input = ref('')
const data = ref(DATA)
watch(input, (val) => {
  if (val) {
    data.value = data.value.filter((e) => e.indexOf(val) > -1)
  } else {
    data.value = DATA
  }
})
</script>

<style scoped lang="scss">
.label {
  @include fontCategory(3);
  color: $color-prompttext;
  margin-bottom: $baseDistance;
}
.no-fill {
  padding: 8px 12px;
  :deep(.el-input-group__append) {
    background-color: transparent;
  }
}
.check_group {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
</style>
