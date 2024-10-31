import axios from 'axios'
import globalConfig from '@/config'
import { getToken } from '@/utils/userToken'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
  baseURL: globalConfig.baseUrl,
  timeout: globalConfig.timeout
})

instance.interceptors.request.use(
  (config) => {
    if (!['/auth-center/login'].includes(config.url || '')) {
      config.headers['Authorization'] = getToken()
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
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function (params) {
  return instance(params)
}
