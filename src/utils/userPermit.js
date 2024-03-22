import { localData } from './storage'

const key = 'permit'

export function getPermit() {
  return localData.get(key)
}

export function setPermit(permit) {
  return localData.set(key, permit)
}

export function clearPermit() {
  return localData.remove(key)
}
