<template>
  <div class="info_announcement_list">
    <div class="list_head">
      <div class="title">平台咨询</div>
      <el-button link type="primary">查看全部</el-button>
    </div>
    <div class="list_body">
      <ul>
        <li v-for="i in 5" :key="'info_announcement_list' + i">
          <div class="title">
            <div class="name">这是一个很长很长的资讯标题</div>
            <div class="time">2021-05-20</div>
          </div>
          <div class="desc">这是一段很长很长的资讯详情简介这是一段很长很长的资讯详情简介这是一段很长很长的资讯详情简介</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info_announcement_list {
  width: 85%;
  .list_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $baseDistance;
    height: 7 * $baseDistance;
    box-shadow: 0px -1px 0px 0px $color-separator inset;
    padding: 0 3 * $baseDistance;
    .title {
      @include fontCategory(3);
      color: $color-titletext;
    }
  }
  .list_body {
    padding: 0 3 * $baseDistance;
    ul {
      li {
        padding: 2 * $baseDistance 0;
        + li {
          box-shadow: 0px 1px 0px 0px $color-separator inset;
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            @include fontCategory();
            color: $color-titletext;
          }
          .time {
            @include fontCategory(5);
            color: $color-explaintext;
          }
        }
        .desc {
            @include fontCategory();
            color: $color-explaintext;
        }
      }
    }
  }
}
</style>
