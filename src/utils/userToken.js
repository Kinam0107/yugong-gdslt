import { localData } from './storage'

const key = 'token'

export function getToken() {
  return localData.get(key)
}

export function setToken(token) {
  return localData.set(key, token)
}

export function clearToken() {
  return localData.remove(key)
}
