<template>
  <div class="map_view">
    <OlMap @initFinished="handleInitFinished" @single-click="handleSingleClick" @double-click="handleDoubleClick" @mouse-move="handleMouseMove" @move-end="handleMoveEnd">
      <template #default>插槽</template>
      <template #legend>图例</template>
      <template #toolbox>工具箱</template>
    </OlMap>
  </div>
</template>

<script setup>
import OlMap from '@/components/map/OlMap.vue'
import { renderPoint, renderLine } from '@/utils/map.js'
import largeReservoir from '@/assets/images/points/reservoir-large.png'
import mediumReservoir from '@/assets/images/points/reservoir-medium.png'
import smallReservoir from '@/assets/images/points/reservoir-small.png'

let map
const handleInitFinished = (e) => {
  map = e
  renderPoint(map, '大中小型水库落点测试图层', [
    { longitude: 112.34907598073522, latitude: 23.502291842718748, dotStyleConf: { src: largeReservoir }, titleStyleConf: { titleText: '大型水库', titleOffsetY: -18 } },
    { longitude: 114.06540370532672, latitude: 23.557873243492697, dotStyleConf: { src: mediumReservoir } },
    { longitude: 113.13310830126525, latitude: 22.309716455628713, dotStyleConf: { src: smallReservoir } }
    // { longitude: 112.34907598073522, latitude: 23.502291842718748, dotStyleConf: {} },
    // { longitude: 114.06540370532672, latitude: 23.557873243492697, dotStyleConf: {} },
    // { longitude: 113.13310830126525, latitude: 22.309716455628713, dotStyleConf: {} },
    // { longitude: 112.34907598073522, latitude: 23.502291842718748, circleStyleConf: { fillColor: 'blue', strokeColor: 'red' }, titleStyleConf: { titleText: '大型水库' } },
    // { longitude: 114.06540370532672, latitude: 23.557873243492697, circleStyleConf: { fillColor: 'blue' } },
    // { longitude: 113.13310830126525, latitude: 22.309716455628713, circleStyleConf: { fillColor: 'blue' } }
  ])
  renderLine(map, '水库间线段测试图层', [
    {
      coordinates: [
        [112.34907598073522, 23.502291842718748],
        [114.06540370532672, 23.557873243492697]
      ],
      lineStyleConf: {},
      titleStyleConf: { titleText: '大型水库-中型水库' }
    }
  ])
}

const handleSingleClick = (value) => {
  console.log('singleClick', value)
}
const handleDoubleClick = (value) => {
  console.log('doubleClick', value)
}
const handleMouseMove = () => {}
const handleMoveEnd = () => {}
</script>

<style scoped lang="scss">
.map_view {
  @include mainContentContainer(100%);
  overflow: hidden;
  padding: 0;
}
</style>
