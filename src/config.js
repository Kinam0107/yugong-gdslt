import provinceLevelBoundary from './assets/geoJson/gdProvinceGeoJson.json'
import cityLevelBoundary from './assets/geoJson/gdCityGeoJson.json'
import villageLevelBoundary from './assets/geoJson/gdVillageGeoJson.json'

const servers = {
  线上环境: 'http://192.168.2.144:33444/api',
  路亚峰: 'http://192.168.2.111:15001',
  张元泽: 'http://192.168.2.227:15001',
  潘麒帆: 'http://192.168.2.136:15001',
  王正文: 'http://192.168.2.252:15001'
}

export default {
  proxyTarget: servers['线上环境'],
  baseUrl: '/api',
  timeout: undefined,
  disablePermit: false,
  bypassLogin: false,
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
