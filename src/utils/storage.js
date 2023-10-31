// 封装localStorage方法
export const localData = {
  set: function (name, obj) {
    setDataToStorage(localStorage, name, obj)
    return true
  },
  get: function (name) {
    return getDataFromStorage(localStorage, name)
  },
  remove: function (name) {
    cleanStorageData(localStorage, name)
    return true
  }
}

// 封装sessionStorage方法
export const sessionData = {
  set: function (name, obj) {
    setDataToStorage(sessionStorage, name, obj)
    return true
  },
  get: function (name) {
    return getDataFromStorage(sessionStorage, name)
  },
  remove: function (name) {
    cleanStorageData(sessionStorage, name)
    return true
  }
}

const getDataFromStorage = (storage, name) => {
  const itemObj = storage.getItem(name + '_obj')
  const itemStr = storage.getItem(name + '_str')
  if (itemObj) {
    return JSON.parse(itemObj)
  } else if (itemStr) {
    return itemStr
  } else {
    return null
  }
}

const setDataToStorage = (storage, name, obj) => {
  storage.removeItem(name + '_obj')
  storage.removeItem(name + '_str')
  if (typeof obj === 'object') {
    storage.setItem(name + '_obj', JSON.stringify(obj))
  } else {
    storage.setItem(name + '_str', obj)
  }
}

const cleanStorageData = (storage, name) => {
  storage.removeItem(name + '_obj')
  storage.removeItem(name + '_str')
}
