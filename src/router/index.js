import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setToken, getToken } from '@/utils/userToken'
import LoginView from '@/views/LoginView.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import _404View from '@/views/404View.vue'
import routes from './modules/routes'
import guides from './modules/guides'
import embed from './embed'
import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'
import { login as loginApi, loginRscp as loginRscpApi, getPubKey as getPubKeyApi } from '@/api/authCenterApi'

const defaultRoutes = [
  {
    path: '/',
    name: 'root',
    component: BaseLayout,
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  ...embed,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: _404View
  }
]

const packagingRoutingData = (routes, mark, superRoute) => {
  return routes.map((route) => {
    route.name = superRoute ? `${superRoute.name}_${route.path}` : mark ? `${mark}_${route.path}` : route.path
    if (superRoute && superRoute.meta.leaf) {
      route.meta.end = superRoute.name
      route.meta.fatherTitle = superRoute.meta.title
    } else if (mark) {
      route.meta.mark = mark
    }
    if (route.children?.length) {
      route.redirect = { name: `${route.name}_${route.children[route.meta.redirectIndex || 0].path}` }
      route.children = packagingRoutingData(route.children, mark || route.name, route)
    }
    return route
  })
}

defaultRoutes.find((e) => e.name === 'root').children = import.meta.env.DEV ? [...packagingRoutingData(routes), ...packagingRoutingData(guides)] : packagingRoutingData(routes)
defaultRoutes.find((e) => e.name === 'root').redirect = defaultRoutes.find((e) => e.name === 'root').children[0]?.name || embed[0]?.name
console.log('All routes: ', defaultRoutes)

const router = createRouter({
  history: createWebHistory('/plat'),
  routes: defaultRoutes
})

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (import.meta.env.DEV) {
    if (!Cookies.get('authorization')) {
      await getPubKeyApi().then((res) => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(res.data)
        loginApi(btoa(encodeURI('liuchen')), encrypt.encrypt('ygkj0818'))
          .then((res) => {
            if (res.code == 1) Cookies.set('authorization', res.data)
          })
      })
    }
  }
  if (!getToken()) {
    await loginRscpApi().then((res) => {
      if (res.code == 1) setToken(res.data)
    })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
