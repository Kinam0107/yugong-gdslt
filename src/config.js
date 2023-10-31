const servers = {
  线上环境: 'http://192.168.2.144:33444/api',
  路亚峰: 'http://192.168.2.111:15001',
  张元泽: 'http://192.168.2.227:15001',
  潘麒帆: 'http://192.168.2.136:15001',
  王正文: 'http://192.168.2.252:15001'
}

export default {
  baseUrl: '/api',
  timeout: undefined,
  proxyTarget: servers['线上环境'],
  disablePermit: false,
  bypassLogin: false
}
