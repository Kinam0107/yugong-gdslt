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
      projectName: name,
      params: params
    })
    router.push({
      path: targetPath
    })
    const { setActive } = useMaintainMenuSelection()
    setActive(route)
  }

  const backPage = () => {
    if (localData.get(key)) {
      router.push({
        path: localData.get(key).backPath,
        state: { params: localData.get(key).params }
      })
    }
  }

  const clearCache = () => {
    nextTick(() => {
      localData.remove(key)
    })
  }

  const storeParams = history.state.params || null
  const projectName = localData.get(key)?.projectName || ''

  return { jumpPage, backPage, clearCache, storeParams, projectName }
}

export function useMaintainMenuSelection() {
  const key = 'activeMenuRouteName'

  const setActive = (route) => {
    localData.set(key, route.matched[1].name)
  }

  const activeMenu = localData.get(key)

  const clearActive = () => {
    localData.remove(key)
  }

  return { setActive, activeMenu, clearActive }
}
