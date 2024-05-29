import { useRoute, useRouter } from 'vue-router'
import { localData } from '@/utils/storage'
import { nextTick } from 'vue'

export function useJumpSingleProjectPage() {
  const key = 'singleProjectInfo'

  const route = useRoute()
  const router = useRouter()

  const jumpPage = (targetPath, id, name, params) => {
    localData.set(key, {
      backPath: route.path,
      prcd: id,
      prnm: name,
      params: params
    })
    const { setActive } = useMaintainMenuSelection()
    setActive(route)
    router.push({
      path: targetPath
    })
  }

  const backPage = () => {
    if (localData.get(key)) {
      router.push({
        path: localData.get(key).backPath,
        state: { params: localData.get(key).params }
      })
    }
  }

  const cleanUp = () => {
    nextTick(() => {
      localData.remove(key)
    })
  }

  const getParams = () => {
    return history.state.params || null
  }

  const getPrnm = () => {
    return localData.get(key)?.prnm || ''
  }

  return { jumpPage, backPage, cleanUp, getParams, getPrnm }
}

export function useMaintainMenuSelection() {
  const key = 'activeMenuRouteName'

  const setActive = (route) => {
    localData.set(key, route.matched[1].name)
  }

  const getActive = () => {
    return localData.get(key)
  }

  const clearActive = () => {
    localData.remove(key)
  }

  return { setActive, getActive, clearActive }
}
