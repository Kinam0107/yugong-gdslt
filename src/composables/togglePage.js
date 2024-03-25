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
  }

  const backPage = () => {
    if (localData.get(key)) {
      router.push({
        path: localData.get(key).backPath,
        state: { params: localData.get(key).params }
      })
      nextTick(() => {
        localData.remove(key)
      })
    }
  }

  const projectName = localData.get(key)?.projectName || ''
  const pageTitle = route.meta.title || ''
  const storeParams = history.state.params || null

  return { jumpPage, backPage, projectName, pageTitle, storeParams }
}
