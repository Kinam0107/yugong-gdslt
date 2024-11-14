import ywBoundary from './assets/geoJson/ywBoundary.json'

const servers = {
  线上环境: 'https://swzg.slt.zj.gov.cn',
  路亚峰: 'http://192.168.2.111:8189'
}

const servers_yw = {
  张元泽: 'http://192.168.2.227:9000'
}

export default {
  proxyTarget: servers['线上环境'], // 服务地址
  proxyTarget_yw: servers_yw['张元泽'], // 服务地址
  baseUrl: '/api', // 接口访问的基础路径
  baseUrl_yw: '/prod-api', // 接口访问的基础路径
  timeout: undefined, // 接口请求的超时时间
  disablePermit: false, // 禁用权限（按钮权限、菜单权限、页面访问权限等）
  bypassLogin: true, // 绕过登录（无token时访问页面）
  loginEncryption: true, // 登录加密（jsencrypt）
  designDraftWidth: 1920, // 大屏设计稿的宽度
  designDraftHeight: 1080, // 大屏设计稿的宽度
  map: {
    secretKey: 'ed01c047277d7afe209a42a4c9ce4eda',
    center: [120.074911, 29.306863],
    defaultZoom: 11,
    maxZoom: 18,
    minZoom: 10,
    ywBoundary
  }
}
