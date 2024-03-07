<template>
  <div class="modal_view">
    <AnchorBox active-label="使用场景">
      <AnchorItem label="使用场景">
        <ModalPlane desc="需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。" />
      </AnchorItem>
      <AnchorItem label="信息样式">
        <el-button @click="open1">信息提示操作框，常用于给用户进行二次确认</el-button>
        <el-button @click="open2">信息提示框，常用于告知用户信息</el-button>
        <el-button @click="open3">信息提示框，常用于多层级信息展示</el-button>
        <br />
        <br />
        <el-button @click="open4">成功状态告知提醒</el-button>
        <el-button @click="open5">警示状态告知提醒</el-button>
        <el-button @click="open6">失败状态告知提醒</el-button>
        <br />
        <br />
      </AnchorItem>
      <AnchorItem label="气泡样式">
        <el-popover placement="top" :offset="8" :width="240" trigger="hover" content="这是一段很长的信息说明提示文案这是一段很长的信息说明提示文案">
          <template #reference>
            <el-button>浅色背景样式</el-button>
          </template>
        </el-popover>
        <el-popover effect="dark" placement="top" :offset="8" :width="240" trigger="hover" content="这是一段很长的信息说明提示文案这是一段很长的信息说明提示文案">
          <template #reference>
            <el-button>深色背景样式</el-button>
          </template>
        </el-popover>
        <el-popover placement="top" :offset="8" :width="240" trigger="click" content="这是一段很长的信息说明提示文案">
          <template #reference>
            <el-button>点击触发（浅色）</el-button>
          </template>
        </el-popover>
        <el-popover effect="dark" placement="top" :offset="8" :width="240" trigger="click" content="这是一段很长的信息说明提示文案">
          <template #reference>
            <el-button>点击触发（深色）</el-button>
          </template>
        </el-popover>
        <br />
        <br />
      </AnchorItem>
      <AnchorItem label="表单样式">
        <ModalPlane desc="表单对话框尺寸分为480px、640px和1080px。根据信息量选择合适的尺寸">
          <el-button @click="dialogVisible1 = true">480px</el-button>
          <el-button @click="dialogVisible2 = true">640px</el-button>
          <el-button @click="dialogVisible3 = true">1080px</el-button>
          <br />
          <br />
          <el-button @click="dialogVisible4 = true">详情描述样式</el-button>
          <el-button @click="dialogVisible5 = true">带表格或列表筛样式</el-button>
          <el-button @click="dialogVisible6 = true">带选项卡切换样式</el-button>
        </ModalPlane>
        <el-dialog v-model="dialogVisible1" title="修改密码" width="480">
          <el-form label-position="top">
            <el-form-item label="旧密码" required>
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="新密码" required>
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="确认密码" required>
              <el-input placeholder="请输入" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible1 = false">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible2" title="标题" width="640">
          <el-form label-position="top">
            <el-row :gutter="48">
              <el-col :span="24">
                <el-form-item label="必填的字段名称" required>
                  <el-input model-value="已完成输入" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="必填的字段名称" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="已完成选择" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="必填的字段名称" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="已完成选择" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="必填的字段名称" required>
                  <el-select :model-value="['1', '2', '3']" style="width: 100%" multiple>
                    <el-option label="选项一" value="1" />
                    <el-option label="选项二" value="2" />
                    <el-option label="选项三" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="必填的字段名称" required>
                  <el-input
                    type="textarea"
                    model-value="这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述"
                    show-word-limit
                    :maxlength="300"
                    :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible2 = false">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible3" title="新增系统" width="1080">
          <el-form label-position="top">
            <el-row :gutter="48">
              <el-col :span="24">
                <el-form-item label="系统名称" required>
                  <el-input model-value="省交通运输厅交通综合执法信息系统" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="系统类型" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="业务应用系统" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部署方式" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="省级集中部署" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部署位置" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="自建机房" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用范围" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="覆盖省级" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否垂管" required>
                  <el-select model-value="1" style="width: 100%">
                    <el-option label="省垂" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="接入网络类型" required>
                  <el-checkbox-group :model-value="['1', '2', '3']">
                    <el-checkbox label="1">政务外网</el-checkbox>
                    <el-checkbox label="2">政务内网</el-checkbox>
                    <el-checkbox label="3">业务专网</el-checkbox>
                    <el-checkbox label="4">互联网</el-checkbox>
                    <el-checkbox label="5">内部局域网</el-checkbox>
                    <el-checkbox label="6">未联网</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="终端情况" required>
                  <el-checkbox-group :model-value="['1']">
                    <el-checkbox label="1">PC端(含大屏展示等)</el-checkbox>
                    <el-checkbox label="2">移动端</el-checkbox>
                    <el-checkbox label="3">一体机</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="功能描述" required>
                  <el-input
                    type="textarea"
                    model-value="这是一段很长很长的描述内容，这是一段很长很长的描述内容，这是一段很长很长的描述内容，这是一段很长很长的描述内容，这是一段很长很长的描述内容，这是一段很长很长的描述内容"
                    show-word-limit
                    :maxlength="300"
                    :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible3 = false">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible4" title="标题" width="640">
          <el-descriptions :column="2">
            <el-descriptions-item label="项目名称：" :span="2">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目</el-descriptions-item>
            <el-descriptions-item label="项目编号：">2020081458</el-descriptions-item>
            <el-descriptions-item label="申报单位：">省某某厅局</el-descriptions-item>
            <el-descriptions-item label="立项依据：" :span="2">
              中共广东省委办公厅、广东省人民政府办公厅《关于全域推进农村人居环境整治建设生态宜居美丽乡村的实施方案》（粤办发【2018】21号），省委实施乡村振兴战略领导小组关于印发《广东省关于深入推进“千村示范、万村整治”工程的行动方案》（粤乡振组【2019】4号），《中共广东省委、广东省人民政府关于加强乡村振兴重点工作决胜全面建成小康社会的实施意见》（粤发【2020】4号），《广东省人民政府关于全面推进农房管控和乡村风貌提升的指导意见》
            </el-descriptions-item>
            <el-descriptions-item label="项目附件：" :span="2">
              <ul class="file_list">
                <li>
                  <SvgIcon class="icon" icon="pdf-fill" />
                  <div class="name">省某某厅局应用平台产业化管理系统运营服务开发项目说明书.pdf</div>
                  <el-icon class="download"><Download /></el-icon>
                </li>
                <li>
                  <SvgIcon class="icon" icon="pdf-fill" />
                  <div class="name">省某某厅局应用平台产业化管理系统运营服务开发项目立项方案.pdf</div>
                  <el-icon class="download"><Download /></el-icon>
                </li>
              </ul>
            </el-descriptions-item>
          </el-descriptions>
        </el-dialog>
        <el-dialog v-model="dialogVisible5" title="标题" width="640">
          <el-input class="fill" placeholder="请输入关键词">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-table :data="tableData" style="width: 100%; margin-top: 24px" border>
            <el-table-column type="selection" width="38" />
            <el-table-column prop="xmmc" label="项目名称" min-width="220px" />
            <el-table-column prop="pfje" label="批复金额(万元)" align="right" width="120px" />
            <el-table-column label="负责人" width="80px">张三</el-table-column>
            <el-table-column label="操作" width="104px" header-align="right" align="left">
              <el-button size="small" link type="primary">编辑</el-button>
              <el-button size="small" link type="primary">删除</el-button>
            </el-table-column>
          </el-table>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible5 = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible5 = false">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible6" width="640">
          <template #header>
            <div style="font-size: 16px; font-weight: 500; line-height: 24px; color: #262626">标题</div>
            <TabBar v-model="tab" :tabs="['已选中', '未选中项1', '未选中项2', '未选中项3', '未选中项4']" style="margin-bottom: -16px"></TabBar>
          </template>
          <template v-if="tab === '已选中'">
            <el-descriptions :column="2">
              <el-descriptions-item label="项目名称：" :span="2">省某某厅局应用平台产业化管理系统运营服务（2022-2023年）开发项目</el-descriptions-item>
              <el-descriptions-item label="项目编号：">2020081458</el-descriptions-item>
              <el-descriptions-item label="申报单位：">省某某厅局</el-descriptions-item>
              <el-descriptions-item label="立项依据：" :span="2">
                中共广东省委办公厅、广东省人民政府办公厅《关于全域推进农村人居环境整治建设生态宜居美丽乡村的实施方案》（粤办发【2018】21号），省委实施乡村振兴战略领导小组关于印发《广东省关于深入推进“千村示范、万村整治”工程的行动方案》（粤乡振组【2019】4号），《中共广东省委、广东省人民政府关于加强乡村振兴重点工作决胜全面建成小康社会的实施意见》（粤发【2020】4号），《广东省人民政府关于全面推进农房管控和乡村风貌提升的指导意见》
              </el-descriptions-item>
              <el-descriptions-item label="项目附件：" :span="2">
                <ul class="file_list">
                  <li>
                    <SvgIcon class="icon" icon="pdf-fill" />
                    <div class="name">省某某厅局应用平台产业化管理系统运营服务开发项目说明书.pdf</div>
                    <el-icon class="download"><Download /></el-icon>
                  </li>
                  <li>
                    <SvgIcon class="icon" icon="pdf-fill" />
                    <div class="name">省某某厅局应用平台产业化管理系统运营服务开发项目立项方案.pdf</div>
                    <el-icon class="download"><Download /></el-icon>
                  </li>
                </ul>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-dialog>
      </AnchorItem>
      <AnchorItem label="抽屉样式">
        <el-button @click="drawer = true">常用于高级筛选，将复杂的搜索条件集合并进行填写，提交命令后刷新当前列表结果</el-button>
        <el-drawer v-model="drawer" title="高级筛选">
          <el-form label-position="top">
            <el-form-item label="必填的字段名称" required>
              <el-input model-value="已完成输入" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="必填的字段名称" required>
              <el-select model-value="1" style="width: 100%">
                <el-option label="已完成选择" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="必填的字段名称" required>
              <el-select model-value="1" style="width: 100%">
                <el-option label="已完成选择" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="必填的字段名称" required>
              <el-select model-value="1" style="width: 100%">
                <el-option label="已完成选择" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="必填的字段名称" required>
              <el-date-picker model-value="2021-05-20" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="drawer = false">确定</el-button>
          </template>
        </el-drawer>
      </AnchorItem>
    </AnchorBox>
  </div>
</template>

<script setup>
import AnchorBox from '@/components/anchor/AnchorBox.vue'
import AnchorItem from '@/components/anchor/AnchorItem.vue'
import ModalPlane from './cpns/ModalPlane.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import successSvg from './cpns/success.svg'
import warningSvg from './cpns/warning.svg'
import errorSvg from './cpns/error.svg'
import { ref } from 'vue'
import { Download, Search } from '@element-plus/icons-vue'

const open1 = () => {
  ElMessageBox.confirm('是否确认提交【根据具体标题而定】', '信息提示', {
    type: 'warning',
    showClose: false,
    cancelButtonText: '取消',
    confirmButtonText: '确定'
  })
    .then(() => ElMessage({ type: 'success', message: '确定' }))
    .catch(() => ElMessage({ type: 'info', message: '取消' }))
}
const open2 = () => {
  ElMessageBox.alert('这是一段很长的信息说明提示文案', '信息提示', {
    type: 'info',
    showClose: false,
    confirmButtonText: '确定'
  })
}
const open3 = () => {
  ElMessageBox.confirm(
    `
    <div>该服务存在申请使用的应用系统，请提前通知申请使用方后，再做下架处理</div>
    <div style="padding: 16px 40px; background-color: #F8F9FB;">
      <div style="color: #262626">当前使用服务的应用：</div>
      <div>某某应用系统</div>
      <div>某某森林防火系统</div>
    </div>
    `,
    '确认是否从资产目录下架吗？',
    {
      showClose: false,
      dangerouslyUseHTMLString: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定'
    }
  )
}
const open4 = () => {
  ElMessageBox.alert(
    `
    <img src="${successSvg}"/>
    <div style="font-size: 18px; line-height: 26px; font-weight: 500; color: #262626; margin-top: 16px">发布成功</div>
    <div style="font-size: 14px; line-height: 22px; font-weight: 400; color: #595959; margin-top: 8px">这是一段很长的信息说明提示文案</div>
    `,
    {
      showClose: false,
      center: true,
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    }
  )
}
const open5 = () => {
  ElMessageBox.alert(
    `
    <img src="${warningSvg}"/>
    <div style="font-size: 18px; line-height: 26px; font-weight: 500; color: #262626; margin-top: 16px">发布失败</div>
    <div style="font-size: 14px; line-height: 22px; font-weight: 400; color: #595959; margin-top: 8px">这是一段很长的信息说明提示文案</div>
    `,
    {
      showClose: false,
      center: true,
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    }
  )
}
const open6 = () => {
  ElMessageBox.alert(
    `
    <img src="${errorSvg}"/>
    <div style="font-size: 18px; line-height: 26px; font-weight: 500; color: #262626; margin-top: 16px">发布失败</div>
    <div style="font-size: 14px; line-height: 22px; font-weight: 400; color: #595959; margin-top: 8px">这是一段很长的信息说明提示文案</div>
    `,
    {
      showClose: false,
      center: true,
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    }
  )
}
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const dialogVisible4 = ref(false)
const dialogVisible5 = ref(false)
const dialogVisible6 = ref(false)
const tableData = [
  { id: 1, xmmc: '省某某厅局应用平台开发项目', pfje: '3888.00' },
  { id: 2, xmmc: '省某某厅局应用平台开发项目', pfje: '1688.00' },
  { id: 3, xmmc: '省某某厅局应用平台开发项目', pfje: '1288.00' },
  { id: 4, xmmc: '省某某厅局应用平台开发项目', pfje: '1088.00' },
  { id: 5, xmmc: '省某某厅局应用平台开发项目', pfje: '888.00' }
]
const tab = ref('已选中')
const drawer = ref(false)
</script>

<style scoped lang="scss">
.modal_view {
  @include mainContentContainer(100%);
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
}
.fill {
  :deep(.el-input-group__append) {
    background-color: $color-primary;
    color: #ffffff;
    box-shadow: none;
  }
}
</style>
