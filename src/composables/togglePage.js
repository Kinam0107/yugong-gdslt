import { useRoute, useRouter } from 'vue-router'
import { localData } from '@/utils/storage'

export function useJumpSingleProjectPage() {
  const key = 'singleProjectInfo'

  const route = useRoute()
  const router = useRouter()

  const jumpPage = (targetPath, id, name) => {
    localData.set(key, {
      backPath: route.path,
      prcd: id,
      projectName: name
    })
    router.push(targetPath)
  }

  const backPage = () => {
    router.push(localData.get(key).backPath)
  }

  const projectName = localData.get(key)?.projectName || ''
  const pageTitle = route.meta.title || ''

  return { jumpPage, backPage, projectName, pageTitle }
}
