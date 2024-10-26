import axios from 'axios'
import globalConfig from '@/config'
import router from '@/router'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
  baseURL: '/prod-api',
  timeout: globalConfig.timeout
})

instance.interceptors.request.use(
  (config) => {
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
      router.push({ path: '/login' })
    }
    const res = response.data
    if (res instanceof Blob) res.fileName = decodeURI(response.headers['content-disposition'].split('=')[1])
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function (params) {
  return instance(params)
}
