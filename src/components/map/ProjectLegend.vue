<template>
  <div class="row">
    <div class="cell">
      <i class="line" style="background: #58c056"></i>
      <span>保护范围</span>
    </div>
    <div class="cell">
      <i class="line" style="background: #f5402a"></i>
      <span>管理范围</span>
    </div>
  </div>
  <div class="title">水位站</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/waterLevel.png" />
      <span>正常</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/waterLevelWarn.png" />
      <span>超汛限</span>
    </div>
  </div>
  <div class="title">雨量站</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/rainfall0.png" />
      <span>无降雨</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/rainfall0_10.png" />
      <span>0~10</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/rainfall10_25.png" />
      <span>10~25</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/rainfall25_50.png" />
      <span>25~50</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/rainfall50_100.png" />
      <span>50~100</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/rainfall100_250.png" />
      <span>100~250</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/rainfall250.png" />
      <span>＞250</span>
    </div>
  </div>
  <div class="title">视频站</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/video.png" />
      <span>在线</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/videoWarn.png" />
      <span>离线</span>
    </div>
  </div>
  <div class="title">安全监测</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/station.png" />
      <span>在线</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/stationWarn.png" />
      <span>离线</span>
    </div>
  </div>
  <div class="title">重要设施</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/railway.png" />
      <span>铁路</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/expressway.png" />
      <span>高速公路</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/highwayBridge.png" />
      <span>公路桥</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/other.png" />
      <span>其他</span>
    </div>
  </div>
  <div class="title">重点对象</div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/school.png" />
      <span>学校</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/hospital.png" />
      <span>医院</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/residentialArea.png" />
      <span>居民区</span>
    </div>
    <div class="cell">
      <img src="@/assets/images/points/sensitivePoint.png" />
      <span>重要敏感点</span>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <img src="@/assets/images/points/governmentOrgan.png" />
      <span>政府机构及事业单位</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  width: 208px;
  + .row {
    margin-top: 10px;
  }
  .cell {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 50%;
    .line {
      display: inline-block;
      width: 19px;
      height: 2px;
    }
    > img {
      width: 20px;
      height: 20px;
    }
    > span {
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      white-space: nowrap;
    }
  }
}
.title {
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: $color-primary;
  margin: 16px 0 12px 0;
}
</style>
