<template>
  <div class="button_view">
    <div class="design_title">按钮样式</div>
    <div class="design_description">
      为提高后期工作效率，按钮做成了左右间距固定的宽度自适应组件，可从此页面中直接调用，修改文字即可，会根据文字长度自适应。
      因为圆角向内指向矩形的中心，这会突显矩形内的内容，这也使得当两个矩形并排时，我们更容易分清哪一条边属于哪一个矩形。因此我们的按钮采用了圆角设计，同时我们希望我们的界面的元素与政务气质相符-干练、简洁、直接，因此我们选择了4px的圆角设计而非采用过于大的圆角尺寸。
    </div>
    <div class="design_title">基础用法</div>
    <div class="design_example">
      <table>
        <tr class="title">
          <td>状态</td>
          <td>主按钮</td>
          <td>次按钮</td>
          <td>虚线按钮</td>
          <td>危险按钮</td>
        </tr>
        <tr class="desc">
          <td></td>
          <td>一级操作，色值为主色，常规状态下同一个页面中不能超过两个主按钮</td>
          <td>次要操作，常规状态下同一个页面中可以多个次按钮</td>
          <td>用于上传图片，表格内新增</td>
          <td>强烈强调的作用，谨慎使用</td>
        </tr>
        <tr>
          <td class="type">默认</td>
          <td>
            <el-button type="primary">按钮</el-button>
          </td>
          <td>
            <el-button>按钮</el-button>
          </td>
          <td>
            <el-button style="border-style: dashed">按钮</el-button>
          </td>
          <td>
            <el-button type="danger">按钮</el-button>
          </td>
        </tr>
        <tr>
          <td class="type">禁用</td>
          <td>
            <el-button type="primary" disabled>按钮</el-button>
          </td>
          <td>
            <el-button disabled>按钮</el-button>
          </td>
          <td>
            <el-button style="border-style: dashed" disabled>按钮</el-button>
          </td>
          <td>
            <el-button type="danger" disabled>按钮</el-button>
          </td>
        </tr>
        <tr>
          <td class="type">加载中</td>
          <td>
            <el-button type="primary" loading>加载中</el-button>
          </td>
          <td>
            <el-button loading>加载中</el-button>
          </td>
          <td>
            <el-button style="border-style: dashed" loading>加载中</el-button>
          </td>
          <td>
            <el-button type="danger" loading>加载中</el-button>
          </td>
        </tr>
        <tr class="title">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="title">
          <td></td>
          <td>带图标主按钮</td>
          <td>次按钮</td>
          <td>文字按钮</td>
          <td>危险按钮</td>
        </tr>
        <tr class="desc">
          <td></td>
          <td>一级操作，色值为主色，常规状态下同一个页面中不能超过两个主按钮</td>
          <td>次要操作，常规状态下同一个页面中可以多个次按钮</td>
          <td>文字按钮有纯文字，文字加图标样式</td>
          <td>强烈强调的作用，谨慎使用</td>
        </tr>
        <tr>
          <td class="type">默认</td>
          <td>
            <el-button type="primary" :icon="Plus">按钮</el-button>
          </td>
          <td>
            <el-button :icon="Plus">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" link :icon="StarFilled">按钮</el-button>
            <el-button link :icon="StarFilled">按钮</el-button>
            <el-button type="primary" link>按钮</el-button>
          </td>
          <td>
            <el-button type="danger" :icon="StarFilled" style="padding: 8px"></el-button>
            <el-button :icon="StarFilled" style="padding: 8px"></el-button>
            <el-button type="primary" link :icon="StarFilled"></el-button>
          </td>
        </tr>
        <tr>
          <td class="type">禁用</td>
          <td>
            <el-button type="primary" :icon="Plus" disabled>按钮</el-button>
          </td>
          <td>
            <el-button :icon="Plus" disabled>按钮</el-button>
          </td>
          <td>
            <el-button type="primary" link :icon="StarFilled" disabled>按钮</el-button>
            <el-button link :icon="StarFilled" disabled>按钮</el-button>
            <el-button type="primary" link disabled>按钮</el-button>
          </td>
          <td>
            <el-button type="danger" :icon="StarFilled" style="padding: 8px" disabled></el-button>
            <el-button :icon="StarFilled" style="padding: 8px" disabled></el-button>
            <el-button type="primary" link :icon="StarFilled" disabled></el-button>
          </td>
        </tr>
        <tr>
          <td class="type">加载中</td>
          <td>
            <el-button type="primary" :icon="Plus" loading>加载中</el-button>
          </td>
          <td>
            <el-button :icon="Plus" loading>加载中</el-button>
          </td>
          <td>
            <el-button type="primary" link :icon="StarFilled" loading>加载中</el-button>
            <el-button link :icon="StarFilled" loading>加载中</el-button>
            <el-button type="primary" link loading></el-button>
          </td>
          <td>
            <el-button type="danger" :icon="StarFilled" style="padding: 8px" loading></el-button>
            <el-button :icon="StarFilled" style="padding: 8px" loading></el-button>
            <el-button type="primary" link :icon="StarFilled" loading></el-button>
          </td>
        </tr>
        <tr class="title">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="title">
          <td></td>
          <td>幽灵按钮</td>
          <td>下拉按钮</td>
          <td>板块按钮</td>
          <td></td>
        </tr>
        <tr class="desc">
          <td></td>
          <td>用于颜色背景中</td>
          <td>可进行下拉操作</td>
          <td>将按钮宽度调整为其父宽度，文字居中。</td>
          <td></td>
        </tr>
        <tr>
          <td class="type">默认</td>
          <td class="has_bg">
            <el-button class="ghost_button" type="primary" :icon="Plus">按钮</el-button>
          </td>
          <td>
            <el-popover placement="bottom" :width="200" trigger="click" @before-enter="flag1 = false" @after-leave="flag1 = true">
              <template #reference>
                <el-button @click="flag1 = !flag1">
                  按钮
                  <el-icon style="margin-left: 8px">
                    <ArrowUp v-if="!flag1" />
                    <ArrowDown v-else />
                  </el-icon>
                </el-button>
              </template>
              <div>下拉内容</div>
            </el-popover>
          </td>
          <td>
            <el-button type="primary" style="width: 100%">按钮</el-button>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="type">禁用</td>
          <td class="has_bg">
            <el-button class="ghost_button" type="primary" :icon="Plus" disabled>按钮</el-button>
          </td>
          <td>
            <el-popover placement="bottom" :width="200" trigger="click" @before-enter="flag2 = false" @after-leave="flag2 = true">
              <template #reference>
                <el-button disabled @click="flag2 = !flag2">
                  按钮
                  <el-icon style="margin-left: 8px">
                    <ArrowUp v-if="!flag2" />
                    <ArrowDown v-else />
                  </el-icon>
                </el-button>
              </template>
              <div>下拉内容</div>
            </el-popover>
          </td>
          <td>
            <el-button type="primary" style="width: 100%" disabled>按钮</el-button>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="type">加载中</td>
          <td class="has_bg">
            <el-button class="ghost_button" type="primary" :icon="Plus" loading>加载中</el-button>
          </td>
          <td>
            <el-popover placement="bottom" :width="200" trigger="click" @before-enter="flag3 = false" @after-leave="flag3 = true">
              <template #reference>
                <el-button loading @click="flag3 = !flag3">
                  加载中
                  <el-icon style="margin-left: 8px">
                    <ArrowUp v-if="!flag3" />
                    <ArrowDown v-else />
                  </el-icon>
                </el-button>
              </template>
              <div>下拉内容</div>
            </el-popover>
          </td>
          <td>
            <el-button type="primary" style="width: 100%" loading>加载中</el-button>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="design_title">按钮尺寸</div>
    <div class="design_example">
      <table>
        <tr class="title">
          <td>类型</td>
          <td>大</td>
          <td>中</td>
          <td>小</td>
        </tr>
        <tr>
          <td class="type">不带图标</td>
          <td>
            <el-button type="primary" size="large">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="default">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="small">按钮</el-button>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="type">带图标</td>
          <td>
            <el-button type="primary" size="large" :icon="Plus">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="default" :icon="Plus">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="small" :icon="Plus">按钮</el-button>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="type">组合间距</td>
          <td>
            <el-button type="primary" size="large">按钮</el-button>
            <el-button type="primary" size="large">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="default">按钮</el-button>
            <el-button type="primary" size="default">按钮</el-button>
          </td>
          <td>
            <el-button type="primary" size="small">按钮</el-button>
            <el-button type="primary" size="small">按钮</el-button>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="design_title">使用原则</div>
    <div class="design_description" style="position: relative; height: 300px; padding-left: 450px">
      <p>按钮样式的使用应从三个角度去考虑</p>
      <p>1. 空间感</p>
      <p>- 当空间有限时，因遵循节省空间的理念使用按钮样式</p>
      <p>2. 辨识度</p>
      <p>- 需要增强或者弱化按钮的视觉吸引力时候，可考虑在按钮内增加图标或图标按钮</p>
      <p>3. 协调性</p>
      <p>- 在同一界面下，按钮样式需要进行统一</p>
      <p>- 界面空闲空间过多时，可以考虑在按钮内增加图标使得整体视觉效果更舒适</p>
      <div class="design_chart">
        <div class="x_axis">占用空间</div>
        <div class="y_axis">辨识度</div>
        <el-button class="low" :icon="Plus"></el-button>
        <el-button class="medium">按钮</el-button>
        <el-button class="high" :icon="Plus">按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, StarFilled, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
const flag1 = ref(true)
const flag2 = ref(true)
const flag3 = ref(true)
</script>

<style scoped lang="scss">
.button_view {
  @include designMainContentContainer();
}
.design_example {
  margin-bottom: 80px;
  table {
    width: 100%;
    td {
      width: 20%;
      padding: 16px;
    }
    tr.title td {
      color: $color-titletext;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
    }
    tr.desc td {
      color: $color-titletext;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
    tr td:first-child {
      text-align: center;
    }
    td.type {
      color: $color-prompttext;
      font-size: 18px;
      line-height: 26px;
    }
    td.has_bg {
      background-color: $color-primary;
    }
  }
}
.design_chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 300px;
  border-left: 2px solid $color-prompttext;
  border-bottom: 2px solid $color-prompttext;
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -6px;
    width: 0;
    height: 0;
    border-bottom: 10px solid $color-prompttext;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    right: -3px;
    bottom: -6px;
    width: 0;
    height: 0;
    border-left: 10px solid $color-prompttext;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .x_axis {
    position: absolute;
    right: 0;
    bottom: 10px;
    @include fontCategory(3);
  }
  .y_axis {
    position: absolute;
    top: 0;
    left: 10px;
    @include fontCategory(3);
  }
  .low {
    position: absolute;
    left: 25%;
    top: 75%;
    transform: translate(-50%, -50%);
  }
  .medium {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .high {
    position: absolute;
    left: 75%;
    top: 25%;
    transform: translate(-50%, -50%);
  }
}
</style>
