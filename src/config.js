import provinceLevelBoundary from './assets/geoJson/gdProvinceGeoJson.json'
import cityLevelBoundary from './assets/geoJson/gdCityGeoJson.json'
import villageLevelBoundary from './assets/geoJson/gdVillageGeoJson.json'

const servers = {
  线上环境: 'https://swzg.slt.zj.gov.cn',
  路亚峰: 'http://192.168.2.111:8189'
}

export default {
  proxyTarget: servers['线上环境'], // 服务地址
  baseUrl: '/api', // 接口访问的基础路径
  timeout: undefined, // 接口请求的超时时间
  disablePermit: false, // 禁用权限（按钮权限、菜单权限、页面访问权限等）
  loginEncryption: true, // 登录加密（jsencrypt）
  map: {
    secretKey: 'ed01c047277d7afe209a42a4c9ce4eda',
    center: [113.43, 22.87],
    defaultZoom: 7.4,
    maxZoom: 16,
    minZoom: 5,
    provinceLevelBoundary,
    cityLevelBoundary,
    villageLevelBoundary
  }
}
