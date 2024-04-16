import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import 'default-passive-events'
import '@/utils/prototype'
import '@/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import AdmnSelect from '@/components/AdmnSelect.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import PageHeader from '@/components/PageHeader.vue'
import TabBar from '@/components/TabBar.vue'
import TablePagination from '@/components/TablePagination.vue'
import ExportOut from '@/components/ExportOut.vue'
import { permitDirective, echartsAdaptDirective, clickOutsideDirective } from '@/utils/directives'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .component('AdmnSelect', AdmnSelect)
  .component('SvgIcon', SvgIcon)
  .component('PageHeader', PageHeader)
  .component('TabBar', TabBar)
  .component('TablePagination', TablePagination)
  .component('ExportOut', ExportOut)
  .directive('permit', permitDirective)
  .directive('echartsAdapt', echartsAdaptDirective)
  .directive('clickOutside', clickOutsideDirective)
  .mount('#app')
