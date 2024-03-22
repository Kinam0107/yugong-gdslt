import { localData } from './storage'

const key = 'userInfo'

export function getUserInfo() {
  return localData.get(key)
}

export function setUserInfo(userInfo) {
  return localData.set(key, userInfo)
}

export function clearUserInfo() {
  return localData.remove(key)
}
