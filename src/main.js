import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import 'default-passive-events'
import '@/utils/prototype'
import '@/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import CategoryTitle from '@/components/CategoryTitle.vue'
import OlMap from '@/components/map/OlMap.vue'
import VideoPopup from '@/components/video/VideoPopup.vue'
import { permitDirective, echartsAdaptDirective, clickOutsideDirective } from '@/utils/directives'

const app = createApp(App)

app
  .use(createPinia().use(piniaPersist))
  .use(router)
  .use(ElementPlus)
  .component('SvgIcon', SvgIcon)
  .component('ScreenLayout', ScreenLayout)
  .component('CategoryTitle', CategoryTitle)
  .component('OlMap', OlMap)
  .component('VideoPopup', VideoPopup)
  .directive('permit', permitDirective)
  .directive('echartsAdapt', echartsAdaptDirective)
  .directive('clickOutside', clickOutsideDirective)
  .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
