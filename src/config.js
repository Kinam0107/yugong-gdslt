import provinceLevelBoundary from './assets/geoJson/gdProvinceGeoJson.json'
import cityLevelBoundary from './assets/geoJson/gdCityGeoJson.json'
import villageLevelBoundary from './assets/geoJson/gdVillageGeoJson.json'

const servers = {
  线上环境: 'https://swzg.slt.zj.gov.cn',
  路亚峰: 'http://192.168.2.111:8189'
}

const servers_yw = {
  测试环境: 'http://192.168.2.173:80',
  张元泽: 'http://192.168.2.227:9000'
}

export default {
  proxyTarget: servers['线上环境'], // 运管服务地址
  proxyTarget_yw: servers_yw['张元泽'], // 义乌服务地址
  baseUrl: '/api', // 运管接口访问的基础路径
  baseUrl_yw: '/prod-api', // 义乌接口访问的基础路径
  timeout: undefined, // 接口请求的超时时间
  disablePermit: false, // 禁用权限（按钮权限、菜单权限、页面访问权限等）
  loginEncryption: true, // 登录加密（jsencrypt）
  ywAdcd: '330782000000', // 义乌市行政区划编码
  pilotReservoir: ['330782022000521', '33d473fd-1c7b-11ea-8760-6c92bf66b1485e'], // 试点水库工程编码
  map: {
    secretKey: 'ed01c047277d7afe209a42a4c9ce4eda',
    center: [120.074911, 29.306863],
    defaultZoom: 11,
    maxZoom: 18,
    minZoom: 10,
    provinceLevelBoundary,
    cityLevelBoundary,
    villageLevelBoundary
  }
}
