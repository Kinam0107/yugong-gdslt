<template>
  <div class="task_items_list">
    <div class="list_head">
      <div class="title">任务列表</div>
      <div class="middle"><span class="count">8</span></div>
      <el-button link type="primary">查看全部</el-button>
    </div>
    <div class="list_body">
      <ul>
        <li v-for="i in 5" :key="'task_items_list' + i">
          <div class="data">
            <div class="name">这是一个很长很长的任务标题</div>
            <div class="desc">
              <span class="type">任务类型</span>
              <span class="time">任务时间：2021-05-20</span>
            </div>
          </div>
          <el-button type="primary">查看</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task_items_list {
  width: 85%;
  .list_head {
    display: flex;
    align-items: center;
    gap: $baseDistance;
    height: 7 * $baseDistance;
    box-shadow: 0px -1px 0px 0px $color-separator inset;
    padding: 0 3 * $baseDistance;
    .title {
      @include fontCategory(3);
      color: $color-titletext;
    }
    .middle {
      flex: 1;
      .count {
        @include fontCategory(5);
        padding: 3px 8px;
        border-radius: 10px;
        background-color: $color-error;
        color: #ffffff;
      }
    }
  }
  .list_body {
    padding: 0 3 * $baseDistance;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 11 * $baseDistance;
        + li {
          box-shadow: 0px 1px 0px 0px $color-separator inset;
        }
        .data {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          .name {
            @include fontCategory();
            color: $color-titletext;
          }
          .desc {
            margin-top: 8px;
          }
          .type {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            background-color: rgba(54, 178, 158, 0.1);
            padding: 0 $baseDistance;
            border-radius: 0.5 * $baseDistance;
            color: $color-primary;
            margin-right: $baseDistance;
          }
          .time {
            @include fontCategory(4);
            color: $color-explaintext;
          }
        }
      }
    }
  }
}
</style>
