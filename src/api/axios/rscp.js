import axios from 'axios'
import globalConfig from '@/config'
import { getToken, clearToken } from '@/utils/userToken'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
  baseURL: globalConfig.baseUrl,
  // baseURL: 'https://swzg.slt.zj.gov.cn/dingrscp-api',
  timeout: globalConfig.timeout
})

instance.interceptors.request.use(
  (config) => {
    if (!['/passport/rdspwd', '/passport/pwdlogin'].includes(config.url)) {
      config.headers['token'] = getToken()
    }
    if ('/authApi/gateway/generateTicket' === config.url) {
      config.baseURL = ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.status == 301) {
      ElMessage({
        message: '登录已过期！',
        type: 'error',
        grouping: true,
        duration: 5 * 1000
      })
      clearToken()
    }
    let res = response.data
    const contentType = response.headers['content-type']
    const contentDisposition = response.headers['content-disposition']
    const isAttachment = contentDisposition && contentDisposition.includes('attachment')
    if (contentType && isAttachment) {
      res = {
        file: response.data,
        name: decodeURI(contentDisposition.split('=')[1])
      }
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function (params) {
  return instance(params)
}
