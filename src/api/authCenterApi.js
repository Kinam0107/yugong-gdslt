import axios from './axios/yw.js'

// 用户登录
export function login(username, password) {
  return axios({
    method: 'post',
    url: '/login',
    data: { username, password },
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取省运管用户token
export function loginRscp() {
  return axios({
    method: 'get',
    url: '/system/user/rscpAuthToken'
  })
}

// 获取用户信息
export function getUserInfo() {
  return axios({
    method: 'get',
    url: '/getUserInfo'
  })
}

// 用户退出
export function logout() {
  return axios({
    method: 'post',
    url: '/logout'
  })
}

// 获取加密公钥
export function getPubKey() {
  return axios({
    method: 'get',
    url: '/rdspwd'
  })
}
