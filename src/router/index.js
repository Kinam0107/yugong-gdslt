import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setToken, getToken } from '@/utils/userToken'
import LoginView from '@/views/LoginView.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import _404View from '@/views/404View.vue'
import routes from './routes'
import guides from './guides'
import globalConfig from '@/config'

const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'root',
    component: BaseLayout,
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: _404View
  }
]

const packagingRoutingData = (routes, mark) => {
  return routes.map((route) => {
    route.name = mark ? `${mark}_${route.path}` : route.path
    if (mark) route.meta.mark = mark
    if (route.children?.length) {
      route.redirect = { name: route.children[0].name }
      route.children = packagingRoutingData(route.children, mark || route.name)
    }
    return route
  })
}

defaultRoutes.find((e) => e.name === 'root').children = import.meta.env.DEV ? [...packagingRoutingData(routes), ...packagingRoutingData(guides)] : packagingRoutingData(routes)
console.log(defaultRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/') {
    if (globalConfig.bypassLogin) {
      if (routes && routes.length > 0 && routes[0].name) {
        next({ name: routes[0].name })
      } else {
        next()
      }
    } else {
      if (getToken()) {
        if (routes && routes.length > 0 && routes[0].name) {
          next({ name: routes[0].name })
        } else {
          next()
        }
      } else {
        next('/login')
      }
    }
  } else {
    if (globalConfig.bypassLogin) {
      next()
    } else {
      if (to.query?.token) setToken(to.query.token)
      if (getToken() || ['login'].includes(String(to.name))) {
        next()
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
