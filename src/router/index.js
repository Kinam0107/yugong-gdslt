import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const defaultRoutes = [
  {
    path: '/',
    name: 'Q&A',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/screen-mode',
    name: 'ScreenQ&A',
    component: () => import('@/views/ScreenMode.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
