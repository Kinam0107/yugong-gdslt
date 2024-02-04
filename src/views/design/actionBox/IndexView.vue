<template>
  <div class="action_box_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <ActionBoxPlane desc="包含单选框、多选框、开关等多个操作场景，根据不同使用需求进行应用。" />
      </AnchorItem>
      <AnchorItem label="单选框">
        <ActionBoxPlane>
          <div style="display: flex">
            <div class="box">
              <div class="box_label">默认</div>
              <el-radio-group v-model="radio1">
                <el-radio label="1">默认状态</el-radio>
              </el-radio-group>
            </div>
            <div class="box">
              <div class="box_label">选中</div>
              <el-radio-group v-model="radio2">
                <el-radio label="1">选中状态</el-radio>
              </el-radio-group>
            </div>
            <div class="box">
              <div class="box_label">禁用</div>
              <el-radio-group v-model="radio1" disabled>
                <el-radio label="1">未选中禁用</el-radio>
              </el-radio-group>
            </div>
            <div class="box">
              <div class="box_label">禁用（选中）</div>
              <el-radio-group v-model="radio2" disabled>
                <el-radio label="1">选中禁用</el-radio>
              </el-radio-group>
            </div>
          </div>
        </ActionBoxPlane>
      </AnchorItem>
      <AnchorItem label="多选框">
        <ActionBoxPlane>
          <div style="display: flex">
            <div class="box">
              <div class="box_label">默认</div>
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="1">默认状态</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="box">
              <div class="box_label">选中</div>
              <el-checkbox-group v-model="checkList2">
                <el-checkbox label="1">选中状态</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="box">
              <div class="box_label">半选</div>
              <el-checkbox indeterminate>半选状态</el-checkbox>
            </div>
            <div class="box">
              <div class="box_label">禁用</div>
              <el-checkbox-group v-model="checkList1" disabled>
                <el-checkbox label="1">未选中禁用</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="box">
              <div class="box_label">禁用（选中）</div>
              <el-checkbox-group v-model="checkList2" disabled>
                <el-checkbox label="1">选中禁用</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="box">
              <div class="box_label">禁用（半选）</div>
              <el-checkbox indeterminate disabled>半选禁用</el-checkbox>
            </div>
          </div>
        </ActionBoxPlane>
      </AnchorItem>
      <AnchorItem label="开关">
        <ActionBoxPlane>
          <div style="display: flex">
            <div class="box">
              <div class="box_label">关闭</div>
              <el-switch v-model="switch1" size="large" />
              <br />
              <el-switch v-model="switch1" size="small" />
            </div>
            <div class="box">
              <div class="box_label">开启</div>
              <el-switch v-model="switch2" size="large" />
              <br />
              <el-switch v-model="switch2" size="small" />
            </div>
            <div class="box">
              <div class="box_label">禁用（关）</div>
              <el-switch v-model="switch1" size="large" disabled />
              <br />
              <el-switch v-model="switch1" size="small" disabled />
            </div>
            <div class="box">
              <div class="box_label">禁用（开）</div>
              <el-switch v-model="switch2" size="large" disabled />
              <br />
              <el-switch v-model="switch2" size="small" disabled />
            </div>
          </div>
        </ActionBoxPlane>
      </AnchorItem>
      <AnchorItem label="评分">
        <ActionBoxPlane>
          <div style="display: flex">
            <div class="box2">
              <div class="box_label">默认</div>
              <el-rate v-model="rate1" size="large" />
            </div>
            <div class="box2">
              <div class="box_label">半星带文字描述</div>
              <el-rate v-model="rate2" allow-half :texts="['极差', '差', '一般', '满意', '非常满意']" show-text />
            </div>
            <div class="box2">
              <div class="box_label">半星带评分</div>
              <el-rate v-model="rate2" allow-half show-score score-template="{value} 分" />
            </div>
          </div>
        </ActionBoxPlane>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ActionBoxPlane from './cpns/ActionBoxPlane.vue'
import { ref } from 'vue'

const radio1 = ref('')
const radio2 = ref('1')
const checkList1 = ref([])
const checkList2 = ref(['1'])
const switch1 = ref(false)
const switch2 = ref(true)
const rate1 = ref(3)
const rate2 = ref(3.5)
</script>

<style scoped lang="scss">
.action_box_view {
  @include mainContentContainer(100%);
  .box {
    width: 12.5%;
  }
  .box2 {
    width: 20%;
  }
  .box_label {
    @include fontCategory(3);
    color: $color-prompttext;
    margin-bottom: $baseDistance;
  }
}
</style>
