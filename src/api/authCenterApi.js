import axios from './axios/base'
const pre = '/auth-center'

// 用户登录
export function login(username, password) {
  return axios({
    method: 'post',
    url: pre + '/login',
    data: { username, password }
  })
}

// 获取用户信息
export function getUserInfo() {
  return axios({
    method: 'get',
    url: pre + '/getUserInfo'
  })
}

// 用户退出
export function logout() {
  return axios({
    method: 'post',
    url: pre + '/logout'
  })
}
