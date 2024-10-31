<template>
  <div class="siquan">
    <div :class="['card', { active: activeTab === '监管全覆盖' }]">
      <span class="name" @click="changeActive('监管全覆盖', '', '')">监管全覆盖</span>
      <TabBar class="skzl-name" modelValue="水库总览" :tabs="['水库总览']" type="title" />
      <div class="skzl-wrap">
        <div :class="['item', { active: activeTab === '监管全覆盖' && activeType === '水库总览' && activeItem === '在册总数' }]"
          @click="changeActive('监管全覆盖', '水库总览', '在册总数')">
          <span class="label">在册总数</span>
          <span class="value">{{ reservoirsNum.total }}</span>
          <span class="unit">座</span>
        </div>
        <div :class="['item', { active: activeTab === '监管全覆盖' && activeType === '水库总览' && activeItem === '注册' }]"
          @click="changeActive('监管全覆盖', '水库总览', '注册')">
          <span class="label">注册</span>
          <span class="value">{{ reservoirsNum.register }}</span>
          <span class="unit">座</span>
        </div>
        <div :class="['item', { active: activeTab === '监管全覆盖' && activeType === '水库总览' && activeItem === '备案' }]"
          @click="changeActive('监管全覆盖', '水库总览', '备案')">
          <span class="label">备案</span>
          <span class="value">{{ reservoirsNum.record }}</span>
          <span class="unit">座</span>
        </div>
      </div>
      <TabBar class="sshy-name" modelValue="所属行业" :tabs="['所属行业']" type="title" />
      <div class="sshy-wrap">
        <div class="chart-wrap">
          <RingChart ref="sectorChart" :color="colors" :data="sectorStocksData" />
        </div>
        <ul class="legend-wrap">
          <li v-for="(item, index) in sectorStocksData" :key="index"
            :class="{ active: activeTab === '监管全覆盖' && activeType === '所属行业' && activeItem === item.name }"
            @click="changeActive('监管全覆盖', '所属行业', item.name)">
            <i class="round_dot" :style="{ background: colors[index] }"></i>
            <span class="label">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
            <span class="unit">座</span>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '全要素掌控' }]">
      <span class="name" @click="changeActive('全要素掌控', '', '')">全要素掌控</span>
      <TabBar v-model="featureType" :tabs="['库区要素', '工程要素', '下游要素']" type="title"
        @change="(e) => changeActive('全要素掌控', e, '')" />
      <div v-if="featureType === '库区要素'" class="kqys-wrap">
        <div class="res-data">
          <div class="item">
            <div class="data">
              <span class="value">{{ reservoirArea.totalStorageCapacity }}</span>
              <span class="unit">亿m³</span>
            </div>
            <div class="label">总库容</div>
          </div>
          <div class="item">
            <div class="data">
              <span class="value">{{ reservoirArea.drainageArea }}</span>
              <span class="unit">万m²</span>
            </div>
            <div class="label">流域面积</div>
          </div>
        </div>
        <TabBar v-model="waterLevelType" :tabs="['正常蓄水位', '设计洪水位', '校核洪水位']" type="brick"
          @change="getWaterLevelInfluence" />
        <div class="water_level-wrap">
          <div class="item-wrap">
            <div class="item">
              <div class="label">淹没范围</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.submergedArea }}</span>
                <span class="unit">km²</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="item">
              <div class="label">影响人口</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.population }}</span>
                <span class="unit">万人</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="item">
              <div class="label">道路</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.road }}</span>
                <span class="unit">条</span>
              </div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <div class="label">基础设施</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.infrastructure }}</span>
                <span class="unit">个</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="item">
              <div class="label">城(集)镇</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.town }}</span>
                <span class="unit">个</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="item">
              <div class="label">耕(园)地</div>
              <div class="data">
                <span class="value">{{ waterLevelInfluence.farmland }}</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="featureType === '工程要素'" class="gcys-wrap">
        <div class="pro_type-wrap">
          <div class="chart-wrap">
            <RingChart :color="colors" :data="damTypeData" />
          </div>
          <ul class="legend-wrap">
            <li v-for="(item, index) in damTypeData" :key="index"
              :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === item.name }"
              @click="changeActive('全要素掌控', '工程要素', item.name)">
              <i class="round_dot" :style="{ background: colors[index] }"></i>
              <span class="label">{{ item.name }}</span>
              <span class="value">{{ item.value }}</span>
              <span class="unit">座</span>
            </li>
          </ul>
        </div>
        <div class="dam_height-wrap">
          <div class="item"
            :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '坝高15m以下' }"
            @click="changeActive('全要素掌控', '工程要素', '坝高15m以下')">
            <span class="label">坝高15m以下</span>
            <span class="value">{{ projectStatisticByDamHeight.below15Meters }}</span>
            <span class="unit">座</span>
          </div>
          <div class="item"
            :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '坝高15-30m' }"
            @click="changeActive('全要素掌控', '工程要素', '坝高15-30m')">
            <span class="label">坝高15-30m</span>
            <span class="value">{{ projectStatisticByDamHeight.below30Meters }}</span>
            <span class="unit">座</span>
          </div>
          <div class="item"
            :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '坝高30-70m' }"
            @click="changeActive('全要素掌控', '工程要素', '坝高30-70m')">
            <span class="label">坝高30-70m</span>
            <span class="value">{{ projectStatisticByDamHeight.below70Meters }}</span>
            <span class="unit">座</span>
          </div>
          <div class="item"
            :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '坝高70m以上' }"
            @click="changeActive('全要素掌控', '工程要素', '坝高70m以上')">
            <span class="label">坝高70m以上</span>
            <span class="value">{{ projectStatisticByDamHeight.over70Meters }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="curve-wrap">
          <div class="item" :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '库容曲线' }"
            @click="changeActive('全要素掌控', '工程要素', '库容曲线')">
            <div class="label">库容曲线</div>
            <div class="data">
              <span class="value">{{ curveData.storageCapacity }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item" :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '泄洪曲线' }"
            @click="changeActive('全要素掌控', '工程要素', '泄洪曲线')">
            <div class="label">泄洪曲线</div>
            <div class="data">
              <span class="value">{{ curveData.floodDischarge }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item"
            :class="{ active: activeTab === '全要素掌控' && activeType === '工程要素' && activeItem === '溢洪道侵占' }"
            @click="changeActive('全要素掌控', '工程要素', '溢洪道侵占')">
            <div class="label">溢洪道侵占</div>
            <div class="data">
              <span class="value">{{ curveData.spillwayEncroachment }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="featureType === '下游要素'" class="xyys-wrap">
        <div class="item-wrap">
          <div class="item">
            <div class="label">洪水影响范围(24h)</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.floodImpactScope.toFixed(2) }}</span>
              <span class="unit">km²</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="label">影响人口</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.populationImpact.toFixed(2) }}</span>
              <span class="unit">万人</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="label">道路</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.road }}</span>
              <span class="unit">条</span>
            </div>
          </div>
        </div>
        <div class="item-wrap">
          <div class="item">
            <div class="label">基础设施</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.infrastructure }}</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="label">城(集)镇</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.town }}</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="label">耕(园)地</div>
            <div class="data">
              <span class="value">{{ downstreamFactors.farmland }}</span>
              <span class="unit">亩</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '全天候管控' }]">
      <span class="name" @click="changeActive('全天候管控', '', '')">全天候管控</span>
      <div class="category-item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '天' }"
        @click="changeActive('全天候管控', '', '天')">
        <SvgIcon :size="20" icon="satellite" color="#0052d9" />
        <span class="label">天</span>
        <span class="value">{{ controlData.space }}</span>
        <span class="unit">座</span>
      </div>
      <div class="category-wrap">
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '遥感影像' }"
          @click="changeActive('全天候管控', '', '遥感影像')">
          <div class="label">遥感影像</div>
          <div class="data">
            <span class="value">{{ controlData.quickbird }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === 'InSAR' }"
          @click="changeActive('全天候管控', '', 'InSAR')">
          <div class="label">InSAR</div>
          <div class="data">
            <span class="value">{{ controlData.insar }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '气象卫星' }"
          @click="changeActive('全天候管控', '', '气象卫星')">
          <div class="label">气象卫星</div>
          <div class="data">
            <span class="value">{{ controlData.weatherSatellite }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="category-item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '空' }"
        @click="changeActive('全天候管控', '', '空')">
        <SvgIcon :size="20" icon="UAV" color="#0052d9" />
        <span class="label">空</span>
        <span class="value">{{ controlData.sky }}</span>
        <span class="unit">座</span>
      </div>
      <div class="category-wrap">
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '无人机' }"
          @click="changeActive('全天候管控', '', '无人机')">
          <div class="label">无人机</div>
          <div class="data">
            <span class="value">{{ controlData.uav }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '测雨雷达' }"
          @click="changeActive('全天候管控', '', '测雨雷达')">
          <div class="label">测雨雷达</div>
          <div class="data">
            <span class="value">{{ controlData.rainRadar }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '其他' }"
          @click="changeActive('全天候管控', '', '其他')">
          <div class="label">其他</div>
          <div class="data">
            <span class="value">{{ controlData.other }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="category-item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '地' }"
        @click="changeActive('全天候管控', '', '地')">
        <SvgIcon :size="20" icon="signal" color="#0052d9" />
        <span class="label">地</span>
        <span class="value">{{ controlData.ground }}</span>
        <span class="unit">座</span>
      </div>
      <div class="category-exam">
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '视频' }"
          @click="changeActive('全天候管控', '', '视频')">
          <img class="icon" src="@/assets/images/circleCamera.png" alt="" />
          <div class="info">
            <div class="label">视频</div>
            <div class="data">
              <span class="value">{{ controlData.video }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '智能巡检' }"
          @click="changeActive('全天候管控', '', '智能巡检')">
          <img class="icon" src="@/assets/images/circleRoute.png" alt="" />
          <div class="info">
            <div class="label">智能巡检</div>
            <div class="data">
              <span class="value">{{ controlData.inspection }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '雨水情' }"
          @click="changeActive('全天候管控', '', '雨水情')">
          <img class="icon" src="@/assets/images/circleRain.png" alt="" />
          <div class="info">
            <div class="label">雨水情</div>
            <div class="data">
              <span class="value">{{ controlData.rainwaterSituation }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
        <div class="item" :class="{ active: activeTab === '全天候管控' && activeType === '' && activeItem === '安全监测' }"
          @click="changeActive('全天候管控', '', '安全监测')">
          <img class="icon" src="@/assets/images/circleSafety.png" alt="" />
          <div class="info">
            <div class="label">安全监测</div>
            <div class="data">
              <span class="value">{{ controlData.safetyMonitoring }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['card', { active: activeTab === '全周期管理' }]">
      <span class="name" @click="changeActive('全周期管理', '', '')">全周期管理</span>
      <div class="year-wrap">
        <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '10年以内' }"
          @click="changeActive('全周期管理', '', '10年以内')">
          <div class="label">10年以内</div>
          <div class="data">
            <span class="value">{{ yearStatistics.blow10Year }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '10-50年' }"
          @click="changeActive('全周期管理', '', '10-50年')">
          <div class="label">10-50年</div>
          <div class="data">
            <span class="value">{{ yearStatistics.blow50Year }}</span>
            <span class="unit">座</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '50年以上' }"
          @click="changeActive('全周期管理', '', '50年以上')">
          <div class="label">50年以上</div>
          <div class="data">
            <span class="value">{{ yearStatistics.over50Year }}</span>
            <span class="unit">座</span>
          </div>
        </div>
      </div>
      <div class="bar_chart-wrap">
        <BarAndLine ref="yearChart" :color="['#0052D9', '#FF9936']" :xAxisValue="yearChartData.xAxisValue" yAxisUnit="座"
          :barData="yearChartData.barData" :lineData="yearChartData.lineData" />
      </div>
      <div class="state-wrap">
        <div class="item-wrap">
          <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '竣工验收' }"
            @click="changeActive('全周期管理', '', '竣工验收')">
            <div class="label">竣工验收</div>
            <div class="data">
              <span class="value">{{ periodicData.acceptance }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '注册登记' }"
            @click="changeActive('全周期管理', '', '注册登记')">
            <div class="label">注册登记</div>
            <div class="data">
              <span class="value">{{ periodicData.registration }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '安全鉴定' }"
            @click="changeActive('全周期管理', '', '安全鉴定')">
            <div class="label">安全鉴定</div>
            <div class="data">
              <span class="value">{{ periodicData.appraisal }}</span>
              <span class="unit">座</span>
            </div>
          </div>
        </div>
        <div class="item-wrap">
          <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '控运计划' }"
            @click="changeActive('全周期管理', '', '控运计划')">
            <div class="label">控运计划</div>
            <div class="data">
              <span class="value">{{ periodicData.plan }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="item" :class="{ active: activeTab === '全周期管理' && activeType === '' && activeItem === '除险加固' }"
            @click="changeActive('全周期管理', '', '除险加固')">
            <div class="label">除险加固</div>
            <div class="data">
              <span class="value">{{ periodicData.reinforcement }}</span>
              <span class="unit">座</span>
            </div>
          </div>
          <div class="line" style="visibility: hidden"></div>
          <div class="item" style="visibility: hidden"></div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="filter">
        <div class="item">
          <span class="label">水库名称：</span>
          <el-input v-model="name" style="width: 240px" placeholder="请输入关键字" :suffix-icon="Search" @change="search" />
        </div>
        <div class="item">
          <span class="label">工程规模：</span>
          <el-select v-model="scale" placeholder="请选择" style="width: 240px" clearable @change="search">
            <el-option v-for="item in getOptions('SKGM')" :key="'scale' + item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="item">
          <span class="label">行政区划：</span>
          <el-select v-model="adcd" placeholder="请选择" style="width: 240px" @change="search">
            <el-option v-for="item in getOptions('XZQH')" :key="'adcd' + item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="btns">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="exported">导出</el-button>
        </div>
      </div>
      <div class="tabler" ref="tabler">
        <el-table :key="activeTab + 'table'" :data="tableDataSort" style="width: 100%" stripe :max-height="tableHeight">
          <el-table-column fixed="left" type="index" label="序号" width="60" />
          <el-table-column label="工程名称" min-width="150">
            <template #default="scope">
              <el-button
                v-if="scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521' || scope.row.PRCD === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' || scope.row.prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'"
                type="primary" link @click="jumpProject(scope.row.PRCD || scope.row.prcd)">
                {{ scope.row.NAME || scope.row.proName }}
              </el-button>
              <span v-else>{{ scope.row.NAME || scope.row.proName }}</span>
              <span v-if="scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521'"
                class="pilot-marking">试点水库</span>
              <span
                v-if="scope.row.PRCD === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' || scope.row.prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'"
                class="pilot-marking">试点水库</span>
            </template>
          </el-table-column>
          <el-table-column label="所在市" min-width="80">
            <template #default="scope">{{ scope.row.cityADNM }}</template>
          </el-table-column>
          <el-table-column label="所在县" min-width="80">
            <template #default="scope">{{ scope.row.countryADNM }}</template>
          </el-table-column>
          <el-table-column label="工程规模" min-width="100">
            <template #default="scope">{{ scope.row.scale || dataEcho('SKGM', scope.row.project_scale) }}</template>
          </el-table-column>
          <template v-if="activeTab === '监管全覆盖'">
            <el-table-column label="注册部门" min-width="100">
              <template #default="scope">{{ scope.row.registration }}</template>
            </el-table-column>
            <el-table-column label="注册登记号" min-width="140">
              <template #default="scope">{{ scope.row.RECORDID }}</template>
            </el-table-column>
            <el-table-column label="所属行业" min-width="100">
              <template #default="scope">{{ scope.row.belong }}</template>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '全要素掌控'">
            <el-table-column label="总库容(万m³)" min-width="110">
              <template #default="scope">{{ scope.row.tcp }}</template>
            </el-table-column>
            <el-table-column label="流域面积(万m²)" min-width="130">
              <template #default="scope">{{ scope.row.rca }}</template>
            </el-table-column>
            <el-table-column label="大坝材料" min-width="90">
              <template #default="scope">{{ scope.row.DTBM }}</template>
            </el-table-column>
            <el-table-column label="主坝坝高(m)" min-width="110">
              <template #default="scope">{{ scope.row.dce }}</template>
            </el-table-column>
            <el-table-column label="库容曲线" min-width="90">
              <template #default="scope">{{ scope.row.krqx }}</template>
            </el-table-column>
            <el-table-column label="泄流曲线" min-width="90">
              <template #default="scope">{{ scope.row.xlqx }}</template>
            </el-table-column>
            <el-table-column label="溢洪道侵占" min-width="100">
              <template #default="scope">{{ scope.row.yhdqz }}</template>
            </el-table-column>
            <el-table-column label="正常蓄水位(m)" min-width="120">
              <template #default="scope">{{ scope.row.nwl }}</template>
            </el-table-column>
            <el-table-column label="影响范围填报情况" align="center">
              <el-table-column label="正常蓄水位" min-width="100">
                <template #default="scope">{{ scope.row.xsw }}</template>
              </el-table-column>
              <el-table-column label="设计洪水位" min-width="100">
                <template #default="scope">{{ scope.row.sjsw }}</template>
              </el-table-column>
              <el-table-column label="校核洪水位" min-width="100">
                <template #default="scope">{{ scope.row.jhsw }}</template>
              </el-table-column>
              <el-table-column label="下游要素" min-width="100">
                <template #default="scope">{{ scope.row.xyys }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '全天候管控'">
            <el-table-column label="天" align="center">
              <el-table-column label="遥感影像" min-width="100">
                <template #default="scope">{{ scope.row.ygyxNum }}</template>
              </el-table-column>
              <el-table-column label="InSAR" min-width="100">
                <template #default="scope">{{ scope.row.insarNum }}</template>
              </el-table-column>
              <el-table-column label="气象卫星" min-width="100">
                <template #default="scope">{{ scope.row.qxwxNum }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="空" align="center">
              <el-table-column label="无人机" min-width="100">
                <template #default="scope">{{ scope.row.wrjNum }}</template>
              </el-table-column>
              <el-table-column label="测雨雷达" min-width="100">
                <template #default="scope">{{ scope.row.cyldNum }}</template>
              </el-table-column>
              <el-table-column label="其他" min-width="100">
                <template #default="scope">{{ scope.row.qtNum }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="地" align="center">
              <el-table-column label="视频" min-width="100">
                <template #default="scope">{{ scope.row.spNum }}</template>
              </el-table-column>
              <el-table-column label="智能巡检" min-width="100">
                <template #default="scope">{{ scope.row.xjNum }}</template>
              </el-table-column>
              <el-table-column label="雨水情" min-width="100">
                <template #default="scope">{{ scope.row.ysqNum }}</template>
              </el-table-column>
              <el-table-column label="安全监测" min-width="100">
                <template #default="scope">{{ scope.row.aqjcNum }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else-if="activeTab === '全周期管理'">
            <el-table-column label="始建情况" align="center">
              <el-table-column label="开工时间" min-width="140">
                <template #default="scope">{{ scope.row.stm }}</template>
              </el-table-column>
              <el-table-column label="完工时间" min-width="140">
                <template #default="scope">{{ scope.row.ctm }}</template>
              </el-table-column>
              <el-table-column label="竣工时间" min-width="140">
                <template #default="scope">{{ scope.row.ftm }}</template>
              </el-table-column>
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="操作" width="60">
            <template #default="scope">
              <img :style="{
                cursor: scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521' ? 'pointer' : 'not-allowed',
                filter: scope.row.PRCD === '330782022000521' || scope.row.prcd === '330782022000521' ? 'none' : 'grayscale(1)'
              }" src="@/assets/images/screenIcon.png" @click="jumpScreen(scope.row.PRCD || scope.row.prcd)" alt="" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import RingChart from '@/components/chart/RingChart.vue'
import BarAndLine from '@/components/chart/BarAndLine.vue'
import axios from '@/api/axios'
import { dataEcho, getOptions } from '@/utils/enum'

const activeTab = ref('监管全覆盖')
const activeType = ref('')
const activeItem = ref('')
const changeActive = (tab, type, item) => {
  activeTab.value = tab
  activeType.value = type
  activeItem.value = activeItem.value === item ? '' : item
  search()
}

const featureType = ref('库区要素')
const colors = ref(['#276AF0', '#5AD8E5', '#0CBF5B', '#FFCB27', '#FF4D4F'])

const reservoirsNum = reactive({
  total: 0,
  register: 0,
  record: 0
})
const getReservoirsNum = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 34
    }
  })
    .then((res) => {
      reservoirsNum.total = res.data?.totalNum ?? '-'
      reservoirsNum.register = res.data?.slbmNum ?? '-'
      reservoirsNum.record = res.data?.qtbmNum ?? '-'
    })
    .catch(() => {
      reservoirsNum.total = '-'
      reservoirsNum.register = '-'
      reservoirsNum.record = '-'
    })
}
onBeforeMount(() => {
  getReservoirsNum()
})

const sectorStocksData = ref([
  { value: 0, name: '水利' },
  { value: 0, name: '能源' },
  { value: 0, name: '司法行政' },
  { value: 0, name: '交通运输' },
  { value: 0, name: '其他行业' }
])
const sectorChart = ref()
const getSectorStocksData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourSystem',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 8
    }
  })
    .then((res) => {
      sectorStocksData.value.map((e) => {
        if (e.name === '水利') {
          e.value = res.data?.slNum
        } else if (e.name === '能源') {
          e.value = res.data?.nyNum
        } else if (e.name === '司法行政') {
          e.value = res.data?.sfxzNum
        } else if (e.name === '交通运输') {
          e.value = res.data?.jtysNum
        } else if (e.name === '其他行业') {
          e.value = res.data?.qthyNum
        }
        return e
      })
    })
    .catch(() => {
      sectorStocksData.value.map((e) => {
        e.value = '-'
        return e
      })
    })
    .finally(() => {
      sectorChart.value.initChart()
    })
}
onBeforeMount(() => {
  getSectorStocksData()
})

const reservoirArea = reactive({
  totalStorageCapacity: 0,
  drainageArea: 0
})
const damTypeData = ref([
  { value: 0, name: '混凝土坝' },
  { value: 0, name: '堆石坝' },
  { value: 0, name: '土坝' },
  { value: 0, name: '浆砌石坝' },
  { value: 0, name: '其他' }
])
const projectStatisticByDamHeight = reactive({
  below15Meters: 0,
  below30Meters: 0,
  below70Meters: 0,
  over70Meters: 0
})
const getReservoirArea = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 3
    }
  })
    .then((res) => {
      reservoirArea.totalStorageCapacity = res.data?.zkr ?? '-'
      reservoirArea.drainageArea = res.data?.lymjNum ?? '-'
      damTypeData.value.map((e) => {
        if (e.name === '混凝土坝') {
          e.value = res.data?.hntbNum
        } else if (e.name === '堆石坝') {
          e.value = res.data?.dsbNum
        } else if (e.name === '土坝') {
          e.value = res.data?.tbNum
        } else if (e.name === '浆砌石坝') {
          e.value = res.data?.jqsbNum
        } else if (e.name === '其他') {
          e.value = res.data?.qtNum
        }
        return e
      })
      projectStatisticByDamHeight.below15Meters = res.data?.below15 ?? '-'
      projectStatisticByDamHeight.below30Meters = res.data?.below30 ?? '-'
      projectStatisticByDamHeight.below70Meters = res.data?.below70 ?? '-'
      projectStatisticByDamHeight.over70Meters = res.data?.upper70 ?? '-'
    })
    .catch(() => {
      reservoirArea.totalStorageCapacity = '-'
      reservoirArea.drainageArea = '-'
      damTypeData.value.map((e) => {
        e.value = '-'
        return e
      })
      projectStatisticByDamHeight.below15Meters = '-'
      projectStatisticByDamHeight.below30Meters = '-'
      projectStatisticByDamHeight.below70Meters = '-'
      projectStatisticByDamHeight.over70Meters = '-'
    })
}
onBeforeMount(() => {
  getReservoirArea()
})

const waterLevelType = ref('正常蓄水位')
const waterLevelInfluence = reactive({
  submergedArea: 0,
  population: 0,
  road: 0,
  infrastructure: 0,
  town: 0,
  farmland: 0
})
const getWaterLevelInfluence = () => {
  let moduleType
  if (waterLevelType.value === '正常蓄水位') {
    moduleType = 36
  } else if (waterLevelType.value === '设计洪水位') {
    moduleType = 37
  } else if (waterLevelType.value === '校核洪水位') {
    moduleType = 38
  }
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: moduleType
    }
  })
    .then((res) => {
      waterLevelInfluence.submergedArea = res.data?.radiusArea ?? '-'
      waterLevelInfluence.population = res.data?.inundPop ?? '-'
      waterLevelInfluence.road = res.data?.road ?? '-'
      waterLevelInfluence.infrastructure = res.data?.infrastructure ?? '-'
      waterLevelInfluence.town = res.data?.town ?? '-'
      waterLevelInfluence.farmland = res.data?.infCult ?? '-'
    })
    .catch(() => {
      waterLevelInfluence.submergedArea = '-'
      waterLevelInfluence.population = '-'
      waterLevelInfluence.road = '-'
      waterLevelInfluence.infrastructure = '-'
      waterLevelInfluence.town = '-'
      waterLevelInfluence.farmland = '-'
    })
}
onBeforeMount(() => {
  getWaterLevelInfluence()
})

const curveData = reactive({
  storageCapacity: 0,
  floodDischarge: 0,
  spillwayEncroachment: 0
})
const getCurveData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 65
    }
  })
    .then((res) => {
      curveData.spillwayEncroachment = res.data?.num ?? '-'
    })
    .catch(() => {
      curveData.spillwayEncroachment = '-'
    })
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 40
    }
  })
    .then((res) => {
      curveData.storageCapacity = res.data?.krqxNum ?? '-'
      curveData.floodDischarge = res.data?.xhqxNum ?? '-'
    })
    .catch(() => {
      curveData.storageCapacity = '-'
      curveData.floodDischarge = '-'
    })
}
onBeforeMount(() => {
  getCurveData()
})

const controlData = reactive({
  space: 0,
  quickbird: 0,
  insar: 0,
  weatherSatellite: 0,
  sky: 0,
  uav: 0,
  rainRadar: 0,
  other: 0,
  ground: 0,
  video: 0,
  inspection: 0,
  rainwaterSituation: 0,
  safetyMonitoring: 0
})
const getControlData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 42
    }
  })
    .then((res) => {
      controlData.space = res.data?.tNum ?? '-'
      controlData.quickbird = res.data?.ygyxNum ?? '-'
      controlData.insar = res.data?.InSARNum ?? '-'
      controlData.weatherSatellite = res.data?.qxwxNum ?? '-'
      controlData.sky = res.data?.kNum ?? '-'
      controlData.uav = res.data?.wrjNum ?? '-'
      controlData.rainRadar = res.data?.cyldNum ?? '-'
      controlData.other = res.data?.qtNum ?? '-'
      controlData.ground = res.data?.dNum ?? '-'
      controlData.video = res.data?.spNum ?? '-'
      controlData.inspection = res.data?.xjNum ?? '-'
      controlData.rainwaterSituation = res.data?.ysqNum ?? '-'
      controlData.safetyMonitoring = res.data?.aqjcNum ?? '-'
    })
    .catch(() => {
      controlData.space = '-'
      controlData.quickbird = '-'
      controlData.insar = '-'
      controlData.weatherSatellite = '-'
      controlData.sky = '-'
      controlData.uav = '-'
      controlData.rainRadar = '-'
      controlData.other = '-'
      controlData.ground = '-'
      controlData.video = '-'
      controlData.inspection = '-'
      controlData.rainwaterSituation = '-'
      controlData.safetyMonitoring = '-'
    })
}
onBeforeMount(() => {
  getControlData()
})

const downstreamFactors = reactive({
  floodImpactScope: 0,
  populationImpact: 0,
  road: 0,
  infrastructure: 0,
  town: 0,
  farmland: 0
})
const getDownstreamFactors = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 39
    }
  })
    .then((res) => {
      downstreamFactors.floodImpactScope = res.data?.radiusArea ?? '-'
      downstreamFactors.populationImpact = res.data?.inundPop ?? '-'
      downstreamFactors.road = res.data?.road ?? '-'
      downstreamFactors.infrastructure = res.data?.infrastructure ?? '-'
      downstreamFactors.town = res.data?.town ?? '-'
      downstreamFactors.farmland = res.data?.infCult ?? '-'
    })
    .catch(() => {
      downstreamFactors.floodImpactScope = '-'
      downstreamFactors.populationImpact = '-'
      downstreamFactors.road = '-'
      downstreamFactors.town = '-'
      downstreamFactors.infrastructure = '-'
      downstreamFactors.farmland = '-'
    })
}
onBeforeMount(() => {
  getDownstreamFactors()
})

const yearStatistics = reactive({
  blow10Year: 0,
  blow50Year: 0,
  over50Year: 0
})
const yearChartData = reactive({
  xAxisValue: [],
  barData: [],
  lineData: []
})
const yearChart = ref()
const getYearStatistics = () => {
  yearChartData.xAxisValue = []
  yearChartData.barData = []
  yearChartData.lineData = []
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 6
    }
  }).then((res) => {
    yearStatistics.blow10Year = res.data?.tenNum ?? '-'
    yearStatistics.blow50Year = res.data?.fiftyNum ?? '-'
    yearStatistics.over50Year = res.data?.overFiftyNum ?? '-'
    const yearList = res.data?.yearList || []
    let total = 0
    yearList.forEach((e) => {
      yearChartData.xAxisValue.push(e.wgYear)
      yearChartData.barData.push(e.num)
      total += e.num || 0
      yearChartData.lineData.push(total)
    })
    yearChart.value.initChart()
  })
}
onBeforeMount(() => {
  getYearStatistics()
})

const periodicData = reactive({
  acceptance: 0,
  registration: 0,
  appraisal: 0,
  plan: 0,
  reinforcement: 0
})
const getPeriodicData = () => {
  axios({
    url: '/mgt/bm/reservoirMatrix/fourPower',
    method: 'post',
    data: {
      adcd: '330782000000',
      moduleType: 44
    }
  })
    .then((res) => {
      periodicData.acceptance = res.data?.jgysNum ?? '-'
      periodicData.registration = res.data?.zcdjNum ?? '-'
      periodicData.appraisal = res.data?.aqjdNum ?? '-'
      periodicData.plan = res.data?.kyjhNum ?? '-'
      periodicData.reinforcement = res.data?.cxjgNum ?? '-'
    })
    .catch(() => {
      periodicData.acceptance = '-'
      periodicData.registration = '-'
      periodicData.appraisal = '-'
      periodicData.plan = '-'
      periodicData.reinforcement = '-'
    })
}
onBeforeMount(() => {
  getPeriodicData()
})

const name = ref('')
const scale = ref('')
const adcd = ref('330782000000')
const tableData = ref([])
const tableDataSort = computed(() => {
  const item1 = tableData.value.find((item) => item.prcd === '330782022000521' || item.PRCD === '330782022000521')
  const item2 = tableData.value.find((item) => item.prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' || item.PRCD === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e')
  const tableData_ = tableData.value.filter(
    (item) => item.prcd !== '330782022000521' && item.PRCD !== '330782022000521' && item.prcd !== '33d473fd-1c7b-11ea-8760-6c92bf66b1485e' && item.PRCD !== '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'
  )
  if (item2) tableData_.unshift(item2)
  if (item1) tableData_.unshift(item1)
  return tableData_
})
const search = () => {
  if (activeTab.value === '监管全覆盖') {
    if (activeType.value === '' && activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 70
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '水库总览' && activeItem.value === '在册总数') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 2
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '水库总览' && activeItem.value === '注册') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 27
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '水库总览' && activeItem.value === '备案') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 35,
          pointType: 28
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '所属行业' && activeItem.value === '水利') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 13
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '所属行业' && activeItem.value === '能源') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 14
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '所属行业' && activeItem.value === '司法行政') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 15
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '所属行业' && activeItem.value === '交通运输') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 16
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '所属行业' && activeItem.value === '其他行业') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourSystem',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 9,
          pointType: 17
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '全要素掌控') {
    if (activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 67
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '混凝土坝') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 4
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '堆石坝') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 29
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '土坝') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 3
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '浆砌石坝') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 30
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '其他') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 5
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '坝高15m以下') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 31
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '坝高15-30m') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 32
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '坝高30-70m') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 33
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '坝高70m以上') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 4,
          pointType: 34
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '库容曲线') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 41,
          pointType: 35
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '泄洪曲线') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 41,
          pointType: 36
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeType.value === '工程要素' && activeItem.value === '溢洪道侵占') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 66
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '全天候管控') {
    if (activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 68
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '天') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 37
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '遥感影像') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 38
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === 'InSAR') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 39
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '气象卫星') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 40
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '空') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 41
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '无人机') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 42
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '测雨雷达') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 49
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '其他') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 43
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '地') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 44
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '视频') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 45
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '智能巡检') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 46
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '雨水情') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 47
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '安全监测') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 43,
          pointType: 48
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  } else if (activeTab.value === '全周期管理') {
    if (activeItem.value === '') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          fetchAll: true,
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 69
        }
      })
        .then((res) => {
          tableData.value = res.data.list || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '10年以内') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 7,
          pointType: 10
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '10-50年') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 7,
          pointType: 11
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '50年以上') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 7,
          pointType: 12
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '竣工验收') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 45,
          pointType: 50
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '注册登记') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 45,
          pointType: 51
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '安全鉴定') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 45,
          pointType: 52
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '控运计划') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 45,
          pointType: 53
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    } else if (activeItem.value === '除险加固') {
      axios({
        url: '/mgt/bm/reservoirMatrix/fourPower',
        method: 'post',
        data: {
          adcd: adcd.value,
          name: name.value,
          projectScale: scale.value,
          moduleType: 45,
          pointType: 54
        }
      })
        .then((res) => {
          tableData.value = res.data || []
        })
        .catch(() => {
          tableData.value = []
        })
    }
  }
}
const reset = () => {
  name.value = ''
  scale.value = ''
  adcd.value = '330782000000'
  search()
}
onBeforeMount(() => {
  search()
})
const tabler = ref()
const tableHeight = ref(0)
const getTableHeight = () => {
  tableHeight.value = tabler.value.clientHeight - 40
}
onMounted(() => {
  getTableHeight()
  window.addEventListener('resize', getTableHeight)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', getTableHeight)
})

const jumpProject = (prcd) => {
  console.log('jumpProject', prcd)
  if (prcd === '330782022000521') window.open('/')
  if (prcd === '33d473fd-1c7b-11ea-8760-6c92bf66b1485e') window.open('/v2')
}
const jumpScreen = (prcd) => {
  console.log('jumpScreen', prcd)
}

const exported = () => {
  console.log('导出')
}
</script>

<style lang="scss" scoped>
.siquan {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  padding: 20px;
}

.card {
  width: calc(25% - 15px);
  height: 420px;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow:
    4px 4px 20px 0px rgba(55, 99, 170, 0.05),
    -4px -4px 20px 0px rgba(55, 99, 170, 0.05);
  padding: 18px;

  &.active {
    border-color: $color-primary;
  }

  .name {
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: #16181a;
    margin-bottom: 2 * $baseDistance;
    cursor: pointer;
  }
}

.skzl-name {
  margin-bottom: $baseDistance;
}

.skzl-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5 * $baseDistance 2 * $baseDistance;
  margin-bottom: 3 * $baseDistance;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $baseDistance;
    flex: 1;
    height: 36px;
    border-radius: 2px;
    background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
    border: 2px solid #ffffff;
    box-shadow:
      8px 8px 20px 0px rgba(55, 99, 170, 0.1),
      -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
    cursor: pointer;

    &.active {
      border-color: $color-primary;
    }

    &:first-child {
      flex-basis: 100%;
    }

    >span {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
    }

    .value {
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      color: $color-primary;
    }
  }
}

.sshy-name {
  margin-bottom: $baseDistance;
}

.sshy-wrap {
  display: flex;
  width: 100%;
  height: calc(100% - 212px);

  .chart-wrap {
    width: 50%;
    height: 100%;
  }

  .legend-wrap {
    width: 50%;
    height: 100%;
    padding: $baseDistance 3 * $baseDistance $baseDistance $baseDistance;

    li {
      display: flex;
      align-items: center;
      color: $color-titletext;
      cursor: pointer;

      &.active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: -$baseDistance;
          right: -$baseDistance;
          top: 0;
          bottom: 0;
          border: 1px solid $color-primary;
          background: transparentize($color-primary, 0.9);
        }
      }

      +li {
        margin-top: $baseDistance;
      }

      .round_dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: $baseDistance;
      }

      .label {
        font-size: 16px;
        line-height: 24px;
      }

      .value {
        flex: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        line-height: 26px;
        text-align: right;
      }

      .unit {
        font-size: 16px;
        line-height: 24px;
        margin-left: $baseDistance;
      }
    }
  }
}

.kqys-wrap {
  height: calc(100% - 64px);
  padding-top: 2.5 * $baseDistance;

  .res-data {
    display: flex;
    gap: 3 * $baseDistance;
    margin-bottom: 3 * $baseDistance;

    .item {
      position: relative;
      flex: 1;
      height: 54px;
      background-size: 100% 100%;

      &:nth-child(1) {
        background-image: url('@/assets/images/storageCapacityBg.png');
      }

      &:nth-child(2) {
        background-image: url('@/assets/images/drainageAreaBg.png');
      }

      .data {
        display: flex;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-100%);

        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 18px;
          color: $color-primary;
          margin-right: 0.5 * $baseDistance;
        }

        .unit {
          font-size: 14px;
        }
      }

      .label {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  .water_level-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 112px);
    padding: 3 * $baseDistance 0 2 * $baseDistance;

    .item-wrap {
      display: flex;
      width: 100%;
      height: 56px;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 14px;
        flex: 1;
        height: 100%;

        .label {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          color: $color-titletext;
        }

        .data {
          display: flex;
          align-items: center;

          .value {
            font-family: YouSheBiaoTiHei;
            font-size: 24px;
            color: $color-titletext;
          }

          .unit {
            font-family: Source Han Sans;
            font-size: 16px;
            font-weight: 500;
            color: $color-titletext;
            margin-left: $baseDistance;
          }
        }
      }

      .line {
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
      }
    }
  }
}

.gcys-wrap {
  height: calc(100% - 64px);

  .pro_type-wrap {
    display: flex;
    height: calc(100% - 137px);

    .chart-wrap {
      width: 50%;
      height: 100%;
    }

    .legend-wrap {
      width: 50%;
      height: 100%;
      padding: $baseDistance 3 * $baseDistance $baseDistance $baseDistance;

      li {
        display: flex;
        align-items: center;
        color: $color-titletext;
        cursor: pointer;

        &.active {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            left: -$baseDistance;
            right: -$baseDistance;
            top: 0;
            bottom: 0;
            border: 1px solid $color-primary;
            background: transparentize($color-primary, 0.9);
          }
        }

        +li {
          margin-top: $baseDistance;
        }

        .round_dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: $baseDistance;
        }

        .label {
          font-size: 16px;
          line-height: 24px;
        }

        .value {
          flex: 1;
          font-family: YouSheBiaoTiHei;
          font-size: 18px;
          line-height: 26px;
          text-align: right;
        }

        .unit {
          font-size: 16px;
          line-height: 24px;
          margin-left: $baseDistance;
        }
      }
    }
  }

  .dam_height-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $baseDistance 2 * $baseDistance;
    margin-bottom: $baseDistance;

    .item {
      display: flex;
      align-items: center;
      width: calc((100% - 16px) / 2);
      height: 36px;
      padding: 0 2 * $baseDistance;
      border-radius: 2px;
      background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
      border: 2px solid #ffffff;
      box-shadow:
        8px 8px 20px 0px rgba(55, 99, 170, 0.1),
        -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
      cursor: pointer;

      &.active {
        border-color: $color-primary;
      }

      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }

      .value {
        flex: 1;
        text-align: right;
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-primary;
      }

      .unit {
        font-family: Source Han Sans;
        font-size: 14px;
        font-weight: 500;
        color: $color-titletext;
        margin-left: 0.5 * $baseDistance;
      }
    }
  }

  .curve-wrap {
    display: flex;
    width: 100%;
    height: 49px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      gap: 4px;
      height: 100%;
      cursor: pointer;

      &.active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: $baseDistance;
          right: $baseDistance;
          top: 0;
          bottom: 0;
          border: 1px solid $color-primary;
          background: transparentize($color-primary, 0.9);
        }
      }

      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }

      .data {
        display: flex;
        align-items: center;

        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          color: $color-titletext;
        }

        .unit {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          color: $color-titletext;
          margin-left: $baseDistance;
        }
      }
    }

    .line {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
    }
  }
}

.xyys-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(100% - 64px);

  .item-wrap {
    display: flex;
    width: 100%;
    height: 56px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 14px;
      flex: 1;
      height: 100%;

      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }

      .data {
        display: flex;
        align-items: center;

        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          color: $color-titletext;
        }

        .unit {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          color: $color-titletext;
          margin-left: $baseDistance;
        }
      }
    }

    .line {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
    }
  }
}

.category-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $baseDistance;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(180deg, #f3f5f8 0%, #ffffff 100%);
  border: 2px solid #ffffff;
  box-shadow:
    8px 8px 20px 0px rgba(55, 99, 170, 0.1),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &.active {
    border-color: $color-primary;
  }

  .label,
  .unit {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    color: $color-titletext;
  }

  .value {
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    color: $color-primary;
  }
}

.category-wrap {
  display: flex;
  width: 100%;
  height: 62px;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1;
    height: 100%;
    cursor: pointer;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: $baseDistance;
        right: $baseDistance;
        top: 0;
        bottom: 0;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
    }

    .data {
      display: flex;
      align-items: center;

      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-titletext;
      }

      .unit {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
        margin-left: $baseDistance;
      }
    }
  }

  .line {
    width: 2px;
    height: 44px;
    margin-top: 9px;
    background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
  }
}

.category-exam {
  display: flex;
  flex-wrap: wrap;
  margin-top: $baseDistance;
  gap: 10px 60px;

  .item {
    display: flex;
    gap: 10px;
    width: calc(50% - 30px);
    cursor: pointer;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: -0.5 * $baseDistance;
        right: -0.5 * $baseDistance;
        top: -0.5 * $baseDistance;
        bottom: -0.5 * $baseDistance;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

    .icon {
      width: 42px;
      height: 43px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }

      .data {
        display: flex;
        align-items: center;
        gap: 5px;

        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          color: $color-titletext;
        }

        .unit {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          color: $color-titletext;
        }
      }
    }
  }
}

.year-wrap {
  display: flex;
  width: 100%;
  height: 44px;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    cursor: pointer;

    &.active {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: $baseDistance;
        right: $baseDistance;
        top: -4px;
        bottom: 0;
        border: 1px solid $color-primary;
        background: transparentize($color-primary, 0.9);
      }
    }

    .label {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: 500;
      color: $color-titletext;
    }

    .data {
      display: flex;
      align-items: center;

      .value {
        font-family: YouSheBiaoTiHei;
        font-size: 24px;
        color: $color-titletext;
      }

      .unit {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
        margin-left: $baseDistance;
      }
    }
  }

  .line {
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
  }
}

.bar_chart-wrap {
  width: 100%;
  height: calc(100% - 200px);
  margin-bottom: 12px;
}

.state-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2 * $baseDistance;

  .item-wrap {
    display: flex;
    width: 100%;
    height: 44px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      cursor: pointer;

      &.active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: $baseDistance;
          right: $baseDistance;
          top: -4px;
          bottom: 0;
          border: 1px solid $color-primary;
          background: transparentize($color-primary, 0.9);
        }
      }

      .label {
        font-family: Source Han Sans;
        font-size: 16px;
        font-weight: 500;
        color: $color-titletext;
      }

      .data {
        display: flex;
        align-items: center;

        .value {
          font-family: YouSheBiaoTiHei;
          font-size: 24px;
          color: $color-titletext;
        }

        .unit {
          font-family: Source Han Sans;
          font-size: 16px;
          font-weight: 500;
          color: $color-titletext;
          margin-left: $baseDistance;
        }
      }
    }

    .line {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 82, 217, 0) 0%, #0052d9 52%, rgba(0, 82, 217, 0) 100%);
    }
  }
}

.list {
  width: 100%;
  height: calc(100% - 440px);
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow:
    4px 4px 20px 0px rgba(55, 99, 170, 0.05),
    -4px -4px 20px 0px rgba(55, 99, 170, 0.05);

  .filter {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #d7dbe0;

    .item {
      display: flex;
      align-items: center;
      margin-right: 4 * $baseDistance;

      .label {
        font-size: 14px;
        color: $color-titletext;
      }
    }

    .btns {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }

  .tabler {
    width: 100%;
    height: calc(100% - 73px);
    padding: 20px;
  }
}

.pilot-marking {
  display: inline-block;
  height: 20px;
  background: linear-gradient(62deg, #0060ff 31%, #00e7ff 94%);
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: #ffffff;
  border-radius: 2px;
  padding: 0 4px;
}
</style>
