import axios from './axios'
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

// 获取加密公钥
export function getPubKey() {
  return axios({
    method: 'get',
    url: pre + '/getPubKey'
  })
}
