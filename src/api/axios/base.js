import axios from 'axios'
import globalConfig from '@/config'
import router from '@/router'
import { getToken, clearToken } from '@/utils/userToken'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
  baseURL: globalConfig.baseUrl,
  timeout: globalConfig.timeout
})

instance.interceptors.request.use(
  (config) => {
    if (['/auth-center/login'].includes(config.url || '')) {
      config.headers['token'] = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res instanceof Blob || res.code == 1 || res.success) {
      return res
    }
    if (res.code == 5000 || res.code == 2000) {
      if (!globalConfig.bypassLogin) {
        // todo 提示：未登录或登录过期，请重新登录！
        clearToken()
        router.push({ name: 'login' })
      }
    } else {
      // ElMessage.error(res.msg || 'Error')
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function (params) {
  return instance(params)
}
